import { useState } from "react";
import { styles } from "./MeetingRoomBooking.styles.js";

export default function LoginModal({ onSubmit }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <div style={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div style={styles.modalCard}>
        <h2 id="login-modal-title" style={styles.modalTitle}>
          What's your name?
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <label htmlFor="login-name" style={styles.label}>
              Your name
            </label>
            <input
              id="login-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sharmeen"
              style={styles.input}
              autoFocus
              autoComplete="name"
            />
          </div>
          <button type="submit" style={styles.modalSubmitBtn} className="submit-btn">
            Enter MeetSpace
          </button>
        </form>
      </div>
    </div>
  );
}
