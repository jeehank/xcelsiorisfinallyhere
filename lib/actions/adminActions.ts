'use server'
import {cookies, headers} from 'next/headers'
import { auth } from '../auth';

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
    const username=form.get('username') as string
    const session=await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !(session?.user.role==="admin")) {
            return {message: "Come back as admin", status: 'error'}
    }

    return {message:'Account removed successfully', status:'success'}
}


export {addSchool, removeSchool}