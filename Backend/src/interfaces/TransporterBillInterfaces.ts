import { Document } from 'mongoose';

export interface TransporterBillInterfaces extends Document {
    batchId: string;
    owner: string;
    deletedAt?: Date;
    deletedBy?: string;
}