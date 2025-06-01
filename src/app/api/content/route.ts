import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {title, description, likes, userId, date, tags, time, blogImage} = body;
    
    if(!title && !description){
        return NextResponse.json({
            message: "title or decription not present"
        })
    }

    try {
        const blog = await prisma.blogs.create({
            data:{
                title,
                description,
                likes,
                date,
                userId,
                tags,
                time,
                blogImage
            }
        })
        return NextResponse.json(blog);
    } catch (err) {
          console.error("Database Error:", err);
        return new NextResponse("Database error", { status: 500 });
      }   
}

export async function GET(){
    const blogs = await prisma.blogs.findMany({
        include:{
            user:{
                select:{
                    name: true,
                    picture: true
                }
            }
        }
    })

    return NextResponse.json({
        blogs
    })
}
