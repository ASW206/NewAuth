import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../db/prismaClient";
export async function GET(req:NextRequest) {
    try{
        const url=new URL(req.url)
        console.log("new URL(req.url ) :  "+url)
        console.log("req.url = "+req.url)
        const email = url.searchParams.get("email");
        const token = url.searchParams.get("token");
        if (!token || !email){
            return NextResponse.json({message:"Invalid token"})
            
        }
        const dbToken = await prisma.verificationToken.findFirst({
            where:{
                token:token
            }
        })
        if (dbToken?.token === token){
            await prisma.user.update({
                    where:{
                        email:email
                    },
                    data: {
                        emailVerified: new Date()
                    }
                })

            return NextResponse.json({message:"Email verified!!Please Login"})
            


        }

      

    }catch(err:unknown){
        console.log(err)
        return NextResponse.json({message:err})
    }
    
}