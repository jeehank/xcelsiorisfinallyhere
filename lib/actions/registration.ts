'use server'

import {prismaClient} from '../prisma'


export async function registerParticipants(participants){
    try{
        const events=await prismaClient.participant.createMany({
            data:participants,
            skipDuplicates:true
        })
        const user=await prismaClient.user.update({
        where:{
            username:participants[0].schoolName
        },
        data:{
            slugs:{
                push: participants[0].slugEvent
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