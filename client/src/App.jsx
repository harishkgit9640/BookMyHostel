import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

// Public pages
import Home from './pages/Home';
import HostelList from './pages/hostel/HostelList';
import HostelDetails from './pages/hostel/HostelDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected pages
import UserProfile from './pages/user/UserProfile';
import UserBookings from './pages/user/UserBookings';
import BookingDetails from './pages/booking/BookingDetails';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import HostelManagement from './pages/admin/HostelManagement';
import BookingManagement from './pages/admin/BookingManagement';
import UserManagement from './pages/admin/UserManagement';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="hostels" element={<HostelList />} />
        <Route path="hostels/:id" element={<HostelDetails />} />
        <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="hostels" element={<HostelManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>

        {/* 404 route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App; 