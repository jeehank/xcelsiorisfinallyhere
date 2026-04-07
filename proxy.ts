import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const sess=await auth.api.getSession({
        headers: await headers()
    })

    if (!sess){
        return NextResponse.redirect(new URL('/register', request.url))
    }else if(!(sess.user.role==="admin")){
        return NextResponse.redirect(new URL('/events', request.url))
    }else{
        return NextResponse.next()
    }
}


export const config = {
  matcher: ['/admin/:path*'],
}