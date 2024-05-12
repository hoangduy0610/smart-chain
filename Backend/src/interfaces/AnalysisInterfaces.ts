import { Document } from 'mongoose';

export interface AnalysisInterface extends Document {
    batchId: string;
    ipAddress: string;
    deletedAt?: Date;
    deletedBy?: String;
}