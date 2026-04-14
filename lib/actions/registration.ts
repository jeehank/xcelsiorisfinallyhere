'use server'

import {prismaClient} from '../prisma'


export async function registerParticipants(participants){
    console.log('Inside the registration function:',participants)
    try{
        const events=await prismaClient.participant.createMany({
            data:participants,
            skipDuplicates:true
        })
        const user=await prismaClient.user.update({
        where:{
            username:participants[0].user.connect.username
        },
        data:{
            slugs:{
                push: participants[0].event.connect.slug
            }
        }
        });

        return {success:true,}
    }
    catch(error){
        console.log(error.message)
        return {success:false}
    }
    
    

    
}