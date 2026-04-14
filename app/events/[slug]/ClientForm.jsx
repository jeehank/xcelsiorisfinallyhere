"use client";
import { useFormStatus } from "../../../lib/slug-client";
import { authClient } from "../../../lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import {registerParticipants} from "../../../lib/actions/registration";

export default function ClientForm({ event, slug, numberOfParticipants }) {

    const {shouldShow, isLoading} = useFormStatus(slug);



  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sess = await authClient.getSession();
      
      // Check if session exists to avoid errors
      if (!sess?.data?.user?.username) {
        console.error("No user session found");
        redirect('/events')
      }
    const data = Object.fromEntries(formData.entries());
    
    let participants = [];
    for (let i = 1; i <= numberOfParticipants; i++) {
      const name = data[`p${i}-name`];
      const contact = data[`p${i}-contact`];
        
        participants.push({ 
          name, 
          number: contact, 
          schoolName:sess.data.user.username, 
          eventName: event.name,
        });
    }

    const res=await registerParticipants(participants);

    if (res.success) {

      await authClient.getSession({forceRefresh: true}); // Refresh session to update user data
      redirect('/events');
    }
    else{
      console.error("Registration failed");
    }
  };


  if (!shouldShow && !isLoading) {
    return (
      <div>
        You have already registered for this event.

      </div>
    )
  }

  if (!shouldShow && isLoading) {
    return (
      <div>
        Not authenticated. Please log in to register for this event.
      </div>
    )
  }
  
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