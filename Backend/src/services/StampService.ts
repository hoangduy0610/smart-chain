import { Injectable } from '@nestjs/common';
import { StampInterfaces } from '../interfaces/StampInterfaces';
import { StampRepository } from '../repositories/StampRepository';
import { InjectModel } from '@nestjs/mongoose';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';
import { Model } from 'mongoose';
import { AnalysisInterface } from 'src/interfaces/AnalysisInterfaces';

@Injectable()
export class StampService {
    constructor(
        private readonly stampRepository: StampRepository,
    ) { }

    async create(stamp: StampInterfaces): Promise<StampInterfaces> {
        return await this.stampRepository.create(stamp);
    }

    async findAll(): Promise<StampInterfaces[]> {
        return await this.stampRepository.findAll();
    }

    async findById(id: string): Promise<StampInterfaces> {
        return await this.stampRepository.findById(id);
    }

    async update(id: string, stamp: StampInterfaces): Promise<StampInterfaces> {
        return await this.stampRepository.update(id, stamp);
    }

    async delete(username: string, id: string): Promise<StampInterfaces> {
        return await this.stampRepository.delete(username, id);
    }
}
