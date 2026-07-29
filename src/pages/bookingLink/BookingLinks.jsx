import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { GENERATE_BOOKING_LINK_MUTATION } from "./bookingLink.operations";
import styles from "./BookingLinks.module.css";

function BookingLinks() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const [generateLink, { loading }] = useMutation(GENERATE_BOOKING_LINK_MUTATION, {
    onCompleted: (data) => {
      setLinks((prev) => [data.generateBookingLink, ...prev]);
      setError("");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Booking Links</h1>
            <p className={styles.sub}>
              Generate a shareable link for people to book time with you.
            </p>
          </div>
          <button
            id="generate-link-btn"
            className="btn btn-primary"
            onClick={() => generateLink()}
            disabled={loading}
          >
            {loading ? "Generating..." : "+ Generate link"}
          </button>
        </div>

        {error && <p className="error-msg" style={{ marginBottom: "1rem" }}>⚠ {error}</p>}

        {links.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔗</span>
            <p>No booking links yet. Generate one to get started.</p>
          </div>
        ) : (
          <div className={styles.linkList}>
            {links.map((link) => (
              <div key={link.id} className={styles.linkCard}>
                <div className={styles.linkInfo}>
                  <span className={styles.linkCode}>/{link.code}</span>
                  <span className={styles.linkUrl}>{link.url}</span>
                  {link.availableDates.length > 0 ? (
                    <div className={styles.dates}>
                      {link.availableDates.map((d) => (
                        <span key={d} className="badge badge-primary">{d}</span>
                      ))}
                    </div>
                  ) : (
                    <span className={styles.noDates}>
                      ⚠ No availability set — add dates first
                    </span>
                  )}
                </div>
                <button
                  className={`btn btn-secondary ${styles.copyBtn}`}
                  onClick={() => handleCopy(link.url, link.id)}
                >
                  {copiedId === link.id ? "✓ Copied!" : "Copy link"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default BookingLinks;
