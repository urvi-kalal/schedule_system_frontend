import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ROUTES } from "../../constants";
import { GET_MY_BOOKINGS_QUERY } from "./dashboard.operations";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(GET_MY_BOOKINGS_QUERY, {
    fetchPolicy: "network-only",
  });

  const bookings = data?.getMyBookings || [];

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

        <div className={styles.bookingsSection}>
          <h2 className={styles.sectionTitle}>Your Schedule</h2>
          {loading ? (
            <div className={styles.noBookings}>Loading bookings...</div>
          ) : error ? (
            <div className={styles.noBookings}>Error loading schedule: {error.message}</div>
          ) : bookings.length === 0 ? (
            <div className={styles.noBookings}>No upcoming meetings booked yet.</div>
          ) : (
            <div className={styles.bookingsList}>
              {bookings.map((booking) => (
                <div key={booking.id} className={styles.bookingItem}>
                  <div className={styles.bookingMeta}>
                    <span className={styles.bookingTime}>
                      📅 {booking.date}
                    </span>
                    <span className={styles.bookingDetails}>
                      🕐 {booking.startTime} – {booking.endTime}
                    </span>
                  </div>
                  <div className={styles.bookingAttendee}>
                    <span className={styles.attendeeName}>
                      {booking.attendeeName || "Guest"}
                    </span>
                    <span className={styles.attendeeEmail}>
                      {booking.attendeeEmail || "No email provided"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
