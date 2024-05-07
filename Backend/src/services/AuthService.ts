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
import { Constant } from 'src/commons/Constant';

const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
    },
});

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

    async forgotPassword(username: string): Promise<any> {
        try {
            const user = await this.userRepository.findOneByUsername(StringUtils.xssPrevent(username));
            if (!user) {
                throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_REGISTER);
            }
            // generate new password
            const newPassword = StringUtils.randomGeneratePassword(10);
            // update new password
            const hashPass = bcrypt.hashSync(newPassword, Constant.BCRYPT_ROUND);
            await this.userRepository.resetPassword(user._id, hashPass);
            // Send email to user
            await transporter.sendMail({
                from: '"PTrack" <hoangduy06104@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Reset Password", // Subject line
                text: `Your new password is: ${newPassword}`, // plain text body
                html: `Your new password is: ${newPassword}`, // html body
            });
            return { message: 'Reset success' }
        } catch (e) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }


    async validateUser(payload: any): Promise<UserModal> {
        return await this.userService.findOneByUsername(payload.username);
    }
}
