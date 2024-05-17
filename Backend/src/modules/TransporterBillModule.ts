import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';
import { TransporterBillSchema } from 'src/schemas/TransporterBillSchema';
import { TransporterBillController } from '../controllers/TransporterBillController';
import { TransporterBillService } from '../services/TransporterBillService';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { BatchProductSchema } from 'src/schemas/BatchProductSchema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'TransporterBill', schema: TransporterBillSchema }]),
        MongooseModule.forFeature([{ name: 'BatchProduct', schema: BatchProductSchema }]),
    ],
    providers: [TransporterBillService, TransporterBillRepository, BatchProductRepository],
    controllers: [TransporterBillController],
    exports: [TransporterBillService, TransporterBillRepository]
})
export class TransporterBillModule { }
