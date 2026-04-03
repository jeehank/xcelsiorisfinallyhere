import { PrismaClient } from "../generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg"


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const PrismaClientSingleton = ()=>{
    const ExtendedClient=new PrismaClient({adapter})
    return ExtendedClient
}

declare global{
    var prisma: undefined|ReturnType<typeof PrismaClientSingleton>
}

<<<<<<< HEAD
const prismaClient=globalThis.prisma||PrismaClientSingleton()
=======
const prismaClient=globalThis.prisma ?? PrismaClientSingleton()
>>>>>>> auth

if(process.env.NODE_ENV !=="production") globalThis.prisma=prismaClient


export {prismaClient}