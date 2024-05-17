import { Document } from 'mongoose';

export interface TransporterBillInterfaces extends Document {
    batchId: string;
    owner: string;
    departure: string;
    destination: string;
    length?: number;
    currentPos?: string;
    status?: string;
    deletedAt?: Date;
    deletedBy?: string;
}