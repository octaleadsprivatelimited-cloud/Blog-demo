#!/bin/bash
# Deployment script for Hostinger VPS
# Run this script on your local machine to prepare deployment files

echo "🚀 Health & Cooking Blog - Deployment Script"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Building frontend...${NC}"
cd frontend
npm run build
cd ..

echo -e "${YELLOW}Step 2: Creating deployment package...${NC}"
# Create a deployment directory
mkdir -p deploy
cp -r backend deploy/
cp -r frontend/dist deploy/frontend-dist
cp README.md deploy/
cp QUICKSTART.md deploy/

# Remove node_modules from backend (will install on server)
rm -rf deploy/backend/node_modules

echo -e "${GREEN}✅ Deployment package created in 'deploy' directory${NC}"
echo ""
echo "Next steps:"
echo "1. Upload the 'deploy' folder to your VPS:"
echo "   scp -r deploy/* root@72.61.249.52:/var/www/health-cooking-blog/"
echo ""
echo "2. SSH into your VPS:"
echo "   ssh root@72.61.249.52"
echo ""
echo "3. Run the server setup script on the VPS"

