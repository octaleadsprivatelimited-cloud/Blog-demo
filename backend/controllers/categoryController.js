import pool from '../config/db.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Generate slug from name
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const [existing] = await pool.execute(
      'SELECT id FROM categories WHERE slug = ?',
      [slug]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    const [result] = await pool.execute(
      'INSERT INTO categories (name, slug) VALUES (?, ?)',
      [name.trim(), slug]
    );

    res.status(201).json({
      id: result.insertId,
      name: name.trim(),
      slug
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Check if category exists
    const [existing] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Generate slug from name
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // Check if slug already exists for another category
    const [slugCheck] = await pool.execute(
      'SELECT id FROM categories WHERE slug = ? AND id != ?',
      [slug, id]
    );

    if (slugCheck.length > 0) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    await pool.execute(
      'UPDATE categories SET name = ?, slug = ? WHERE id = ?',
      [name.trim(), slug, id]
    );

    res.json({
      id: parseInt(id),
      name: name.trim(),
      slug
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category is used by any blog
    const [blogs] = await pool.execute(
      'SELECT id FROM blogs WHERE category_id = ?',
      [id]
    );

    if (blogs.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category. It is being used by blog posts.' 
      });
    }

    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

