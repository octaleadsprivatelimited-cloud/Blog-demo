import pool from '../config/db.js';

// Get all website content
export const getWebsiteContent = async (req, res) => {
  try {
    const [content] = await pool.execute(
      'SELECT section_name, content FROM website_content ORDER BY section_name'
    );

    // Convert array to object for easier frontend access
    const contentObject = {};
    content.forEach(item => {
      contentObject[item.section_name] = item.content;
    });

    res.json(contentObject);
  } catch (error) {
    console.error('Get website content error:', error);
    res.status(500).json({ error: 'Failed to fetch website content' });
  }
};

// Update website content
export const updateWebsiteContent = async (req, res) => {
  try {
    const { section_name, content } = req.body;

    if (!section_name || content === undefined) {
      return res.status(400).json({ 
        error: 'Section name and content are required' 
      });
    }

    // Check if section exists
    const [existing] = await pool.execute(
      'SELECT id FROM website_content WHERE section_name = ?',
      [section_name]
    );

    if (existing.length === 0) {
      // Create new section
      await pool.execute(
        'INSERT INTO website_content (section_name, content) VALUES (?, ?)',
        [section_name, content]
      );
    } else {
      // Update existing section
      await pool.execute(
        'UPDATE website_content SET content = ? WHERE section_name = ?',
        [content, section_name]
      );
    }

    res.json({ 
      message: 'Website content updated successfully',
      section_name,
      content
    });
  } catch (error) {
    console.error('Update website content error:', error);
    res.status(500).json({ error: 'Failed to update website content' });
  }
};

// Get single section
export const getSection = async (req, res) => {
  try {
    const { section_name } = req.params;

    const [sections] = await pool.execute(
      'SELECT section_name, content FROM website_content WHERE section_name = ?',
      [section_name]
    );

    if (sections.length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }

    res.json(sections[0]);
  } catch (error) {
    console.error('Get section error:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
};

