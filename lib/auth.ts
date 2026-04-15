//Authorisation 
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import { username } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"



import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prismaClient, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    user:{
        additionalFields: {
            slugs:{
                type: "string[]"
            }
        }
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_URL as string,
    ],
    session: {
		cookieCache: {
			enabled: true,
			maxAge: 15 * 60, // 15 minutes
			strategy: "jwt" // Use JWT format
		}
	},
    advanced:{
        useSecureCookies:true
    },
    plugins: [
        admin({
            adminUserIds: ["kCTSnE8Wlh0PdD6xuuqIxT1DyaE7uvpX"], // Array of user IDs that should have admin access
        }),
        username(),
        nextCookies()
    ]
    
});