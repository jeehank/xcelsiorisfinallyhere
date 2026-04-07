'use client'

import { useActionState } from "react";
import { removeEvent } from "../../../lib/actions/adminActions";


const EventData =  () => {
    const [state, formAction, isPending] = useActionState<Promise<{message:string, status:string}>|null, FormData>(removeEvent, { message: "", status: '' });


  return (
    <div className="mt-50">
        <form action={formAction} style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Remove Event:</h2>
        <input name="slug" type="text" placeholder="Slug of Event" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        
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