import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnumRoles } from 'src/commons/EnumRoles';
import { CreateBatchProductDto, EditBatchProductDto } from 'src/dtos/BatchProductDtos';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';

@Injectable()
export class BatchProductRepository {
    constructor(
        @InjectModel('BatchProduct') private readonly batchProductModel: Model<BatchProductInterfaces>,
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
}
