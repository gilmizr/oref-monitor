module.exports = {
  apps: [{
    name: 'oref-monitor',
    script: 'server.js',
    cwd: '/Users/gilmizrahi/oref-alerts',
    watch: false,
    autorestart: true,
    max_restarts: 50,
    restart_delay: 2000,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};
