//HERE WE ALSO HAVE THE FIELDS DETAILS AND DATE IN THE DATABASE. SO YOU CAN USE THEM TO DISPLAY ON THE PAGE. ALSO MAKE SURE TO HANDLE THE CASE WHEN THE EVENT IS NOT FOUND IN THE DATABASE AND DISPLAY A USER-FRIENDLY MESSAGE. ALSO ADD A BACK BUTTON TO NAVIGATE USERS BACK TO THE EVENTS PAGE.
//CHANGE THESE FRONTEND BS. MY BACKEND IS PRETTY MUCH DONE.





import {prismaClient} from '../../../lib/prisma'
import { getEventBySlug } from "../data";
import Link from "next/link";


import "../events.css";
import ClientForm from "./ClientForm";

export async function generateStaticParams() {
  const events = await prismaClient.event.findMany({
    select: {
      slug: true,
    },
  });
 
  return events.map((post) => ({
    slug: post.slug,
  }))
}




export default async function DynamicEventPage({ params }) {
  const { slug } =await params;
  const event = await prismaClient.event.findUnique({
    where: { slug },
    omit:{
        createdAt: true,
        updatedAt:true
    }
  })

  if (!event) {
    return (
      <div className="events-container">
        <h1 className="events-title">Event Not Found</h1>
        <Link href="/events" className="event-register-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '0.8rem 2rem' }}>
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="events-container">
      <Link href="/events" style={{ color: 'white', textDecoration: 'underline', marginBottom: '1rem', display: 'block' }}>
        &larr; Back to Events
      </Link>
      
      <h1 className="events-title">{event.name}</h1>
      
      <div className="event-info-section" style={{ color: "white", marginBottom: "2rem", textAlign: "center" }}>
        {event.overview && <p className="event-overview" style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto 1.5rem" }}>{event.overview}</p>}
        
        <div className="event-meta" style={{ display: "flex", justifyContent: "center", gap: "2rem", margin: "1.5rem 0", flexWrap: "wrap", fontSize: "1.1rem" }}>
          {event.date && <div><strong>Date:</strong> {event.date}</div>}
          {event.time && <div><strong>Time:</strong> {event.time}</div>}
          {event.location && <div><strong>Venue:</strong> {event.location}</div>}
        </div>

        <div className="event-rules" style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto 2rem", background: "rgba(255,255,255,0.1)", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)" }}>
          {event.details && event.details.length > 0 && (
            <>
              <h3 style={{ marginBottom: "1rem", color: "var(--accent)" }}>Details & Rules</h3>
              <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
                {event.details.map((detail, idx) => (
                  <li key={idx} style={{ marginBottom: "0.5rem", lineHeight: "1.4" }}>{detail}</li>
                ))}
              </ul>
            </>
          )}
          <p style={{ marginTop: "1rem", color: "var(--accent)", fontWeight: "bold" }}>Team Size: {event.NOP} {event.NOP === 1 ? 'Member' : 'Members'}</p>
        </div>
      </div>
      
      <div className="events-form-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ClientForm event={event} slug={slug} numberOfParticipants={event.NOP}/>
      </div>
    </div>
  );
}