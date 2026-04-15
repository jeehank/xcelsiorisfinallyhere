import {NextResponse, NextRequest} from 'next/server';
import { auth } from '../../../../lib/auth';
import { prismaClient } from '../../../../lib/prisma';

import {genEmail} from '../../../../lib/methods/utilities'

import {headers} from 'next/headers'


export async function POST(request: NextRequest) {
        return NextResponse.json({message: "Not an alllowed method"}, {status: 401})
        const {password, username } = await request.json();
        if (!password || !username) {
            return NextResponse.json({message: "Username and password are required"}, {status: 422})
        }
        const name=username
    
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