import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalysisInterface } from 'src/interfaces/AnalysisInterfaces';
import { SellerStorageInterfaces } from 'src/interfaces/SellerStorageInterfaces';

@Injectable()
export class AnalysisRepository {
    constructor(
        @InjectModel('SellerStorage') private readonly sellerStorageModel: Model<SellerStorageInterfaces>,
        @InjectModel('Analysis') private readonly analysisModel: Model<AnalysisInterface>,
    ) { }

    async createScanLog(batchId: string, ipAddress: string): Promise<AnalysisInterface> {
        return await this.analysisModel.create({
            batchId: batchId,
            ipAddress: ipAddress,
        })
    }

    async getRetailerAnalysis(): Promise<any> {
        const revenueLastWeek = await this.sellerStorageModel.aggregate([
            {
                $lookup: {
                    from: 'sellanalytics',
                    localField: 'batchId',
                    foreignField: 'batchId',
                    as: 'analytics'
                }
            },
            {
                $unwind: '$analytics'
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $toDouble: "$analytics.pricing" } },
                    revenueEachDayLastWeek: {
                        $push: {
                            $cond: [
                                { $lte: [{ $subtract: [new Date(), "$analytics.createdAt"] }, 30 * 24 * 60 * 60 * 1000] },
                                {
                                    count: 1,
                                    price: { $toDouble: "$analytics.pricing" },
                                    date: "$analytics.createdAt"
                                },
                                '$$REMOVE'
                            ]
                        }
                    }
                }
            },
            // Group by date
            {
                $unwind: "$revenueEachDayLastWeek"
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$revenueEachDayLastWeek.date"
                        }
                    },
                    revenue: { $sum: "$revenueEachDayLastWeek.price" },
                    soldCount: { $sum: "$revenueEachDayLastWeek.count" }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
        ]);
        const sumObj = revenueLastWeek.reduce((acc, revenue) => ({
            sum: acc.sum + revenue.revenue,
            count: acc.count + revenue.soldCount,
        }), {
            sum: 0,
            count: 0,
        });
        return {
            totalRevenue: sumObj.sum,
            totalCount: sumObj.count,
            revenueDetail: revenueLastWeek,
        }
    }

    async getScanCount(): Promise<any> {
        return await this.analysisModel.aggregate([
            {
                $facet: {
                    total: [
                        { $count: "count" }
                    ],
                    ipUnique: [
                        { $match: { ipAddress: { $exists: true } } },
                        { $group: { _id: "$ipAddress" } },
                        { $count: "count" }
                    ]
                }
            }
        ]);
    }
}
