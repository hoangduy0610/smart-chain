import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageCode } from 'src/commons/MessageCode';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { ProductDto } from 'src/dtos/ProductDtos';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductInterfaces>,
    ) { }

    async create(product: ProductDto): Promise<ProductInterfaces> {
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async findAll(): Promise<ProductInterfaces[]> {
        return await this.productModel.find({ deletedAt: null }).exec();
    }

    async findById(id: string): Promise<ProductInterfaces> {
        const product = await this.productModel.findById(id).exec();
        if (!product || product.deletedAt) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
        }
        return product;
    }

    async update(id: string, product: ProductDto): Promise<ProductInterfaces> {
        return await this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<ProductInterfaces> {
        const deletedProduct = await this.productModel.findById(id).exec();
        deletedProduct.deletedAt = new Date();
        deletedProduct.deletedBy = username;
        return await deletedProduct.save();
    }

    async findByOwnerId(ownerId: string): Promise<ProductInterfaces[]> {
        return await this.productModel.find({ owner: ownerId, deletedAt: null }).exec();
    }
}
