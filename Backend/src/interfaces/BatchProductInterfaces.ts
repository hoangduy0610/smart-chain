import { Document } from 'mongoose';

export interface BatchProductInterfaces extends Document {
    owner: string;
    incharge: string;
    name: string;
    batchId: string;
    status: string;
    productId: string;
    quantity: number;
    transporter?: string;
    retailer?: string;
    deletedAt?: Date;
    deletedBy?: string;
}