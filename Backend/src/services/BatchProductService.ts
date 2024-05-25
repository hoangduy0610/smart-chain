import { HttpStatus, Injectable } from '@nestjs/common';
import { EBatchCase } from 'src/commons/EnumBatchCase';
import { EProductStatus } from 'src/commons/EnumProductStatus';
import { EnumRoles } from 'src/commons/EnumRoles';
import { MessageCode } from 'src/commons/MessageCode';
import { ApplicationException } from 'src/controllers/ExceptionController';
import { CreateBatchProductDto, EditBatchProductDto } from 'src/dtos/BatchProductDtos';
import { UserInterfaces } from 'src/interfaces/UserInterfaces';
import { AnalysisRepository } from 'src/repositories/AnalysisRepository';
import { HistoryRepository } from 'src/repositories/HistoryRepository';
import { IdUtils } from 'src/utils/IdUtils';
import { BatchProductInterfaces } from '../interfaces/BatchProductInterfaces';
import { BatchProductRepository } from '../repositories/BatchProductRepository';
import { TransporterBillService } from './TransporterBillService';

@Injectable()
export class BatchProductService {
    constructor(
        private readonly batchProductRepository: BatchProductRepository,
        private readonly analysisRepository: AnalysisRepository,
        private readonly historyRepository: HistoryRepository,
        private readonly transporterBillService: TransporterBillService,
    ) { }

    async scanStamp(batchId: string, ipAddress: string): Promise<any> {
        await this.analysisRepository.createScanLog(batchId, ipAddress);
        return await this.batchProductRepository.getStampBatchDetail(batchId);
    }

    async create(owner: string, dto: CreateBatchProductDto): Promise<BatchProductInterfaces> {
        const batchProduct = {
            ...dto,
            owner,
            batchId: IdUtils.generateId(12),
        }
        return await this.batchProductRepository.create(batchProduct);
    }

    async findAll(): Promise<BatchProductInterfaces[]> {
        return await this.batchProductRepository.findAll();
    }

    async findAllByRoleAndId(role: string, id: string): Promise<BatchProductInterfaces[]> {
        switch (role) {
            case EnumRoles.ROLE_ADMIN:
                return await this.batchProductRepository.findAll();
            case EnumRoles.ROLE_FARMER:
                return await this.batchProductRepository.findByOwnerId(id);
            case EnumRoles.ROLE_TRANSPORTER:
                return await this.batchProductRepository.findByTransporterId(id);
            case EnumRoles.ROLE_SELLER:
                return await this.batchProductRepository.findByRetailerId(id);
            default:
                return await this.batchProductRepository.findByOwnerId(id);
        }
    }

    async findByOwnerId(ownerId: string): Promise<BatchProductInterfaces[]> {
        return await this.batchProductRepository.findByOwnerId(ownerId);
    }

    async findById(id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.findById(id);
    }

    async update(id: string, batchProduct: EditBatchProductDto): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.update(id, batchProduct);
    }

    async delete(username: string, id: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.delete(username, id);
    }

    async forwardScan(user: UserInterfaces, id: string): Promise<BatchProductInterfaces> {
        let productHandler: EBatchCase = null;
        const batchProduct: BatchProductInterfaces = await this.batchProductRepository.findByBatchId(id);

        if (!batchProduct) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.BATCH_NOT_FOUND);
        }

        if (batchProduct.status === EProductStatus.InFarm) {
            if (user.roles.includes(EnumRoles.ROLE_FARMER) || user.roles.includes(EnumRoles.ROLE_ADMIN)) {
                productHandler = EBatchCase.ReadyForTransport;
            }
        } else if (batchProduct.status === EProductStatus.InTransportation) {
            if (user.roles.includes(EnumRoles.ROLE_TRANSPORTER) || user.roles.includes(EnumRoles.ROLE_ADMIN)) {
                if (!batchProduct?.transporter) {
                    productHandler = EBatchCase.StartTransport;
                } else {
                    productHandler = EBatchCase.FinishTransport;
                }
            }
        } else if (batchProduct.status === EProductStatus.InStore) {
            if ((user.roles.includes(EnumRoles.ROLE_SELLER) || user.roles.includes(EnumRoles.ROLE_ADMIN)) && !batchProduct?.retailer) {
                productHandler = EBatchCase.ImportToStore;
            }
        }

        switch (productHandler) {
            case EBatchCase.ReadyForTransport:
                await this.historyRepository.create({
                    action: `Nông dân ${user.name} đã xuất kho lô sản phẩm ${batchProduct.name} với số lượng ${batchProduct.quantity} vào lúc ${new Date().toLocaleString()}`,
                    batchId: id,
                }, user.roles[0])
                batchProduct.status = EProductStatus.InTransportation;
                batchProduct.incharge = EnumRoles.ROLE_TRANSPORTER;
                return await batchProduct.save();
            case EBatchCase.StartTransport:
                batchProduct.transporter = user.id;
                batchProduct.incharge = EnumRoles.ROLE_TRANSPORTER;
                return await batchProduct.save();
            case EBatchCase.FinishTransport:
                await this.historyRepository.create({
                    action: `Nhà vận chuyển ${user.name} đã hoàn thành đơn vận chuyển lô sản phẩm ${batchProduct.name} với số lượng ${batchProduct.quantity} vào lúc ${new Date().toLocaleString()}`,
                    batchId: id,
                }, user.roles[0])
                await this.transporterBillService.findByBatchIdAndUpdateStatus(id, EBatchCase.FinishTransport);
                batchProduct.status = EProductStatus.InStore;
                return await batchProduct.save();
            case EBatchCase.ImportToStore:
                batchProduct.retailer = user.id;
                batchProduct.incharge = EnumRoles.ROLE_SELLER;
                return await batchProduct.save();
            default:
                throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.BATCH_FORWARD_INVALID);
        }
    }

    async findByBatchId(batchId: string): Promise<BatchProductInterfaces> {
        return await this.batchProductRepository.findByBatchId(batchId);
    }
}
