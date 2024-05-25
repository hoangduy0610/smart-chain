import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MessageCode } from 'src/commons/MessageCode';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { AuthDto } from 'src/dtos/AuthDto';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/CreateUserDto';
import { UserInterfaces } from 'src/interfaces/UserInterfaces';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<any>,
        @InjectModel('User') private readonly userModel: Model<UserInterfaces>
    ) { }

    async listUser(): Promise<UserInterfaces[]> {
        const res = await this.userModel.aggregate([
            { "$match": { "deletedAt": null } },
            { "$addFields": { "userId": { "$toString": "$_id" } } },
            {
                "$lookup": {
                    "from": "auths",
                    let: {
                        userId: "$userId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$userId",
                                        "$$userId"
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                username: 1
                            }
                        }
                    ],
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $set: {
                    username: "$user.username"
                }
            },
            {
                $project: {
                    user: 0
                }
            }
        ]);
        return res
    }

    async listUserForRoot(): Promise<UserInterfaces[]> {
        return await this.userModel.find()
    }

    async findAuthInfo(username: string): Promise<any> {
        return await this.authModel.findOne({ username });
    }

    async findUserById(id: string): Promise<UserInterfaces> {
        const objId = new mongoose.mongo.ObjectId(id);
        const res = await this.userModel.aggregate([
            { "$match": { "_id": objId } },
            { "$addFields": { "userId": { "$toString": "$_id" } } },
            {
                "$lookup": {
                    "from": "auths",
                    let: {
                        userId: "$userId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$userId",
                                        "$$userId"
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                username: 1
                            }
                        }
                    ],
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $set: {
                    username: "$user.username"
                }
            },
            {
                $project: {
                    user: 0
                }
            }
        ]);
        return res[0];
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
        return await this.userModel.create({
            name: dto.name,
            phoneNumber: dto.phoneNumber,
            email: dto.email,
            roles: [dto.roles],
            otp: '',
            otpValid: new Date(),
            resetPasswordToken: '',
        });
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

    async update(dto: UpdateUserDto, id: string): Promise<UserInterfaces> {
        return await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async delete(id: string): Promise<UserInterfaces> {
        const user = await this.userModel.findById(id);
        if (!user) throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.USER_NOT_FOUND);

        user.deletedAt = new Date();
        await user.save();

        await this.authModel.findOneAndUpdate({ userId: id }, { deletedAt: new Date() });
        return user;
    }

    async resetPassword(id: string, hashPass: string): Promise<any> {
        return await this.authModel.findOneAndUpdate({ userId: id }, { password: hashPass });
    }
}