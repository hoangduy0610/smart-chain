import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StampInterfaces } from 'src/interfaces/StampInterfaces';

@Injectable()
export class StampRepository {
    constructor(
        @InjectModel('Stamp') private readonly stampModel: Model<StampInterfaces>,
    ) { }

    async create(stamp: StampInterfaces): Promise<StampInterfaces> {
        const newStamp = new this.stampModel(stamp);
        return await newStamp.save();
    }

    async findAll(): Promise<StampInterfaces[]> {
        return await this.stampModel.find().exec();
    }

    async findById(id: string): Promise<StampInterfaces> {
        return await this.stampModel.findById(id).exec();
    }

    async update(id: string, stamp: StampInterfaces): Promise<StampInterfaces> {
        return await this.stampModel.findByIdAndUpdate(id, stamp, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<StampInterfaces> {
        const deletedStamp = await this.stampModel.findById(id).exec();
        deletedStamp.deletedAt = new Date();
        deletedStamp.deletedBy = username;
        return await deletedStamp.save();
    }

    async findByBatchId(batchId: string): Promise<StampInterfaces[]> {
        return await this.stampModel.find({ batchId: batchId }).exec();
    }
}
