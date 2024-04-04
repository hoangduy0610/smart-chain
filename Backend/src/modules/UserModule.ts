import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/repositories/UserRepository';
import { AuthSchema } from 'src/schemas/AuthSchema';
import { UserSchema } from 'src/schemas/UserSchema';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { AccountService } from 'src/services/AccountService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  ],
  providers: [UserService, UserRepository, AccountService],
  controllers: [UserController],
  exports: [UserService, UserRepository]
})
export class UserModule { }
