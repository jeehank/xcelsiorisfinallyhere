import React from "react";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event.slug}`} className="event-card" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
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