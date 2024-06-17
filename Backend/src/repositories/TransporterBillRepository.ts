import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EBatchCase } from 'src/commons/EnumBatchCase';
import { CreateTransporterBillDto, EditTransporterBillDto } from 'src/dtos/TransporterBillDtos';
import { TransporterBillInterfaces } from 'src/interfaces/TransporterBillInterfaces';

@Injectable()
export class TransporterBillRepository {
    constructor(
        @InjectModel('TransporterBill') private readonly transporterBillModel: Model<TransporterBillInterfaces>,
    ) { }

    async create(transporterBill: CreateTransporterBillDto): Promise<TransporterBillInterfaces> {
        const newTransporterBill = new this.transporterBillModel(transporterBill);
        return await newTransporterBill.save();
    }

    async findAll(): Promise<TransporterBillInterfaces[]> {
        return await this.transporterBillModel.find({ deletedAt: null }).exec();
    }

    async findById(id: string): Promise<TransporterBillInterfaces> {
        return await this.transporterBillModel.findOne({
            _id: new mongoose.mongo.ObjectId(id),
            deletedAt: null,
        }).exec();
    }

    async delete(username: string, id: string): Promise<TransporterBillInterfaces> {
        const deletedTransporterBill = await this.transporterBillModel.findById(id).exec();
        deletedTransporterBill.deletedAt = new Date();
        deletedTransporterBill.deletedBy = username;
        return await deletedTransporterBill.save();
    }

    async findByTransporterId(transporterId: string): Promise<TransporterBillInterfaces[]> {
        return await this.transporterBillModel.find({ owner: transporterId, deletedAt: null }).exec();
    }

    async getAnalysis(): Promise<any> {
        return await this.transporterBillModel.aggregate([
            {
                $match: { deletedAt: null }
            },
            {
                $facet: {
                    inProgress: [
                        { $match: { status: EBatchCase.StartTransport } },
                        { $count: "count" }
                    ],
                    finished: [
                        { $match: { status: EBatchCase.FinishTransport } },
                        { $count: "count" }
                    ]
                }
            }
        ]);
    }

    async findOneByBatchId(batchId: string): Promise<TransporterBillInterfaces> {
        return await this.transporterBillModel.findOne({
            batchId: batchId,
            deletedAt: null,
        }).exec();
    }

    async createDocumentFromDto(dto: CreateTransporterBillDto) {
        return new this.transporterBillModel(dto);
    }
}
