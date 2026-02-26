import { useState, useEffect } from "react";
import { ROOMS, INITIAL_BOOKINGS } from "../../data/constants";
import { getTodayLocalISO, toMinutes, hasOverlap, formatTime, formatDate } from "../../utils/bookingUtils";
import Header from "./Header";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import LoginModal from "./LoginModal";
import "./MeetingRoomBooking.css";
import { styles } from "./MeetingRoomBooking.styles.js";

const CURRENT_USER_KEY = "mrb_currentUser";

export default function MeetingRoomBooking() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return localStorage.getItem(CURRENT_USER_KEY) || null;
    } catch {
      return null;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem("mrb_bookings");
      return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [form, setForm] = useState({
    room: "aurora",
    date: getTodayLocalISO(),
    start: "09:00",
    end: "10:00",
    title: "",
    bookedBy: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [filterRoom, setFilterRoom] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("soonest");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [nextId, setNextId] = useState(100);

  useEffect(() => {
    localStorage.setItem("mrb_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    const today = getTodayLocalISO();
    setForm((f) => (f.date < today ? { ...f, date: today } : f));
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  function handleSubmit() {
    const { room, date, start, end, title } = form;
    const bookedBy = currentUser;

    if (!title.trim()) return setError("Please enter a meeting title.");
    if (!bookedBy?.trim()) return setError("Please enter your name.");
    if (!date) return setError("Please select a date.");
    const today = getTodayLocalISO();
    if (date < today) return setError("Please select today or a future date.");
    if (toMinutes(start) >= toMinutes(end))
      return setError("Start time must be earlier than end time.");
    if (toMinutes(end) - toMinutes(start) < 15)
      return setError("Booking must be at least 15 minutes long.");

    const conflict = hasOverlap(bookings, room, date, start, end);
    if (conflict) {
      const roomName = ROOMS.find((r) => r.id === room)?.name;
      return setError(
        `"${roomName}" is already booked from ${formatTime(conflict.start)} to ${formatTime(conflict.end)} by ${conflict.bookedBy} ("${conflict.title}"). Please choose a different time or room.`
      );
    }

    const newBooking = { id: nextId, room, date, start, end, title, bookedBy };
    setBookings((prev) => [...prev, newBooking]);
    setNextId((n) => n + 1);
    setSuccess(
      `"${title}" booked in ${ROOMS.find((r) => r.id === room)?.name} on ${formatDate(date)} from ${formatTime(start)} to ${formatTime(end)}.`
    );
    setError("");
    setForm((f) => ({ ...f, title: "" }));
    setTimeout(() => setSuccess(""), 5000);
  }

  function handleLogin(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCurrentUser(trimmed);
    try {
      localStorage.setItem(CURRENT_USER_KEY, trimmed);
    } catch {}
  }

  function handleLogout() {
    setCurrentUser(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch {}
  }

  function handleDelete(id) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setDeleteConfirm(null);
  }

  const filtered = bookings
    .filter((b) => {
      const matchRoom = filterRoom === "all" || b.room === filterRoom;
      const matchDate = !filterDate || b.date === filterDate;
      const matchSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.bookedBy.toLowerCase().includes(search.toLowerCase());
      return matchRoom && matchDate && matchSearch;
    })
    .sort((a, b) => {
      const cmp = (a.date + a.start).localeCompare(b.date + b.start);
      return sortOrder === "soonest" ? cmp : -cmp;
    });

  const selectedRoomColor = ROOMS.find((r) => r.id === form.room)?.color;

  if (!currentUser) {
    return (
      <div style={styles.page}>
        <LoginModal onSubmit={handleLogin} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header bookings={bookings} currentUser={currentUser} onLogout={handleLogout} />
      <div style={styles.main}>
        <BookingForm
          form={form}
          currentUser={currentUser}
          onFormChange={handleChange}
          onClearError={() => setError("")}
          error={error}
          success={success}
          onSubmit={handleSubmit}
          selectedRoomColor={selectedRoomColor}
        />
        <BookingList
          filteredBookings={filtered}
          currentUser={currentUser}
          search={search}
          filterRoom={filterRoom}
          filterDate={filterDate}
          sortOrder={sortOrder}
          onSearchChange={setSearch}
          onFilterRoomChange={setFilterRoom}
          onFilterDateChange={setFilterDate}
          onSortOrderChange={setSortOrder}
          onClearFilters={() => {
            setSearch("");
            setFilterRoom("all");
            setFilterDate("");
          }}
          deleteConfirmId={deleteConfirm}
          onDeleteClick={setDeleteConfirm}
          onConfirmDelete={handleDelete}
          onKeepBooking={() => setDeleteConfirm(null)}
        />
      </div>
    </div>
  );
}
