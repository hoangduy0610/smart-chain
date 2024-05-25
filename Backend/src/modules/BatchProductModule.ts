import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalysisRepository } from 'src/repositories/AnalysisRepository';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { HistoryRepository } from 'src/repositories/HistoryRepository';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';
import { AnalysisSchema } from 'src/schemas/AnalysisSchema';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { SellerStorageSchema } from 'src/schemas/SellerStorageSchema';
import { TransporterBillSchema } from 'src/schemas/TransporterBillSchema';
import { TransporterBillService } from 'src/services/TransporterBillService';
import { BatchProductController } from '../controllers/BatchProductController';
import { BatchProductService } from '../services/BatchProductService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
        MongooseModule.forFeature([{ name: 'Analysis', schema: AnalysisSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
        MongooseModule.forFeature([{ name: 'TransporterBill', schema: TransporterBillSchema }]),
        MongooseModule.forFeature([{ name: 'SellerStorage', schema: SellerStorageSchema }]),
    ],
    providers: [
        BatchProductService,
        BatchProductRepository,
        TransporterBillService,
        TransporterBillRepository,
        AnalysisRepository,
        HistoryRepository,
    ],
    controllers: [BatchProductController],
    exports: [BatchProductService, BatchProductRepository]
})
export class BatchProductModule { }
