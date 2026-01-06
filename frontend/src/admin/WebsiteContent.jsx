import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { websiteContentAPI } from '../services/api';

const WebsiteContent = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Define editable sections
  const sections = [
    {
      key: 'home_hero_title',
      label: 'Home Hero Title',
      placeholder: 'Enter hero title for homepage',
      type: 'text'
    },
    {
      key: 'home_hero_subtitle',
      label: 'Home Hero Subtitle',
      placeholder: 'Enter hero subtitle for homepage',
      type: 'textarea'
    },
    {
      key: 'about_content',
      label: 'About Page Content',
      placeholder: 'Enter HTML content for About page',
      type: 'textarea',
      rows: 10
    },
    {
      key: 'contact_content',
      label: 'Contact Page Content',
      placeholder: 'Enter HTML content for Contact page',
      type: 'textarea',
      rows: 10
    }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await websiteContentAPI.getAll();
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching website content:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setContent({
      ...content,
      [key]: value
    });
    // Clear error for this field
    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: ''
      });
    }
  };

  const handleSave = async (key) => {
    if (!content[key] || content[key].trim() === '') {
      setErrors({
        ...errors,
        [key]: 'Content cannot be empty'
      });
      return;
    }

    try {
      setSaving({ ...saving, [key]: true });
      await websiteContentAPI.update(key, content[key]);
      setErrors({
        ...errors,
        [key]: ''
      });
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error updating content:', error);
      setErrors({
        ...errors,
        [key]: error.response?.data?.error || 'Failed to update content'
      });
    } finally {
      setSaving({ ...saving, [key]: false });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="text-xl font-bold text-primary-600">
                Admin Panel
              </Link>
              <Link to="/admin" className="text-gray-700 hover:text-primary-600">
                Dashboard
              </Link>
              <Link to="/" className="text-gray-700 hover:text-primary-600">
                View Site
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Website Content</h1>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.key} className="bg-white p-6 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {section.label}
              </label>
              
              {section.type === 'textarea' ? (
                <textarea
                  value={content[section.key] || ''}
                  onChange={(e) => handleChange(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  rows={section.rows || 5}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    section.key.includes('about') || section.key.includes('contact')
                      ? 'font-mono text-sm'
                      : ''
                  } ${errors[section.key] ? 'border-red-300' : 'border-gray-300'}`}
                />
              ) : (
                <input
                  type="text"
                  value={content[section.key] || ''}
                  onChange={(e) => handleChange(section.key, e.target.value)}
                  placeholder={section.placeholder}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors[section.key] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              )}

              {errors[section.key] && (
                <p className="mt-1 text-sm text-red-600">{errors[section.key]}</p>
              )}

              {(section.key.includes('about') || section.key.includes('contact')) && (
                <p className="mt-2 text-sm text-gray-500">
                  You can use HTML tags for formatting. For example: &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;
                </p>
              )}

              <button
                onClick={() => handleSave(section.key)}
                disabled={saving[section.key]}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving[section.key] ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteContent;

