import { Schema } from 'mongoose';

export const AnalysisSchema = new Schema({
    batchId: { type: String, required: true },
    ipAddress: { type: String, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });