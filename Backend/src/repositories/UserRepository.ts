import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from 'src/dtos/AuthDto';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { UserInterfaces } from 'src/interfaces/UserInterfaces';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<any>,
        @InjectModel('User') private readonly userModel: Model<UserInterfaces>
    ) { }

    async listUser(): Promise<UserInterfaces[]> {
        return await this.userModel.find({})
    }

    async listUserForRoot(): Promise<UserInterfaces[]> {
        return await this.userModel.find()
    }

    async findAuthInfo(username: string): Promise<any> {
        return await this.authModel.findOne({ username });
    }

    async findUserById(id: string): Promise<UserInterfaces> {
        return await this.userModel.findById(id)
    }

    async findOneByUsername(username: string): Promise<UserInterfaces> {
        try {
            const auth = await this.authModel.findOne({ username });
            return await this.userModel.findById(auth.userId)
        } catch (e) {
            Logger.log(e);
            return null
        }
    }

    async createUser(dto: CreateUserDto): Promise<UserInterfaces> {
        // const res = await this.userDocs.add({ schoolId: dto.schoolId })
        return await this.userModel.create({ name: dto.name });
    }

    async createAuth(dto: AuthDto): Promise<any> {
        return await new this.authModel({
            username: dto.username,
            password: dto.password
        }).save();
    }

    async setAuth(username: string, userId: string): Promise<any> {
        return await this.authModel.findOneAndUpdate({ username }, { userId })
    }

    async setDefault(uid: string, defaultSchool: string): Promise<UserInterfaces> {
        return await this.userModel.findOneAndUpdate({ _id: uid }, { defaultSchool }, { returnOriginal: false })
    }
}