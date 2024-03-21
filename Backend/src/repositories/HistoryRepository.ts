import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryInterfaces } from 'src/interfaces/HistoryInterfaces';

@Injectable()
export class HistoryRepository {
    constructor(
        @InjectModel('History') private readonly historyModel: Model<HistoryInterfaces>,
    ) { }

    async create(history: HistoryInterfaces): Promise<HistoryInterfaces> {
        const newHistory = new this.historyModel(history);
        return await newHistory.save();
    }

    async findAll(): Promise<HistoryInterfaces[]> {
        return await this.historyModel.find().exec();
    }

    async findById(id: string): Promise<HistoryInterfaces> {
        return await this.historyModel.findById(id).exec();
    }

    async update(id: string, history: HistoryInterfaces): Promise<HistoryInterfaces> {
        return await this.historyModel.findByIdAndUpdate(id, history, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<HistoryInterfaces> {
        const deletedHistory = await this.historyModel.findById(id).exec();
        deletedHistory.deletedAt = new Date();
        deletedHistory.deletedBy = username;
        return await deletedHistory.save();
    }

    async findByBatchId(batchId: string): Promise<HistoryInterfaces[]> {
        return await this.historyModel.find({ batchId: batchId }).exec();
    }
}
