import { ROOMS } from "../../data/constants";
import { getTodayLocalISO } from "../../utils/bookingUtils";
import { styles } from "./MeetingRoomBooking.styles.js";

export default function BookingForm({ form, currentUser, onFormChange, onClearError, error, success, onSubmit, selectedRoomColor }) {
  function handleChange(e) {
    onFormChange(e);
    onClearError();
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>New Booking</h2>

      <div style={styles.roomGrid}>
        {ROOMS.map((r) => (
          <button
            key={r.id}
            className="room-chip"
            onClick={() => {
              onFormChange({ target: { name: "room", value: r.id } });
              onClearError();
            }}
            style={{
              ...styles.roomChip,
              background: form.room === r.id ? r.color : "white",
              color: form.room === r.id ? "white" : "#333",
              border: `2px solid ${r.color}`,
            }}
          >
            <span style={styles.roomChipName}>{r.name}</span>
            <span style={styles.roomChipCap}>Cap. {r.capacity}</span>
          </button>
        ))}
      </div>

      <div style={styles.formGrid}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Meeting Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Sprint Planning"
            style={styles.input}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Your Name</label>
          <input
            name="bookedBy"
            value={currentUser}
            readOnly
            placeholder="e.g. Sharmeen"
            style={{ ...styles.input, cursor: "default", background: "#eee" }}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            min={getTodayLocalISO()}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.timeRow}>
          <div style={{ ...styles.fieldGroup, flex: 1 }}>
            <label style={styles.label}>Start Time</label>
            <input type="time" name="start" value={form.start} onChange={handleChange} style={styles.input} />
          </div>
          <div style={{ alignSelf: "flex-end", padding: "0 4px 10px", color: "#888", fontSize: 18 }}>→</div>
          <div style={{ ...styles.fieldGroup, flex: 1 }}>
            <label style={styles.label}>End Time</label>
            <input type="time" name="end" value={form.end} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>⚠</span>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div style={styles.successBox}>
          <span style={styles.successIcon}>✓</span>
          <span>{success}</span>
        </div>
      )}

      <button
        className="submit-btn"
        onClick={onSubmit}
        style={{ ...styles.submitBtn, background: selectedRoomColor }}
      >
        Book Room
      </button>
    </div>
  );
}
