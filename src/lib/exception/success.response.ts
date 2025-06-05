import { NextResponse } from "next/server";
import STATUS_CODES from "./httpStatusCode/statusCodes";

interface SuccessResponseInput <T> {
    statusCode: number;
    message?: string;
    metadata: T;
}



class SuccessResponse<T = Record<string, any>> {
  message: string;
  statusCode: number;
  metadata: T;

  constructor({ message, statusCode = 200, metadata = {} as T }: SuccessResponseInput<T>) {
    this.message = message || "Success";
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send() {
    return NextResponse.json(this, { status: this.statusCode });
  }
}

export class OK extends SuccessResponse{
    constructor({ message,  metadata = {}}: { message?: string; metadata: any}) {
        super({ message, statusCode: STATUS_CODES.OK, metadata });
    }
}

export class CREATED extends SuccessResponse {
    constructor({ message, metadata = {} }: { message?: string; metadata: any }) {
        super({ message, statusCode: STATUS_CODES.CREATED, metadata });
    }
}








// const { timingSafeEqual } = require('crypto')
// const {StatusCodes,ReasonPhrases} = require('./httpStatusCode')

// class SuccessResponse {
//     constructor({message, statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {}}){
//         this.message = message ? message : reasonStatusCode
//         this.statusCode = statusCode
//         this.reasonStatusCode = reasonStatusCode
//         this.metadata = metadata
//     }
//     send(res,headers = {}){
//         return res.status(this.statusCode).json(this)
//     }
// }

// class OK extends SuccessResponse{
//     constructor({message, metadata}){
//         super({message, metadata})
//     }
// }

// class CREATED extends SuccessResponse{
//     constructor({option = {},message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata ={}}){
//         super({message,statusCode,reasonStatusCode,ReasonPhrases,metadata})
//         this.option = option
//     }
// }

// module.exports = {
//     OK, CREATED, SuccessResponse
// }