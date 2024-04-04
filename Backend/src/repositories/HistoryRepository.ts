import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageCode } from 'src/commons/MessageCode';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { HistoryDto } from 'src/dtos/HistoryDtos';
import { HistoryInterfaces } from 'src/interfaces/HistoryInterfaces';

@Injectable()
export class HistoryRepository {
    constructor(
        @InjectModel('History') private readonly historyModel: Model<HistoryInterfaces>,
    ) { }

    async create(history: HistoryDto, actionBy: string): Promise<HistoryInterfaces> {
        const createObj = {
            ...history,
            actionBy: actionBy,
            actionAt: new Date(),
        }
        const newHistory = new this.historyModel(createObj);
        return await newHistory.save();
    }

    async findAll(): Promise<HistoryInterfaces[]> {
        return await this.historyModel.find({ deletedAt: null }).exec();
    }

    async findById(id: string): Promise<HistoryInterfaces> {
        const product = await this.historyModel.findById(id).exec();
        if (!product || product.deletedAt) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.HISTORY_NOT_FOUND);
        }
        return product;
    }

    async update(id: string, history: HistoryDto, actionBy: string): Promise<HistoryInterfaces> {
        const updateObj = {
            ...history,
            actionBy: actionBy,
            actionAt: new Date(),
        }
        return await this.historyModel.findByIdAndUpdate(id, updateObj, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<HistoryInterfaces> {
        const deletedHistory = await this.historyModel.findById(id).exec();
        deletedHistory.deletedAt = new Date();
        deletedHistory.deletedBy = username;
        return await deletedHistory.save();
    }

    async findByBatchId(batchId: string): Promise<HistoryInterfaces[]> {
        return await this.historyModel.find({ batchId: batchId, deletedAt: null }).exec();
    }
}
