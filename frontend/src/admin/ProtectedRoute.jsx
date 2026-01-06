import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    return children;
  } catch (error) {
    console.error('ProtectedRoute error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;

