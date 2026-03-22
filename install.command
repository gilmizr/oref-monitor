#!/bin/bash
# ═══════════════════════════════════════════
# OREF Monitor — התקנה אוטומטית
# לחיצה כפולה על קובץ זה מתקינה ומפעילה הכל
# ═══════════════════════════════════════════

clear
echo "🛡️  OREF MONITOR — מתקין..."
echo ""

# Check Node.js
if ! command -v node &>/dev/null; then
  echo "❌ Node.js לא מותקן."
  echo "   מוריד ומתקין..."
  if command -v brew &>/dev/null; then
    brew install node
  else
    echo "   הורד מ: https://nodejs.org/"
    echo "   לחץ Enter אחרי ההתקנה..."
    read
  fi
fi

echo "✓ Node.js $(node -v)"

# Clone or update
DIR="$HOME/oref-monitor"
if [ -d "$DIR" ]; then
  echo "✓ תיקייה קיימת — מעדכן..."
  cd "$DIR"
  git pull 2>/dev/null || true
else
  echo "→ מוריד מ-GitHub..."
  git clone https://github.com/gilmizr/oref-monitor.git "$DIR"
  cd "$DIR"
fi

# Install dependencies
echo "→ מתקין תלויות..."
npm install --silent

# Start server
echo "→ מפעיל שרת..."

# Kill existing on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Try pm2 first, fallback to direct node
if command -v pm2 &>/dev/null; then
  pm2 delete oref-monitor 2>/dev/null
  pm2 start ecosystem.config.js
  pm2 save 2>/dev/null
  echo "✓ שרת רץ עם pm2 (נשאר פעיל ברקע)"
else
  echo "→ pm2 לא מותקן — מריץ ישירות..."
  node server.js &
  echo "✓ שרת רץ (ייסגר כשהטרמינל ייסגר)"
fi

echo ""
echo "═══════════════════════════════════════════"
echo "  🛡️  OREF MONITOR פועל!"
echo "  פתח: http://localhost:3000"
echo "═══════════════════════════════════════════"
echo ""

# Open in browser
sleep 2
open http://localhost:3000

echo "לחץ Enter לסגירה (השרת ימשיך לרוץ ברקע)"
read
