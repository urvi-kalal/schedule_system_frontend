import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { ROUTES } from "../constants";
import styles from "./DashboardLayout.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", path: ROUTES.DASHBOARD, icon: "⊞" },
  { label: "Availability", path: ROUTES.AVAILABILITY, icon: "🗓" },
  { label: "Booking Links", path: ROUTES.BOOKING_LINKS, icon: "🔗" },
];

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>⚡</span>
          <span className={styles.brandName}>Scheduler</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={styles.userName}>{user?.name}</p>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <button
            id="logout-btn"
            className={`btn btn-secondary ${styles.logoutBtn}`}
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default DashboardLayout;
