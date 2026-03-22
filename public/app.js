const ZONES=[
{id:'upper_galilee',name:'גליל עליון',areaIds:[6],coords:[[35.20,33.30],[35.50,33.30],[35.70,33.10],[35.65,32.92],[35.30,32.90],[35.10,33.05]]},
{id:'confrontation_line',name:'קו העימות',areaIds:[30],coords:[[35.10,33.05],[35.30,32.90],[35.50,33.30],[35.20,33.30],[35.10,33.15]]},
{id:'western_galilee',name:'גליל מערבי',areaIds:[],coords:[[34.90,33.10],[35.20,33.30],[35.10,33.05],[35.30,32.90],[35.10,32.82],[34.95,32.85]]},
{id:'lower_galilee',name:'גליל תחתון',areaIds:[7],coords:[[35.10,32.82],[35.50,32.90],[35.55,32.72],[35.45,32.60],[35.10,32.58],[34.95,32.70]]},
{id:'golan',name:'גולן',areaIds:[2,35],coords:[[35.55,32.72],[35.50,32.90],[35.65,32.92],[35.80,33.25],[35.90,33.05],[35.80,32.72]]},
{id:'haifa',name:'חיפה וקריות',areaIds:[34,36,11,24],coords:[[34.85,32.85],[34.95,32.85],[35.10,32.82],[34.95,32.70],[34.95,32.58],[34.80,32.58],[34.78,32.68]]},
{id:'tavor',name:'תבור',areaIds:[37],coords:[[35.10,32.58],[35.45,32.60],[35.55,32.50],[35.50,32.38],[35.20,32.36],[35.00,32.45]]},
{id:'valleys',name:'עמקים',areaIds:[3,4],coords:[[35.20,32.36],[35.50,32.38],[35.55,32.50],[35.80,32.50],[35.80,32.20],[35.50,32.10],[35.20,32.20]]},
{id:'menashe',name:'מנשה',areaIds:[15,13],coords:[[34.80,32.58],[35.00,32.45],[34.98,32.36],[34.85,32.33],[34.75,32.40]]},
{id:'sharon',name:'שרון',areaIds:[27,23],coords:[[34.72,32.38],[34.85,32.33],[34.98,32.36],[35.00,32.15],[34.88,32.12],[34.75,32.12]]},
{id:'shomron',name:'שומרון',areaIds:[10],coords:[[35.00,32.45],[35.20,32.36],[35.20,32.20],[35.50,32.10],[35.45,31.95],[35.20,31.95],[35.00,32.10]]},
{id:'dan',name:'גוש דן',areaIds:[8,21],coords:[[34.70,32.15],[34.88,32.12],[34.92,32.05],[34.88,31.95],[34.73,31.93],[34.68,32.00]]},
{id:'shfela',name:'שפלה',areaIds:[12],coords:[[34.73,31.93],[34.88,31.95],[35.00,32.00],[35.00,31.70],[34.88,31.65],[34.72,31.68],[34.68,31.80]]},
{id:'jerusalem',name:'ירושלים',areaIds:[20],coords:[[35.00,31.85],[35.35,31.85],[35.38,31.70],[35.25,31.62],[35.00,31.68]]},
{id:'beit_shemesh',name:'בית שמש',areaIds:[5],coords:[[34.88,31.83],[35.00,31.85],[35.00,31.68],[34.88,31.65]]},
{id:'judea',name:'יהודה',areaIds:[17],coords:[[35.00,31.68],[35.25,31.62],[35.38,31.50],[35.50,31.10],[35.35,31.10],[35.10,31.25],[34.95,31.40]]},
{id:'ashkelon_lachish',name:'לכיש',areaIds:[14,19,22],coords:[[34.48,31.72],[34.72,31.68],[34.88,31.65],[34.95,31.40],[34.80,31.28],[34.55,31.28],[34.42,31.55]]},
{id:'gaza_envelope',name:'עוטף עזה',areaIds:[26],coords:[[34.22,31.52],[34.55,31.48],[34.55,31.28],[34.50,31.18],[34.28,31.18],[34.18,31.32]]},
{id:'beersheva',name:'נגב',areaIds:[25],coords:[[34.55,31.28],[34.80,31.28],[35.10,31.25],[35.20,31.05],[35.00,30.85],[34.60,30.85],[34.40,31.05]]},
{id:'western_negev',name:'נגב מערבי',areaIds:[16],coords:[[34.18,31.32],[34.50,31.18],[34.40,31.05],[34.60,30.85],[34.30,30.70],[34.10,30.90]]},
{id:'dead_sea',name:'ים המלח',areaIds:[18],coords:[[35.20,31.50],[35.50,31.50],[35.50,31.10],[35.35,31.10],[35.20,31.25]]},
{id:'south_negev',name:'דרום נגב',areaIds:[9],coords:[[34.30,30.70],[34.60,30.85],[35.00,30.85],[35.20,30.50],[35.00,30.00],[34.50,29.80],[34.20,30.20]]},
{id:'arava',name:'ערבה',areaIds:[29],coords:[[35.00,30.85],[35.20,31.05],[35.50,31.10],[35.50,30.50],[35.20,30.00],[35.00,30.00]]},
{id:'eilat',name:'אילת',areaIds:[1],coords:[[34.88,29.62],[35.00,29.70],[35.22,29.55],[35.10,29.45],[34.92,29.47]]},
];
const WMO={0:['☀️','בהיר'],1:['🌤','כמעט בהיר'],2:['⛅','מעונן חלקית'],3:['☁️','מעונן'],45:['🌫','ערפל'],48:['🌫','ערפל'],51:['🌦','טפטוף'],53:['🌦','טפטוף'],55:['🌧','גשם קל'],61:['🌧','גשם'],63:['🌧','גשם'],65:['🌧','גשם כבד'],71:['🌨','שלג'],73:['🌨','שלג'],75:['🌨','שלג כבד'],80:['🌦','ממטרים'],81:['🌧','ממטרים'],82:['⛈','סופה'],95:['⛈','רעמים'],96:['⛈','ברד'],99:['⛈','ברד כבד']};

// State
const S={selZ:new Set(),selC:new Set(),watchZ:new Set(),watchC:new Set(),filterOn:false,al:[],dist:[],dba:{},c2a:{},c2m:{},zL:{},zaS:{},caS:{},cL:{},cGD:{},cMG:null,pJ:'',map:null,es:null,rc:0,tkS:50,sound:true,t0:Date.now(),
  // Stats
  lastAlertTime:null,totalAlerts:0,hourAlerts:[],todayAlerts:0,zoneHits:{},
  // Shelter
  shelterTimer:null,shelterEnd:0,testMode:null,histRaw:[],userLat:null,userLng:null
};

document.addEventListener('DOMContentLoaded',()=>{
  initCk();initSound();initTh();initFilter();initMap();initZ();initWatchZ();initTabs();initMdl();initPrf();
  initZoneBoard();initFreqBars();
  ldSv();ldDist();detLoc();sse();ldHist();ldNews();setTimeout(ldServerStats,2000);setTimeout(ldWarStats,3000);
  // ESC to dismiss shelter overlay
  document.addEventListener('keydown',e=>{if(e.key==='Escape')dismissShelter()});
});

