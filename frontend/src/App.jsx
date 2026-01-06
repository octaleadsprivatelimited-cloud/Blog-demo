import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';
import Category from './pages/Category';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './admin/Dashboard';
import Blogs from './admin/Blogs';
import AddBlog from './admin/AddBlog';
import EditBlog from './admin/EditBlog';
import Categories from './admin/Categories';
import WebsiteContent from './admin/WebsiteContent';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/blogs" element={
          <>
            <Navbar />
            <BlogList />
            <Footer />
          </>
        } />
        <Route path="/blog/:slug" element={
          <>
            <Navbar />
            <BlogDetails />
            <Footer />
          </>
        } />
        <Route path="/category/:slug" element={
          <>
            <Navbar />
            <Category />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/admin/blogs/add" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />
        <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/admin/website-content" element={<ProtectedRoute><WebsiteContent /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

