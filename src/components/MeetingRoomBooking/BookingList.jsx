import { ROOMS } from "../../data/constants";
import BookingCard from "./BookingCard";
import { styles } from "./MeetingRoomBooking.styles.js";

export default function BookingList({
  filteredBookings,
  currentUser,
  search,
  filterRoom,
  filterDate,
  sortOrder,
  onSearchChange,
  onFilterRoomChange,
  onFilterDateChange,
  onSortOrderChange,
  onClearFilters,
  deleteConfirmId,
  onDeleteClick,
  onConfirmDelete,
  onKeepBooking,
}) {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>All Bookings</h2>

      <div style={styles.filterRow}>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or person..."
          style={{ ...styles.input, flex: 1 }}
        />
        <select
          value={filterRoom}
          onChange={(e) => onFilterRoomChange(e.target.value)}
          style={{ ...styles.input, width: 160 }}
        >
          <option value="all">All Rooms</option>
          {ROOMS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => onFilterDateChange(e.target.value)}
          style={{ ...styles.input, width: 160 }}
        />
        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          style={{ ...styles.input, width: 180 }}
          title="Sort order"
        >
          <option value="soonest">Earliest first</option>
          <option value="latest">Latest first</option>
        </select>
        {(search || filterRoom !== "all" || filterDate) && (
          <button onClick={onClearFilters} style={styles.clearBtn}>
            Clear
          </button>
        )}
      </div>

      {filteredBookings.length === 0 ? (
        <div style={styles.empty}>No bookings found.</div>
      ) : (
        <div style={styles.bookingList}>
          {filteredBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              currentUser={currentUser}
              onDeleteClick={onDeleteClick}
              onConfirmDelete={onConfirmDelete}
              onKeepBooking={onKeepBooking}
              isConfirming={deleteConfirmId === b.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
