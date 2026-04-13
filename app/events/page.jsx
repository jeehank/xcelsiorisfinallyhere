import "./events.css";
import EventCard from "./EventCard";
// yes this is the main thing welcome debarpon 
export const metadata = {
  title: "Events | Xcelsior",
  description: "Register for events",
};

import { eventsOnline, eventsDay1, eventsDay2 } from "./data";



export default function EventsPage() {

  return (
    <div className="events-container">
      <h1 className="events-title">Events</h1>

      <div className="events-form-wrapper">

        {/* Online Events */}
        <div className="day-section">
          <h2 className="day-title">Online Events</h2>
          <div className="events-grid">
            {eventsOnline.map((event, idx) => (
              <EventCard key={`online-${idx}`} event={event} />
            ))}
          </div>
        </div>

        {/* Day 1 */}
        <div className="day-section">
          <h2 className="day-title">Day 1</h2>
          <div className="events-grid">
            {eventsDay1.map((event, idx) => (
              <EventCard key={`day1-${idx}`} event={event} />
            ))}
          </div>
        </div>

        {/* Day 2 */}
        <div className="day-section">
          <h2 className="day-title">Day 2</h2>
          <div className="events-grid">
            {eventsDay2.map((event, idx) => (
              <EventCard key={`day2-${idx}`} event={event} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}// lemme know if u cant understand this ill tell u what i have done
// this is to transfer all the local data together i havent connected it to backend  
