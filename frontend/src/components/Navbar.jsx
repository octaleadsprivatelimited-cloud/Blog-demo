import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'border-b border-gray-200' : ''
    }`}>
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Health & Cooking
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/blogs') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Blogs
            </Link>
            <Link
              to="/category/health"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Health
            </Link>
            <Link
              to="/category/cooking"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Cooking
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/admin/login"
              className="ml-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200 rounded-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t border-gray-100">
            <Link 
              to="/" 
              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive('/') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blogs" 
              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive('/blogs') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              All Blogs
            </Link>
            <Link 
              to="/category/health" 
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Health
            </Link>
            <Link 
              to="/category/cooking" 
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cooking
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/admin/login" 
              className="block px-4 py-2.5 text-sm font-medium bg-gray-900 text-white mt-2 rounded-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
