import { Injectable, Logger } from '@nestjs/common';
import { SellerStorageInterfaces } from '../interfaces/SellerStorageInterfaces';
import { SellerStorageRepository } from '../repositories/SellerStorageRepository';
import { CreateSellerStorageDto, EditSellerStorageDto } from '../dtos/SellerStorageDtos';
import { EnumRoles } from 'src/commons/EnumRoles';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';

@Injectable()
export class SellerStorageService {
    constructor(
        private readonly sellerStorageRepository: SellerStorageRepository,
        @InjectModel('SellerStorage') private readonly sellerStorageModel: Model<SellerStorageInterfaces>,
        // @InjectModel('BatchProduct') private readonly batchProductModel: Model<BatchProductInterfaces>,
    ) { }

    async create(dto: CreateSellerStorageDto): Promise<SellerStorageInterfaces> {
        const saveObj = {
            ...dto,
            sold: 0,
        }
        return await this.sellerStorageRepository.create(saveObj);
    }

    async findAll(): Promise<SellerStorageInterfaces[]> {
        return await this.sellerStorageRepository.findAll();
    }

    async findAllByRoleAndId(role: string, id: string): Promise<SellerStorageInterfaces[]> {
        switch (role) {
            case EnumRoles.ROLE_ADMIN:
                return await this.sellerStorageRepository.findAll();
            case EnumRoles.ROLE_SELLER:
                return await this.sellerStorageRepository.findBySellerId(id);
            default:
                return await this.sellerStorageRepository.findBySellerId(id);
        }
    }

    async findById(id: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageRepository.findById(id);
    }

    async update(id: string, sellerStorage: EditSellerStorageDto): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageRepository.update(id, sellerStorage);
    }

    async delete(username: string, id: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageRepository.delete(username, id);
    }

    async findBySellerId(sellerId: string): Promise<SellerStorageInterfaces[]> {
        return await this.sellerStorageRepository.findBySellerId(sellerId);
    }

    async findAndGroupByProduct(sellerId: string): Promise<any> {
        return await this.sellerStorageModel.aggregate([
            {
                $match: {
                    owner: sellerId.toString()
                }
            },
            {
                $lookup: {
                    from: 'batchproducts',
                    localField: 'batchId',
                    foreignField: 'batchId',
                    as: 'batch'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'batch.productId',
                    foreignField: 'productId',
                    as: 'product'
                }
            },
            {
                $unwind: '$batch'
            },
            {
                $unwind: '$product'
            },
            {
                $group: {
                    _id: '$batch.productId',
                    total: { $sum: '$quantity' },
                    sold: { $sum: '$sold' },
                    product: { $first: '$product' },
                    batches: { $push: '$batch' },
                }
            }
        ])
    }
}
