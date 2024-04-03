import { Schema } from 'mongoose';

export const StampSchema = new Schema({
    stampId: { type: String, required: true },
    batchId: { type: String, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });