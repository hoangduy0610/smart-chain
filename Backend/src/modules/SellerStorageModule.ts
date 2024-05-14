import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerStorageRepository } from 'src/repositories/SellerStorageRepository';
import { SellerStorageSchema } from 'src/schemas/SellerStorageSchema';
import { SellerStorageController } from '../controllers/SellerStorageController';
import { SellerStorageService } from '../services/SellerStorageService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'SellerStorage', schema: SellerStorageSchema }]),
    ],
    providers: [SellerStorageService, SellerStorageRepository],
    controllers: [SellerStorageController],
    exports: [SellerStorageService, SellerStorageRepository]
})
export class SellerStorageModule { }
