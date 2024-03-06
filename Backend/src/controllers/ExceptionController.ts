import {HttpException, HttpStatus} from '@nestjs/common';

export class ApplicationException extends HttpException {
    constructor(httpStatus: HttpStatus, message?: string) {
        super(message || 'No message available', httpStatus);
    }

}
