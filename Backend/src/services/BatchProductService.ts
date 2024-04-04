import { Injectable } from '@nestjs/common';
import { BatchProductInterfaces } from '../interfaces/BatchProductInterfaces';
import { BatchProductRepository } from '../repositories/BatchProductRepository';

@Injectable()
export class BatchProductService {
    constructor(
        private readonly batchProductRepository: BatchProductRepository,
    ) { }
    
    async create(batchProduct: BatchProductInterfaces): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.create(batchProduct);
    }

    async findAll(): Promise<BatchProductInterfaces[]> {
        return await this.batchProductRepository.findAll();
    }

    async findById(id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.findById(id);
    }

    async update(id: string, batchProduct: BatchProductInterfaces): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.update(id, batchProduct);
    }

    async delete(username: string, id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.delete(username, id);
    }
}
