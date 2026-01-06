import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4 tracking-tight">Health & Cooking</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted source for health articles, delicious recipes, nutrition tips, and lifestyle advice.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-tight uppercase">Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link to="/blogs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">All Blogs</Link></li>
              <li><Link to="/category/health" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Health</Link></li>
              <li><Link to="/category/cooking" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Cooking</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-tight uppercase">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/category/health" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Health</Link></li>
              <li><Link to="/category/cooking" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Cooking</Link></li>
              <li><Link to="/category/nutrition" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Nutrition</Link></li>
              <li><Link to="/category/diet-lifestyle" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Diet & Lifestyle</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-tight uppercase">Contact</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Health & Cooking Blog. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
