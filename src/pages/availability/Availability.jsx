import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ADD_AVAILABILITY_MUTATION } from "./availability.mutations";
import styles from "./Availability.module.css";

function Availability() {
  const [form, setForm] = useState({ date: "", startTime: "", endTime: "" });
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [addAvailability, { loading }] = useMutation(ADD_AVAILABILITY_MUTATION, {
    onCompleted: (data) => {
      setSlots((prev) => [data.addAvailability, ...prev]);
      setForm({ date: "", startTime: "", endTime: "" });
      setSuccess("Slot added successfully!");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => {
      setError(err.message);
      setSuccess("");
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAvailability({ variables: form });
  };

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Availability</h1>
          <p className={styles.sub}>Add the dates and times you&apos;re available to meet.</p>
        </div>

        {/* Add slot form */}
        <div className="card" style={{ maxWidth: 480, marginBottom: "2rem" }}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label" htmlFor="av-date">Date</label>
              <input
                id="av-date"
                className="form-input"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className={styles.timeRow}>
              <div className="form-group">
                <label className="form-label" htmlFor="av-start">Start time</label>
                <input
                  id="av-start"
                  className="form-input"
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="av-end">End time</label>
                <input
                  id="av-end"
                  className="form-input"
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && <p className="error-msg">⚠ {error}</p>}
            {success && <p className={styles.successMsg}>✓ {success}</p>}

            <button
              id="add-availability-btn"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Adding..." : "+ Add slot"}
            </button>
          </form>
        </div>

        {/* Slots list */}
        {slots.length > 0 && (
          <div className={styles.slotList}>
            <h2 className={styles.listTitle}>Added this session</h2>
            {slots.map((slot) => (
              <div key={slot.id} className={styles.slotItem}>
                <span className={styles.slotDate}>📅 {slot.date}</span>
                <span className={styles.slotTime}>
                  {slot.startTime} → {slot.endTime}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Availability;
