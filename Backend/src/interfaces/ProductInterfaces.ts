import { Document } from "mongoose";

interface ProductAttributes {
    name: string;
    value: string;
}

export interface ProductInterfaces extends Document {
    _id: string;
    owner: string;
    name: string;
    productId: string;
    price: string;
    attributes: ProductAttributes[];
    description: string;
    imageUrl: string;
    deletedAt?: Date;
    deletedBy?: string;
}