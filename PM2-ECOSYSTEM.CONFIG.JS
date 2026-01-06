/**
 * PM2 Ecosystem Configuration File
 * 
 * Usage: pm2 start ecosystem.config.js
 * 
 * This file provides a production-ready PM2 configuration
 * for running the backend on Hostinger VPS
 */

export default {
  apps: [
    {
      name: 'blog-backend',
      script: './server.js',
      cwd: '/var/www/blog-website/backend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      },
      // Logging
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto-restart configuration
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      shutdown_with_message: true,
      
      // Advanced options
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
};

/**
 * To use this file:
 * 
 * 1. Copy it to: /var/www/blog-website/backend/ecosystem.config.js
 * 
 * 2. Create logs directory:
 *    mkdir -p /var/www/blog-website/backend/logs
 * 
 * 3. Start with PM2:
 *    pm2 start ecosystem.config.js
 * 
 * 4. Save PM2 process list:
 *    pm2 save
 * 
 * 5. Setup PM2 startup:
 *    pm2 startup
 *    (follow the instructions shown)
 */

