import {auth} from '../../lib/auth'
import {headers} from 'next/headers'

import { redirect } from 'next/navigation'

const page = async () => {

    const sess=await auth.api.getSession({
        headers: await headers()
    })
    if (!sess) {
        redirect('/register')
    }
    
    return (
        <div>
            <h1>Username: {sess.user.displayUsername}</h1>
        </div>
    )
}

export default page