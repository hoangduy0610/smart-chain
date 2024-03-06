import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Constant } from 'src/commons/Constant';
import { AuthController } from 'src/controllers/AuthController';
import { JwtStrategy } from 'src/guards/JWTStrategy';
import { AccountService } from 'src/services/AccountService';
import { AuthService } from '../services/AuthService';
import { UserModule } from './UserModule';

@Module({
  imports: [
    UserModule, PassportModule,
    JwtModule.register({
      secret: Constant.JWT_SECRET,
      signOptions: { expiresIn: Constant.JWT_EXPIRE },
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AccountService]
})
export class AuthModule { }
