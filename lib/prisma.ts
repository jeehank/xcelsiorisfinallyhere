import { PrismaClient } from "../generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg"


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const PrismaClientSingleton = ()=>{
    const ExtendedClient=new PrismaClient({adapter}).$extends({
        query:{
            event:{
                async create({model, args, query}: any){
                    const {name, overview, eventDetails, date, time, location, NOP,  ...randbs}=args.data

                    //SLUG GENERATION
                    const slug = name
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric, non-space, non-hyphen characters
                        .replace(/\s+/g, '-') // Replace spaces with hyphens
                        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
                        .replace(/^-+|-+$/g, ''); // Remove hyphens at start and end

                    if (!slug)
                        throw new Error("Invalid event title for slug generation!");

                    const details=eventDetails.split('\n')
                    const createdEvent=await query({data:{name, overview, date, time, slug, details, location, NOP}},)

                    return createdEvent;
                }
            }
        }
    })
    return ExtendedClient
}

declare global{
    var prisma: undefined|ReturnType<typeof PrismaClientSingleton>
}

const prismaClient=globalThis.prisma ?? PrismaClientSingleton()

if(process.env.NODE_ENV !=="production") globalThis.prisma=prismaClient


export {prismaClient}