import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { HistoryRepository } from 'src/repositories/HistoryRepository';
import { SellerStorageRepository } from 'src/repositories/SellerStorageRepository';
import { AnalysisSchema } from 'src/schemas/AnalysisSchema';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { SellAnalyticsSchema } from 'src/schemas/SellAnalyticsSchema';
import { SellerStorageSchema } from 'src/schemas/SellerStorageSchema';
import { SellerStorageController } from '../controllers/SellerStorageController';
import { SellerStorageService } from '../services/SellerStorageService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Analysis', schema: AnalysisSchema }]),
        MongooseModule.forFeature([{ name: 'SellerStorage', schema: SellerStorageSchema }]),
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
        MongooseModule.forFeature([{ name: 'SellAnalytics', schema: SellAnalyticsSchema }]),
    ],
    providers: [SellerStorageService, SellerStorageRepository, BatchProductRepository, HistoryRepository],
    controllers: [SellerStorageController],
    exports: [SellerStorageService, SellerStorageRepository]
})
export class SellerStorageModule { }
