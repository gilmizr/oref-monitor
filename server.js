const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Geocode cache (in-memory + disk) — stores polygon boundaries
// ============================================
const CACHE_PATH = path.join(__dirname, 'geocode-cache.json');
let geocodeCache = {};
try { geocodeCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')); } catch {}

function saveGeoCache() {
  try { fs.writeFileSync(CACHE_PATH, JSON.stringify(geocodeCache), 'utf8'); } catch {}
}

// Check if a cache entry has polygon data (v2 format)
function hasPolygon(entry) {
  return entry && entry.geojson;
}

let lastGeoReq = 0;

async function geocodeOne(city) {
  // Rate-limit Nominatim (1 req/sec)
  const now = Date.now();
  const wait = Math.max(0, 1100 - (now - lastGeoReq));
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  lastGeoReq = Date.now();

  const q = encodeURIComponent(city + ', ישראל');
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&accept-language=he&countrycodes=il&polygon_geojson=1&polygon_threshold=0.0005`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'OrefAlerts/1.0 (alert-map)' },
  });
  const data = await response.json();
  if (data.length > 0) {
    const item = data[0];
    return {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      geojson: item.geojson || null,
    };
  }
  return null;
}

// ============================================
// State: Server-side alert polling
// ============================================
let currentAlerts = [];
let lastAlertJson = '';
const sseClients = new Set();

// ============================================
// SSE endpoint
// ============================================
app.get('/api/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  res.write(`data: ${JSON.stringify({ type: 'alerts', data: currentAlerts })}\n\n`);
  sseClients.add(res);

  const heartbeat = setInterval(() => { res.write(`: hb\n\n`); }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

function broadcastToClients(eventData) {
  const msg = `data: ${JSON.stringify(eventData)}\n\n`;
  for (const client of sseClients) {
    try { client.write(msg); } catch { sseClients.delete(client); }
  }
}

// ============================================
// Server-side polling — every 3 seconds
// ============================================
async function pollAlerts() {
  try {
    let text = '';
    // Try oref.org.il first, fallback to tzevaadom
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const response = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
        headers: { 'Referer': 'https://www.oref.org.il/', 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      text = await response.text();
    } catch {
      // Fallback: tzevaadom API (works from outside Israel)
      try {
        const r2 = await fetch('https://api.tzevaadom.co.il/notifications', { headers: { 'Accept': 'application/json' } });
        text = await r2.text();
      } catch {}
    }
    const json = (!text || text.trim() === '') ? '[]' : text;

    if (json !== lastAlertJson) {
      lastAlertJson = json;
      try {
        let parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) {
          parsed = (parsed && parsed.data) ? [parsed] : [];
        }
        currentAlerts = parsed;
        if (parsed.length) appendToHistory(parsed);
      } catch { currentAlerts = []; }
      broadcastToClients({ type: 'alerts', data: currentAlerts });
    }
  } catch (err) {
    if (err.name !== 'AbortError') console.warn('Poll error:', err.message);
  }
}

pollAlerts();
setInterval(pollAlerts, 3000);

// ============================================
// Static files
// ============================================
app.use(express.static(path.join(__dirname, 'public'), { etag: false, maxAge: 0 }));

// ============================================
// Local history accumulator — builds 24h+ history from live polling
// ============================================
const HIST_FILE = path.join(__dirname, 'alert-history.json');
let localHistory = [];
try { localHistory = JSON.parse(fs.readFileSync(HIST_FILE, 'utf8')); } catch {}

function appendToHistory(alerts) {
  if (!alerts.length) return;
  const now = new Date();
  const ts = now.toISOString().replace('T', ' ').substring(0, 19);
  alerts.forEach(a => {
    const areas = Array.isArray(a.data) ? a.data : [a.data].filter(Boolean);
    const cat = parseInt(a.cat) || 0;
    areas.forEach(area => {
      // Deduplicate: don't add if same area+cat within 30 seconds
      const dup = localHistory.find(h => h.data === area && h.category === cat && Math.abs(new Date(h.alertDate).getTime() - now.getTime()) < 30000);
      if (!dup) {
        localHistory.unshift({ alertDate: ts, title: a.title || '', data: area, category: cat });
      }
    });
  });
  // Trim to 24 hours
  const cutoff = now.getTime() - 86400000;
  localHistory = localHistory.filter(h => new Date(h.alertDate).getTime() > cutoff);
  // Save to disk
  try { fs.writeFileSync(HIST_FILE, JSON.stringify(localHistory)); } catch {}
}

// Hook into the polling loop to accumulate
const origBroadcast = broadcastToClients;

// ============================================
// History — merge oref API + local accumulated
// ============================================
app.get('/api/history', async (req, res) => {
  try {
    let orefHistory = [];
    try {
      const response = await fetch('https://www.oref.org.il/WarningMessages/alert/History/AlertsHistory.json', {
        headers: { 'Referer': 'https://www.oref.org.il/', 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
      });
      const text = await response.text();
      orefHistory = JSON.parse(text || '[]');
      if (!Array.isArray(orefHistory)) orefHistory = [];
    } catch {
      // oref unreachable (e.g. from outside Israel) — use local history only
    }

    // Merge: local history + oref history, deduplicated, sorted by time desc
    const merged = new Map();
    [...localHistory, ...orefHistory].forEach(h => {
      const key = (h.alertDate || '') + '_' + (h.data || '') + '_' + (h.category || 0);
      if (!merged.has(key)) merged.set(key, h);
    });
    const all = [...merged.values()].sort((a, b) => new Date(b.alertDate) - new Date(a.alertDate));
    res.json(all);
  } catch (err) {
    // Fallback to local history
    res.json(localHistory);
  }
});

// ============================================
// Districts
// ============================================
let districtsCache = null;
const DISTRICTS_FILE = path.join(__dirname, 'districts-cache.json');
try { districtsCache = JSON.parse(fs.readFileSync(DISTRICTS_FILE, 'utf8')); } catch {}

app.get('/api/districts', async (req, res) => {
  // Serve from cache if available
  if (districtsCache) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.json(districtsCache);
  }
  try {
    const response = await fetch('https://www.oref.org.il/districts/districts_heb.json', {
      headers: { 'Referer': 'https://www.oref.org.il/', 'Accept': 'application/json' },
    });
    const data = await response.json();
    districtsCache = data;
    try { fs.writeFileSync(DISTRICTS_FILE, JSON.stringify(data)); } catch {}
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch districts' });
  }
});

// old /api/history removed — using accumulated version above

// ============================================
// Ynet news
// ============================================
app.get('/api/news', async (req, res) => {
  try {
    const response = await fetch('https://www.ynet.co.il/Integration/StoryRss184.xml', {
      headers: { 'Accept': 'application/xml, text/xml' },
    });
    const text = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.send(text);
  } catch (err) {
    res.status(502).send('<rss><channel></channel></rss>');
  }
});

// ============================================
// Stats — rich statistics from alert history
// ============================================
let statsCache = { data: null, ts: 0 };

app.get('/api/stats', async (req, res) => {
  const zone = req.query.zone || '';
  const cacheKey = zone;
  if (statsCache.data && statsCache.key === cacheKey && Date.now() - statsCache.ts < 300000) {
    return res.json(statsCache.data);
  }

  try {
    const response = await fetch('https://www.oref.org.il/WarningMessages/alert/History/AlertsHistory.json', {
      headers: { 'Referer': 'https://www.oref.org.il/', 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
    });
    const text = await response.text();
    let history = [];
    try { history = JSON.parse(text || '[]'); } catch { history = []; }
    if (!Array.isArray(history)) history = [];

    // Filter by zone if specified
    const filtered = zone
      ? history.filter(h => {
          const data = Array.isArray(h.data) ? h.data.join(' ') : (h.data || '');
          return data.includes(zone);
        })
      : history;

    // Compute statistics
    const missileAlerts = filtered.filter(h => h.category === 1);
    const hourCounts = {};
    const dayCounts = {};
    const dateCounts = {};
    let totalShelterSec = 0;

    filtered.forEach(h => {
      if (!h.alertDate) return;
      try {
        const dt = new Date(h.alertDate);
        const hour = dt.getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        const dayName = dt.toLocaleDateString('he-IL', { weekday: 'long' });
        dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
        const dateKey = dt.toISOString().split('T')[0];
        dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
      } catch {}
    });

    // Shelter time calculation: each missile alert = migun_time in shelter
    // Load districts for migun times
    let districts = [];
    try {
      const dResp = await fetch('https://www.oref.org.il/districts/districts_heb.json', {
        headers: { 'Referer': 'https://www.oref.org.il/' },
      });
      districts = await dResp.json();
    } catch {}
    const migunMap = {};
    districts.forEach(d => { migunMap[d.label_he || d.label] = d.migun_time; });

    missileAlerts.forEach(h => {
      const areas = Array.isArray(h.data) ? h.data : [h.data].filter(Boolean);
      areas.forEach(a => {
        const migun = migunMap[a] || 60; // default 60s if unknown
        totalShelterSec += migun + 600; // migun_time + 10min in shelter
      });
    });

    // Peak hour
    let peakHour = 0, peakHourCount = 0;
    Object.entries(hourCounts).forEach(([h, c]) => { if (c > peakHourCount) { peakHour = parseInt(h); peakHourCount = c; } });

    // Peak day
    let peakDay = '--', peakDayCount = 0;
    Object.entries(dayCounts).forEach(([d, c]) => { if (c > peakDayCount) { peakDay = d; peakDayCount = c; } });

    // Days with alerts
    const uniqueDays = Object.keys(dateCounts).length;
    const alertsPerDay = uniqueDays > 0 ? (filtered.length / uniqueDays).toFixed(1) : 0;

    // Longest quiet streak (hours between alerts)
    const timestamps = filtered.map(h => new Date(h.alertDate).getTime()).filter(t => !isNaN(t)).sort((a, b) => a - b);
    let longestQuiet = 0;
    for (let i = 1; i < timestamps.length; i++) {
      const gap = timestamps[i] - timestamps[i - 1];
      if (gap > longestQuiet) longestQuiet = gap;
    }

    const result = {
      totalAlerts: filtered.length,
      missileAlerts: missileAlerts.length,
      shelterMinutes: Math.round(totalShelterSec / 60),
      shelterHours: (totalShelterSec / 3600).toFixed(1),
      peakHour: String(peakHour).padStart(2, '0') + ':00',
      peakDay,
      alertsPerDay: parseFloat(alertsPerDay),
      uniqueDays,
      longestQuietHours: (longestQuiet / 3600000).toFixed(1),
      hourDistribution: hourCounts,
    };

    statsCache = { data: result, key: cacheKey, ts: Date.now() };
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'Stats failed' });
  }
});

// ============================================
// War-level stats from mako/sheltertime Firebase
// ============================================
let warStatsCache = { data: null, ts: 0 };

app.get('/api/war-stats', async (req, res) => {
  const city = req.query.city || '';
  if (warStatsCache.data && Date.now() - warStatsCache.ts < 600000) {
    return res.json(getWarStatsForCity(warStatsCache.data, city));
  }
  try {
    const r = await fetch('https://storage.googleapis.com/mamad-time-mako.firebasestorage.app/data_2026.json');
    const data = await r.json();
    warStatsCache = { data, ts: Date.now() };
    res.json(getWarStatsForCity(data, city));
  } catch { res.status(502).json({ error: 'Failed' }); }
});

function getWarStatsForCity(data, city) {
  const result = { wars: {} };
  for (const [war, cities] of Object.entries(data)) {
    let found = cities[city];
    if (!found) {
      // Partial match
      const key = Object.keys(cities).find(c => c.includes(city) || city.includes(c.split(' -')[0]));
      if (key) found = cities[key];
    }
    if (found) {
      result.wars[war] = {
        shelterHours: (found[0] / 3600000).toFixed(1),
        shelterMinutes: Math.round(found[0] / 60000),
        alerts: found[1],
        cityName: city,
      };
    }
  }
  // Use current war (Iran2026) as primary display, fallback to latest available
  const current = result.wars['Iran2026'] || result.wars[Object.keys(result.wars).pop()] || {};
  result.shelterHours = current.shelterHours || '0';
  result.alerts = current.alerts || 0;
  // Also provide total across all wars
  let totalMs = 0, totalAlerts = 0;
  for (const w of Object.values(result.wars)) { totalMs += parseFloat(w.shelterHours) * 3600000; totalAlerts += w.alerts; }
  result.totalShelterHours = (totalMs / 3600000).toFixed(1);
  result.totalAlerts = totalAlerts;
  return result;
}

// ============================================
// Geocode — returns lat, lng, geojson polygon
// ============================================
app.get('/api/geocode', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'Missing city' });

  // Return from cache if we have polygon data
  if (geocodeCache[city] && hasPolygon(geocodeCache[city])) {
    return res.json(geocodeCache[city]);
  }

  try {
    const result = await geocodeOne(city);
    if (result) {
      geocodeCache[city] = result;
      saveGeoCache();
      return res.json(result);
    }
    res.status(404).json({ error: 'Not found' });
  } catch {
    res.status(502).json({ error: 'Geocode failed' });
  }
});

// Batch geocode
app.post('/api/geocode-batch', express.json(), async (req, res) => {
  const cities = req.body.cities;
  if (!Array.isArray(cities)) return res.status(400).json({ error: 'Expected {cities:[...]}' });

  const results = {};
  const missing = [];

  cities.forEach(c => {
    if (geocodeCache[c] && hasPolygon(geocodeCache[c])) {
      results[c] = geocodeCache[c];
    } else {
      missing.push(c);
    }
  });

  for (const city of missing.slice(0, 20)) {
    try {
      const result = await geocodeOne(city);
      if (result) {
        geocodeCache[city] = result;
        results[city] = result;
      }
    } catch {}
  }

  saveGeoCache();
  res.json(results);
});

// ============================================
// Weather — Open-Meteo (free, no API key)
// ============================================
let weatherCache = { data: null, ts: 0 };

app.get('/api/weather', async (req, res) => {
  const lat = parseFloat(req.query.lat) || 32.08;
  const lng = parseFloat(req.query.lng) || 34.78;
  const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;

  // Cache 10 minutes
  if (weatherCache.data && weatherCache.key === key && Date.now() - weatherCache.ts < 600000) {
    return res.json(weatherCache.data);
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&timezone=Asia/Jerusalem`;
    const response = await fetch(url);
    const data = await response.json();
    weatherCache = { data: data.current, key, ts: Date.now() };
    res.json(data.current);
  } catch {
    res.status(502).json({ error: 'Weather fetch failed' });
  }
});

