"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../../src/css/Schedule.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const day1Events = [
  { time: '8:00 AM', name: 'Registration', venue: 'Gymnasium', bio: 'Check in, collect your ID cards, and get ready for an exciting day!' },
  { time: '8:30 AM', name: 'Opening Ceremony', venue: 'Auditorium', bio: 'Kickoff the festival with our chief guests and a special performance.' },
  { time: '10:00 AM', name: 'Quiz', venue: 'Xavier Hall', bio: 'Test your tech knowledge in our definitive school IT quiz.' },
  { time: '10:00 AM', name: 'Robotics', venue: 'Physics Lab', bio: 'Watch custom-built robots battle it out in the arena.' },
  { time: '10:30 AM', name: 'Sudoku(6-8)', venue: 'Reading Room', bio: 'A logic-based numbers challenge for the middle school division.' },
  { time: '10:30 AM', name: 'Graph Art', venue: 'Computer Lab 1', bio: 'Plot beautiful art using mathematical functions and graphic tools.' },
  { time: '11:00 AM', name: 'HTML & CSS', venue: 'Computer Lab 2', bio: 'Show off your front-end development skills by recreating mockups.' },
  { time: '1:00 PM', name: 'LUNCH BREAK', venue: 'Classrooms', bio: 'Rest, recharge, and enjoy the food provided.' },
  { time: '2:00 PM', name: 'Debate (Pool -1)', venue: 'Xavier Hall', bio: 'First pool of our high-stakes tech-focused debate.' },
  { time: '2:00 PM', name: 'Debate (Pool -2)', venue: 'Sassel Hall', bio: 'Second pool of the rigorous debate tournament.' },
  { time: '2:00 PM', name: 'Cryptography', venue: 'Computer Lab 1', bio: 'Crack the ciphers and solve the encrypted puzzles.' },
  { time: '3:00 PM', name: 'FIFA', venue: "Bruylant's Hall", bio: 'Show your e-sports skills in the ultimate FIFA showdown.' },
];

const day2Events = [
  { time: '8:00 AM', name: 'Registration', venue: 'Gymnasium', bio: 'Day 2 sign-ins for finalists and new event participants.' },
  { time: '9:00 AM', name: 'Hackathon', venue: 'Computer Lab 1', bio: 'Build an innovative app or solution in the allotted time limit.' },
  { time: '9:00 AM', name: 'Competitive Coding', venue: 'Computer Lab 2', bio: 'Algorithm challenges and data structure problem-solving.' },
  { time: '10:00 AM', name: 'Shark Tank', venue: 'Xavier Hall', bio: 'Pitch your breakthrough tech startup ideas to our panel of judges.' },
  { time: '10:30 AM', name: 'Game Jam', venue: 'Computer Lab 1', bio: 'Develop a playable game prototype around a secret theme.' },
  { time: '1:00 PM', name: 'LUNCH BREAK', venue: 'Classrooms', bio: 'Grab some food before the intense afternoon finals.' },
  { time: '2:00 PM', name: 'Math Relay', venue: 'Reading Room', bio: 'A team-based sequential math puzzle competition.' },
  { time: '2:00 PM', name: 'Competitive Maths', venue: 'Computer Lab 2', bio: 'Advanced calculus and algebra challenges for the sharpest minds.' },
  { time: '2:00 PM', name: 'Data Detectives', venue: 'Physics Lab', bio: 'Parse out trends and discover the hidden patterns in massive data sets.' },
  { time: '2:30 PM', name: 'Debate Finals', venue: 'Xavier Hall', bio: 'The definitive clash of the best debaters from day 1.' },
  { time: '3:00 PM', name: 'Video Editing', venue: 'Reading Room', bio: 'Cut, grade, and edit raw footage into a cinematic masterpiece.' },
  { time: '4:30 PM', name: 'Closing Ceremony', venue: 'Auditorium', bio: 'Awards distribution and farewells until next year!' },
];

const GAP = 500;

