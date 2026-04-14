import {headers} from 'next/headers'
import { auth } from '../../../lib/auth'
import {prismaClient} from '../../../lib/prisma'
import { error } from 'better-auth/api'

const page = async () => {
  const sess= await auth.api.getSession({
    headers:await headers()
  })

  if (sess && sess.user.role==="admin"){
    let data
    try{
        data= await prismaClient.participant.deleteMany()

        return (
            <div style={{textAlign:'center', marginTop:'2rem'}}>
                <h1>All participants have been removed successfully!</h1>
            </div>
        )
    }catch{
        data={error:"Error deleting participants"}
        return(
            <div style={{textAlign:'center', marginTop:'2rem'}}>
                <h1>{data.error}</h1>
            </div>
        )
    }

    
    }
    else{
        return(
            <p style={{textAlign:'center', marginTop:'2rem', color:'red'}}>Go away!! :P</p>
        )
    }
}

export default page