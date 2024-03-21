import { Injectable } from '@nestjs/common';
import { HistoryInterfaces } from '../interfaces/HistoryInterfaces';
import { HistoryRepository } from '../repositories/HistoryRepository';

@Injectable()
export class HistoryService {
    constructor(
        private readonly historyRepository: HistoryRepository,
    ) { }
    
    async create(history: HistoryInterfaces): Promise<HistoryInterfaces> {
        return await this.historyRepository.create(history);
    }

    async findAll(): Promise<HistoryInterfaces[]> {
        return await this.historyRepository.findAll();
    }

    async findById(id: string): Promise<HistoryInterfaces> {
        return await this.historyRepository.findById(id);
    }

    async update(id: string, history: HistoryInterfaces): Promise<HistoryInterfaces> {
        return await this.historyRepository.update(id, history);
    }

    async delete(username: string, id: string): Promise<HistoryInterfaces> {
        return await this.historyRepository.delete(username, id);
    }
}
