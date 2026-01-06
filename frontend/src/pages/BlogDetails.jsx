import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { getImageUrl } from '../utils/apiConfig';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getBySlug(slug);
      setBlog(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Blog not found');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
          <Link to="/blogs" className="text-primary-600 hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 flex items-center space-x-2">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-primary-600 transition-colors">Blogs</Link>
          <span>/</span>
          <Link to={`/category/${blog.category_slug}`} className="hover:text-primary-600 transition-colors">
            {blog.category_name}
          </Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{blog.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
          {/* Category Badge */}
          <Link
            to={`/category/${blog.category_slug}`}
            className="inline-flex items-center mb-6 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold hover:bg-primary-200 transition-colors"
          >
            {blog.category_name}
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formatDate(blog.created_at)}</span>
          </div>

          {/* Featured Image */}
          {blog.image_url && (
            <div className="mb-10 rounded-xl overflow-hidden shadow-medium">
              <img
                src={getImageUrl(blog.image_url)}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Tags */}
          {blog.tags && (
            <div className="mb-8 flex flex-wrap gap-2">
              {blog.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg prose-primary max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Back to Blogs */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blogs"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Blogs
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;

