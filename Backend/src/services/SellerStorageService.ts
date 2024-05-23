import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SellerStorageInterfaces } from '../interfaces/SellerStorageInterfaces';
import { SellerStorageRepository } from '../repositories/SellerStorageRepository';
import { CreateSellerStorageDto, EditSellerStorageDto } from '../dtos/SellerStorageDtos';
import { EnumRoles } from 'src/commons/EnumRoles';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { MessageCode } from 'src/commons/MessageCode';
import { BatchProductRepository } from 'src/repositories/BatchProductRepository';
import { EProductStatus } from 'src/commons/EnumProductStatus';
import { UserInterfaces } from 'src/interfaces/UserInterfaces';
import { HistoryInterfaces } from 'src/interfaces/HistoryInterfaces';
import { SellAnalyticsInterfaces } from 'src/interfaces/SellAnalyticsInterfaces';
import { HistoryRepository } from 'src/repositories/HistoryRepository';

@Injectable()
export class SellerStorageService {
    constructor(
        private readonly sellerStorageRepository: SellerStorageRepository,
        private readonly historyRepository: HistoryRepository,
        private readonly batchProductRepository: BatchProductRepository,
    ) { }

    async create(user: UserInterfaces, dto: CreateSellerStorageDto): Promise<SellerStorageInterfaces> {
        const sellerStorage = await this.sellerStorageRepository.findByBatchId(dto.batchId);

        if (sellerStorage) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.SELLER_STORAGE_ALREADY_EXIST);
        }

        const batchProduct = await this.batchProductRepository.findByBatchId(dto.batchId);
        if (!batchProduct) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.BATCH_NOT_FOUND);
        }

        if (batchProduct.status !== EProductStatus.InStore || batchProduct.retailer) {
            throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.BATCH_NOT_BELONG_TO_YOU);
        }
        batchProduct.retailer = user.id;
        batchProduct.incharge = EnumRoles.ROLE_SELLER;
        await batchProduct.save();
        await this.historyRepository.create({
            action: `Nhà bán lẻ ${user.name} đã nhập lô sản phẩm ${batchProduct.name} với số lượng ${batchProduct.quantity} vào kho lúc ${new Date().toLocaleString()}`,
            batchId: batchProduct.batchId,
        }, user.roles[0])
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
            case EnumRoles.ROLE_SELLER:
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

    async findAndGroupByProduct(sellerId: string): Promise<any> {
        return await this.sellerStorageRepository.findByOwnerAndGroupByProduct(sellerId);
    }

    async sellProduct(batchId: string): Promise<any> {
        const batchProduct = await this.sellerStorageRepository.findByBatchId(batchId);
        if (!batchProduct) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.SELLER_STORAGE_NOT_FOUND);
        }

        if (batchProduct.sold >= batchProduct.quantity) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.BATCH_SOLD_OUT);
        }

        batchProduct.sold += 1;
        await this.sellerStorageRepository.createSellLog(batchProduct.batchId, batchProduct.pricing);
        return await batchProduct.save();
    }

    async analytics(sellerId: string): Promise<any> {
        return {
            ...(await this.sellerStorageRepository.analytics(sellerId))[0],
            retailerReport: await this.getRetailerReportLastWeek(sellerId),
        };
    }

    async getRetailerReportLastWeek(sellerId: string): Promise<any> {
        const revenueLastWeek = await this.sellerStorageRepository.queryRetailerReportLastWeek(sellerId);
        const sumRevenue = revenueLastWeek.reduce((sum, revenue) => sum + revenue.revenue, 0);
        const sumCount = revenueLastWeek.reduce((sum, revenue) => sum + revenue.soldCount, 0);
        return {
            totalRevenue: sumRevenue,
            totalCount: sumCount,
            detail: revenueLastWeek,
        }
    }
}
