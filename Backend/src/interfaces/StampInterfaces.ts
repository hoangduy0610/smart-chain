import { Document } from 'mongoose';

export interface StampInterfaces extends Document {
    stampId: string;
    batchId: string;
    deletedAt?: Date;
    deletedBy?: string;
}