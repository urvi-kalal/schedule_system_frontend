import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_BOOKING_LINK_QUERY,
  GET_AVAILABLE_SLOTS_QUERY,
  CREATE_BOOKING_MUTATION,
} from "./booking.operations";
import { ROUTES } from "../../constants";
import styles from "./Booking.module.css";

// Step indicators
const STEPS = ["Pick a date", "Pick a slot", "Your details"];

function BookingPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ attendeeName: "", attendeeEmail: "" });
  const [error, setError] = useState("");

  // load link + available dates
  const { data: linkData, loading: linkLoading, error: linkError } = useQuery(
    GET_BOOKING_LINK_QUERY,
    { variables: { code } }
  );

  // load slots when date is selected
  const { data: slotsData, loading: slotsLoading, refetch: refetchSlots } = useQuery(
    GET_AVAILABLE_SLOTS_QUERY,
    {
      variables: { code, date: selectedDate },
      skip: !selectedDate,
    }
  );

  const [createBooking, { loading: bookingLoading }] = useMutation(
    CREATE_BOOKING_MUTATION,
    {
      onCompleted: (data) => {
        navigate(ROUTES.BOOKING_CONFIRMED, {
          state: {
            booking: data.createBooking,
            hostName: linkData?.getBookingLink?.user?.name,
          },
        });
      },
      onError: (err) => {
        setError(err.message);
        // Slot was already taken — go back to slot list and refetch fresh slots
        if (err.message.toLowerCase().includes("already booked")) {
          setSelectedSlot(null);
          setStep(1);
          refetchSlots();
        }
      },
    }
  );

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep(1);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    createBooking({
      variables: {
        code,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        attendeeName: form.attendeeName || null,
        attendeeEmail: form.attendeeEmail || null,
      },
    });
  };

  if (linkLoading) return <div className={styles.center}>Loading...</div>;
  if (linkError)
    return (
      <div className={styles.center}>
        <div className={styles.notFound}>
          <span>🔗</span>
          <h2>Invalid booking link</h2>
          <p>This link may have expired or does not exist.</p>
        </div>
      </div>
    );

  const link = linkData?.getBookingLink;
  const slots = slotsData?.getAvailableSlots || [];

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.hostAvatar}>
            {link?.user?.name?.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className={styles.hostName}>{link?.user?.name}</h1>
            <p className={styles.hostEmail}>{link?.user?.email}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className={styles.steps}>
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`${styles.step} ${i === step ? styles.stepActive : ""} ${i < step ? styles.stepDone : ""}`}
            >
              <span className={styles.stepNum}>{i < step ? "✓" : i + 1}</span>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/*Pick a date */}
        {step === 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Select a date</h2>
            {link?.availableDates?.length === 0 ? (
              <p className={styles.empty}>No available dates at the moment.</p>
            ) : (
              <div className={styles.dateGrid}>
                {link?.availableDates?.map((date) => (
                  <button
                    key={date}
                    className={`btn btn-secondary ${styles.dateBtn}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    📅 {date}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pick a slot */}
        {step === 1 && (
          <div className={styles.section}>
            <button
              className={styles.back}
              onClick={() => setStep(0)}
            >
              ← Back
            </button>
            <h2 className={styles.sectionTitle}>
              Available slots for <span>{selectedDate}</span>
            </h2>
            {slotsLoading ? (
              <p className={styles.empty}>Loading slots...</p>
            ) : slots.length === 0 ? (
              <p className={styles.empty}>No slots available for this date.</p>
            ) : (
              <div className={styles.slotGrid}>
                {slots.map((slot) => (
                  <button
                    key={`${slot.startTime}-${slot.endTime}`}
                    className={`btn btn-secondary ${styles.slotBtn}`}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    {slot.startTime} – {slot.endTime}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/*Fill details */}
        {step === 2 && (
          <div className={styles.section}>
            <button className={styles.back} onClick={() => setStep(1)}>
              ← Back
            </button>
            <h2 className={styles.sectionTitle}>Confirm your booking</h2>

            <div className={styles.summary}>
              <span>📅 {selectedDate}</span>
              <span>
                🕐 {selectedSlot?.startTime} – {selectedSlot?.endTime}
              </span>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className="form-group">
                <label className="form-label" htmlFor="b-name">
                  Your name <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="b-name"
                  className="form-input"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.attendeeName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, attendeeName: e.target.value }))
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="b-email">
                  Your email <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="b-email"
                  className="form-input"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.attendeeEmail}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, attendeeEmail: e.target.value }))
                  }
                />
              </div>

              {error && <p className="error-msg">⚠ {error}</p>}

              <button
                id="confirm-booking-btn"
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Confirming..." : "Confirm booking"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
