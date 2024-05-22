import { Schema } from 'mongoose';
import { EnumRoles } from 'src/commons/EnumRoles';

export const UserSchema = new Schema({
    roles: [{ type: String, require: false, enum: Object.keys(EnumRoles) }],
    name: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: String, required: false, default: '' },
    otpValid: { type: Date, required: false, default: Date.now() },
    resetPasswordToken: { type: String, required: false, default: '' },
    phoneNumber: { type: String, required: false },
    deletedAt: { type: Date, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });