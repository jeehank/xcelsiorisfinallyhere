"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../../src/css/Registration.css';

import {signIn} from '../../lib/actions/authActions'

export default function Registration() {
  const cardRef = useRef(null);

  
  useEffect(() => {
    const btn = document.querySelector('.btn-magnetic');
    if (!btn) return;

    const hoverHandler = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        duration: 0.3,
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power3.out',
      });
    };

    const leaveHandler = () => {
      gsap.to(btn, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    btn.addEventListener('mousemove', hoverHandler);
    btn.addEventListener('mouseleave', leaveHandler);
    
    return () => {
      btn.removeEventListener('mousemove', hoverHandler);
      btn.removeEventListener('mouseleave', leaveHandler);
    };
  }, []);

  return (
    <section id="registration" className="reg-section">
      <div className="reg-container" ref={cardRef}>
        <div className="glass-card">
          <div className="card-header">
            <h3>SYSTEM ACCESS</h3>
            <p>Enter credentials to register</p>
          </div>
          <form className="reg-form" /*onSubmit={(e) => e.preventDefault()}*/ action={signIn}>
            <div className="input-group">
              <input type="text" name="username" placeholder=" " required />
              <label>USERNAME</label>
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder=" " required />
              <label>PASSWORD</label>
            </div>
            <button type="submit" className="btn-magnetic">
              ACCESS TERMINAL
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
