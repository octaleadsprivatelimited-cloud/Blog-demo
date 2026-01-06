# Production Deployment Guide - Hostinger VPS

This guide will help you deploy the blog website to a Hostinger VPS running Ubuntu with MySQL, Nginx, and PM2.

## Prerequisites

- Hostinger VPS with Ubuntu (20.04 or later)
- SSH access to your VPS
- Domain name pointed to your VPS IP
- Basic knowledge of Linux commands

## Step 1: Server Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js (v18 or later)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify installation
npm --version
```

### 1.3 Install MySQL

```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

Create database and user:

```bash
sudo mysql -u root -p
```

In MySQL prompt:

```sql
CREATE DATABASE health_cooking_blog;
CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'your_strong_password_here';
GRANT ALL PRIVILEGES ON health_cooking_blog.* TO 'bloguser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 1.4 Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Install PM2

```bash
sudo npm install -g pm2
```

## Step 2: Upload Project Files

### 2.1 Clone or Upload Project

```bash
cd /var/www
sudo git clone <your-repo-url> blog-website
# OR upload files via SFTP/SCP to /var/www/blog-website
```

### 2.2 Set Permissions

```bash
sudo chown -R $USER:$USER /var/www/blog-website
cd /var/www/blog-website
```

## Step 3: Database Setup

### 3.1 Run Database Schema

```bash
cd backend
mysql -u bloguser -p health_cooking_blog < database/schema.sql
```

### 3.2 Create Admin User (Optional - if not in schema)

```bash
mysql -u bloguser -p health_cooking_blog
```

```sql
-- Generate password hash first (run in Node.js):
-- node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your_password', 10).then(hash => console.log(hash));"

INSERT INTO admins (name, email, password) VALUES 
('Admin', 'admin@yourdomain.com', '$2b$10$YOUR_HASH_HERE');
```

## Step 4: Configure Backend

### 4.1 Install Dependencies

```bash
cd /var/www/blog-website/backend
npm install --production
```

### 4.2 Create Backend .env

```bash
nano .env
```

Add:

```env
PORT=5000
DB_HOST=localhost
DB_USER=bloguser
DB_PASSWORD=your_strong_password_here
DB_NAME=health_cooking_blog
JWT_SECRET=your_very_long_random_secret_key_here_change_this_in_production
NODE_ENV=production
```

**IMPORTANT**: Generate a strong JWT_SECRET:
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
# Should see: "🚀 Server running on port 5000"
# Press Ctrl+C to stop
```

## Step 5: Configure Frontend

### 5.1 Install Dependencies

```bash
cd /var/www/blog-website/frontend
npm install
```

### 5.2 Create Frontend .env

```bash
nano .env
```

Add:

```env
VITE_API_URL=http://your-domain.com/api
# OR if using IP:
# VITE_API_URL=http://YOUR_IP:5000/api
```

### 5.3 Build Frontend

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

### 5.4 Copy Build to Nginx Directory

```bash
sudo cp -r dist/* /var/www/html/
# OR create a separate directory:
sudo mkdir -p /var/www/blog-frontend
sudo cp -r dist/* /var/www/blog-frontend/
```

## Step 6: Configure Nginx

### 6.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/blog-website
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend (React build)
    root /var/www/html;
    index index.html;

    # Serve frontend files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to Node.js backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploaded images
    location /uploads {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

### 6.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/blog-website /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 7: Configure PM2

### 7.1 Start Backend with PM2

```bash
cd /var/www/blog-website/backend
pm2 start index.js --name blog-backend
pm2 save
pm2 startup  # Follow instructions to enable PM2 on boot
```

### 7.2 PM2 Commands

```bash
pm2 list              # View running processes
pm2 logs blog-backend # View logs
pm2 restart blog-backend  # Restart
pm2 stop blog-backend     # Stop
pm2 delete blog-backend   # Remove
```

## Step 8: SSL/HTTPS Setup (Let's Encrypt)

### 8.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 8.2 Get SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow prompts. Certbot will automatically update Nginx config.

### 8.3 Auto-renewal (already enabled by default)

```bash
sudo certbot renew --dry-run  # Test renewal
```

## Step 9: Firewall Configuration

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

## Step 10: Update Frontend .env for HTTPS

After SSL setup, update frontend:

```bash
cd /var/www/blog-website/frontend
nano .env
```

Change to:

```env
VITE_API_URL=https://your-domain.com/api
```

Rebuild:

```bash
npm run build
sudo cp -r dist/* /var/www/html/
```

## Step 11: Verify Deployment

1. Visit `https://your-domain.com` - Frontend should load
2. Visit `https://your-domain.com/api/categories` - Should return JSON
3. Test admin login at `/admin/login`
4. Upload a blog post with an image - Verify compression works

## Maintenance

### View Logs

```bash
# Backend logs
pm2 logs blog-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Update Application

```bash
cd /var/www/blog-website
git pull origin main  # If using git

# Backend
cd backend
npm install --production
pm2 restart blog-backend

# Frontend
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

### Database Backup

```bash
mysqldump -u bloguser -p health_cooking_blog > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
mysql -u bloguser -p health_cooking_blog < backup_20231201.sql
```

## Troubleshooting

### Backend not starting
- Check `.env` file configuration
- Verify MySQL is running: `sudo systemctl status mysql`
- Check PM2 logs: `pm2 logs blog-backend`

### 502 Bad Gateway
- Verify backend is running: `pm2 list`
- Check backend port (5000) is not blocked
- Review Nginx error log: `sudo tail -f /var/log/nginx/error.log`

### Images not loading
- Check uploads directory permissions: `chmod 755 uploads/blogs`
- Verify Nginx proxy configuration for `/uploads`

### Database connection errors
- Verify MySQL user and password in `.env`
- Test connection: `mysql -u bloguser -p health_cooking_blog`

## Performance Optimization

### Enable MySQL Query Cache

Edit `/etc/mysql/mysql.conf.d/mysqld.cnf`:

```ini
query_cache_type = 1
query_cache_size = 64M
```

### Optimize Nginx

Add to Nginx config:

```nginx
# Increase buffer sizes
client_max_body_size 10M;
client_body_buffer_size 128k;

# Caching
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### PM2 Cluster Mode (for high traffic)

```bash
pm2 delete blog-backend
pm2 start index.js -i max --name blog-backend
pm2 save
```

## Security Checklist

- [ ] Changed default admin password
- [ ] Strong JWT_SECRET in `.env`
- [ ] Strong MySQL password
- [ ] SSL/HTTPS enabled
- [ ] Firewall configured
- [ ] Regular backups scheduled
- [ ] PM2 process monitoring enabled
- [ ] Updated system packages

## Support

For issues, check:
- PM2 logs: `pm2 logs blog-backend`
- Nginx logs: `/var/log/nginx/error.log`
- MySQL logs: `/var/log/mysql/error.log`

---

**Note**: Replace all placeholder values (passwords, domains, etc.) with your actual values in production.
