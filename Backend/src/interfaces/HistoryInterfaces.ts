import { Document } from 'mongoose';

export interface HistoryInterfaces extends Document {
    batchId: string;
    action: string;
    actionBy: string;
    actionDate: Date;
    deletedAt?: Date;
    deletedBy?: string;
}