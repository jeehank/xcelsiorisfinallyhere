"use client";
import React from "react";

export default function ClientForm({ event, slug, numberOfParticipants }) {


  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    let participants = [];
    for (let i = 1; i <= numberOfParticipants; i++) {
      participants.push({
        name: data[`p${i}-name`],
        contact: data[`p${i}-contact`]
      });
    }
    console.log("Participants for", event.name, ":\n", participants);
  };

  return (
    <form className="event-card" onSubmit={handleRegister} style={{ width: '100%' }}>
      <div className="event-inputs-group">
        {Array.from({ length: event.NOP }).map((_, i) => (
          <div key={i} className="participant-block">
            <h4 className="participant-label">Participant {i + 1}</h4>

            <input
              type="text"
              name={`p${i + 1}-name`}
              placeholder="Name"
              className="participant-input"
              required
            />

            

            <input
              type="tel"
              name={`p${i + 1}-contact`}
              placeholder="Contact Number"
              className="participant-input"
              required
            />
          </div>
        ))}
      </div>

      <div className="event-card-actions">
        <button type="submit" className="event-register-btn" style={{ width: '100%' }}>
          Register for {event.name}
        </button>
      </div>
    </form>
  );
}