// ── Sound ──
function initSound(){S.sound=localStorage.getItem('snd')!=='off';updSnd();document.getElementById('soundBtn').addEventListener('click',()=>{S.sound=!S.sound;localStorage.setItem('snd',S.sound?'on':'off');updSnd()})}
function updSnd(){const b=document.getElementById('soundBtn');b.textContent=S.sound?'🔔':'🔕';b.classList.toggle('muted-sound',!S.sound)}

// ── Filter toggle ──
function initFilter(){
  S.filterOn=localStorage.getItem('filter')==='on';
  const btn=document.getElementById('filterToggle');
  updFilterBtn();
  btn.addEventListener('click',()=>{S.filterOn=!S.filterOn;localStorage.setItem('filter',S.filterOn?'on':'off');updFilterBtn();rndTimeline(S.histRaw)});
}
function updFilterBtn(){document.getElementById('filterToggle').classList.toggle('active',S.filterOn)}

// ── Watch zones ──
function initWatchZ(){
  const c=document.getElementById('wList');if(!c)return;c.innerHTML='';
  try{JSON.parse(localStorage.getItem('ow'))?.forEach(id=>S.watchZ.add(id))}catch{}
  ZONES.forEach(z=>{
    const d=document.createElement('div');d.className='zi';
    d.innerHTML=`<input type=checkbox id=w-${z.id} ${S.watchZ.has(z.id)?'checked':''}><label for=w-${z.id}>${z.name}</label>`;
    c.appendChild(d);
    d.querySelector('input').addEventListener('change',e=>{
      e.target.checked?S.watchZ.add(z.id):S.watchZ.delete(z.id);
      localStorage.setItem('ow',JSON.stringify([...S.watchZ]));
    });
  });
  document.getElementById('selAllW')?.addEventListener('click',()=>{ZONES.forEach(z=>{S.watchZ.add(z.id);const cb=document.getElementById(`w-${z.id}`);if(cb)cb.checked=true});localStorage.setItem('ow',JSON.stringify([...S.watchZ]))});
  document.getElementById('clrAllW')?.addEventListener('click',()=>{ZONES.forEach(z=>{S.watchZ.delete(z.id);const cb=document.getElementById(`w-${z.id}`);if(cb)cb.checked=false});localStorage.setItem('ow',JSON.stringify([...S.watchZ]))});
  // Load saved watch cities
  try{JSON.parse(localStorage.getItem('owc'))?.forEach(n=>S.watchC.add(n))}catch{}
}

function rndWatchCities(f=''){
  const c=document.getElementById('wCityList');if(!c||!S.dist.length)return;
  c.innerHTML='';const ft=f.trim();
  // Selected watch cities at top
  if(S.watchC.size>0&&!ft){
    const h=document.createElement('div');h.className='cg';h.textContent='נבחרו';c.appendChild(h);
    [...S.watchC].sort((a,b)=>a.localeCompare(b,'he')).forEach(nm=>{
      const d=document.createElement('div');d.className='ci';
      d.innerHTML=`<input type=checkbox checked><label>${esc(nm)}</label>`;
      c.appendChild(d);
      d.querySelector('input').addEventListener('change',()=>{S.watchC.delete(nm);localStorage.setItem('owc',JSON.stringify([...S.watchC]));updWCC();rndWatchCities()});
    });
  }
  const aids=Object.keys(S.dba).sort((a,b)=>S.dba[a].name.localeCompare(S.dba[b].name,'he'));
  aids.forEach(aid=>{const area=S.dba[aid];let cs=area.cities;
    if(ft)cs=cs.filter(x=>(x.label_he||x.label||'').includes(ft)||(x.areaname||'').includes(ft));
    if(!cs.length)return;
    const h=document.createElement('div');h.className='cg';h.textContent=area.name;c.appendChild(h);
    cs.sort((a,b)=>(a.label_he||a.label).localeCompare(b.label_he||b.label,'he'));
    cs.forEach(ci=>{const nm=ci.label_he||ci.label;
      const d=document.createElement('div');d.className='ci';
      d.innerHTML=`<input type=checkbox id=wc-${ci.id} ${S.watchC.has(nm)?'checked':''}><label for=wc-${ci.id}>${esc(nm)}</label>`;
      c.appendChild(d);
      d.querySelector('input').addEventListener('change',e=>{
        e.target.checked?S.watchC.add(nm):S.watchC.delete(nm);
        localStorage.setItem('owc',JSON.stringify([...S.watchC]));updWCC();
      });
    });
  });
  const inp=document.getElementById('wCitySrch');
  if(inp&&!inp._b){inp._b=true;let t;inp.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>rndWatchCities(inp.value),200)})}
  document.getElementById('clrWC')?.addEventListener('click',()=>{S.watchC.clear();localStorage.setItem('owc','[]');updWCC();rndWatchCities()});
  updWCC();
}
function updWCC(){const el=document.getElementById('wCityCnt');if(el)el.textContent=S.watchC.size}

// ── Clock + Uptime ──
function initCk(){
  const t=document.getElementById('ckBig'),d=document.getElementById('ckDate'),ut=document.getElementById('uptime');
  !function f(){
    const n=new Date(),ts=n.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    t.textContent=ts;
    d.textContent=n.toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    const el=Math.floor((Date.now()-S.t0)/1000),h=Math.floor(el/3600),m=Math.floor((el%3600)/60);
    ut.textContent=h+':'+String(m).padStart(2,'0');
    setTimeout(f,1000);
  }();
}

// ── Theme ──
function initTh(){const s=localStorage.getItem('t')||'dark';if(s==='light')document.body.setAttribute('data-theme','light');document.getElementById('themeBtn').addEventListener('click',()=>{const c=document.body.getAttribute('data-theme');const n=c==='light'?null:'light';n?document.body.setAttribute('data-theme',n):document.body.removeAttribute('data-theme');localStorage.setItem('t',n||'dark');if(S.map){if(!n){S.map.removeLayer(S.ltT);S.dkT.addTo(S.map)}else{S.map.removeLayer(S.dkT);S.ltT.addTo(S.map)}}})}

