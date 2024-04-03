import { Schema } from 'mongoose';

export const AnalysisSchema = new Schema({
    stampId: { type: String, required: true },
    productId: { type: String, required: true },
    ipAddress: { type: String, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });