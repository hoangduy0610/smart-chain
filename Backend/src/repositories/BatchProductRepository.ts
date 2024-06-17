import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnumRoles } from 'src/commons/EnumRoles';
import { CreateBatchProductDto, EditBatchProductDto } from 'src/dtos/BatchProductDtos';
import { AnalysisInterface } from 'src/interfaces/AnalysisInterfaces';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';
import { HistoryInterfaces } from 'src/interfaces/HistoryInterfaces';

@Injectable()
export class BatchProductRepository {
    constructor(
        @InjectModel('BatchProduct') private readonly batchProductModel: Model<BatchProductInterfaces>,
        @InjectModel('Analysis') private readonly analysisModel: Model<AnalysisInterface>,
        @InjectModel('History') private readonly historyModel: Model<HistoryInterfaces>,
    ) { }

    async create(batchProduct: CreateBatchProductDto): Promise<BatchProductInterfaces> {
        const newBatchProduct = new this.batchProductModel({
            ...batchProduct,
            incharge: EnumRoles.ROLE_FARMER,
        });
        return await newBatchProduct.save();
    }

    async findAll(): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ deletedAt: null }).exec();
    }

    async findById(id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductModel.findById(id).exec();
    }

    async update(id: string, batchProduct: EditBatchProductDto): Promise<BatchProductInterfaces> {
        return await this.batchProductModel.findByIdAndUpdate(id, batchProduct, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<BatchProductInterfaces> {
        const deletedBatchProduct = await this.batchProductModel.findById(id).exec();
        deletedBatchProduct.deletedAt = new Date();
        deletedBatchProduct.deletedBy = username;
        return await deletedBatchProduct.save();
    }

    async findByBatchId(batchId: string): Promise<BatchProductInterfaces> {
        return await this.batchProductModel.findOne({ batchId: batchId, deletedAt: null }).exec();
    }

    async findByProductId(productId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ productId: productId, deletedAt: null }).exec();
    }

    async deleteByBatchId(batchId: string): Promise<BatchProductInterfaces[]> {
        const deletedBatchProduct = await this.batchProductModel.find({ batchId: batchId }).exec();
        deletedBatchProduct.forEach(async (batchProduct) => {
            batchProduct.deletedAt = new Date();
            await batchProduct.save();
        });
        return deletedBatchProduct;
    }
    async findByOwnerId(ownerId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ owner: ownerId, deletedAt: null }).exec();
    }

    async findByTransporterId(transporterId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ transporter: transporterId, incharge: EnumRoles.ROLE_TRANSPORTER, deletedAt: null }).exec();
    }

    async findByRetailerId(retailerId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ retailer: retailerId, deletedAt: null }).exec();
    }

    async getStampBatchDetail(batchId: string): Promise<any> {
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
                    let: {
                        "userObjId": {
                            $toObjectId: "$owner"
                        }
                    },
                    from: "users",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$userObjId"]
                                }
                            }
                        },
                        { $limit: 1 },
                    ],
                    as: "ownerDetail"
                }
            },
            {
                $unwind: "$ownerDetail"
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
                    ownerDetail: {
                        name: 1,
                    },
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
        ])
    }
}