const getPoint = (index) => {
  const xMultiplier = Math.floor((index + 1) / 2);
  const x = xMultiplier * GAP;

  const yMultiplier = Math.floor((index % 4) / 2);
  const y = yMultiplier * GAP;
  return { x, y };
};

const generatePath = (eventsList) => {
  if (eventsList.length === 0) return '';
  let d = `M ${getPoint(0).x}, ${getPoint(0).y}`;
  for (let i = 1; i < eventsList.length; i++) {
    const pt = getPoint(i);
    d += ` L ${pt.x}, ${pt.y}`;
  }
  return d;
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const events = activeDay === 1 ? day1Events : day2Events;

  const containerRef = useRef(null);
  const mapContentRef = useRef(null);

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.set(mapContentRef.current, { x: 0, y: 0 });

    const ctx = gsap.context(() => {
      if (events.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${events.length * 800}`,
          pin: true,
          scrub: 1,
          id: "schedule-timeline"
        }
      });

      events.forEach((evt, i) => {
        if (i === 0) return;
        const currPoint = getPoint(i);

        tl.to(mapContentRef.current, {
          x: -currPoint.x,
          y: -currPoint.y,
          ease: "none",
          duration: 1
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [events]);

  const jumpToEvent = (index) => {
    setIsMenuOpen(false);
    const st = ScrollTrigger.getById("schedule-timeline");
    if (st) {
      const progress = index / (events.length - 1);
      const scrollPos = st.start + (st.end - st.start) * progress;
      gsap.to(window, { scrollTo: scrollPos, duration: 1.5, ease: "power3.inOut" });
    }
  };

  const pathWidth = Math.max(...events.map((_, i) => getPoint(i).x)) + 200;
  const pathHeight = GAP + 200;

  return (
    <div className="schedule-page">
      <div className="schedule-map-container" ref={containerRef}>

        <div className="schedule-header-fixed">
          <h1>Event Schedule</h1>
          <button className="all-events-btn" onClick={() => setIsMenuOpen(true)}>
            View All Events
          </button>
          <div className="day-toggles">
            <button
              className={`day-btn ${activeDay === 1 ? 'active' : ''}`}
              onClick={() => setActiveDay(1)}
            >
              Day 1
            </button>
            <button
              className={`day-btn ${activeDay === 2 ? 'active' : ''}`}
              onClick={() => setActiveDay(2)}
            >
              Day 2
            </button>
          </div>
        </div>

        <div className="map-view-port">
          <div className="map-content" ref={mapContentRef}>

            <svg
              className="map-path-svg"
              width={pathWidth}
              height={pathHeight}
              style={{ overflow: 'visible' }}
            >
              <path
                d={generatePath(events)}
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>

            {events.map((evt, idx) => {
              const pt = getPoint(idx);
              const isEventTop = pt.y === 0;

              return (
                <div
                  key={idx}
                  className="map-node"
                  style={{ transform: `translate(${pt.x}px, ${pt.y}px)` }}
                >
                  <div className="node-dot"></div>
                  <div className={`node-info ${isEventTop ? 'info-top' : 'info-bottom'}`}>
                    <div className="info-time">{evt.time}</div>
                    <div className="info-name">{evt.name}</div>
                    <div className="info-venue">{evt.venue}</div>
                  </div>
                  <div className={`node-bio ${isEventTop ? 'bio-top' : 'bio-bottom'}`}>
                    {evt.bio}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="events-menu-overlay">
          <div className="events-menu-glass">
            <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>×</button>
            <h2 className="menu-title">All Events - Day {activeDay}</h2>
            <div className="menu-list">
              {events.map((evt, idx) => (
                <div key={idx} className="menu-item" onClick={() => jumpToEvent(idx)}>
                  <div className="menu-item-time">{evt.time}</div>
                  <div className="menu-item-details">
                    <span className="menu-item-name">{evt.name}</span>
                    <span className="menu-item-venue">{evt.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
