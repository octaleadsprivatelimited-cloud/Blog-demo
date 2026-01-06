import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI, websiteContentAPI } from '../services/api';
import { getImageUrl } from '../utils/apiConfig';

const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [websiteContent, setWebsiteContent] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    fetchFeaturedBlogs();
    fetchWebsiteContent();
    
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, []);

  const fetchWebsiteContent = async () => {
    try {
      const response = await websiteContentAPI.getAll();
      setWebsiteContent(response.data);
    } catch (error) {
      console.error('Error fetching website content:', error);
    }
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoLoaded(false);
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await blogAPI.getAll({ limit: 6 });
      setFeaturedBlogs(response.data.blogs);
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
    <div className="min-h-screen">
      {/* Hero Section with Video Background - Squarespace Style */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-[1]"></div>

        {/* Fallback background (only shows if video doesn't load) */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-[1] flex items-center justify-center">
            <div className="text-center opacity-70">
              <svg className="w-16 h-16 mx-auto mb-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-white/70">Loading video...</p>
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 max-w-9xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
              {websiteContent.home_hero_title || 'A website makes it real'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {websiteContent.home_hero_subtitle || 'Discover delicious recipes, evidence-based health tips, and expert nutrition advice to transform your lifestyle.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/blogs"
                className="px-6 py-3 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors duration-200 rounded-sm"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 bg-transparent text-white border-2 border-white text-sm font-medium hover:bg-white/10 transition-colors duration-200 rounded-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs - Clean Grid */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of carefully crafted articles
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"></div>
            </div>
          ) : featuredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">No blogs available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {featuredBlogs.map((blog) => (
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
          )}

          {!loading && featuredBlogs.length > 0 && (
            <div className="text-center">
              <Link
                to="/blogs"
                className="inline-block text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
              >
                View All Articles →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section - Minimal */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <Link
              to="/category/health"
              className="group text-center p-8 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Health</h3>
              <p className="text-sm text-gray-600">Wellness & Tips</p>
            </Link>
            <Link
              to="/category/cooking"
              className="group text-center p-8 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Cooking</h3>
              <p className="text-sm text-gray-600">Recipes & Techniques</p>
            </Link>
            <Link
              to="/category/nutrition"
              className="group text-center p-8 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Nutrition</h3>
              <p className="text-sm text-gray-600">Diet & Nutrients</p>
            </Link>
            <Link
              to="/category/diet-lifestyle"
              className="group text-center p-8 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Lifestyle</h3>
              <p className="text-sm text-gray-600">Diet & Wellness</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
