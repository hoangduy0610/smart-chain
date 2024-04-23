import { Injectable } from '@nestjs/common';
import { SellerStorageInterfaces } from '../interfaces/SellerStorageInterfaces';
import { SellerStorageRepository } from '../repositories/SellerStorageRepository';
import { CreateSellerStorageDto, EditSellerStorageDto } from '../dtos/SellerStorageDtos';
import { EnumRoles } from 'src/commons/EnumRoles';

@Injectable()
export class SellerStorageService {
    constructor(
        private readonly sellerStorageRepository: SellerStorageRepository,
    ) { }

    async create(dto: CreateSellerStorageDto): Promise<SellerStorageInterfaces> {
        const saveObj = {
            ...dto,
            sold: 0,
        }
        return await this.sellerStorageRepository.create(saveObj);
    }

    async findAll(): Promise<SellerStorageInterfaces[]> {
        return await this.sellerStorageRepository.findAll();
    }

    async findAllByRoleAndId(role: string, id: string): Promise<SellerStorageInterfaces[]> {
        switch (role) {
            case EnumRoles.ROLE_ADMIN:
                return await this.sellerStorageRepository.findAll();
            case EnumRoles.ROLE_TRANSPORTER:
                return await this.sellerStorageRepository.findBySellerId(id);
            default:
                return await this.sellerStorageRepository.findBySellerId(id);
        }
    }

    async findById(id: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageRepository.findById(id);
    }

    async update(id: string, sellerStorage: EditSellerStorageDto): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageRepository.update(id, sellerStorage);
    }

    async delete(username: string, id: string): Promise<SellerStorageInterfaces> {
        return await this.sellerStorageRepository.delete(username, id);
    }

    async findBySellerId(sellerId: string): Promise<SellerStorageInterfaces[]> {
        return await this.sellerStorageRepository.findBySellerId(sellerId);
    }
}
