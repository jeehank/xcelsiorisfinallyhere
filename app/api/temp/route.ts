import {NextResponse, NextRequest} from 'next/server'
import {headers} from 'next/headers'
import { auth } from '../../../lib/auth';

export async function GET(req: NextRequest) {
    const userId="kCTSnE8Wlh0PdD6xuuqIxT1DyaE7uvpX"
	let data
	try{
		 data=await auth.api.setRole({
			body: {
				userId: userId,
				role: "admin",
			},
			headers: await headers()
		});
	}catch{
		return NextResponse.json({message:'Something went wrong'}, {status: 500})
	}
		
    return NextResponse.json(data);

}