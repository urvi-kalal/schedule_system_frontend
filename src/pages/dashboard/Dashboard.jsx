import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ROUTES } from "../../constants";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.greeting}>
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className={styles.sub}>Here&apos;s a quick overview of your scheduler.</p>
        </div>

        <div className={styles.cards}>
          <Link to={ROUTES.AVAILABILITY} className={styles.card} id="card-availability">
            <span className={styles.cardIcon}>🗓</span>
            <h2 className={styles.cardTitle}>Availability</h2>
            <p className={styles.cardDesc}>Set the dates and times you&apos;re free to meet.</p>
            <span className={styles.cardLink}>Manage →</span>
          </Link>

          <Link to={ROUTES.BOOKING_LINKS} className={styles.card} id="card-booking-links">
            <span className={styles.cardIcon}>🔗</span>
            <h2 className={styles.cardTitle}>Booking Links</h2>
            <p className={styles.cardDesc}>Create shareable links for people to book time with you.</p>
            <span className={styles.cardLink}>Manage →</span>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
