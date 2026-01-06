# Production Deployment Checklist

Use this checklist to ensure your VPS deployment is complete and secure.

## Pre-Deployment

- [ ] All code committed to version control
- [ ] `.env` files added to `.gitignore`
- [ ] Tested locally with production-like settings
- [ ] Database schema reviewed and tested

## Server Setup

- [ ] Node.js v18+ installed
- [ ] MySQL installed and secured
- [ ] Nginx installed
- [ ] PM2 installed globally
- [ ] Firewall configured (UFW)

## Backend Configuration

- [ ] Backend files uploaded to `/var/www/blog-website/backend`
- [ ] `backend/.env` file created with production values:
  - [ ] `PORT=8000`
  - [ ] `NODE_ENV=production`
  - [ ] `DB_HOST=localhost`
  - [ ] `DB_USER` set to dedicated MySQL user
  - [ ] `DB_PASSWORD` is strong and unique
  - [ ] `DB_NAME` matches database name
  - [ ] `JWT_SECRET` is 64+ character random string
  - [ ] `FRONTEND_URL` set to your domain/IP
- [ ] Backend dependencies installed: `npm install --production`
- [ ] `uploads/blogs` directory created with correct permissions
- [ ] Backend tested: `npm start` works
- [ ] PM2 process started: `pm2 start index.js --name blog-backend`
- [ ] PM2 auto-start configured: `pm2 startup` and `pm2 save`

## Database

- [ ] MySQL database created: `health_cooking_blog`
- [ ] MySQL user created with appropriate privileges
- [ ] Database schema imported: `schema.sql` executed
- [ ] Default admin password changed
- [ ] Database backup script created

## Frontend Configuration

- [ ] Frontend files uploaded to `/var/www/blog-website/frontend`
- [ ] `frontend/.env` file created:
  - [ ] `VITE_API_URL` set to production API URL
- [ ] Frontend dependencies installed: `npm install`
- [ ] Frontend built: `npm run build` successful
- [ ] Build files copied to `/var/www/html` (or Nginx document root)

## Nginx Configuration

- [ ] Nginx config file created: `/etc/nginx/sites-available/blog-website`
- [ ] Server name configured (domain or IP)
- [ ] Frontend root directory set correctly
- [ ] `/api` location proxies to `http://localhost:8000`
- [ ] `/uploads` location proxies to backend
- [ ] Client max body size set to 10M or higher
- [ ] Security headers configured
- [ ] Gzip compression enabled
- [ ] Site enabled: symlink created in `sites-enabled`
- [ ] Nginx config tested: `nginx -t` passes
- [ ] Nginx reloaded: `systemctl reload nginx`

## SSL/HTTPS (Recommended)

- [ ] Certbot installed
- [ ] SSL certificate obtained for domain
- [ ] Nginx automatically updated with SSL config
- [ ] Frontend `.env` updated to use `https://`
- [ ] Frontend rebuilt and redeployed

## Security

- [ ] Default admin password changed in database
- [ ] Strong JWT_SECRET generated and set
- [ ] MySQL root password secured
- [ ] Database user has limited privileges (only to app database)
- [ ] Firewall rules configured:
  - [ ] Port 22 (SSH) allowed
  - [ ] Port 80 (HTTP) allowed
  - [ ] Port 443 (HTTPS) allowed
  - [ ] All other ports blocked
- [ ] `.env` files not accessible via web
- [ ] File uploads directory has correct permissions (755)
- [ ] Nginx security headers enabled

## Testing

- [ ] Frontend loads at domain/IP
- [ ] API health check works: `/api/health`
- [ ] Admin login works
- [ ] Blog list displays correctly
- [ ] Blog details page works
- [ ] Category pages work
- [ ] Image upload works (blog creation)
- [ ] Image compression works (verify file size < 1MB)
- [ ] Images display correctly
- [ ] CORS works from frontend domain
- [ ] All API endpoints functional

## Monitoring & Maintenance

- [ ] PM2 logs accessible: `pm2 logs blog-backend`
- [ ] Nginx logs accessible: `/var/log/nginx/`
- [ ] Database backup script created
- [ ] Backup schedule configured (cron job recommended)
- [ ] Monitoring setup (optional: PM2 monitoring, log rotation)

## Performance

- [ ] PM2 cluster mode considered (if high traffic expected)
- [ ] MySQL query cache enabled (optional)
- [ ] Nginx caching configured (optional)
- [ ] Image optimization verified

## Documentation

- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Backup/restore procedures documented
- [ ] Troubleshooting guide available

---

## Quick Commands Reference

```bash
# Backend
pm2 restart blog-backend
pm2 logs blog-backend
pm2 list

# Frontend
cd /var/www/blog-website/frontend && npm run build && sudo cp -r dist/* /var/www/html/

# Nginx
sudo nginx -t
sudo systemctl reload nginx
sudo tail -f /var/log/nginx/error.log

# Database
mysqldump -u bloguser -p health_cooking_blog > backup.sql
mysql -u bloguser -p health_cooking_blog < backup.sql

# System
sudo systemctl status mysql
sudo systemctl status nginx
```

---

**Once all items are checked, your deployment is complete!**

