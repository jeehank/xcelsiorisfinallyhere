"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import './GooeyNav.css';
import { authClient } from '../../lib/auth-client';

/**
 * GooeyNav Component
 * 
 * A navigation component with a gooey indicator effect and session-aware
 * registration/logout buttons.
 * 
 * @param {Array} items - List of navigation items { label, href }
 * @param {number} initialActiveIndex - The index of the item to be active initially
 */
const GooeyNav = ({
  items,
  initialActiveIndex = 0,
}) => {
  // Better Auth hook to manage and validate user sessions.
  // data: session will be null if no session exists or the user is logged out.
  // isPending tracks the loading state to prevent UI flickering.
  const { data: session, isPending, refetch } = authClient.useSession();
  
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Sync active index with the current URL pathname
  useEffect(() => {
    const currentIndex = items.findIndex(item => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname, items]);

  // Handle the gooey indicator animation using GSAP
  useEffect(() => {
    if (!containerRef.current || !indicatorRef.current) return;

    const itemsNodes = containerRef.current.querySelectorAll('.nav-item');
    if (itemsNodes[activeIndex]) {
      const activeNode = itemsNodes[activeIndex];
      const rect = activeNode.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const left = rect.left - containerRect.left;
      const width = rect.width;

      gsap.to(indicatorRef.current, {
        x: left,
        width: width,
        duration: 0.6,
        ease: 'elastic.out(1, 0.7)',
      });
    }
  }, [activeIndex]);

  /**
   * Handles click on navigation items
   */
  const handleItemClick = (index, href) => {
    setActiveIndex(index);
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  /**
   * Handles the logout process
   */
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      // Refetch the session to update the UI immediately
      await refetch();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="gooey-nav-container">
      <nav className="gooey-nav" ref={containerRef}>
        <div className="nav-items-wrapper">
          <div className="nav-indicator" ref={indicatorRef}></div>

          {items.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleItemClick(index, item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="nav-right">
        
        {!isPending && (
          !session ? (
            <button 
              className="nav-registration-btn" 
              onClick={() => router.push('/register')}
            >
              Register Now
            </button>
          ) : (
            <button 
              className="nav-registration-btn" 
              onClick={handleLogout}
            >
              Logout
            </button>
          )
        )}
      </div>

      {/* Hamburger button for mobile */}
      <button 
        className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          {items.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleItemClick(index, item.href)}
            >
              {item.label}
            </button>
          ))}
          
          {!isPending && (
            !session ? (
              <button 
                className="nav-registration-btn" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/register');
                }}
              >
                Register Now
              </button>
            ) : (
              <button 
                className="nav-registration-btn" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default GooeyNav;
