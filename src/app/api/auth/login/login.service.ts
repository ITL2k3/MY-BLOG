import {NextRequest, NextResponse} from "next/server";
import fs from 'fs/promises'
import { BadRequestException, UnauthorizedException } from "@/lib/exception/error.response";
import { compare } from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { OK } from "@/lib/exception/success.response";

const SECRET_FILE_PATH = 'src/app/api/auth/admin.secret.json'

export const comparePassword = async (password: string): Promise<void> => {
    const fileRead = await fs.readFile(SECRET_FILE_PATH);
    const {username: adminUsername, passwordHash} = JSON.parse(fileRead.toString());
    const isMatchPassword = await compare(password, passwordHash);
    if(!isMatchPassword) throw new UnauthorizedException("Username or password is incorrect");
   
    
}
