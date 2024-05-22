import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterfaces } from 'src/interfaces/UserInterfaces';
import { AnalysisRepository } from 'src/repositories/AnalysisRepository';
import { SellerStorageRepository } from 'src/repositories/SellerStorageRepository';
import { TransporterBillRepository } from 'src/repositories/TransporterBillRepository';

@Injectable()
export class AnalysisService {
    constructor(
        private readonly analysisRepository: AnalysisRepository,
        private readonly transporterBillRepository: TransporterBillRepository,
        private readonly sellerStorageRepository: SellerStorageRepository,
        @InjectModel('User') private readonly userModel: Model<UserInterfaces>
    ) { }

    async getAnalysis(): Promise<any> {
        const userCount = await this.userModel.countDocuments();
        const transporterBillCount = await this.transporterBillRepository.getAnalysis();
        const analysisCount = await this.analysisRepository.getScanCount();
        const retailerAnalysis = await this.sellerStorageRepository.getAnalysis();
        return {
            userCount,
            ...retailerAnalysis[0],
            transporterBillCount: {
                inProgress: transporterBillCount[0].inProgress[0]?.count || 0,
                finished: transporterBillCount[0].finished[0]?.count || 0
            },
            scanCount: {
                total: analysisCount[0].total[0]?.count || 0,
                uniqueUser: analysisCount[0].ipUnique[0]?.count || 0
            },
            finance: await this.analysisRepository.getRetailerAnalysis(),
        };
    }
}