// ── Modal ──
function initMdl(){const o=document.getElementById('ov');document.getElementById('setBtn').addEventListener('click',()=>o.classList.add('open'));document.getElementById('closeSet').addEventListener('click',()=>o.classList.remove('open'));o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open')})}
function initTabs(){document.querySelectorAll('.tb').forEach(b=>{b.addEventListener('click',()=>{document.querySelectorAll('.tb').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tbd').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById(`tab-${b.dataset.tab}`).classList.add('active')})})}
function initPrf(){
  const ts=document.getElementById('tkSpd');if(!ts)return;
  S.tkS=parseInt(localStorage.getItem('tks'))||50;ts.value=S.tkS;aTk();
  ts.addEventListener('input',()=>{S.tkS=parseInt(ts.value);localStorage.setItem('tks',S.tkS);aTk()});
  // Test display buttons
  document.querySelectorAll('.test-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.test-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const mode=b.dataset.mode;
      S.testMode=mode==='none'?null:mode;
      document.body.setAttribute('data-alert',S.testMode||'none');
    });
  });
}
function aTk(){document.documentElement.style.setProperty('--news-dur',Math.max(15,S.tkS*1.5)+'s')}

// ── Zone Board ──
function initZoneBoard(){
  const c=document.getElementById('zoneBoard');if(!c)return;c.innerHTML='';
  ZONES.forEach(z=>{const d=document.createElement('div');d.className='zb-item';d.id='zb-'+z.id;d.textContent=z.name;c.appendChild(d)});
}
function updZoneBoard(){
  ZONES.forEach(z=>{
    const el=document.getElementById('zb-'+z.id);if(!el)return;
    const st=S.zaS[z.id],sel=S.selZ.has(z.id);
    el.className='zb-item'+(st==='danger'?' danger':st==='warning'?' warning':st==='safe'?' safe':sel?' sel':'');
  });
}

// ── Frequency Bars (24h) ──
function initFreqBars(){
  const c=document.getElementById('freqBars');if(!c)return;c.innerHTML='';
  for(let i=0;i<24;i++){const b=document.createElement('div');b.className='freq-bar';b.style.height='1px';c.appendChild(b)}
}
function updFreqBars(){
  const bars=document.querySelectorAll('.freq-bar');if(!bars.length)return;
  const now=Date.now(),hourMs=3600000;
  // Count alerts per hour from hourAlerts timestamps
  const counts=new Array(24).fill(0);
  S.hourAlerts.forEach(ts=>{const ago=Math.floor((now-ts)/hourMs);if(ago>=0&&ago<24)counts[23-ago]++});
  const max=Math.max(1,...counts);
  bars.forEach((b,i)=>{
    const h=Math.max(1,Math.round((counts[i]/max)*32));
    b.style.height=h+'px';
    b.style.background=counts[i]>0?'var(--acc)':'var(--brd)';
  });
}

// ── Server Stats (shelter time, peak hour, etc) ──
async function ldServerStats(){
  try{
    // Try filtered by zone first, fallback to global
    let zoneName='';
    for(const id of S.selZ){const z=ZONES.find(x=>x.id===id);if(z){zoneName=z.name;break}}
    let d;
    if(zoneName){
      const r=await fetch(`/api/stats?zone=${encodeURIComponent(zoneName)}`);
      d=await r.json();
    }
    // If no zone or zero results, fetch global stats
    if(!d||d.totalAlerts===0){
      const r2=await fetch('/api/stats');
      d=await r2.json();
    }
    const el=n=>document.getElementById(n);
    if(el('statShelter'))el('statShelter').textContent=d.shelterMinutes||0;
    if(el('statToday'))el('statToday').textContent=d.totalAlerts||0;
    if(el('statPeakHour'))el('statPeakHour').textContent=d.peakHour||'--';
    if(el('statPerDay'))el('statPerDay').textContent=d.alertsPerDay||0;
    if(el('statPeakDay'))el('statPeakDay').textContent=d.peakDay||'--';
    if(el('statQuiet'))el('statQuiet').textContent=d.longestQuietHours||'--';
    if(el('statMissiles'))el('statMissiles').textContent=d.missileAlerts||0;
    if(el('statTotal'))el('statTotal').textContent=d.totalAlerts||0;
    if(el('statDays'))el('statDays').textContent=d.uniqueDays||'--';
    if(d.hourDistribution){
      const bars=document.querySelectorAll('.freq-bar');
      const counts=new Array(24).fill(0);
      Object.entries(d.hourDistribution).forEach(([h,c])=>{counts[parseInt(h)]=c});
      const max=Math.max(1,...counts);
      bars.forEach((b,i)=>{
        const v=Math.max(1,Math.round((counts[i]/max)*32));
        b.style.height=v+'px';
        b.style.background=counts[i]>0?'var(--acc)':'var(--brd)';
      });
    }
  }catch{}
  setTimeout(ldServerStats,300000);
}

// War-level stats from mako sheltertime data
async function ldWarStats(){
  // Find a selected city name for the query
  let city='';
  if(S.selC.size>0)city=[...S.selC][0];
  else{
    // Use first selected zone, find a major city in it
    for(const id of S.selZ){
      const z=ZONES.find(x=>x.id===id);
      if(z){city=z.name;break}
    }
  }
  if(!city)city='תל אביב';
  try{
    const r=await fetch(`/api/war-stats?city=${encodeURIComponent(city)}`);
    if(!r.ok)return;
    const d=await r.json();
    const el=n=>document.getElementById(n);
    if(el('warShelter'))el('warShelter').textContent=d.totalShelterHours||'--';
    if(el('warAlerts'))el('warAlerts').textContent=d.totalAlerts||'--';
  }catch{}
  setTimeout(ldWarStats,600000);
}

// ── Stats ──
function updStats(){
  const el=id=>{const e=document.getElementById(id);return e||{set textContent(v){}}};
  el('statToday').textContent=S.todayAlerts;
  const now=Date.now(),hr=S.hourAlerts.filter(t=>now-t<3600000).length;
  el('statHour').textContent=hr;
  el('statTotal').textContent=S.totalAlerts;
  let peak='--',peakN=0;
  Object.entries(S.zoneHits).forEach(([name,n])=>{if(n>peakN){peakN=n;peak=name}});
  el('statPeak').textContent=peak;
  updThreat();
  updDistance();
}

// ── Threat Probability ──
// Based on: how many alerts hit user's selected zones in last 24h from history
// More recent alerts = higher probability. Uses exponential decay.
function updThreat(){
  const tv=document.getElementById('threatVal'),tf=document.getElementById('threatFill'),th=document.getElementById('threatHint');
  if(!tv)return;
  if(S.selZ.size===0&&S.selC.size===0){tv.textContent='--';tf.style.width='0%';th.textContent='בחר אזור';return}

  const now=Date.now();
  // Collect ALL alert timestamps (not just my zone) for general tension
  const allTimestamps=[];
  const myTimestamps=[];
  S.histRaw.forEach(item=>{
    if(parseInt(item.category||item.cat)===13)return;
    const ts=new Date(item.alertDate||item.date||0).getTime();
    if(isNaN(ts))return;
    allTimestamps.push(ts);
    const areas=Array.isArray(item.data)?item.data:[item.data].filter(Boolean);
    let mine=false;
    areas.forEach(a=>{fndZ(a).forEach(z=>{if(S.selZ.has(z.id))mine=true});if(S.selC.has(a))mine=true});
    if(mine)myTimestamps.push(ts);
  });
  allTimestamps.sort((a,b)=>b-a);
  myTimestamps.sort((a,b)=>b-a);

  let risk=0;

  // Factor 1: GENERAL TENSION — any alerts anywhere recently (0-25)
  // Active conflict = base risk for everyone
  if(allTimestamps.length>0){
    const lastAnyH=(now-allTimestamps[0])/3600000;
    risk+=Math.max(0,25*Math.exp(-lastAnyH*0.3));
  }

  // Factor 2: MY ZONE RECENCY (0-35)
  if(myTimestamps.length>0){
    const lastAgeH=(now-myTimestamps[0])/3600000;
    risk+=Math.max(0,35*Math.exp(-lastAgeH*0.4));
  }

  // Factor 3: FREQUENCY in my zone — avg gap (0-20)
  if(myTimestamps.length>=2){
    const last10=myTimestamps.slice(0,10);
    let totalGap=0;
    for(let i=0;i<last10.length-1;i++)totalGap+=last10[i]-last10[i+1];
    const avgGapH=totalGap/((last10.length-1)*3600000);
    risk+=Math.max(0,20*Math.exp(-avgGapH*0.6));
  }

  // Factor 4: TIME OF DAY (0-10)
  const hour=new Date().getHours();
  const hourRisk=[3,2,1,1,1,2,3,4,5,6,7,8,8,7,7,8,9,10,10,10,9,8,6,4];
  risk+=hourRisk[hour];

  // Factor 5: ESCALATION — overall alert rate acceleration (0-10)
  const last2h=allTimestamps.filter(t=>now-t<7200000).length;
  const prev2h=allTimestamps.filter(t=>now-t>=7200000&&now-t<14400000).length;
  if(last2h>prev2h)risk+=Math.min(10,(last2h-prev2h)*3);
  // Ongoing conflict bonus: if >3 alerts in last 6h anywhere = +5
  if(allTimestamps.filter(t=>now-t<21600000).length>3)risk+=5;

  // Factor 6: ACTIVE ALERT = 95%
  if(S.al.length>0){
    let activeInMyZone=false;
    S.al.forEach(a=>(a.data||[]).forEach(n=>{
      fndZ(n).forEach(z=>{if(S.selZ.has(z.id))activeInMyZone=true});
      if(S.selC.has(n))activeInMyZone=true;
    }));
    if(activeInMyZone)risk=95;
  }

  const pct=Math.round(Math.min(95,Math.max(2,risk)));
  tv.textContent=pct+'%';
  tf.style.width=pct+'%';
  if(pct>=60){tf.style.background='#ff0040';th.textContent='סיכון גבוה'}
  else if(pct>=35){tf.style.background='#ffaa00';th.textContent='סיכון בינוני'}
  else if(pct>=15){tf.style.background='#888';th.textContent='סיכון נמוך'}
  else{tf.style.background='#333';th.textContent='שקט'}
}

// ── Distance to nearest active alert ──
function updDistance(){
  const el=document.getElementById('statDist');if(!el)return;
  if(!S.userLat||S.al.length===0){el.textContent='--';return}
  let minD=Infinity;
  S.al.forEach(a=>(a.data||[]).forEach(nm=>{
    const zones=fndZ(nm);
    zones.forEach(z=>{
      const c=ctr(z.coords);
      const d=haversine(S.userLat,S.userLng,c[1],c[0]);
      if(d<minD)minD=d;
    });
  }));
  el.textContent=minD<Infinity?Math.round(minD)+'km':'--';
}
function haversine(lat1,lon1,lat2,lon2){
  const R=6371,dLat=(lat2-lat1)*Math.PI/180,dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

// ── Auto-zoom map to active alerts ──
function autoZoomAlerts(){
  if(!S.map||S.al.length===0)return;
  const points=[];
  S.al.forEach(a=>(a.data||[]).forEach(nm=>{
    const zones=fndZ(nm);
    zones.forEach(z=>{const c=ctr(z.coords);points.push([c[1],c[0]])});
  }));
  if(points.length===0)return;
  // Include user location if available
  if(S.userLat)points.push([S.userLat,S.userLng]);
  if(points.length===1)S.map.flyTo(points[0],10,{duration:1.5});
  else{const bounds=L.latLngBounds(points);S.map.flyToBounds(bounds.pad(0.3),{duration:1.5,maxZoom:11})}
}

// ── Geo ──
function detLoc(){if(!navigator.geolocation){ldWx(32.08,34.78);return}navigator.geolocation.getCurrentPosition(p=>{S.userLat=p.coords.latitude;S.userLng=p.coords.longitude;autoZ(S.userLat,S.userLng);ldWx(S.userLat,S.userLng)},()=>ldWx(32.08,34.78),{timeout:5000})}
function autoZ(lat,lng){for(const z of ZONES)if(pip(lat,lng,z.coords)){togZ(z.id,true);return}let b=null,bd=1e9;ZONES.forEach(z=>{const c=ctr(z.coords);const d=Math.hypot(lat-c[1],lng-c[0]);if(d<bd){bd=d;b=z}});if(b)togZ(b.id,true)}
function pip(la,ln,co){let r=false;for(let i=0,j=co.length-1;i<co.length;j=i++){const xi=co[i][1],yi=co[i][0],xj=co[j][1],yj=co[j][0];if(((yi>ln)!==(yj>ln))&&(la<(xj-xi)*(ln-yi)/(yj-yi)+xi))r=!r}return r}
function ctr(co){let x=0,y=0;co.forEach(c=>{x+=c[0];y+=c[1]});return[x/co.length,y/co.length]}

// ── Weather ──
async function ldWx(la,ln){try{const r=await fetch(`/api/weather?lat=${la}&lng=${ln}`);if(!r.ok)return;const d=await r.json();const w=WMO[d.weather_code]||WMO[0];const tmp=Math.round(d.temperature_2m);const i2=document.getElementById('wxI2');if(i2)i2.textContent=w[0];const t2=document.getElementById('wxT2');if(t2)t2.textContent=tmp+'°';const d2=document.getElementById('wxD2');if(d2)d2.textContent=w[1]}catch{};setTimeout(()=>ldWx(la,ln),600000)}

// ── Map ──
function initMap(){
  S.map=L.map('map',{
    center:[31.5,35],zoom:8,minZoom:7,maxZoom:15,
    doubleClickZoom:false,
    boxZoom:false
  });
  // Dark base (no labels) + labels overlay = city names visible
  S.dkT=L.layerGroup([
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19}),
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19,opacity:0.7})
  ]);
  S.ltT=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{attribution:'© OSM © CARTO',subdomains:'abcd',maxZoom:19});
  (document.body.getAttribute('data-theme')==='light'?S.ltT:S.dkT).addTo(S.map);
  S.cMG=L.layerGroup().addTo(S.map);

  // Zone polygons — invisible, for selection outline only (no tooltip)
  ZONES.forEach(z=>{
    const ll=z.coords.map(c=>[c[1],c[0]]);
    const p=L.polygon(ll,{
      color:'transparent',fillColor:'transparent',fillOpacity:0,weight:0,
      interactive:false
    }).addTo(S.map);
    S.zL[z.id]=p;
  });

  // City hover tooltip — follows mouse, finds nearest city
  S.mapTooltip=L.tooltip({permanent:false,direction:'top',className:'zone-tooltip',offset:[0,-10]});
  S.lastHoverCity='';
  S.map.on('mousemove',e=>{
    if(!S.cityIndex||!S.cityIndex.length)return;
    const lat=e.latlng.lat,lng=e.latlng.lng;
    let best=null,bd=Infinity;
    S.cityIndex.forEach(c=>{
      const d=(c.lat-lat)**2+(c.lng-lng)**2;
      if(d<bd){bd=d;best=c}
    });
    // Only show if close enough (roughly 15km at this zoom)
    if(best&&bd<0.02){
      if(S.lastHoverCity!==best.name){
        S.lastHoverCity=best.name;
        S.mapTooltip.setLatLng([best.lat,best.lng]).setContent(best.name).addTo(S.map);
      } else {
        S.mapTooltip.setLatLng(e.latlng);
      }
    }else{
      S.map.closeTooltip(S.mapTooltip);
      S.lastHoverCity='';
    }
  });
  S.map.on('mouseout',()=>{S.map.closeTooltip(S.mapTooltip);S.lastHoverCity=''});
}

// Build city spatial index — use geocoded cities + zone centroids for ungeocodied ones
function buildCityIndex(){
  S.cityIndex=[];
  const added=new Set();
  // 1. Add all geocoded cities (exact positions)
  S.dist.forEach(d=>{
    const nm=d.label_he||d.label;
    const geo=S.cGD[nm];
    if(geo&&!added.has(nm)){S.cityIndex.push({name:nm,lat:geo.lat,lng:geo.lng});added.add(nm)}
  });
  // 2. For zones without any geocoded cities, add zone centroid with zone name
  ZONES.forEach(z=>{
    if(!added.has(z.name)){
      const c=ctr(z.coords);
      S.cityIndex.push({name:z.name,lat:c[1],lng:c[0]});
    }
  });
}

// Progressively geocode cities in the background for better hover
async function bgGeocode(){
  const todo=S.dist.map(d=>d.label_he||d.label).filter(n=>!S.cGD[n]);
  for(let i=0;i<todo.length;i+=20){
    const batch=todo.slice(i,i+20);
    try{
      const r=await fetch('/api/geocode-batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cities:batch})});
      if(r.ok){const d=await r.json();Object.assign(S.cGD,d);buildCityIndex()}
    }catch{}
    await new Promise(r=>setTimeout(r,5000));// pause between batches
  }
}
function stZ(id){
  const l=S.zL[id];if(!l)return;
  const sel=S.selZ.has(id);
  if(sel)l.setStyle({color:'#333',fillColor:'transparent',fillOpacity:0,weight:1,dashArray:'4,6',opacity:.5});
  else l.setStyle({color:'transparent',fillColor:'transparent',fillOpacity:0,weight:0});
}

// ── Zones ──
function initZ(){
  const c=document.getElementById('zList');c.innerHTML='';
  // Selected zones first
  const sorted=[...ZONES].sort((a,b)=>{const sa=S.selZ.has(a.id)?0:1,sb=S.selZ.has(b.id)?0:1;return sa-sb});
  sorted.forEach(z=>{const d=document.createElement('div');d.className='zi';d.innerHTML=`<input type=checkbox id=z-${z.id}><label for=z-${z.id}>${z.name}</label><div class=zs id=zs-${z.id}></div>`;c.appendChild(d);d.querySelector('input').addEventListener('change',e=>{togZ(z.id,e.target.checked);initZ()})});
  document.getElementById('selAll').addEventListener('click',()=>{ZONES.forEach(z=>{S.selZ.add(z.id);const cb=document.getElementById(`z-${z.id}`);if(cb)cb.checked=true;stZ(z.id)});sv();setTint();updZoneBoard();initZ()});
  document.getElementById('clrAll').addEventListener('click',()=>{ZONES.forEach(z=>{S.selZ.delete(z.id);const cb=document.getElementById(`z-${z.id}`);if(cb)cb.checked=false;stZ(z.id)});sv();setTint();updZoneBoard();initZ()});
}
function togZ(id,f){const cb=document.getElementById(`z-${id}`);if(f!==undefined)f?S.selZ.add(id):S.selZ.delete(id);else S.selZ.has(id)?S.selZ.delete(id):S.selZ.add(id);if(cb)cb.checked=S.selZ.has(id);stZ(id);sv();setTint();updZoneBoard();updThreat()}
function sv(){localStorage.setItem('oz',JSON.stringify([...S.selZ]));localStorage.setItem('oc',JSON.stringify([...S.selC]))}
function ldSv(){try{JSON.parse(localStorage.getItem('oz'))?.forEach(id=>{S.selZ.add(id);const cb=document.getElementById(`z-${id}`);if(cb)cb.checked=true;stZ(id)})}catch{};try{const s=JSON.parse(localStorage.getItem('oc'));if(Array.isArray(s)){s.forEach(n=>S.selC.add(n));uCC()}}catch{}}

// ── Alert tint ──
function setTint(){
  if(S.testMode){document.body.setAttribute('data-alert',S.testMode);updFavicon();return}
  let w=null;S.selZ.forEach(id=>{const s=S.zaS[id];if(s==='danger')w='danger';else if(s==='warning'&&w!=='danger')w='warning';else if(s==='safe'&&!w)w='safe'});S.selC.forEach(n=>{const s=S.caS[n];if(s==='danger')w='danger';else if(s==='warning'&&w!=='danger')w='warning';else if(s==='safe'&&!w)w='safe'});document.body.setAttribute('data-alert',w||'none');
  updFavicon();
}

// ── Districts ──
async function ldDist(){try{const r=await fetch('/api/districts');const d=await r.json();S.dist=d;S.dba={};S.c2a={};S.c2m={};d.forEach(x=>{const a=x.areaid;if(!S.dba[a])S.dba[a]={name:x.areaname,cities:[]};S.dba[a].cities.push(x);const n=x.label_he||x.label;S.c2a[n]=a;S.c2m[n]=x.migun_time});rndC();rndWatchCities();if(S.selC.size>0)rstCL();buildCityIndex();setTimeout(bgGeocode,3000)}catch{document.getElementById('cList').innerHTML='<div class=mt>ERROR</div>'}}
function rndC(f=''){
  const c=document.getElementById('cList');c.innerHTML='';const ft=f.trim();

  // Show selected cities at top
  if(S.selC.size>0&&!ft){
    const h=document.createElement('div');h.className='cg';h.textContent='נבחרו';c.appendChild(h);
    [...S.selC].sort((a,b)=>a.localeCompare(b,'he')).forEach(nm=>{
      const ci=S.dist.find(d=>(d.label_he||d.label)===nm);
      const d=document.createElement('div');d.className='ci';
      d.innerHTML=`<input type=checkbox id=cs-${nm.replace(/\s/g,'_')} checked><label for=cs-${nm.replace(/\s/g,'_')}>${esc(nm)}</label>${ci?`<span class=mb>${ci.migun_time}s</span>`:''}`;
      c.appendChild(d);
      d.querySelector('input').addEventListener('change',()=>{S.selC.delete(nm);rmCL(nm);sv();uCC();setTint();rndC()});
    });
  }

  const aids=Object.keys(S.dba).sort((a,b)=>S.dba[a].name.localeCompare(S.dba[b].name,'he'));let n=0;
  aids.forEach(aid=>{const area=S.dba[aid];let cs=area.cities;
    if(ft)cs=cs.filter(x=>(x.label_he||x.label||'').includes(ft)||(x.areaname||'').includes(ft));
    if(!cs.length)return;
    const h=document.createElement('div');h.className='cg';h.textContent=area.name;c.appendChild(h);
    cs.sort((a,b)=>(a.label_he||a.label).localeCompare(b.label_he||b.label,'he'));
    cs.forEach(ci=>{const nm=ci.label_he||ci.label;
      const d=document.createElement('div');d.className='ci';
      d.innerHTML=`<input type=checkbox id=c-${ci.id} ${S.selC.has(nm)?'checked':''}><label for=c-${ci.id}>${esc(nm)}</label><span class=mb>${ci.migun_time}s</span>`;
      c.appendChild(d);
      d.querySelector('input').addEventListener('change',e=>{
        if(e.target.checked){S.selC.add(nm);addCL(nm)}else{S.selC.delete(nm);rmCL(nm)}
        sv();uCC();setTint();rndC(ft);
      });n++});
  });
  if(!n&&!S.selC.size)c.innerHTML='<div class=mt>NOT FOUND</div>';
  const inp=document.getElementById('cSrch');
  if(!inp._b){inp._b=true;let t;inp.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>rndC(inp.value),200)})}
  const btn=document.getElementById('clrC');
  if(!btn._b){btn._b=true;btn.addEventListener('click',()=>{for(const n of S.selC)rmCL(n);S.selC.clear();sv();uCC();rndC(inp.value);setTint()})}
  uCC();
}
function uCC(){const el=document.getElementById('cCnt');if(el)el.textContent=S.selC.size}

// ── City Layers ──
function isRealPoly(gj){
  if(!gj)return false;
  if(gj.type==='MultiPolygon')return true;// multi = always real
  if(gj.type!=='Polygon')return false;
  const ring=gj.coordinates[0];if(!ring)return false;
  // Bounding boxes have exactly 5 points forming a rectangle
  if(ring.length<=5)return false;
  return true;
}
async function addCL(nm){
  if(S.cL[nm])return;
  const g=await fGeo(nm);if(!g){S.cL[nm]=true;return}
  // Subtle outline for selected city — no fill, just dashed border
  let l;
  if(isRealPoly(g.geojson)){
    l=L.geoJSON(g.geojson,{style:()=>({color:'#444',fillColor:'transparent',fillOpacity:0,weight:1,dashArray:'3,5',opacity:.4}),interactive:true,bubblingMouseEvents:true});
    l.bindTooltip(nm,{permanent:false,direction:'center',className:'zone-tooltip',sticky:true});
  }else{
    l=L.circleMarker([g.lat,g.lng],{color:'#444',fillColor:'#444',fillOpacity:.08,weight:1,radius:6,opacity:.4,interactive:true,bubblingMouseEvents:true});
    l.bindTooltip(nm,{permanent:false,direction:'top',className:'zone-tooltip',offset:[0,-4]});
  }
  S.cL[nm]=l;
  S.cMG.addLayer(l);
}
function rmCL(nm){const l=S.cL[nm];if(l&&l!==true)S.cMG.removeLayer(l);delete S.cL[nm]}
function cSt(st){if(st==='danger')return{color:'#ff0040',fillColor:'#ff0040',fillOpacity:.35,weight:2.5,opacity:1,className:'city-poly-danger'};if(st==='warning')return{color:'#ffaa00',fillColor:'#ffaa00',fillOpacity:.28,weight:2.5,opacity:1,className:'city-poly-warning'};if(st==='safe')return{color:'#00ff41',fillColor:'#00ff41',fillOpacity:.08,weight:1,opacity:.6};return{color:'#333',fillColor:'#333',fillOpacity:.06,weight:1,opacity:.5}}
function uCS(){/* city layers are only shown via updAlertLayers */}
async function fGeo(nm){if(S.cGD[nm])return S.cGD[nm];try{const r=await fetch(`/api/geocode?city=${encodeURIComponent(nm)}`);if(!r.ok)return null;const d=await r.json();S.cGD[nm]=d;return d}catch{return null}}
async function rstCL(){const c=[...S.selC];try{const r=await fetch('/api/geocode-batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cities:c})});if(r.ok)Object.assign(S.cGD,await r.json())}catch{};for(const n of c)addCL(n)}

// ── SSE ──
function sse(){if(S.es)S.es.close();const es=new EventSource('/api/stream');S.es=es;es.onopen=()=>{S.rc=0;document.getElementById('dot').className='dot'};es.onmessage=ev=>{try{const m=JSON.parse(ev.data);if(m.type==='alerts')proc(m.data)}catch{}};es.onerror=()=>{document.getElementById('dot').className='dot err';es.close();S.rc++;setTimeout(sse,Math.min(1000*Math.pow(1.5,S.rc),10000))}}

// ── SHELTER OVERLAY ──
function showShelter(migunTime,zones){
  const ov=document.getElementById('shelterOv');
  document.getElementById('shelterZones').textContent=zones;
  ov.classList.add('active');
  S.shelterEnd=Date.now()+migunTime*1000;
  clearInterval(S.shelterTimer);
  S.shelterTimer=setInterval(()=>{
    const left=Math.max(0,Math.ceil((S.shelterEnd-Date.now())/1000));
    document.getElementById('shelterCount').textContent=left;
    if(left<=0){clearInterval(S.shelterTimer);setTimeout(dismissShelter,3000)}
  },100);
}
function dismissShelter(){document.getElementById('shelterOv').classList.remove('active');clearInterval(S.shelterTimer)}

// ── Alert city layers (auto-add/remove polygons for active alerts) ──
S.alertLayers={};// cityName -> L.layer (temporary, removed when alert clears)

async function updAlertLayers(al){
  const activeNames=new Set();
  al.forEach(a=>(a.data||[]).forEach(n=>activeNames.add(n)));

  // Remove layers for cities no longer in alerts
  for(const nm of Object.keys(S.alertLayers)){
    if(!activeNames.has(nm)){
      S.cMG.removeLayer(S.alertLayers[nm]);
      delete S.alertLayers[nm];
    }
  }

  // Add layers for new alert cities
  for(const nm of activeNames){
    if(S.alertLayers[nm]||S.cL[nm])continue;
    const g=await fGeo(nm);if(!g)continue;
    const st=S.caS[nm]||'danger';
    const s=cSt(st);
    let l;
    if(isRealPoly(g.geojson)){
      l=L.geoJSON(g.geojson,{style:()=>s,interactive:false});
    }else{
      l=L.circleMarker([g.lat,g.lng],{...s,radius:8,interactive:false});
    }
    S.alertLayers[nm]=l;
    S.cMG.addLayer(l);
  }

  // Update styles of existing alert layers
  for(const[nm,l]of Object.entries(S.alertLayers)){
    const s=cSt(S.caS[nm]||'danger');
    if(l.setStyle)l.setStyle(s);
    if(l.eachLayer)l.eachLayer(x=>x.setStyle(s));
  }
}

// ── Process Alerts ──
// Alert persistence buffer — keep alerts visible for at least 5 minutes
const ALERT_PERSIST_MS=300000;// 5 minutes
if(!S.alertBuffer)S.alertBuffer={};// {cityName: {cat, title, ts, expiry}}

function proc(al){
  if(!Array.isArray(al))al=[];
  const now=Date.now();

  // Add new alerts to buffer — danger always overrides warning
  al.forEach(a=>{
    const cat=parseInt(a.cat)||0;
    const st=cat===1?'danger':'warning';
    (a.data||[]).forEach(n=>{
      const existing=S.alertBuffer[n];
      // Only override if: new, or upgrading to danger, or refreshing same level
      if(!existing||st==='danger'||existing.st!=='danger'){
        S.alertBuffer[n]={cat,title:a.title||'',st,ts:now,expiry:now+ALERT_PERSIST_MS};
      }else{
        // Danger already in buffer — just extend expiry
        existing.expiry=now+ALERT_PERSIST_MS;
      }
    });
  });

  // Remove expired alerts from buffer
  Object.keys(S.alertBuffer).forEach(n=>{
    if(now>S.alertBuffer[n].expiry)delete S.alertBuffer[n];
  });

  // Build effective alert list from buffer (live + persisted)
  const effectiveAl=[];
  const grouped={};// group by title+cat
  Object.entries(S.alertBuffer).forEach(([n,b])=>{
    const key=b.cat+'_'+b.title;
    if(!grouped[key])grouped[key]={cat:b.cat,title:b.title,data:[],isLive:false};
    grouped[key].data.push(n);
    // Check if this alert is still in the live feed
    if(al.some(a=>(a.data||[]).includes(n)))grouped[key].isLive=true;
  });
  Object.values(grouped).forEach(g=>effectiveAl.push({cat:g.cat,title:g.title,data:g.data,isLive:g.isLive}));

  const j=JSON.stringify(al),isN=j!==S.pJ;S.pJ=j;S.al=al;
  const pZ={...S.zaS},pC={...S.caS};
  Object.keys(S.zaS).forEach(k=>S.zaS[k]=null);
  Object.keys(S.caS).forEach(k=>S.caS[k]=null);

  // Use buffer for statuses (not just live alerts)
  Object.entries(S.alertBuffer).forEach(([n,b])=>{
    if(!S.caS[n]||b.st==='danger')S.caS[n]=b.st;
    fndZ(n).forEach(z=>{if(b.st==='danger'||S.zaS[z.id]!=='danger')S.zaS[z.id]=b.st});
  });

  // Clear -> safe (only when buffer is empty for that zone)
  Object.keys(pZ).forEach(id=>{if(pZ[id]&&pZ[id]!=='safe'&&!S.zaS[id]){S.zaS[id]='safe';setTimeout(()=>{if(S.zaS[id]==='safe'){S.zaS[id]=null;stZ(id);setTint();updZoneBoard()}},30000)}});
  Object.keys(pC).forEach(n=>{if(pC[n]&&pC[n]!=='safe'&&!S.caS[n]){S.caS[n]='safe';setTimeout(()=>{if(S.caS[n]==='safe'){S.caS[n]=null;uCS();setTint()}},30000)}});

  ZONES.forEach(z=>{stZ(z.id);const d=document.getElementById(`zs-${z.id}`);if(d){const st=S.zaS[z.id];d.style.background=st==='danger'?'#ff0040':st==='warning'?'#ffaa00':st==='safe'?'#00ff41':''}});
  uCS();updAlertLayers(effectiveAl);if(S.histRaw.length||Object.keys(S.alertBuffer||{}).length)rndTimeline(S.histRaw);updOv();setTint();
  document.getElementById('upd').textContent=new Date().toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});

  // Alert badge — count from effective list (includes buffered)
  const cnt=effectiveAl.reduce((s,a)=>s+(a.data||[]).length,0);
  const ce=document.getElementById('alertBadge');ce.textContent=cnt;ce.setAttribute('data-n',cnt);

  // Stats tracking
  if(isN&&al.length>0){
    S.lastAlertTime=Date.now();
    const areas=al.flatMap(a=>a.data||[]);
    S.totalAlerts+=areas.length;
    S.todayAlerts+=areas.length;
    areas.forEach(a=>{S.hourAlerts.push(Date.now());const z=fndZ(a);z.forEach(zz=>{S.zoneHits[zz.name]=(S.zoneHits[zz.name]||0)+1})});
    // Trim hourAlerts to last 24h
    const cutoff=Date.now()-86400000;
    S.hourAlerts=S.hourAlerts.filter(t=>t>cutoff);
    updStats();updFreqBars();
    chkU(al);
    autoZoomAlerts();
  }
  updStats();
}

function fndZ(nm){if(!nm)return[];let m=ZONES.filter(z=>z.name===nm||nm.includes(z.name)||z.name.includes(nm));if(m.length)return m;const aid=S.c2a[nm];if(aid!==undefined){m=ZONES.filter(z=>z.areaIds.includes(aid));if(m.length)return m};for(const z of ZONES)for(const a of z.areaIds){const d=S.dba[a];if(d&&(d.name===nm||d.cities.find(c=>(c.label_he||c.label)===nm)))return[z]};return[]}

function chkU(al){
  let hit=false,minMigun=Infinity,hitZones=[];
  al.forEach(a=>(a.data||[]).forEach(n=>{
    if(S.selC.has(n)){hit=true;const m=S.c2m[n];if(m!==undefined&&m<minMigun)minMigun=m;hitZones.push(n)}
    fndZ(n).forEach(z=>{if(S.selZ.has(z.id)){hit=true;hitZones.push(n)}});
  }));
  if(hit){
    // Sound
    if(S.sound){try{const c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.setValueAtTime(880,c.currentTime);o.frequency.setValueAtTime(660,c.currentTime+.15);o.frequency.setValueAtTime(880,c.currentTime+.3);o.frequency.setValueAtTime(660,c.currentTime+.45);g.gain.setValueAtTime(.4,c.currentTime);g.gain.exponentialRampToValueAtTime(.01,c.currentTime+.6);o.start(c.currentTime);o.stop(c.currentTime+.6)}catch{}}
    // Notification
    if('Notification' in window&&Notification.permission==='granted')new Notification('🚨 התראה!',{body:hitZones.join(', '),tag:'oref'});
    // Full-screen shelter countdown
    if(minMigun<Infinity)showShelter(minMigun,hitZones.join(' · '));
  }
}

function updOv(){const o=document.getElementById('aov');let d=false,w=false;S.selZ.forEach(id=>{if(S.zaS[id]==='danger')d=true;if(S.zaS[id]==='warning')w=true});S.selC.forEach(n=>{if(S.caS[n]==='danger')d=true;if(S.caS[n]==='warning')w=true});o.className='aov'+(d?' ad':w?' aw':'')}

// ── Render ──
function rndAl(al){/* alerts now rendered in unified timeline */}

// ── History ──
async function ldHist(){
  try{
    const r=await fetch('/api/history');let d=await r.json();if(!Array.isArray(d))d=[];
    S.histRaw=d;
    if(d.length&&d[0].alertDate)S.lastAlertTime=new Date(d[0].alertDate).getTime();
    const today=new Date().toDateString();
    S.todayAlerts=d.filter(i=>{try{return new Date(i.alertDate||i.date).toDateString()===today}catch{return false}}).reduce((s,i)=>s+(Array.isArray(i.data)?i.data.length:1),0);
    updStats();
    rndTimeline(d);
  }catch{}
  setTimeout(ldHist,60000);
}

function rndTimeline(hist){
  const c=document.getElementById('timeline');if(!c)return;
  const now=Date.now();

  // Group history entries (within 2 min + same cat = same event)
  const groups=[];
  (hist||[]).forEach(i=>{
    const ts=new Date(i.alertDate||i.date||0).getTime();
    const cat=parseInt(i.category||i.cat)||0;
    const areas=Array.isArray(i.data)?i.data:[i.data].filter(Boolean);
    const title=i.title||'';
    let found=groups.find(g=>Math.abs(g.ts-ts)<120000&&g.cat===cat);
    if(found){areas.forEach(a=>{if(!found.areas.includes(a))found.areas.push(a)})}
    else groups.push({ts,cat,title,areas:[...areas],live:false});
  });

  // Inject live buffered alerts at the top
  const buffered={};
  Object.entries(S.alertBuffer||{}).forEach(([n,b])=>{
    const key=b.cat+'_'+b.title;
    if(!buffered[key])buffered[key]={ts:b.ts,cat:b.cat,title:b.title,areas:[],live:true};
    buffered[key].areas.push(n);
  });
  const liveGroups=Object.values(buffered).sort((a,b)=>b.ts-a.ts);

  // Remove duplicates: if a live group matches a history group (same time), skip history one
  const liveTs=new Set(liveGroups.map(g=>g.ts));
  const filteredHist=groups.filter(g=>!liveTs.has(g.ts));

  let all=[...liveGroups,...filteredHist];

  // Filter: when toggle is on, only show alerts matching my zones + watch zones + watch cities
  if(S.filterOn){
    const myZoneIds=new Set([...S.selZ,...S.watchZ]);
    all=all.filter(g=>{
      return g.areas.some(a=>{
        if(S.selC.has(a)||S.watchC.has(a))return true;
        const zones=fndZ(a);
        return zones.some(z=>myZoneIds.has(z.id));
      });
    });
  }

  if(!all.length){c.innerHTML=S.filterOn?'<div class=mt>אין התראות באזורים שנבחרו</div>':'<div class=mt>אין התראות ב-24 שעות אחרונות</div>';return}

  c.innerHTML='';
  all.forEach(g=>{
    const t=g.cat===1?'danger':g.cat===13?'safe':'warning';
    const el=document.createElement('div');el.className='hi-group'+(g.live?' hi-live':'');
    const MAX=5;
    const visible=g.areas.slice(0,MAX);
    const hidden=g.areas.slice(MAX);
    const visChips=visible.map(a=>`<span class="hi-chip">${esc(a)}</span>`).join('');
    const hidChips=hidden.map(a=>`<span class="hi-chip">${esc(a)}</span>`).join('');
    // Time display
    const time=fT(new Date(g.ts).toISOString());
    // "ago" badge for live/recent
    const ageMin=Math.round((now-g.ts)/60000);
    const agoBadge=g.live||ageMin<10?`<span class="hi-ago ${t}">לפני ${ageMin<1?'פחות מדקה':ageMin+' דקות'}</span>`:'';

    el.innerHTML=`<div class="hi-head"><span class="hi-type ${t}">${esc(g.title)}</span><span class="hi-time">${time}</span></div><div class="hi-areas">${visChips}</div>${hidden.length?`<div class="hi-more" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('show')">◂ עוד ${hidden.length} אזורים</div><div class="hi-hidden">${hidChips}</div>`:''}<div class="hi-foot">◂ ${g.areas.length} אזורים ${agoBadge}</div>`;
    c.appendChild(el);
  });
}
function fT(s){if(!s)return'';try{const d=new Date(s);if(isNaN(d))return s;const td=new Date();if(d.toDateString()===td.toDateString())return d.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'});return d.toLocaleDateString('he-IL',{day:'numeric',month:'short'})+' '+d.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'})}catch{return s}}

// ── News ──
async function ldNews(){
  const items=[];
  // Ynet RSS
  try{const r=await fetch('/api/news');const x=await r.text();const doc=new DOMParser().parseFromString(x,'text/xml');doc.querySelectorAll('item').forEach(i=>{
    const t=i.querySelector('title')?.textContent;
    const l=i.querySelector('link')?.textContent;
    const pd=i.querySelector('pubDate')?.textContent;
    let time='';
    if(pd){try{time=new Date(pd).toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'})}catch{}}
    if(t)items.push({title:t,time,link:l,src:'ynet'});
  })}catch{}
  // Mako liveblog
  try{const r=await fetch('/api/liveblog');const d=await r.json();
    if(d.chat)d.chat.forEach(m=>{if(m.text&&m.text.length>10)items.push({title:m.text,time:m.time||'',link:null,src:m.author||'mako'})});
    else if(d.headlines)d.headlines.forEach(t=>items.push({title:t,time:'',link:null,src:'mako'}));
  }catch{}
  rndNews(items);
  rndTicker(items);
  setTimeout(ldNews,120000);
}
function rndNews(items){
  const c=document.getElementById('newsRoll');if(!c)return;
  if(!items.length){c.innerHTML='<div class="mt">NO NEWS</div>';return}
  const all=[...items,...items];
  c.innerHTML=all.map(i=>{
    const title=i.link?`<a href="${eA(i.link)}" target="_blank" rel="noopener">${esc(i.title)}</a>`:esc(i.title);
    return`<div class="news-line"><div class="news-meta">${i.time?`<span class="news-time">${esc(i.time)}</span>`:''}${i.src?`<span class="news-src">${esc(i.src)}</span>`:''}</div><div class="news-title">${title}</div></div>`;
  }).join('');
  // Apply user's speed preference
  aTk();
}

function rndTicker(items){
  const tr=document.getElementById('tkTr');if(!tr)return;
  if(!items.length){tr.innerHTML='<span class="tk-i">NO NEWS</span>';return}
  const all=[...items,...items];
  tr.innerHTML=all.map((i,x)=>{
    const sep=x<all.length-1?'<span class="tk-sp"> ◆ </span>':'';
    const txt=i.link?`<a href="${eA(i.link)}" target="_blank" rel="noopener">${esc(i.title)}</a>`:esc(i.title);
    return`<span class="tk-i">${txt}</span>${sep}`;
  }).join('');
  aTk();
}

function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function eA(s){return(s||'').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
if('Notification' in window&&Notification.permission==='default')setTimeout(()=>Notification.requestPermission(),3000);
if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});

// ══ RESIZABLE GRID — drag handles between columns ══
function initResize(){
  const grid=document.querySelector('.grid');if(!grid)return;
  const w=()=>window.innerWidth;
  const saved=JSON.parse(localStorage.getItem('grid-cols2')||'null');
  let colR=saved||Math.round(w()*0.28);
  applyGrid();

  const handle=document.createElement('div');
  handle.className='grid-handle grid-handle-col';
  document.body.appendChild(handle);
  posHandle();
  window.addEventListener('resize',()=>{posHandle();applyGrid()});

  let startX,startVal;
  handle.addEventListener('mousedown',e=>{
    e.preventDefault();startX=e.clientX;startVal=colR;
    const move=ev=>{colR=Math.max(200,Math.min(w()*0.5,startVal-(ev.clientX-startX)));applyGrid();posHandle()};
    const up=()=>{document.removeEventListener('mousemove',move);document.removeEventListener('mouseup',up);localStorage.setItem('grid-cols2',colR)};
    document.addEventListener('mousemove',move);document.addEventListener('mouseup',up);
  });

  function applyGrid(){
    const colM=w()-colR-4;
    grid.style.setProperty('--col-m',Math.max(300,colM)+'px');
    grid.style.setProperty('--col-r',colR+'px');
    // Invalidate map
    if(S.map)setTimeout(()=>S.map.invalidateSize(),100);
  }

  function posHandle(){
    handle.style.left=(w()-colR-5)+'px';
  }
}
setTimeout(initResize,500);

// ══ DYNAMIC FAVICON — red during alert ══
function updFavicon(){
  const fav=document.getElementById('favicon');if(!fav)return;
  const alert=document.body.getAttribute('data-alert');
  if(alert==='danger'){
    fav.href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23ff0040'/><text x='50' y='58' text-anchor='middle' font-size='36' font-weight='bold' fill='white'>!</text></svg>";
    // Flash title
    document.title=document.title.startsWith('🔴')?'OREF MONITOR':'🔴 אזעקה!';
  }else if(alert==='warning'){
    fav.href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23ffaa00'/><text x='50' y='58' text-anchor='middle' font-size='36' font-weight='bold' fill='black'>!</text></svg>";
    document.title='⚠️ התראה — OREF MONITOR';
  }else{
    fav.href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>";
    document.title='OREF MONITOR';
  }
}
// Flash title during alerts
setInterval(()=>{if(document.body.getAttribute('data-alert')==='danger')document.title=document.title.startsWith('🔴')?'OREF MONITOR':'🔴 אזעקה!'},1000);

/* sleep mode removed */
