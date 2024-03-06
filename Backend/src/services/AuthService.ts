import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from './UserService';
import { AuthDto } from 'src/dtos/AuthDto';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { AccountService } from './AccountService';
import { UserModal } from 'src/modals/UserModals';
import { UserRepository } from 'src/repositories/UserRepository';
import { MessageCode } from 'src/commons/MessageCode';
import { StringUtils } from 'src/utils/StringUtils';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly accountService: AccountService,
        private readonly userRepository: UserRepository,
    ) {
    }

    async register(userAuthDto: AuthDto): Promise<any> {
        try {
            Logger.log('[START] - Register with user: ' + StringUtils.xssPrevent(userAuthDto.username), null, false);

            const user = await this.userRepository.findAuthInfo(StringUtils.xssPrevent(userAuthDto.username));

            if (user) {
                throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_ALREADY_EXISTED);
            }
            return await this.accountService.register(StringUtils.xssPrevent(userAuthDto.username), StringUtils.xssPrevent(userAuthDto.password));

        } catch (e) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.USER_CREATE_ERROR)
        }
    }


    async login(userAuthDto: AuthDto): Promise<any> {
        try {
            Logger.log('[START] - Login with user: ' + StringUtils.xssPrevent(userAuthDto.username), null, false);

            const user = await this.userRepository.findOneByUsername(StringUtils.xssPrevent(userAuthDto.username));
            Logger.log(user);
            if (!user) {
                throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_REGISTER);
            }
            const dt = new UserModal(user);
            // if (!user.active) {
            // 	throw new ApplicationException(HttpStatus.UNAUTHORIZED, "Người dùng chưa được kích hoạt hoặc đang bị" +
            // 		" khóa ");
            // }
            const userData: any = await this.accountService.auth(StringUtils.xssPrevent(userAuthDto.username), StringUtils.xssPrevent(userAuthDto.password));
            const userPayload: any = { ...dt, username: StringUtils.xssPrevent(userAuthDto.username) };
            const JWT = this.jwtService.sign(userPayload);
            return { token: JWT, info: dt };
        } catch (e) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG)
        }
    }


    async validateUser(payload: any): Promise<UserModal> {
        return await this.userService.findOneByUsername(payload.username);
    }
}
