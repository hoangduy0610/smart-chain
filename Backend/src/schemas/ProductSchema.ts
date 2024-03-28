import { Schema } from 'mongoose';
import { EProductStatus } from 'src/commons/EnumProductStatus';

export const AttributeSchema = new Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });

export const ProductSchema = new Schema({
    owner: { type: String, required: true },
    productId : { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    description: { type: String, required: true },
    attributes: [AttributeSchema],
    imageUrl: { type: String, required: true },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });