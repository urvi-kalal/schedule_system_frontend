import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { ROUTES } from "../constants";

// Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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
      <Route
        path={ROUTES.LOGIN}
        element={<PublicRoute><Login /></PublicRoute>}
      />
      <Route
        path={ROUTES.REGISTER}
        element={<PublicRoute><Register /></PublicRoute>}
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRouter;
