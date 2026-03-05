#  MeetSpace - Meeting Room Booking System
A lightweight React prototype for booking shared meeting rooms intentionally scoped to demonstrate core booking logic, conflict detection, and access control.

## Features

- Book from 3 predefined rooms with conflict detection
- Prevents overlapping bookings with specific error messages
- Name-based access control - only the creator can cancel their booking
- Search, filter by room, date, and sort by time
- Persists bookings via localStorage across page refreshes

Live Link : https://meetspace-three.vercel.app/
  
<img width="1280" height="680" alt="image" src="https://github.com/user-attachments/assets/211e2ddf-4250-4895-9787-9a20c0823fa9" />

## Running Locally

```bash
npm install
npm run dev
```

## Storage

Bookings are stored in `localStorage` under the key `mrb_bookings`. This is intentional for the prototype scope - the app is structured so that the booking state and logic can be cleanly swapped out for API calls to a backend (e.g. Express + PostgreSQL or Firebase) with minimal changes. The `hasOverlap` check would move server-side in production.

## The Idea

Most meeting room tools are buried inside heavy platforms like Google Calendar or Outlook. MeetSpace is the opposite - a focused, standalone booking layer that any small team can drop into their workflow without committing to a full calendar suite.


## License
This project is licensed under the MIT License
MIT © 
