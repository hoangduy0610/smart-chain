import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellerStorageDto, EditSellerStorageDto } from 'src/dtos/SellerStorageDtos';
import { SellerStorageInterfaces } from 'src/interfaces/SellerStorageInterfaces';

@Injectable()
export class SellerStorageRepository {
    constructor(
        @InjectModel('SellerStorage') private readonly sellerStorageModel: Model<SellerStorageInterfaces>,
    ) { }

    async create(sellerStorage: CreateSellerStorageDto): Promise<SellerStorageInterfaces> {
        const newSellerStorage = new this.sellerStorageModel(sellerStorage);
        return await newSellerStorage.save();
    }

    async findAll(): Promise<SellerStorageInterfaces[]> {
        // return await this.sellerStorageModel.find().exec();
        return await this.sellerStorageModel.aggregate([
            {
                $lookup: {
                    from: 'batchproducts',
                    localField: 'batchId',
                    foreignField: 'batchId',
                    as: 'batch'
                }
            },
            {
                $project: {
                    _id: 1,
                    owner: 1,
                    batchId: 1,
                    quantity: 1,
                    sold: 1,
                    batch: {
                        $arrayElemAt: ['$batch', 0]
                    },
                    createdAt: 1,
                }
            }
        ])
    }

    async findById(id: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageModel.findById(id).exec();
    }

    async update(id: string, sellerStorage: EditSellerStorageDto): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageModel.findByIdAndUpdate(id, sellerStorage, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<SellerStorageInterfaces> {
        const deletedSellerStorage = await this.sellerStorageModel.findById(id).exec();
        deletedSellerStorage.deletedAt = new Date();
        deletedSellerStorage.deletedBy = username;
        return await deletedSellerStorage.save();
    }

    async findBySellerId(sellerId: string): Promise<SellerStorageInterfaces[]> {
        // return await this.sellerStorageModel.find({ owner: sellerId }).exec();
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
                $project: {
                    _id: 1,
                    owner: 1,
                    batchId: 1,
                    quantity: 1,
                    sold: 1,
                    batch: {
                        $arrayElemAt: ['$batch', 0]
                    },
                    createdAt: 1,
                }
            }
        ])
    }

    async findByBatchId(batchId: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageModel.findOne({ batchId }).exec();
    }

    async analytics(sellerId: string): Promise<any> {
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
                $unwind: "$product"
            },
            {
                $unwind: "$batch"
            },
            {
                $group: {
                    _id: null,
                    totalBatchCount: { $sum: 1 },
                    totalProductQuantity: { $sum: "$batch.quantity" },
                    totalSoldProductQuantity: { $sum: "$sold" },
                    estimateIncome: { $sum: { $multiply: [{ $toDouble: "$product.price" }, "$sold"] } },
                    distinctProductCount: { $addToSet: "$product.productId" }
                }
            },
            {
                $addFields:{
                    distinctProductCount: { $size: "$distinctProductCount" }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
    }
}
