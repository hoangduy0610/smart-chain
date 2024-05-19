import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerStorageRepository } from 'src/repositories/SellerStorageRepository';
import { SellerStorageSchema } from 'src/schemas/SellerStorageSchema';
import { SellerStorageController } from '../controllers/SellerStorageController';
import { SellerStorageService } from '../services/SellerStorageService';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { SellAnalyticsSchema } from 'src/schemas/SellAnalyticsSchema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'SellerStorage', schema: SellerStorageSchema }]),
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
        MongooseModule.forFeature([{ name: 'SellAnalytics', schema: SellAnalyticsSchema }]),
    ],
    providers: [SellerStorageService, SellerStorageRepository, BatchProductRepository],
    controllers: [SellerStorageController],
    exports: [SellerStorageService, SellerStorageRepository]
})
export class SellerStorageModule { }
