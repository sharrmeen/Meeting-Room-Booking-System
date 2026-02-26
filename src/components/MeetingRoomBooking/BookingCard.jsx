import { ROOMS } from "../../data/constants";
import { formatDate, formatTime } from "../../utils/bookingUtils";
import { styles } from "./MeetingRoomBooking.styles.js";

export default function BookingCard({ booking, currentUser, onDeleteClick, onConfirmDelete, onKeepBooking, isConfirming }) {
  const room = ROOMS.find((r) => r.id === booking.room);
  const canDelete = currentUser && booking.bookedBy.toLowerCase() === currentUser.toLowerCase();

  return (
    <div
      className="booking-card"
      style={{ ...styles.bookingCard, borderLeft: `4px solid ${room.color}` }}
    >
      <div style={styles.bookingTop}>
        <div>
          <span
            style={{
              ...styles.roomBadge,
              background: room.color + "18",
              color: room.color,
            }}
          >
            {room.name}
          </span>
          <h3 style={styles.bookingTitle}>{booking.title}</h3>
        </div>
        {canDelete && (
          <button
            className="del-btn"
            onClick={() => onDeleteClick(booking.id)}
            style={styles.delBtn}
            title="Cancel booking"
          >
            ✕
          </button>
        )}
      </div>
      <div style={styles.bookingMeta}>
        <span>📅 {formatDate(booking.date)}</span>
        <span>🕐 {formatTime(booking.start)} – {formatTime(booking.end)}</span>
        <span>👤 {booking.bookedBy}</span>
      </div>

      {isConfirming && (
        <div style={styles.confirmRow}>
          <span style={{ fontSize: 13, color: "#e85d3a" }}>Cancel this booking?</span>
          <button onClick={() => onConfirmDelete(booking.id)} style={styles.confirmYes}>
            Yes, cancel
          </button>
          <button onClick={onKeepBooking} style={styles.confirmNo}>
            Keep it
          </button>
        </div>
      )}
    </div>
  );
}
