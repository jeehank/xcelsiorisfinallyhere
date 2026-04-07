import {headers} from 'next/headers'
import { auth } from '../../../lib/auth';
import {prismaClient} from '../../../lib/prisma'

const EventData =  async () => {

  const sess= await auth.api.getSession({
    headers: await headers()
  })


  if (sess && sess.user.role==="admin"){
    let data=[]
    try{
        data= await prismaClient.event.findMany()
    }catch{
        data=[]
    }
    



    return (
        <div style={{textAlign:'center', marginTop:'2rem'}}>
            <h1>Events:</h1>
            <ul>

                {data.length>0?data.map((event:any, index:number)=>
                    <li key={index} style={{marginBottom:'1rem', listStyleType:'none', border:'1px solid #ccc', padding:'1rem', borderRadius:'6px'}}>
                    <h2>{event.name}</h2>
                    <p><strong>Overview:</strong> {event.overview}</p>
                    <p><strong>Slug:</strong> {event.slug}</p>
                    </li>):<p>No events found.</p>
                }
            </ul>
        </div>
    )
  }
  else{
    return (<p style={{textAlign:'center', marginTop:'2rem', color:'red'}}>Go away!! :P</p>)
  }


  
}

export default EventData