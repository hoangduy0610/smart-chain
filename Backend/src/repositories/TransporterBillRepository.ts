import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        return await this.transporterBillModel.find().exec();
    }

    async findById(id: string): Promise<TransporterBillInterfaces> {
        return await this.transporterBillModel.findById(id).exec();
    }

    async update(id: string, transporterBill: EditTransporterBillDto): Promise<TransporterBillInterfaces> {
        return await this.transporterBillModel.findByIdAndUpdate(id, transporterBill, { new: true }).exec();
    }

    async delete(username: string, id: string): Promise<TransporterBillInterfaces> {
        const deletedTransporterBill = await this.transporterBillModel.findById(id).exec();
        deletedTransporterBill.deletedAt = new Date();
        deletedTransporterBill.deletedBy = username;
        return await deletedTransporterBill.save();
    }

    async findByTransporterId(transporterId: string): Promise<TransporterBillInterfaces[]> {
        return await this.transporterBillModel.find({ owner: transporterId }).exec();
    }
}
