"use server";

import { NextResponse } from "next/server";
import { prisma } from "../../../db/prismaClient";

export const GET = async ()=>{
    const games=await prisma.game.findMany();
    return NextResponse.json({data:games})

}