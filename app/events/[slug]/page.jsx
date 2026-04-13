import {prismaClient} from '../../../lib/prisma'
import { getEventBySlug } from "../data";
import Link from "next/link";
import "../events.css";
import ClientForm from "./ClientForm";

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
        <Link href="/events" className="event-register-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
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
      <h2 className="day-title">{event.time}</h2>
      
      <div className="events-form-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ClientForm event={event} slug={slug} numberOfParticipants={event.NOP}/>
      </div>
    </div>
  );
}