-- Health & Cooking Blog Database Schema
-- Run this SQL script to create the database and tables

CREATE DATABASE IF NOT EXISTS health_cooking_blog;
USE health_cooking_blog;

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  description LONGTEXT NOT NULL,
  tags VARCHAR(500),
  image_url VARCHAR(500),
  category_id INT NOT NULL,
  meta_title VARCHAR(500),
  meta_description TEXT,
  status ENUM('published', 'draft') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_category (category_id),
  INDEX idx_created_at (created_at),
  FULLTEXT INDEX idx_tags (tags)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Website content table (for managing Home, About, Contact pages)
CREATE TABLE IF NOT EXISTS website_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_section (section_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default website content
INSERT INTO website_content (section_name, content) VALUES
('home_hero_title', 'A website makes it real'),
('home_hero_subtitle', 'Discover delicious recipes, evidence-based health tips, and expert nutrition advice to transform your lifestyle.'),
('about_content', '<h2>About Us</h2><p>Welcome to Health & Cooking Blog, your trusted source for health articles, delicious recipes, nutrition tips, and lifestyle advice.</p>'),
('contact_content', '<h2>Get in Touch</h2><p>Have a question, suggestion, or feedback? We\'d love to hear from you!</p>');

-- Insert default admin (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash for 'admin123' using bcrypt (cost factor 10)
-- To generate a new hash, run: node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your_password', 10).then(hash => console.log(hash));"
INSERT INTO admins (name, email, password) VALUES 
('Admin', 'admin@healthcooking.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
('Health', 'health'),
('Cooking', 'cooking'),
('Nutrition', 'nutrition'),
('Diet & Lifestyle', 'diet-lifestyle');

