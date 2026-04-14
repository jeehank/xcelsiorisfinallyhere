'use server'
import {cookies, headers} from 'next/headers'
import { auth } from '../auth';

import {prismaClient} from '../prisma'

async function addEvent(prevState: { message: string; status: string } | null, form:FormData):Promise<{message:string, status:string}> {
    
    
    const session=await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !(session?.user.role==="admin")) {
            return {message: "Come back as admin", status: 'error'}
    }

    
    const name=form.get('name') as string
    const overview=form.get('overview') as string
    const date=form.get('date') as string
    const time=form.get('time') as string
    const eventDetails=form.get('details') as string
    const location=form.get('location') as string
    const NOP=Number(form.get('number') as string)


    try{
        const createdEvent=await prismaClient.event.create({
            data:{
                name,
                overview,
                date,
                time,
                eventDetails,
                location,
                NOP
            } as any
        })
        if (! createdEvent){
            return {message:'Failed to create event', status:'error'}
        }
    }catch (e){
        return {message:(e as Error).message?e.message:'Kya data diya bsdk!', status:'error'}
    }


    return {message:'Event added successfully', status:'success'}
}


//WHY DO I HAVE TO PASS THE PREV STATE
async function addSchool(prevState: { message: string; status: string } | null, form:FormData):Promise<{message:string, status:string}> {
    const username=form.get('username') as string
    const password=form.get('password') as string
    try{
        const cookieStore=await cookies()
        const allCookies=cookieStore.toString()
        const data=await fetch(process.env.BASE_URL+'/api/registration/signUp',{
            method:'POST',
            headers:{
                'Cookie':allCookies,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username, password})
        })

        if (data.status===200){
            return {message:'Account passed successfully', status:'success'}
        }else if (data.status===401){
            return {message:'Come back as an admin', status:'error'}
        }else{
            return {message:'Error creating account', status:'error'}
        }
    }catch(e){
        return {message:'Couldn\'t pass this account', status:'error'}
    }
    
}

async function removeSchool(prevState: { message: string; status: string } | null, form:FormData):Promise<{message:string, status:string}> {
    const userId=form.get('userId') as string
    const session=await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !(session?.user.role==="admin")) {
            return {message: "Come back as admin", status: 'error'}
    }

    try{
        if (!userId){
            return {message:'User ID is required', status:'error'}
        }
        const data=await auth.api.removeUser({
            body:{
                userId
            },
            headers: await headers()
        });
    }catch{
        return {message:'Something went wrong', status:'error'}
    }

        
    return {message:'Account removed successfully', status:'success'}
}


async function removeEvent(prevState: { message: string; status: string } | null, form:FormData):Promise<{message:string, status:string}> {
    const eventID=form.get('slug') as string
    const session=await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !(session?.user.role==="admin")) {
            return {message: "Come back as admin", status: 'error'}
    }

    try{
        if (!eventID){
            return {message:'Slug is required', status:'error'}
        }
        const deleteUser = await prisma.event.delete({
            where: {
                slug: eventID,
            },
        });
    }catch{
        return {message:'Something went wrong', status:'error'}
    }

        
    return {message:'Event removed successfully', status:'success'}
}

export {addSchool, removeSchool, addEvent, removeEvent}