'use server'
 import {redirect} from "next/navigation";
import { headers } from "next/headers";

import { auth } from "../auth";

export async function signIn(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const user=await auth.api.signInUsername({
        body:{
            username,
            password
        },
        headers: await headers()
    })

    redirect("/")
}