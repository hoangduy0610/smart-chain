import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Constant } from '../commons/Constant';
import { ApplicationException } from "../controllers/ExceptionController";
import { MessageCode } from 'src/commons/MessageCode';
import { UserRepository } from 'src/repositories/UserRepository';

const bcrypt = require('bcrypt');

@Injectable()
export class AccountService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
    }

    async register(username: string, password: string): Promise<any> {
        try {
            const hash = bcrypt.hashSync(password, Constant.BCRYPT_ROUND);
            const res = await this.userRepository.createAuth({ username, password: hash });
            return { message: "Thành Công" };
        } catch (error) {
            Logger.error('[ERROR] - ' + error.message, null, null, true);
            // throw new ApplicationException(HttpStatus.SERVICE_UNAVAILABLE, MessageCode.A_SERVICE_UNAVAILABLE);
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_CREATE_ERROR);
        }
    }


    async auth(username: string, password: string): Promise<any> {
        try {
            const authInfo = await this.userRepository.findAuthInfo(username);
            if (bcrypt.compareSync(password, authInfo.password)) return;
            // return;
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG);
        } catch (error) {
            Logger.error('[ERROR] - ' + error.message, null, null, true);
            // throw new ApplicationException(HttpStatus.SERVICE_UNAVAILABLE, MessageCode.A_SERVICE_UNAVAILABLE);
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG);
        }
    }
}
