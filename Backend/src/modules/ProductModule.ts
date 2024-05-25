import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from 'src/repositories/ProductRepository';
import { ProductSchema } from 'src/schemas/ProductSchema';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../services/ProductService';
import { ethersProvider } from 'src/providers/EthersProvider';
import { smartContractAbiProvider } from 'src/providers/SmartContractABI';
import { BullModule } from '@nestjs/bull';
import { SmartContractHandlingProcessor } from 'src/backgroundTasks/SmartContractHandling.queue';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'SmartContractHandling',
        }),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    providers: [ProductService, ProductRepository, ethersProvider, smartContractAbiProvider, SmartContractHandlingProcessor],
    controllers: [ProductController],
    exports: [ProductService, ProductRepository]
})
export class ProductModule { }
