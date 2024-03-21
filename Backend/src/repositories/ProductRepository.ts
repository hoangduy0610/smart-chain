import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductInterfaces>,
    ) { }

    async create(product: ProductInterfaces): Promise<ProductInterfaces> {
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async findAll(): Promise<ProductInterfaces[]> {
        return await this.productModel.find().exec();
    }

    async findById(id: string): Promise<ProductInterfaces> {
        return await this.productModel.findById(id).exec();
    }

    async update(id: string, product: ProductInterfaces): Promise<ProductInterfaces> {
        return await this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<ProductInterfaces> {
        const deletedProduct = await this.productModel.findById(id).exec();
        deletedProduct.deletedAt = new Date();
        deletedProduct.deletedBy = username;
        return await deletedProduct.save();
    }

    async findByOwnerId(ownerId: string): Promise<ProductInterfaces[]> {
        return await this.productModel.find({ owner: ownerId }).exec();
    }
}