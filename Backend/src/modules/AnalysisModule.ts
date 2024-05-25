import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalysisController } from 'src/controllers/AnalysisController';
import { AnalysisRepository } from 'src/repositories/AnalysisRepository';
import { SellerStorageRepository } from 'src/repositories/SellerStorageRepository';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';
import { AnalysisSchema } from 'src/schemas/AnalysisSchema';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { SellAnalyticsSchema } from 'src/schemas/SellAnalyticsSchema';
import { SellerStorageSchema } from 'src/schemas/SellerStorageSchema';
import { TransporterBillSchema } from 'src/schemas/TransporterBillSchema';
import { UserSchema } from 'src/schemas/UserSchema';
import { AnalysisService } from 'src/services/AnalysisService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Analysis', schema: AnalysisSchema }]),
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
        MongooseModule.forFeature([{ name: 'TransporterBill', schema: TransporterBillSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'SellerStorage', schema: SellerStorageSchema }]),
        MongooseModule.forFeature([{ name: 'SellAnalytics', schema: SellAnalyticsSchema }]),
    ],
    providers: [AnalysisService, AnalysisRepository, TransporterBillRepository, SellerStorageRepository],
    controllers: [AnalysisController],
    exports: []
})
export class AnalysisModule { }