// ============================================
// Liveblog scraper — mako/n12 war liveblogs
// ============================================
let liveblogCache = { items: [], ts: 0 };

async function scrapeLiveblog(url) {
  try {
    const resp = await fetch(url, { headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'he-IL,he;q=0.9',
      'Referer': 'https://www.mako.co.il/',
    }});
    const html = await resp.text();
    const clean = s => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").replace(/<[^>]+>/g, '').replace(/הקישור הועתק/g, '').replace(/אירוע מפתח/g, '').replace(/\d{2}:\d{2}/g, '').trim();

    // Headlines (h2/h3) for ticker
    const headlines = [];
    for (const m of html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/g)) {
      const t = clean(m[1]);
      if (t.length > 10 && t.length < 200) headlines.push(t);
    }

    // Reporter chat: author name + post text + time
    const chat = [];
    const authors = [...html.matchAll(/AuthorSourceAndSponsor_name[^>]*>([^<]+)/g)].map(m => clean(m[1]));
    const times = [...html.matchAll(/<time[^>]*>([^<]+)<\/time>/g)].map(m => clean(m[1]));
    // Post body text from <p> tags
    const posts = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gs)].map(m => clean(m[1])).filter(t => t.length > 15 && t.length < 300);

    // Content images (jpg/png/webp, not icons/logos)
    const images = [...html.matchAll(/<img[^>]*src="(https:\/\/img\.mako\.co\.il\/[^"]*\.(?:jpg|jpeg|png|webp)[^"]*)"[^>]*>/g)]
      .map(m => m[1])
      .filter(u => !u.includes('social') && !u.includes('logo') && !u.includes('partner') && u.length > 60);

    for (let i = 0; i < Math.min(authors.length, Math.max(headlines.length, posts.length)); i++) {
      chat.push({
        author: authors[i] || '',
        text: posts[i] || headlines[i] || '',
        time: times[i + 1] || '',
        img: images[i] || null,
      });
    }

    return { headlines, chat };
  } catch { return { headlines: [], chat: [] }; }
}

app.get('/api/liveblog', async (req, res) => {
  if (liveblogCache.headlines && liveblogCache.headlines.length && Date.now() - liveblogCache.ts < 120000) {
    return res.json({ headlines: liveblogCache.headlines, chat: liveblogCache.chat });
  }
  const [mako, n12] = await Promise.all([
    scrapeLiveblog('https://www.mako.co.il/pzm-soldiers/liveblog-af56dc9572d0d91027.htm'),
    scrapeLiveblog('https://www.mako.co.il/news-military/2026_q1/liveblog-5902adb424d0d91026.htm'),
  ]);
  const headlines = [...new Set([...mako.headlines, ...n12.headlines])].slice(0, 40);
  const chat = [...mako.chat, ...n12.chat].slice(0, 25);
  const result = { headlines, chat };
  liveblogCache = { ...result, ts: Date.now() };
  res.json(result);
});

// REST fallback
app.get('/api/alerts', (req, res) => res.json(currentAlerts));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛡️  שרת התראות פיקוד העורף פועל על http://localhost:${PORT}`);
  console.log(`   SSE streaming | Polling every 3s | Geocode with polygons`);
});
