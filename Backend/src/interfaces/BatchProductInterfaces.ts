import { Document } from 'mongoose';

export interface BatchProductInterfaces extends Document {
    owner: string;
    name: string;
    batchId: string;
    status: string;
    productId: string;
    quantity: number;
    deletedAt?: Date;
    deletedBy?: string;
}