import { Schema } from 'mongoose';
import { EnumRoles } from 'src/commons/EnumRoles';

export const UserSchema = new Schema({
    roles: [{ type: String, require: false, enum: Object.keys(EnumRoles) }],
    name: { type: String, required: true },
    phoneNumber: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });