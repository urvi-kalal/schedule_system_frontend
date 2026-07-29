import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { ROUTES } from "../constants";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard pages
import Dashboard from "../pages/dashboard/Dashboard";
import Availability from "../pages/availability/Availability";
import BookingLinks from "../pages/bookingLink/BookingLinks";

// Public booking pages
import BookingPage from "../pages/booking/BookingPage";
import BookingConfirmed from "../pages/booking/BookingConfirmed";

// Protected route — redirects to login if not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

// Public route — redirects to dashboard if already logged in
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return !isAuthenticated ? children : <Navigate to={ROUTES.DASHBOARD} replace />;
}

function AppRouter() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path={ROUTES.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
      <Route path={ROUTES.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />

      {/* Public booking routes — no login required */}
      <Route path={ROUTES.BOOK} element={<BookingPage />} />
      <Route path={ROUTES.BOOKING_CONFIRMED} element={<BookingConfirmed />} />

      {/* Protected dashboard routes */}
      <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path={ROUTES.AVAILABILITY} element={<ProtectedRoute><Availability /></ProtectedRoute>} />
      <Route path={ROUTES.BOOKING_LINKS} element={<ProtectedRoute><BookingLinks /></ProtectedRoute>} />

      {/* Default + catch-all */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRouter;
