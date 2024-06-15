import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TransporterBillInterfaces } from '../interfaces/TransporterBillInterfaces';
import { TransporterBillRepository } from '../repositories/TransporterBillRepository';
import { EnumRoles } from 'src/commons/EnumRoles';
import { IdUtils } from 'src/utils/IdUtils';
import { CreateTransporterBillDto, EditTransporterBillDto } from 'src/dtos/TransporterBillDtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EBatchCase } from 'src/commons/EnumBatchCase';
import axios from 'axios';
import { Constant } from 'src/commons/Constant';
import { StringUtils } from 'src/utils/StringUtils';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { MessageCode } from 'src/commons/MessageCode';
import { EProductStatus } from 'src/commons/EnumProductStatus';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { UserInterfaces } from 'src/interfaces/UserInterfaces';

@Injectable()
export class TransporterBillService {
    constructor(
        private readonly transporterBillRepository: TransporterBillRepository,
        private readonly batchProductRepository: BatchProductRepository,
    ) { }

    async create(owner: string, dto: CreateTransporterBillDto): Promise<TransporterBillInterfaces> {
        // return await this.transporterBillRepository.create(dto);
        const billPresearch = await this.transporterBillRepository.findOneByBatchId(dto.batchId);
        if (billPresearch) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.BILL_FOR_THIS_BATCH_FOUND);
        }

        const batch = await this.batchProductRepository.findByBatchId(dto.batchId);
        if (batch.status !== EProductStatus.InTransportation || batch.transporter) {
            throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.BATCH_NOT_BELONG_TO_YOU);
        }

        try {
            const urlRoute = StringUtils.fillEndpointPlaceholder(Constant.ROUTE_MACHINE_URL, {
                src_lng: dto.departure.split(';')[1],
                src_lat: dto.departure.split(';')[0],
                des_lng: dto.destination.split(';')[1],
                des_lat: dto.destination.split(';')[0]
            });
            const routingInfo = await axios.get(urlRoute);
            const distance = routingInfo.data.routes[0].distance;
            const newTransporterBill = await this.transporterBillRepository.createDocumentFromDto(dto);
            newTransporterBill.owner = owner;
            newTransporterBill.status = EBatchCase.StartTransport;
            newTransporterBill.currentPos = dto.departure;
            newTransporterBill.length = distance;
            batch.transporter = owner;
            await batch.save();
            return await newTransporterBill.save();
        } catch (err) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR);
        }
    }

    async findAll(): Promise<TransporterBillInterfaces[]> {
        return await this.transporterBillRepository.findAll();
    }

    async findAllByRoleAndId(role: string, id: string): Promise<TransporterBillInterfaces[]> {
        switch (role) {
            case EnumRoles.ROLE_ADMIN:
                return await this.transporterBillRepository.findAll();
            case EnumRoles.ROLE_TRANSPORTER:
                return await this.transporterBillRepository.findByTransporterId(id);
            default:
                return await this.transporterBillRepository.findByTransporterId(id);
        }
    }

    async findByOwnerId(ownerId: string): Promise<TransporterBillInterfaces[]> {
        return await this.transporterBillRepository.findByTransporterId(ownerId);
    }

    async findById(id: string): Promise<TransporterBillInterfaces> {
        return await this.transporterBillRepository.findById(id);
    }

    async update(user:UserInterfaces, id: string, dto: EditTransporterBillDto): Promise<TransporterBillInterfaces> {
        const transporterBill = await this.transporterBillRepository.findById(id);
        if (!transporterBill) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.BILL_NOT_FOUND);
        }

        if (transporterBill.status === EBatchCase.FinishTransport) {
            throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.BILL_FINISHED);
        }

        if (transporterBill.owner !== user._id.toString() && !user.roles.includes(EnumRoles.ROLE_ADMIN)) {
            throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.BILL_NOT_BELONG_TO_YOU);
        }

        if (dto.destination) {
            transporterBill.destination = dto.destination;
        }

        if (dto.departure) {
            transporterBill.departure = dto.departure;
        }

        return await transporterBill.save();
    }

    async delete(user: UserInterfaces, id: string): Promise<TransporterBillInterfaces> {
        const transporterBill = await this.transporterBillRepository.findById(id);

        if (transporterBill.owner !== user._id.toString() && !user.roles.includes(EnumRoles.ROLE_ADMIN)) {
            throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.BILL_NOT_BELONG_TO_YOU);
        }

        return await this.transporterBillRepository.delete(user.username, id);
    }

    async findByBatchIdAndUpdateStatus(batchId: string, status: EBatchCase): Promise<TransporterBillInterfaces> {
        const bill = await this.transporterBillRepository.findOneByBatchId(batchId);

        if (!bill) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.BILL_NOT_FOUND);
        }

        bill.status = status;
        return await bill.save();
    }
}
