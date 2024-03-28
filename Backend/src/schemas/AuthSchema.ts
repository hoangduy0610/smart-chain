import { Schema } from 'mongoose';

export const AuthSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, required: false },
    deletedAt: { type: Date, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });