import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  getCurrentUser  from './store/slices/authSlice';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AuthLayout from './layouts/AuthLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHostels from './pages/admin/AdminHostels';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';

// User Pages
import Home from './pages/Home';
import HostelDetails from './pages/hostel/HostelDetails';
import UserBookings from './pages/user/UserBookings';
import UserProfile from './pages/user/UserProfile';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
  
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hostels" element={<AdminHostels />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        {/* User Routes */}
        <Route
          element={
            <ProtectedRoute roles={['user', 'admin']}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/hostels/:id" element={<HostelDetails />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
   
  );
}

export default App; 