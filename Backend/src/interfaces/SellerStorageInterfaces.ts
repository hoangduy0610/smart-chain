import { Document } from 'mongoose';

export interface SellerStorageInterfaces extends Document {
    batchId: string;
    owner: string;
    quantity: number;
    sold: number;
    deletedAt?: Date;
    deletedBy?: string;
}