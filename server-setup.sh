#!/bin/bash
# Server setup script - Run this ON THE VPS after uploading files
# SSH into your VPS first: ssh root@72.61.249.52

set -e

echo "🚀 Setting up Health & Cooking Blog on Hostinger VPS"
echo "====================================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Update system
echo -e "${YELLOW}Updating system packages...${NC}"
apt update && apt upgrade -y

# Install Node.js 18.x
echo -e "${YELLOW}Installing Node.js...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi
echo -e "${GREEN}Node.js version: $(node --version)${NC}"

# Install MySQL if not installed
echo -e "${YELLOW}Checking MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    apt install -y mysql-server
    systemctl start mysql
    systemctl enable mysql
fi

# Install PM2 globally
echo -e "${YELLOW}Installing PM2...${NC}"
npm install -g pm2

# Install Nginx if not installed
echo -e "${YELLOW}Checking Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
fi

# Create application directory
echo -e "${YELLOW}Creating application directory...${NC}"
mkdir -p /var/www/health-cooking-blog
cd /var/www/health-cooking-blog

# Install backend dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install --production
cd ..

# Create uploads directory
echo -e "${YELLOW}Creating uploads directory...${NC}"
mkdir -p backend/uploads/blogs
chmod -R 755 backend/uploads

# Setup frontend (if dist folder exists)
if [ -d "frontend-dist" ]; then
    echo -e "${YELLOW}Setting up frontend...${NC}"
    mkdir -p frontend/dist
    cp -r frontend-dist/* frontend/dist/
fi

echo ""
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure database:"
echo "   mysql -u root -p"
echo "   (Then run: CREATE DATABASE health_cooking_blog;)"
echo "   (Import schema: source /var/www/health-cooking-blog/backend/database/schema.sql)"
echo ""
echo "2. Create backend/.env file with your database credentials"
echo ""
echo "3. Start the backend with PM2:"
echo "   cd /var/www/health-cooking-blog/backend"
echo "   pm2 start index.js --name blog-api"
echo "   pm2 save"
echo ""
echo "4. Configure Nginx (see README.md for nginx config)"
echo ""
echo "5. Setup SSL with Let's Encrypt (optional but recommended)"

