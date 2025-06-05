import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() : Promise<NextResponse> {
    try{
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    }catch (error) {
        console.error("Failed to connect to the database:", error);
      
    }


    return NextResponse.json({
        message: "Hello from the API route!",
    });
}

