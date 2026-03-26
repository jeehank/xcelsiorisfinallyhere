import {NextResponse, NextRequest} from 'next/server';
import { auth } from '../../../../lib/auth';
import { prismaClient } from '../../../../lib/prisma';



export async function POST(request: NextRequest) {
    const { name, email, password, username } = await request.json();
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            username
        },
        },
    );

    return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
    const users = await prismaClient.user.findMany();
    return NextResponse.json(users);
}
