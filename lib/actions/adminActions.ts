'use server'
import {cookies} from 'next/headers'

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
        return {message:'Account passed successfully', status:'success'}
    }catch(e){
        return {message:'Couldn\'t pass this account', status:'error'}
    }
    
}


export {addSchool}