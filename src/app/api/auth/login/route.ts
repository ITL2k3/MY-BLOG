import {NextRequest} from "next/server";
import { BadRequestException } from "@/lib/exception/error.response";
import { generateToken } from "@/lib/auth";
import { OK } from "@/lib/exception/success.response";
import {comparePassword} from "./login.service";
import {withErrorHandler} from "@/lib/api-handler";


const POST_LOGIN_CONTROLLER = async (req: NextRequest) => {
    const {username, password} = await req.json();
    if(!username || !password) throw new BadRequestException("Username and password are required");
    await comparePassword(password); //not throw error -> 
    const token = generateToken(username);
    const res = new OK({
        message: "Login successfully",
        metadata: {
            username,
            token: token
        }
    }).send()
    return res;

}


export const POST = withErrorHandler(POST_LOGIN_CONTROLLER)
