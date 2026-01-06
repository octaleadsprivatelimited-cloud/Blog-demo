import { useEffect, useState } from 'react';
import { websiteContentAPI } from '../services/api';

const About = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await websiteContentAPI.getSection('about_content');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching about content:', error);
      // Fallback content
      setContent('<h2>About Us</h2><p>Welcome to Health & Cooking Blog, your trusted source for health articles, delicious recipes, nutrition tips, and lifestyle advice.</p>');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Us</h1>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto">
            Your trusted source for health, nutrition, and culinary excellence
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;

