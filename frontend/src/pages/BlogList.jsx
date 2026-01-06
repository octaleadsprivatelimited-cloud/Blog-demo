import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { getImageUrl } from '../utils/apiConfig';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll({ page, limit: 12 });
      setBlogs(response.data.blogs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
    <div className="min-h-screen bg-white">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">All Blog Posts</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore our complete collection of articles on health, nutrition, cooking, and wellness
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-4 text-gray-500">Loading articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-gray-500">No blogs available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="group"
                >
                  {blog.image_url && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                      <img
                        src={getImageUrl(blog.image_url)}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                    {blog.category_name}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors tracking-tight leading-tight">
                    {blog.title}
                  </h3>
                  {blog.meta_description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {blog.meta_description}
                    </p>
                  )}
                  <div className="text-xs text-gray-500 font-medium">
                    {formatDate(blog.created_at)}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-900">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                  disabled={currentPage === pagination.pages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;

