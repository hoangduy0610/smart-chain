import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';
import { TransporterBillSchema } from 'src/schemas/TransporterBillSchema';
import { TransporterBillController } from '../controllers/TransporterBillController';
import { TransporterBillService } from '../services/TransporterBillService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'TransporterBill', schema: TransporterBillSchema }]),
    ],
    providers: [TransporterBillService, TransporterBillRepository],
    controllers: [TransporterBillController],
    exports: [TransporterBillService, TransporterBillRepository]
})
export class TransporterBillModule { }
