'use client'

import { useActionState } from "react";
import { addEvent } from "../../../lib/actions/adminActions";


const EventData =  () => {
  const [state, formAction, isPending] = useActionState<Promise<{message:string, status:string}>|null, FormData>(addEvent, { message: "", status: '' });


  return (
    <div className="mt-50">
        <form action={formAction} style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Register</h2>
        <input name="name" type="text" placeholder="Name of Event" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input name="overview" type="text" placeholder="Overview" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input name="date" type="text" placeholder="Date" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input name="time" type="text" placeholder="Time" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input name="location" type="text" placeholder="Event Location" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input name="number" type="number" placeholder="Number of Participants" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <textarea 
            name="details" 
            placeholder="Event Details..." 
            required
            rows={4}
            style={{ 
                padding: "0.5rem", 
                borderRadius: "6px", 
                border: "1px solid #ccc",
                width: "100%", // Ensures it fills the container like a text input
                
            }} 
        />
        
        <button 
          type="submit" 
          disabled={isPending}
          style={{ 
            padding: "0.5rem", 
            borderRadius: "6px", 
            border: "none", 
            background: isPending ? "#ccc" : "#6366f1", 
            color: "#fff", 
            cursor: isPending ? "not-allowed" : "pointer", 
            fontWeight: 600 
          }}
        >
          {isPending ? "Adding Event..." : "Add Event"}
        </button>
        {state.message && (
          <p style={{ color: state.status === "success" ? "green" : "red", margin: 0 }}>
            {state.message}
          </p>
        )}
      </form>
    
    </div>
  )
}

export default EventData