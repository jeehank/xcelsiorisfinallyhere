import {NextResponse, NextRequest} from 'next/server'
import {headers} from 'next/headers'
import { auth } from '../../../lib/auth';

export async function GET(req: NextRequest) {
    const userId="kCTSnE8Wlh0PdD6xuuqIxT1DyaE7uvpX"
    const data=await auth.api.setRole({
		body: {
			userId: userId,
			role: "admin",
		},
		headers: await headers()
	});
    return NextResponse.json(data);

}