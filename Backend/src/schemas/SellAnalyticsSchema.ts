import { Schema } from 'mongoose';

export const SellAnalyticsSchema = new Schema({
    batchId: { type: String, required: true },
    pricing: { type: String, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });