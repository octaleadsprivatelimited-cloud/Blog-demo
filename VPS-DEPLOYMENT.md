# VPS Deployment Guide - Production Ready

This guide provides step-by-step instructions for deploying the blog website on Hostinger VPS.

## Prerequisites

- Hostinger VPS with Ubuntu 20.04+ (or similar)
- SSH access to your VPS
- Domain name (optional, can use IP address)
- Basic Linux command knowledge

## Step 1: Initial Server Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js (v18 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v18.x.x
npm --version
```

### 1.3 Install MySQL

```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

### 1.4 Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Install PM2 Globally

```bash
sudo npm install -g pm2
```

## Step 2: Database Setup

### 2.1 Create Database and User

```bash
sudo mysql -u root -p
```

In MySQL prompt:

```sql
CREATE DATABASE health_cooking_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'your_strong_password_here';
GRANT ALL PRIVILEGES ON health_cooking_blog.* TO 'bloguser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2.2 Import Database Schema

```bash
cd /var/www
# After uploading project files
mysql -u bloguser -p health_cooking_blog < backend/database/schema.sql
```

## Step 3: Upload Project Files

### 3.1 Create Directory Structure

```bash
sudo mkdir -p /var/www/blog-website
sudo chown -R $USER:$USER /var/www/blog-website
```

### 3.2 Upload Files

Upload your project files to `/var/www/blog-website` using:
- **SCP**: `scp -r . user@your-vps-ip:/var/www/blog-website`
- **SFTP**: Use FileZilla or similar
- **Git**: `git clone <your-repo> /var/www/blog-website`

## Step 4: Backend Configuration

### 4.1 Install Backend Dependencies

```bash
cd /var/www/blog-website/backend
npm install --production
```

### 4.2 Create Backend .env File

```bash
nano .env
```

Add the following (replace with your values):

```env
PORT=8000
NODE_ENV=production
DB_HOST=localhost
DB_USER=bloguser
DB_PASSWORD=your_strong_password_here
DB_NAME=health_cooking_blog
JWT_SECRET=your_very_long_random_secret_key_here

# For CORS (your domain or IP)
FRONTEND_URL=https://yourdomain.com
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4.3 Create Uploads Directory

```bash
mkdir -p uploads/blogs
chmod 755 uploads/blogs
```

### 4.4 Test Backend

```bash
npm start
# Should see: "🚀 Server running on port 8000"
# Press Ctrl+C after verifying
```

## Step 5: Start Backend with PM2

### 5.1 Start PM2 Process

```bash
cd /var/www/blog-website/backend
pm2 start index.js --name blog-backend
pm2 save
pm2 startup
# Follow the instructions shown to enable PM2 on boot
```

### 5.2 Verify PM2 Status

```bash
pm2 list
pm2 logs blog-backend
```

## Step 6: Frontend Configuration

### 6.1 Install Frontend Dependencies

```bash
cd /var/www/blog-website/frontend
npm install
```

### 6.2 Create Frontend .env File

```bash
nano .env
```

Add:

```env
# For production, use your domain or VPS IP
VITE_API_URL=https://yourdomain.com/api
# OR if using IP:
# VITE_API_URL=http://YOUR_VPS_IP/api
```

### 6.3 Build Frontend

```bash
npm run build
```

This creates a `dist` folder with production files.

### 6.4 Copy Build to Nginx Directory

```bash
sudo cp -r dist/* /var/www/html/
# OR use a separate directory:
sudo mkdir -p /var/www/blog-frontend
sudo cp -r dist/* /var/www/blog-frontend/
```

## Step 7: Configure Nginx

### 7.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/blog-website
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # OR use your VPS IP: server_name YOUR_VPS_IP;

    # Frontend (React build)
    root /var/www/html;
    index index.html;

    # Serve frontend files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to Node.js backend (port 8000)
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeouts for large file uploads
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # Serve uploaded images
    location /uploads {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Cache images
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Increase body size for file uploads
    client_max_body_size 10M;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;
}
```

### 7.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/blog-website /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default if not needed
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 8: SSL/HTTPS Setup (Recommended)

### 8.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 8.2 Get SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically update your Nginx configuration and set up auto-renewal.

### 8.3 Update Frontend .env for HTTPS

After SSL setup, update frontend:

```bash
cd /var/www/blog-website/frontend
nano .env
```

Change to:

```env
VITE_API_URL=https://yourdomain.com/api
```

Rebuild:

```bash
npm run build
sudo cp -r dist/* /var/www/html/
```

## Step 9: Firewall Configuration

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

## Step 10: Verify Deployment

1. **Test Frontend**: Visit `http://yourdomain.com` or `http://YOUR_VPS_IP`
2. **Test API**: Visit `http://yourdomain.com/api/health` - should return JSON
3. **Test Admin**: Login at `/admin/login`
4. **Test Image Upload**: Create a blog post with an image - verify compression

## Maintenance Commands

### View Logs

```bash
# Backend logs (PM2)
pm2 logs blog-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### PM2 Commands

```bash
pm2 list                  # View all processes
pm2 restart blog-backend  # Restart backend
pm2 stop blog-backend     # Stop backend
pm2 delete blog-backend   # Remove process
pm2 monit                 # Monitor resources
```

### Update Application

```bash
cd /var/www/blog-website

# Pull latest code (if using Git)
git pull origin main

# Update backend
cd backend
npm install --production
pm2 restart blog-backend

# Update frontend
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

### Database Backup

```bash
mysqldump -u bloguser -p health_cooking_blog > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database

```bash
mysql -u bloguser -p health_cooking_blog < backup_20231201_120000.sql
```

## Troubleshooting

### Backend Not Starting

```bash
# Check PM2 logs
pm2 logs blog-backend --lines 50

# Check if port 8000 is in use
sudo netstat -tulpn | grep 8000

# Verify .env file exists and has correct values
cat /var/www/blog-website/backend/.env
```

### 502 Bad Gateway

- Verify backend is running: `pm2 list`
- Check backend logs: `pm2 logs blog-backend`
- Verify Nginx proxy configuration
- Check if backend is listening on 0.0.0.0:8000

### Images Not Loading

- Verify uploads directory permissions: `chmod 755 uploads/blogs`
- Check Nginx configuration for `/uploads` location
- Verify image URLs in database

### Database Connection Errors

```bash
# Test MySQL connection
mysql -u bloguser -p health_cooking_blog

# Check MySQL service
sudo systemctl status mysql

# Verify .env database credentials
cat /var/www/blog-website/backend/.env | grep DB_
```

### CORS Errors

- Verify `FRONTEND_URL` in backend `.env` matches your domain
- Check browser console for specific CORS error
- Verify Nginx is properly proxying `/api` requests

## Security Checklist

- [ ] Changed default admin password
- [ ] Strong JWT_SECRET (64+ characters)
- [ ] Strong MySQL password
- [ ] SSL/HTTPS enabled
- [ ] Firewall configured (UFW)
- [ ] Regular backups scheduled
- [ ] PM2 auto-start configured
- [ ] Nginx security headers enabled
- [ ] `.env` files not in version control
- [ ] Database user has limited privileges

## Performance Optimization

### Enable MySQL Query Cache

Edit `/etc/mysql/mysql.conf.d/mysqld.cnf`:

```ini
query_cache_type = 1
query_cache_size = 64M
```

Restart MySQL: `sudo systemctl restart mysql`

### PM2 Cluster Mode (High Traffic)

```bash
pm2 delete blog-backend
pm2 start index.js -i max --name blog-backend
pm2 save
```

### Nginx Caching (Optional)

Add to Nginx config:

```nginx
# Cache static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

**Your application is now production-ready and deployed on Hostinger VPS!**

For support, check logs using the commands above or refer to the main README.md file.

