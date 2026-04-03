'use client'

import { useActionState } from "react"; // Next.js 15+ (or useFormStatus in 14+)
import { removeSchool } from "../../../lib/actions/adminActions"; // Adjust path to your server action

export default function RemoveForm(){
    const [state, formAction, isPending] = useActionState<Promise<{message:string, status:string}>|null, FormData>(removeSchool, { message: "", status: '' });

  return (
    <div className="mt-8">
        <form action={formAction} style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Remove accounts:</h2>
        <input name="userId" type="text" placeholder="User ID" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <label>User ID</label>
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
          {isPending ? "Removing Account..." : "Remove Account"}
        </button>
        {state.message && (
          <p style={{ color: state.status === "success" ? "green" : "red", margin: 0 }}>
            {state.message}
          </p>
        )}
      </form>
    </div>

    
  );
}

