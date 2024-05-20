import { Document } from 'mongoose';

export interface SellAnalyticsInterfaces extends Document {
    batchId: string;
    pricing: number;
    deletedAt?: Date;
    deletedBy?: string;
}