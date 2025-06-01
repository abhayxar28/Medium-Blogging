import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {name, email, password, picture} = body;
    await prisma.user.create({
        data:{
            name,
            email,
            password,
            picture
        }
    })
    return NextResponse.json({
        message: 'Account is created'
    })
}

