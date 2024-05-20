import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';
import { BatchProductController } from '../controllers/BatchProductController';
import { BatchProductService } from '../services/BatchProductService';
import { AnalysisSchema } from 'src/schemas/AnalysisSchema';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { TransporterBillService } from 'src/services/TransporterBillService';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';
import { TransporterBillSchema } from 'src/schemas/TransporterBillSchema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
        MongooseModule.forFeature([{ name: 'Analysis', schema: AnalysisSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
        MongooseModule.forFeature([{ name: 'TransporterBill', schema: TransporterBillSchema }]),
    ],
    providers: [BatchProductService, BatchProductRepository, TransporterBillService, TransporterBillRepository],
    controllers: [BatchProductController],
    exports: [BatchProductService, BatchProductRepository]
})
export class BatchProductModule { }
