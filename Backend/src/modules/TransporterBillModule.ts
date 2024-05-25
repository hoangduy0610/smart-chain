import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';
import { AnalysisSchema } from 'src/schemas/AnalysisSchema';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { TransporterBillSchema } from 'src/schemas/TransporterBillSchema';
import { TransporterBillController } from '../controllers/TransporterBillController';
import { TransporterBillService } from '../services/TransporterBillService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'TransporterBill', schema: TransporterBillSchema }]),
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
        MongooseModule.forFeature([{ name: 'Analysis', schema: AnalysisSchema }]),
    ],
    providers: [TransporterBillService, TransporterBillRepository, BatchProductRepository],
    controllers: [TransporterBillController],
    exports: [TransporterBillService, TransporterBillRepository]
})
export class TransporterBillModule { }
