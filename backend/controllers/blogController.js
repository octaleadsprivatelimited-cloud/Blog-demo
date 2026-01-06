import pool from '../config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { compressImage } from '../utils/imageCompressor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate SEO-friendly slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Get all blogs (with optional filters)
export const getBlogs = async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT b.*, c.name as category_name, c.slug as category_slug
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    // Filter by category
    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }

    // Filter by status (admin only - public users see only published)
    if (status && status !== 'all') {
      query += ' AND b.status = ?';
      params.push(status);
    } else if (!status || status !== 'all') {
      // Public users only see published blogs (unless status=all is explicitly requested)
      query += ' AND b.status = ?';
      params.push('published');
    }
    // If status='all', don't filter by status (admin can see all)

    query += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [blogs] = await pool.execute(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM blogs b LEFT JOIN categories c ON b.category_id = c.id WHERE 1=1';
    const countParams = [];
    if (category) {
      countQuery += ' AND c.slug = ?';
      countParams.push(category);
    }
    if (status && status !== 'all') {
      countQuery += ' AND b.status = ?';
      countParams.push(status);
    } else if (!status || status !== 'all') {
      countQuery += ' AND b.status = ?';
      countParams.push('published');
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [blogs] = await pool.execute(
      `SELECT b.*, c.name as category_name, c.slug as category_slug
       FROM blogs b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.slug = ? AND b.status = 'published'`,
      [slug]
    );

    if (blogs.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blogs[0]);
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, tags, category_id, meta_title, meta_description, status } = req.body;

    // Validate required fields
    if (!title || !description || !category_id) {
      return res.status(400).json({ 
        error: 'Title, description, and category are required' 
      });
    }

    // Validate category exists
    const [categoryCheck] = await pool.execute('SELECT id FROM categories WHERE id = ?', [category_id]);
    if (categoryCheck.length === 0) {
      return res.status(400).json({ error: 'Invalid category selected' });
    }

    // Generate slug
    let slug = generateSlug(title);
    
    // Ensure slug is unique
    let [existing] = await pool.execute('SELECT id FROM blogs WHERE slug = ?', [slug]);
    let counter = 1;
    while (existing.length > 0) {
      slug = `${generateSlug(title)}-${counter}`;
      [existing] = await pool.execute('SELECT id FROM blogs WHERE slug = ?', [slug]);
      counter++;
    }

    // Handle image upload and compression
    let image_url = null;
    if (req.file) {
      const originalPath = req.file.path;
      const compressedPath = path.join(
        path.dirname(originalPath),
        `compressed-${req.file.filename}`
      );

      // Compress image to max 1MB
      const compressionResult = await compressImage(originalPath, compressedPath);
      
      if (compressionResult.success) {
        // Remove original and use compressed version
        if (fs.existsSync(originalPath)) {
          fs.unlinkSync(originalPath);
        }
        // Rename compressed file to final name
        const finalPath = path.join(path.dirname(compressedPath), req.file.filename);
        fs.renameSync(compressedPath, finalPath);
        image_url = `/uploads/blogs/${req.file.filename}`;
        
        console.log(`Image compressed: ${compressionResult.size} bytes (${(compressionResult.size / (1024 * 1024)).toFixed(2)} MB)`);
        if (compressionResult.warning) {
          console.log(`Warning: ${compressionResult.warning}`);
        }
      } else {
        // Compression failed, use original but log warning
        console.warn('Image compression failed, using original:', compressionResult.error);
        image_url = `/uploads/blogs/${req.file.filename}`;
      }
    }

    // Clean and validate tags (comma-separated)
    const cleanTags = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).join(', ') : null;

    // Insert blog
    const [result] = await pool.execute(
      `INSERT INTO blogs 
       (title, slug, description, tags, image_url, category_id, meta_title, meta_description, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        slug,
        description,
        cleanTags,
        image_url,
        category_id,
        meta_title || title.trim(),
        meta_description || '',
        status || 'draft'
      ]
    );

    // Fetch created blog with category
    const [blogs] = await pool.execute(
      `SELECT b.*, c.name as category_name, c.slug as category_slug
       FROM blogs b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.id = ?`,
      [result.insertId]
    );

    res.status(201).json(blogs[0]);
  } catch (error) {
    console.error('Create blog error:', error);
    
    // Clean up uploaded file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }
    
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, category_id, meta_title, meta_description, status } = req.body;

    // Check if blog exists
    const [existing] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const blog = existing[0];

    // Validate category if provided
    if (category_id && category_id !== blog.category_id) {
      const [categoryCheck] = await pool.execute('SELECT id FROM categories WHERE id = ?', [category_id]);
      if (categoryCheck.length === 0) {
        return res.status(400).json({ error: 'Invalid category selected' });
      }
    }

    // Generate new slug if title changed
    let slug = blog.slug;
    if (title && title.trim() !== blog.title) {
      slug = generateSlug(title);
      // Check uniqueness
      const [slugCheck] = await pool.execute(
        'SELECT id FROM blogs WHERE slug = ? AND id != ?',
        [slug, id]
      );
      if (slugCheck.length > 0) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Handle image upload and compression - delete old image if new one uploaded
    let image_url = blog.image_url;
    if (req.file) {
      // Delete old image file
      if (blog.image_url) {
        const oldImagePath = path.join(__dirname, '..', blog.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Compress new image
      const originalPath = req.file.path;
      const compressedPath = path.join(
        path.dirname(originalPath),
        `compressed-${req.file.filename}`
      );

      const compressionResult = await compressImage(originalPath, compressedPath);
      
      if (compressionResult.success) {
        // Remove original and use compressed version
        if (fs.existsSync(originalPath)) {
          fs.unlinkSync(originalPath);
        }
        // Rename compressed file to final name
        const finalPath = path.join(path.dirname(compressedPath), req.file.filename);
        fs.renameSync(compressedPath, finalPath);
        image_url = `/uploads/blogs/${req.file.filename}`;
        
        console.log(`Image compressed: ${compressionResult.size} bytes (${(compressionResult.size / (1024 * 1024)).toFixed(2)} MB)`);
      } else {
        // Compression failed, use original
        console.warn('Image compression failed, using original:', compressionResult.error);
        image_url = `/uploads/blogs/${req.file.filename}`;
      }
    }

    // Clean and validate tags
    const cleanTags = tags !== undefined 
      ? (tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).join(', ') : null)
      : blog.tags;

    // Update blog
    await pool.execute(
      `UPDATE blogs 
       SET title = ?, slug = ?, description = ?, tags = ?, image_url = ?, 
           category_id = ?, meta_title = ?, meta_description = ?, status = ?
       WHERE id = ?`,
      [
        title || blog.title,
        slug,
        description || blog.description,
        cleanTags,
        image_url,
        category_id || blog.category_id,
        meta_title !== undefined ? meta_title : blog.meta_title,
        meta_description !== undefined ? meta_description : blog.meta_description,
        status !== undefined ? status : blog.status,
        id
      ]
    );

    // Fetch updated blog
    const [blogs] = await pool.execute(
      `SELECT b.*, c.name as category_name, c.slug as category_slug
       FROM blogs b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.id = ?`,
      [id]
    );

    res.json(blogs[0]);
  } catch (error) {
    console.error('Update blog error:', error);
    
    // Clean up uploaded file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }
    
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Get blog to delete image file
    const [blogs] = await pool.execute('SELECT image_url FROM blogs WHERE id = ?', [id]);
    if (blogs.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete image file if exists
    if (blogs[0].image_url) {
      const imagePath = path.join(__dirname, '..', blogs[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await pool.execute('DELETE FROM blogs WHERE id = ?', [id]);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

// Get dashboard stats (admin only)
export const getDashboardStats = async (req, res) => {
  try {
    const [totalBlogs] = await pool.execute('SELECT COUNT(*) as count FROM blogs');
    const [publishedBlogs] = await pool.execute(
      "SELECT COUNT(*) as count FROM blogs WHERE status = 'published'"
    );
    const [draftBlogs] = await pool.execute(
      "SELECT COUNT(*) as count FROM blogs WHERE status = 'draft'"
    );
    const [totalCategories] = await pool.execute('SELECT COUNT(*) as count FROM categories');

    res.json({
      totalBlogs: totalBlogs[0].count,
      publishedBlogs: publishedBlogs[0].count,
      draftBlogs: draftBlogs[0].count,
      totalCategories: totalCategories[0].count
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

