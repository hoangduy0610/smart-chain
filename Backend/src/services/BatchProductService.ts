import { Injectable } from '@nestjs/common';
import { BatchProductInterfaces } from '../interfaces/BatchProductInterfaces';
import { BatchProductRepository } from '../repositories/BatchProductRepository';
import { EnumRoles } from 'src/commons/EnumRoles';
import { IdUtils } from 'src/utils/IdUtils';
import { CreateBatchProductDto, EditBatchProductDto } from 'src/dtos/BatchProductDtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalysisInterface } from 'src/interfaces/AnalysisInterfaces';

@Injectable()
export class BatchProductService {
    constructor(
        private readonly batchProductRepository: BatchProductRepository,
        @InjectModel('BatchProduct') private readonly batchProductModel: Model<BatchProductInterfaces>,
        @InjectModel('Analysis') private readonly analysisModel: Model<AnalysisInterface>,
    ) { }

    async scanStamp(batchId: string, ipAddress: string): Promise<any> {
        await this.analysisModel.create({
            batchId: batchId,
            ipAddress: ipAddress,
        })
        return await this.batchProductModel.aggregate([
            {
                $match: {
                    batchId: batchId
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: 'productId',
                    as: 'product'
                }
            },
            {
                $lookup: {
                    from: 'histories',
                    localField: 'batchId',
                    foreignField: 'batchId',
                    as: 'history'
                },
            },
            {
                $lookup: {
                    from: 'analyses',
                    localField: 'batchId',
                    foreignField: 'batchId',
                    as: 'analyses'
                }
            },
            {
                $project: {
                    _id: 0,
                    owner: 1,
                    name: 1,
                    batchId: 1,
                    productId: 1,
                    status: 1,
                    quantity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    product: {
                        name: 1,
                        price: 1,
                        description: 1,
                        attributes: 1,
                        imageUrl: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                    history: {
                        action: 1,
                        actionBy: 1,
                        actionDate: 1,
                    },
                    totalScan: { $size: '$analyses' },
                    totalUserScan: { $size: { $setUnion: "$analyses.ipAddress" } }
                }
            }
        ]);
    }

    async create(owner: string, dto: CreateBatchProductDto): Promise<BatchProductInterfaces> {
        const batchProduct = {
            ...dto,
            owner,
            batchId: IdUtils.generateId(12),
        }
        return await this.batchProductRepository.create(batchProduct);
    }

    async findAll(): Promise<BatchProductInterfaces[]> {
        return await this.batchProductRepository.findAll();
    }

    async findAllByRoleAndId(role: string, id: string): Promise<BatchProductInterfaces[]> {
        switch (role) {
            case EnumRoles.ROLE_ADMIN:
                return await this.batchProductRepository.findAll();
            case EnumRoles.ROLE_FARMER:
                return await this.batchProductRepository.findByOwnerId(id);
            default:
                return await this.batchProductRepository.findByOwnerId(id);
        }
    }

    async findByOwnerId(ownerId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductRepository.findByOwnerId(ownerId);
    }

    async findById(id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.findById(id);
    }

    async update(id: string, batchProduct: EditBatchProductDto): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.update(id, batchProduct);
    }

    async delete(username: string, id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.delete(username, id);
    }
}
