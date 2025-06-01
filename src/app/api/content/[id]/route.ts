import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {

    const blog = await prisma.blogs.findUnique({
      where: {
        id
      }
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  await prisma.blogs.delete({
    where: { id }
  });

  return NextResponse.json({ message: "Blog deleted" });
}
