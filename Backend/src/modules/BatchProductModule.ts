import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';
import { BatchProductController } from '../controllers/BatchProductController';
import { BatchProductService } from '../services/BatchProductService';
import { AnalysisSchema } from 'src/schemas/AnalysisSchema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
        MongooseModule.forFeature([{ name: 'Analysis', schema: AnalysisSchema }]),
    ],
    providers: [BatchProductService, BatchProductRepository],
    controllers: [BatchProductController],
    exports: [BatchProductService, BatchProductRepository]
})
export class BatchProductModule { }
