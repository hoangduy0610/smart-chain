import { Document } from "mongoose";

export interface UserInterfaces extends Document {
    _id: string;
    roles: string[];
    name: string;
    email: string;
    otp?: string;
    otpValid?: Date;
    resetPasswordToken?: string;
    phoneNumber: string;
    username?: string;
    deletedAt?: Date;
}