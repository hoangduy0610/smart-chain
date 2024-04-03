import { Schema } from 'mongoose';
import { EProductStatus } from 'src/commons/EnumProductStatus';

export const BatchProductSchema = new Schema({
    owner: { type: String, required: true },
    batchId: { type: String, required: true },
    productId: { type: String, required: true },
    status: { type: String, required: true, enum: EProductStatus},
    quantity: { type: Number, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });