import { Schema } from 'mongoose';

export const TransporterBillSchema = new Schema({
    batchId: { type: String, required: true },
    owner: { type: String, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });