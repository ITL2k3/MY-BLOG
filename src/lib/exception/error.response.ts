import STATUS_CODES from "./httpStatusCode/statusCodes";
import REASON_PHRASES from "./httpStatusCode/reasonPhrases";
export class HttpException extends Error {
    status: number;
    constructor(message: any, status: number) {
    super(message);
    this.name = this.constructor.name; //đặt tên cho name là tên của constructor
    this.status = status;
    Error.captureStackTrace(this, this.constructor); //hiển thị stack trace
  }
}

export class BadRequestException extends HttpException{
    constructor(message : any = REASON_PHRASES.BAD_REQUEST, status = STATUS_CODES.BAD_REQUEST){
        super(message, status);
    }
}
export class UnauthorizedException extends HttpException{
    constructor(message : any = REASON_PHRASES.UNAUTHORIZED, status = STATUS_CODES.UNAUTHORIZED){
        super(message, status);
    }
}