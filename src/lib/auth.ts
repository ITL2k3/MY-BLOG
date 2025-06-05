import JWT from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const SECRET = process.env.SECRET_KEY

export function generateToken(userName: string): string {
    return JWT.sign({userName}, SECRET!, {
        expiresIn: '7d',
    })
}

export function verifyToken(token: string): boolean {
    try {
        JWT.verify(token, SECRET!);
        return true
    } catch (err) {
        return false
    }
}

