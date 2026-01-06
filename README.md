# Health & Cooking Blog Website

A production-ready full-stack blog website for publishing health articles, cooking recipes, nutrition tips, and diet & lifestyle content. Built with React, Node.js, Express, and MySQL.

## 🚀 Features

### Public Website
- **Home Page**: Featured blogs with dynamic hero content and category browsing
- **Blog List**: Paginated list of all published blogs
- **Blog Details**: Full blog post with SEO-friendly URLs, tags display
- **Category Pages**: Filter blogs by category (dynamic categories)
- **About & Contact Pages**: Fully editable content from admin panel
- **Responsive Design**: Mobile-friendly UI with modern Tailwind CSS design
- **SEO Optimized**: Meta tags, slugs, and semantic HTML

### Admin Panel
- **Secure Authentication**: JWT-based admin login
- **Dashboard**: Statistics and quick actions
- **Blog Management**: 
  - Create, edit, delete, and publish/unpublish blogs
  - Rich HTML description editor
  - Tags support (comma-separated)
  - Dynamic category dropdown
  - Automatic image compression (max 1MB)
- **Category Management**: Add, edit, and delete categories (dynamic)
- **Website Content Management**: Edit Home, About, and Contact page content
- **Image Upload**: Upload blog cover images (JPG, PNG, WEBP) with automatic compression
- **SEO Fields**: Meta title and description for each blog

## 📋 Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- JWT Authentication
- bcrypt (password hashing)
- Multer (file uploads)
- Sharp (automatic image compression to max 1MB)

## 📁 Project Structure

```
health-cooking-blog/
├── frontend/
│   ├── src/
│   │   ├── pages/          # Public pages
│   │   ├── admin/          # Admin panel pages
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API service layer
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── controllers/        # Route controllers
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & upload middleware
│   ├── config/            # Database config
│   ├── utils/             # Utilities (image compression)
│   ├── uploads/           # Uploaded images (auto-compressed)
│   ├── database/          # SQL schema
│   ├── index.js           # Server entry point
│   └── .env
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE health_cooking_blog;
```

2. Run the schema file:
```bash
mysql -u your_username -p health_cooking_blog < backend/database/schema.sql
```

Or import the SQL file using phpMyAdmin or MySQL Workbench.

**Default Admin Credentials:**
- Email: `admin@healthcooking.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change the default admin password in production!**

### 3. Environment Variables

#### Backend (.env)
Create `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=health_cooking_blog
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

#### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Development Servers

#### Backend
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📦 Production Build

### Frontend Build
```bash
cd frontend
npm run build
```
The build output will be in `frontend/dist/`

### Backend
The backend runs directly with Node.js. For production, use PM2 (see deployment section).

## 🚀 Hostinger VPS Deployment

### 1. Server Setup

SSH into your Hostinger VPS and install required software:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18 LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. Database Setup

```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

In MySQL:
```sql
CREATE DATABASE health_cooking_blog;
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON health_cooking_blog.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Import schema:
```bash
mysql -u blog_user -p health_cooking_blog < backend/database/schema.sql
```

### 3. Upload Project Files

Upload your project to `/var/www/health-cooking-blog` or your preferred directory:

```bash
# Create directory
sudo mkdir -p /var/www/health-cooking-blog
cd /var/www/health-cooking-blog

# Upload files (use SCP, SFTP, or Git)
# Then install dependencies
cd backend && npm install --production
cd ../frontend && npm install && npm run build
```

### 4. Configure Backend

Create `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=blog_user
DB_PASSWORD=your_mysql_password
DB_NAME=health_cooking_blog
JWT_SECRET=your_very_strong_random_secret_key_here
```

### 5. Start Backend with PM2

```bash
cd /var/www/health-cooking-blog/backend
pm2 start index.js --name "blog-api"
pm2 save
pm2 startup
```

### 6. Configure Nginx

Create `/etc/nginx/sites-available/health-cooking-blog`:

```nginx
server {
    listen 80;
    server_name your_domain.com;

    # Frontend (static files)
    root /var/www/health-cooking-blog/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Uploaded images
    location /uploads {
        alias /var/www/health-cooking-blog/backend/uploads;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/health-cooking-blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. SSL Certificate (Optional but Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

### 8. Firewall Configuration

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 🔒 Security Best Practices

1. **Change Default Admin Password**: Update the admin password in the database
2. **Strong JWT Secret**: Use a long, random string for `JWT_SECRET`
3. **Database User**: Use a dedicated MySQL user with limited privileges
4. **Environment Variables**: Never commit `.env` files to version control
5. **HTTPS**: Use SSL certificates in production
6. **Image Compression**: All images automatically compressed to max 1MB for optimal performance
7. **Input Validation**: All inputs are validated on the backend
8. **Prepared Statements**: All database queries use prepared statements to prevent SQL injection

## 📝 API Endpoints

### Public Endpoints
- `GET /api/blogs` - Get all published blogs (with pagination)
- `GET /api/blogs/:slug` - Get blog by slug
- `GET /api/categories` - Get all categories

### Admin Endpoints (Require JWT)
- `POST /api/admin/login` - Admin login
- `GET /api/blogs/stats` - Dashboard statistics
- `POST /api/blogs` - Create blog (with image upload & compression)
- `PUT /api/blogs/:id` - Update blog (with image upload & compression)
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/website-content` - Get all website content
- `PUT /api/website-content` - Update website content

### Public Endpoints
- `GET /api/website-content` - Get all website content (for Home, About, Contact pages)

## 🐛 Troubleshooting

### Backend Issues
- Check MySQL connection in `backend/.env`
- Ensure uploads directory exists: `backend/uploads/blogs/`
- Check PM2 logs: `pm2 logs blog-api`

### Frontend Issues
- Verify `VITE_API_URL` in `frontend/.env`
- Clear browser cache
- Check browser console for errors

### Database Issues
- Verify MySQL service is running: `sudo systemctl status mysql`
- Check database credentials in `.env`
- Ensure schema is imported correctly

## 📄 License

This project is open source and available for use.

## 🤝 Support

For issues or questions, please check the code comments or create an issue in your repository.

---

**Built with ❤️ for health and cooking enthusiasts**

