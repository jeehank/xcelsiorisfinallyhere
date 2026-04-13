import React from "react";
import Link from "next/link";

export default function EventCard({ event }) {
  const safeEventName = event.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <Link href={`/events/${safeEventName}`} className="event-card" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
      <div className="event-header">
        <h3 className="event-name">{event.name}</h3>
        <span className="event-time">{event.time}</span>
      </div>
      <div className="event-card-actions" style={{ marginTop: '1rem' }}>
        <button className="event-register-btn" style={{ width: '100%' }}>
          View Details & Register
        </button>
      </div>
    </Link>
  );
}