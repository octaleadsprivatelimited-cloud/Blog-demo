import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { getImageUrl } from '../utils/apiConfig';

const Category = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchCategoryBlogs();
  }, [slug]);

  const fetchCategoryBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll({ category: slug, limit: 12 });
      setBlogs(response.data.blogs);
      if (response.data.blogs.length > 0) {
        setCategoryName(response.data.blogs[0].category_name);
      }
    } catch (error) {
      console.error('Error fetching category blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      {/* Category Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {categoryName || slug.charAt(0).toUpperCase() + slug.slice(1)} Articles
          </h1>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto">
            Explore our collection of {categoryName || slug} related content
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-4 text-gray-500">Loading articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-xl text-gray-700 font-semibold mb-4">No blogs available in this category yet.</p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Blogs
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-large transition-all duration-300 transform hover:-translate-y-1"
              >
                {blog.image_url && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={getImageUrl(blog.image_url)}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-semibold rounded-full">
                        {blog.category_name}
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  {!blog.image_url && (
                    <span className="inline-block mb-3 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                      {blog.category_name}
                    </span>
                  )}
                  <h3 className="text-xl font-display font-bold text-gray-900 mt-2 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {blog.meta_description || 'Read more about this article...'}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">{formatDate(blog.created_at)}</span>
                    <span className="text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Read More
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

