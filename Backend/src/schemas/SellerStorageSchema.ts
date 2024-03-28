import { Schema } from 'mongoose';

export const SellerStorageSchema = new Schema({
    batchId: { type: String, required: true },
    owner: { type: String, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });