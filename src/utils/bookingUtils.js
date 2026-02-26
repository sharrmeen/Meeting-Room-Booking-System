export function getTodayLocalISO() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function hasOverlap(bookings, roomId, date, start, end, excludeId = null) {
  const newStart = toMinutes(start);
  const newEnd = toMinutes(end);
  return bookings.find(
    (b) =>
      b.id !== excludeId &&
      b.room === roomId &&
      b.date === date &&
      toMinutes(b.start) < newEnd &&
      toMinutes(b.end) > newStart
  );
}

export function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function formatDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}
