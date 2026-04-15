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
      <h2 className="day-title">{event.time}</h2>
      
      <div className="events-form-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ClientForm event={event} slug={slug} numberOfParticipants={event.NOP}/>
      </div>
    </div>
  );
}