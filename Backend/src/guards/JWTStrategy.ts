import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { Constant } from '../commons/Constant';
import { ApplicationException } from '../controllers/ExceptionController';
import { MessageCode } from '../commons/MessageCode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Constant.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_NOT_FOUND);
        }
        // if (!user.active) {
        //     throw new ApplicationException(HttpStatus.UNAUTHORIZED, "Người dùng chưa được kích hoạt hoặc đang bị khóa ")
        // }
        Logger.log('Authorized - ' + user.id);
        return user;
    }
}
