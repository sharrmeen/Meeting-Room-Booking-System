import { ROOMS } from "../../data/constants";
import { styles } from "./MeetingRoomBooking.styles.js";

export default function Header({ bookings, currentUser, onLogout }) {
  return (
    <div style={styles.header}>
      <div style={styles.headerInner}>
        <div>
          <h1 style={styles.logo}>MeetSpace</h1>
          <p style={styles.tagline}>Meeting Room Booking System</p>
        </div>
        <div style={styles.statsRow}>
          {currentUser && (
            <>
              <div style={styles.currentUserChip}>
                <span style={styles.statText}>👤 {currentUser}</span>
              </div>
              <button type="button" className="logout-btn" onClick={onLogout} style={styles.logoutBtn} title="Log out">
                Log out
              </button>
            </>
          )}
          {ROOMS.map((r) => {
            const count = bookings.filter((b) => b.room === r.id).length;
            return (
              <div key={r.id} style={{ ...styles.statChip, borderColor: r.color }}>
                <span style={{ ...styles.statDot, background: r.color }} />
                <span style={styles.statText}>{r.name.split(" ")[0]}: {count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
