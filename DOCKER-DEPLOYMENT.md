# Docker Deployment Guide

This guide explains how to deploy the blog website using Docker Compose on Hostinger VPS.

## Prerequisites

- Docker installed on your VPS
- Docker Compose installed
- Git access to the repository

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/octaleadsprivatelimited-cloud/Blog-demo.git
cd Blog-demo
```

### 2. Create Environment File

Create `.env` file in the root directory:

```env
# Database
MYSQL_ROOT_PASSWORD=your_root_password
DB_USER=bloguser
DB_PASSWORD=your_strong_password
DB_NAME=health_cooking_blog

# Backend
JWT_SECRET=your_very_long_random_secret_key_here
FRONTEND_URL=https://yourdomain.com

# Frontend
VITE_API_URL=https://yourdomain.com/api
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Build and Start Containers

```bash
docker-compose up -d --build
```

### 4. Verify Deployment

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Check backend health
curl http://localhost:8000/api/health
```

## Container Management

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Restart Services
```bash
docker-compose restart
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

## Database Management

### Access MySQL Container
```bash
docker-compose exec mysql mysql -u bloguser -p health_cooking_blog
```

### Backup Database
```bash
docker-compose exec mysql mysqldump -u bloguser -p health_cooking_blog > backup.sql
```

### Restore Database
```bash
docker-compose exec -T mysql mysql -u bloguser -p health_cooking_blog < backup.sql
```

## File Uploads

Uploaded images are stored in `backend/uploads/blogs/` directory. This directory is mounted as a volume, so files persist even if containers are recreated.

## Environment Variables

### Backend Environment Variables
- `NODE_ENV`: production
- `PORT`: 8000
- `DB_HOST`: mysql (Docker service name)
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: JWT secret key
- `FRONTEND_URL`: Frontend domain for CORS

### Frontend Build Arguments
- `VITE_API_URL`: API URL for frontend

## Ports

- **Frontend**: Port 80 (HTTP)
- **Backend API**: Port 8000
- **MySQL**: Port 3306 (internal only)

## SSL/HTTPS Setup

For HTTPS, you'll need to:
1. Use a reverse proxy (like Traefik or Nginx) in front of the Docker containers
2. Or modify the frontend Dockerfile to include SSL certificates

## Troubleshooting

### Containers Not Starting
```bash
# Check logs
docker-compose logs

# Check container status
docker-compose ps
```

### Database Connection Issues
```bash
# Verify MySQL is healthy
docker-compose exec mysql mysqladmin ping -h localhost

# Check backend logs
docker-compose logs backend
```

### Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Verify build
docker-compose exec frontend ls -la /usr/share/nginx/html
```

### Permission Issues
```bash
# Fix uploads directory permissions
docker-compose exec backend chmod -R 755 uploads
```

## Production Considerations

1. **Change Default Passwords**: Update all default passwords in `.env`
2. **Use Strong JWT_SECRET**: Generate a secure random string
3. **Enable SSL**: Set up HTTPS with reverse proxy
4. **Regular Backups**: Schedule database backups
5. **Monitor Logs**: Set up log monitoring
6. **Resource Limits**: Add resource limits in docker-compose.yml if needed

## Scaling

To scale the backend service:

```bash
docker-compose up -d --scale backend=3
```

Note: You'll need a load balancer in front for this to work properly.

---

**For direct Node.js deployment (PM2 + Nginx), see `VPS-DEPLOYMENT.md`**

