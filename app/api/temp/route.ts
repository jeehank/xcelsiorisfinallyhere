import {NextResponse, NextRequest} from 'next/server'
import {headers} from 'next/headers'
import { auth } from '../../../lib/auth';

export async function GET(req: NextRequest) {
    const userId="GG2CT4PDSxEfbMXI29fq8qytA8EYvtls"
    const data=await auth.api.setRole({
		body: {
			userId: userId,
			role: "admin",
		},
		headers: await headers()
	});
    return NextResponse.json(data);

}