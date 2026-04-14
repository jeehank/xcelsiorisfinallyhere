'use server'
 import {redirect} from "next/navigation";
import { headers } from "next/headers";

import { auth } from "../auth";

export async function signIn(prevState, form) {
    const username=form.get('username')?.toString()
    const password=form.get('password')?.toString()

    const res=await auth.api.signInUsername({
        body:{
            username,
            password
        },
        headers: await headers(),
        asResponse: true
    })

    if (res.status===200){
        redirect('/events')
    }else{
        return {message:'Invalid credentials', status:'error'}
    }
}