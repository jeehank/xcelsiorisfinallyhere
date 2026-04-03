'use client'

import { useActionState, useEffect, useRef } from "react";

const RegisterForm = ({ action }) => {
  const formRef=useRef<HTMLFormElement>(null)
  const [state, formAction]=useActionState(action(formRef.current?.form), {message:'', status:''})
  
  useEffect(()=>{
    if (state.status!='error')
      formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={formAction} style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Register</h2>
      <input name="username" type="text" placeholder="Username" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
      <input name="password" type="password" placeholder="Password" required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
      <button type="submit" style={{ padding: "0.5rem", borderRadius: "6px", border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontWeight: 600 }}>
        Sign Up
      </button>

      {
        (state.message &&
          <p style={{color:state.status==='success'?'green':'red'}}>
            {state.message}
          </p>)
      }
    </form>
  );
};

export default RegisterForm;