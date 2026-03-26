//Authorisation 
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import { username } from "better-auth/plugins"



import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prismaClient, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin({
            adminUserIds: ["GG2CT4PDSxEfbMXI29fq8qytA8EYvtls"], // Array of user IDs that should have admin access
        }),
        username()
    ]
    
});