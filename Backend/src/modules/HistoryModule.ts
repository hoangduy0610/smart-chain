import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryRepository } from 'src/repositories/HistoryRepository';
import { HistorySchema } from 'src/schemas/HistorySchema';
import { HistoryController } from '../controllers/HistoryController';
import { HistoryService } from '../services/HistoryService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
    ],
    providers: [HistoryService, HistoryRepository],
    controllers: [HistoryController],
    exports: [HistoryService, HistoryRepository]
})
export class HistoryModule { }
