import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import styles from "./Booking.module.css";

function BookingConfirmed() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { booking, hostName } = state || {};

  if (!booking) {
    navigate(ROUTES.LOGIN);
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.confirmed}>
          <div className={styles.confirmedIcon}>✅</div>
          <h1 className={styles.confirmedTitle}>Booking Confirmed!</h1>
          <p className={styles.confirmedSub}>
            Your meeting with <strong>{hostName}</strong> is scheduled.
          </p>

          <div className={styles.confirmedDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date</span>
              <span className={styles.detailValue}>📅 {booking.date}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Time</span>
              <span className={styles.detailValue}>
                🕐 {booking.startTime} – {booking.endTime}
              </span>
            </div>
            {booking.attendeeName && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Name</span>
                <span className={styles.detailValue}>{booking.attendeeName}</span>
              </div>
            )}
            {booking.attendeeEmail && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{booking.attendeeEmail}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
