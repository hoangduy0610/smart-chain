import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailSendingProcessor } from 'src/backgroundTasks/EmailSending.queue';
import { Constant } from 'src/commons/Constant';
import { AuthController } from 'src/controllers/AuthController';
import { JwtStrategy } from 'src/guards/JWTStrategy';
import { AccountService } from 'src/services/AccountService';
import { AuthService } from '../services/AuthService';
import { UserModule } from './UserModule';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailSending',
    }),

    UserModule,
    PassportModule,

    JwtModule.register({
      secret: Constant.JWT_SECRET,
      signOptions: { expiresIn: Constant.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AccountService,
    EmailSendingProcessor,
  ],
})
export class AuthModule { }
