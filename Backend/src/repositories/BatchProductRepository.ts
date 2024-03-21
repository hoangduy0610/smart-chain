import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';

@Injectable()
export class BatchProductRepository {
    constructor(
        @InjectModel('BatchProduct') private readonly batchProductModel: Model<BatchProductInterfaces>,
    ) { }

    async create(batchProduct: BatchProductInterfaces): Promise<BatchProductInterfaces> {
        const newBatchProduct = new this.batchProductModel(batchProduct);
        return await newBatchProduct.save();
    }

    async findAll(): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find().exec();
    }

    async findById(id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductModel.findById(id).exec();
    }

    async update(id: string, batchProduct: BatchProductInterfaces): Promise<BatchProductInterfaces> {
        return await this.batchProductModel.findByIdAndUpdate(id, batchProduct, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<BatchProductInterfaces> {
        const deletedBatchProduct = await this.batchProductModel.findById(id).exec();
        deletedBatchProduct.deletedAt = new Date();
        deletedBatchProduct.deletedBy = username;
        return await deletedBatchProduct.save();
    }

    async findByBatchId(batchId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ batchId: batchId }).exec();
    }

    async findByProductId(productId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductModel.find({ productId: productId }).exec();
    }

    async deleteByBatchId(batchId: string): Promise<BatchProductInterfaces[]> {
        const deletedBatchProduct = await this.batchProductModel.find({ batchId: batchId }).exec();
        deletedBatchProduct.forEach(async (batchProduct) => {
            batchProduct.deletedAt = new Date();
            await batchProduct.save();
        });
        return deletedBatchProduct;
    }
}
