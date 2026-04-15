import {NextResponse, NextRequest} from 'next/server';
import { auth } from '../../../../lib/auth';
import { prismaClient } from '../../../../lib/prisma';

import {genEmail, sanitizeUsername} from '../../../../lib/methods/utilities'

import {headers} from 'next/headers'


export async function POST(request: NextRequest) {
    const sess=await auth.api.getSession({
        headers: await headers()
    })

    if (!sess || !(sess.user.role==="admin")) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    

    let {password, username } = await request.json();
    if (!password || !username) {
        return NextResponse.json({message: "Username and password are required"}, {status: 422})
    }
    const name=username
    username = sanitizeUsername(username)
    const email=genEmail(username)
    let data:any
    try{
        data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            username
        } as any
        },
    );
    }catch(e){
        return NextResponse.json({message: "Error creating user", error: e.message}, {status: e.statusCode || 500})
    }
    

    return NextResponse.json(data);
}


