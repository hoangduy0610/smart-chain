import { Injectable } from '@nestjs/common';
import { TransporterBillInterfaces } from '../interfaces/TransporterBillInterfaces';
import { TransporterBillRepository } from '../repositories/TransporterBillRepository';
import { EnumRoles } from 'src/commons/EnumRoles';
import { IdUtils } from 'src/utils/IdUtils';
import { CreateTransporterBillDto, EditTransporterBillDto } from 'src/dtos/TransporterBillDtos';

@Injectable()
export class TransporterBillService {
    constructor(
        private readonly transporterBillRepository: TransporterBillRepository,
    ) { }

    async create(owner: string, dto: CreateTransporterBillDto): Promise<TransporterBillInterfaces> {
        return await this.transporterBillRepository.create(dto);
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

    async update(id: string, transporterBill: EditTransporterBillDto): Promise<TransporterBillInterfaces> {
        return await this.transporterBillRepository.update(id, transporterBill);
    }

    async delete(username: string, id: string): Promise<TransporterBillInterfaces> {
        return await this.transporterBillRepository.delete(username, id);
    }
}
