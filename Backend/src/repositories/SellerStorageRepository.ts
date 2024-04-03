import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellerStorageInterfaces } from 'src/interfaces/SellerStorageInterfaces';

@Injectable()
export class SellerStorageRepository {
    constructor(
        @InjectModel('SellerStorage') private readonly sellerStorageModel: Model<SellerStorageInterfaces>,
    ) { }

    async create(sellerStorage: SellerStorageInterfaces): Promise<SellerStorageInterfaces> {
        const newSellerStorage = new this.sellerStorageModel(sellerStorage);
        return await newSellerStorage.save();
    }

    async findAll(): Promise<SellerStorageInterfaces[]> {
        return await this.sellerStorageModel.find().exec();
    }

    async findById(id: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageModel.findById(id).exec();
    }

    async update(id: string, sellerStorage: SellerStorageInterfaces): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageModel.findByIdAndUpdate(id, sellerStorage, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<SellerStorageInterfaces> {
        const deletedSellerStorage = await this.sellerStorageModel.findById(id).exec();
        deletedSellerStorage.deletedAt = new Date();
        deletedSellerStorage.deletedBy = username;
        return await deletedSellerStorage.save();
    }

    async findBySellerId(sellerId: string): Promise<SellerStorageInterfaces[]> {
        return await this.sellerStorageModel.find({ owner: sellerId }).exec();
    }
}
