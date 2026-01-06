import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await blogAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-medium border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="flex items-center space-x-2">
                <span className="text-2xl">⚙️</span>
                <span className="text-xl font-display font-bold text-gray-900">Admin Panel</span>
              </Link>
              <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="text-sm font-semibold text-gray-900">{admin.name || 'Admin'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your blog statistics and quick actions</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-4 text-gray-500">Loading dashboard...</p>
          </div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-soft border-l-4 border-gray-400 hover:shadow-medium transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Total Blogs</h3>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-display font-bold text-gray-900">{stats.totalBlogs}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-soft border-l-4 border-green-500 hover:shadow-medium transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Published</h3>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-display font-bold text-green-600">{stats.publishedBlogs}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-soft border-l-4 border-yellow-500 hover:shadow-medium transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Drafts</h3>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-display font-bold text-yellow-600">{stats.draftBlogs}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-soft border-l-4 border-blue-500 hover:shadow-medium transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Categories</h3>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-display font-bold text-blue-600">{stats.totalCategories}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-xl shadow-soft">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/admin/blogs/add"
                  className="group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-primary-600">Add New Blog</p>
                  <p className="text-sm text-gray-500 mt-1">Create a new blog post</p>
                </Link>
                <Link
                  to="/admin/blogs"
                  className="group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-primary-600">Manage Blogs</p>
                  <p className="text-sm text-gray-500 mt-1">Edit or delete blogs</p>
                </Link>
                <Link
                  to="/admin/categories"
                  className="group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-primary-600">Manage Categories</p>
                  <p className="text-sm text-gray-500 mt-1">Organize blog categories</p>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Link
                  to="/admin/website-content"
                  className="group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-primary-600">Website Content</p>
                  <p className="text-sm text-gray-500 mt-1">Edit Home, About, Contact pages</p>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white p-12 rounded-xl shadow-soft text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-xl text-gray-700 font-semibold mb-2">Failed to load dashboard stats</p>
            <p className="text-gray-500">Please try refreshing the page</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

