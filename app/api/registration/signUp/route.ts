import {NextResponse, NextRequest} from 'next/server';
import { auth } from '../../../../lib/auth';
import { prismaClient } from '../../../../lib/prisma';

import {headers} from 'next/headers'


export async function POST(request: NextRequest) {
    const sess=await auth.api.getSession({
        headers: await headers()
    })

    if (!sess || !(sess.user.role==="admin")) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    

    const {password, username } = await request.json();
    const name=username
    const email=username.append('@gmail.com')
    let data:any
    try{
        data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            username
        },
        },
    );
    }catch(e){
        return NextResponse.json({message: "Error creating user", error: e.message}, {status: e.statusCode || 500})
    }
    

    return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
    const users = await prismaClient.user.findMany();
    return NextResponse.json(users);
}
