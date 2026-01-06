# Quick Start Guide

Get your Health & Cooking Blog up and running in minutes!

## Prerequisites Checklist

- [ ] Node.js (v16+) installed
- [ ] MySQL (v8.0+) installed and running
- [ ] npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all

# Or install separately:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Set Up Database

1. **Create MySQL database:**
```sql
CREATE DATABASE health_cooking_blog;
```

2. **Import schema:**
```bash
# On Linux/Mac:
mysql -u root -p health_cooking_blog < backend/database/schema.sql

# On Windows (using MySQL command line):
mysql -u root -p
USE health_cooking_blog;
SOURCE backend/database/schema.sql;
```

3. **Verify default admin:**
   - Email: `admin@healthcooking.com`
   - Password: `admin123`

### 3. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=health_cooking_blog
JWT_SECRET=change_this_to_a_random_secret_key
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

### 5. Access the Application

- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
  - Email: `admin@healthcooking.com`
  - Password: `admin123`

## First Steps After Setup

1. **Change Admin Password** (Important!)
   - Log in to admin panel
   - Or update directly in database:
   ```sql
   -- Generate new hash using: node backend/scripts/generate-password-hash.js your_new_password
   UPDATE admins SET password = 'new_hash_here' WHERE email = 'admin@healthcooking.com';
   ```

2. **Create Your First Blog Post**
   - Go to Admin Panel → Add New Blog
   - Fill in title, content (HTML), category, and upload an image
   - Set status to "Published"
   - Click "Create Blog"

3. **Customize Categories**
   - Go to Admin Panel → Categories
   - Add or modify categories as needed

## Common Issues & Solutions

### Database Connection Error
- Verify MySQL is running: `sudo systemctl status mysql` (Linux) or check Services (Windows)
- Check credentials in `backend/.env`
- Ensure database exists: `SHOW DATABASES;`

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` accordingly

### Images Not Loading
- Ensure `backend/uploads/blogs/` directory exists
- Check file permissions (Linux/Mac)
- Verify image URL in browser console

### CORS Errors
- Ensure backend is running before frontend
- Check `VITE_API_URL` matches backend port

## Next Steps

- Read the full [README.md](README.md) for deployment instructions
- Customize the design in `frontend/tailwind.config.js`
- Add more categories and blog posts
- Configure for production deployment

## Need Help?

- Check the main README.md for detailed documentation
- Review code comments in the source files
- Verify all environment variables are set correctly

---

**Happy Blogging! 🎉**

