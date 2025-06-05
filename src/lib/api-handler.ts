// lib/api-handler.ts
import { NextRequest, NextResponse } from "next/server";
import { HttpException, UnauthorizedException } from "./exception/error.response";
import JWT from 'jsonwebtoken';
import { verifyToken } from "./auth";
export function withErrorHandler(
    handler: (req: NextRequest) => Promise<NextResponse>
) {
    return async function (req: NextRequest) {
        try {
            return await handler(req);
        } catch (error: any) {
            if (error instanceof HttpException) {
                return NextResponse.json(
                    {
                        statusCode: error.status,
                        message: error.message,
                        error: error.name,
                    },
                    { status: error.status }
                );
            }
            console.error("Unhandled error:", error);

            // fallback lỗi không xác định
            return NextResponse.json(
                {
                    statusCode: 500,
                    message: "Internal Server Error",
                },
                { status: 500 }
            );
        }
    }
};

export function protectedRoute(handler: (req: NextRequest) => Promise<NextResponse>){
    return async (req: NextRequest) => {
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if(!token) throw new UnauthorizedException("token not found");
        if(!verifyToken(token)) throw new UnauthorizedException("token is invalid");
        return handler(req);
        
    }
}