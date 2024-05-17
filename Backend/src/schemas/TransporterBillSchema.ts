import { Schema } from 'mongoose';

export const TransporterBillSchema = new Schema({
    batchId: { type: String, required: true },
    owner: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    length: { type: Number, required: false },
    currentPos: { type: String, required: false },
    status: { type: String, required: false },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });