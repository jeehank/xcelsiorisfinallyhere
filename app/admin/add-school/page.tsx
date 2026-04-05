'use client'

import { useActionState } from "react"; // Next.js 15+ (or useFormStatus in 14+)
import { addSchool } from "../../../lib/actions/adminActions"; // Adjust path to your server action

export default function RegisterForm(){
  const [state, formAction, isPending] = useActionState<Promise<{message:string, status:string}>|null, FormData>(addSchool, { message: "", status: '' });

  return (
    <div className="mt-8">
        <form action={formAction} style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Register</h2>
        <input name="username" type="text" placeholder="Username" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input name="password" type="password" placeholder="Password" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
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
          {isPending ? "Adding School..." : "Add School"}
        </button>
        {state.message && (
          <p style={{ color: state.status === "success" ? "green" : "red", margin: 0 }}>
            {state.message}
          </p>
        )}
      </form>
    </div>

    
  );
};