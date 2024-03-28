import { Schema } from 'mongoose';

export const HistorySchema = new Schema({
    batchId: { type: String, required: true },
    action: { type: String, required: true },
    actionBy: { type: String, required: true },
    actionDate: { type: Date, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });