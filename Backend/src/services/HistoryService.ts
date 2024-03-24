import { Injectable } from '@nestjs/common';
import { HistoryInterfaces } from '../interfaces/HistoryInterfaces';
import { HistoryRepository } from '../repositories/HistoryRepository';
import { HistoryDto } from 'src/dtos/HistoryDtos';

@Injectable()
export class HistoryService {
    constructor(
        private readonly historyRepository: HistoryRepository,
    ) { }

    async create(history: HistoryDto, actionBy: string): Promise<HistoryInterfaces> {
        return await this.historyRepository.create(history, actionBy);
    }

    async findAll(): Promise<HistoryInterfaces[]> {
        return await this.historyRepository.findAll();
    }

    async findById(id: string): Promise<HistoryInterfaces> {
        return await this.historyRepository.findById(id);
    }

    async update(id: string, history: HistoryDto, actionBy: string): Promise<HistoryInterfaces> {
        return await this.historyRepository.update(id, history, actionBy);
    }

    async delete(username: string, id: string): Promise<HistoryInterfaces> {
        return await this.historyRepository.delete(username, id);
    }

    async findByBatchId(batchId: string): Promise<HistoryInterfaces[]> {
        return await this.historyRepository.findByBatchId(batchId);
    }
}
