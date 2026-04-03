<<<<<<< HEAD
import { betterAuth } from "better-auth";
=======
//Authorisation 
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import { username } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"



>>>>>>> auth
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prismaClient, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
<<<<<<< HEAD
=======
    session: {
		cookieCache: {
			enabled: true,
			maxAge: 15 * 60, // 15 minutes
			strategy: "jwt" // Use JWT format
		}
	},
    plugins: [
        admin({
            adminUserIds: ["GG2CT4PDSxEfbMXI29fq8qytA8EYvtls"], // Array of user IDs that should have admin access
        }),
        username(),
        nextCookies()
    ]
    
>>>>>>> auth
});