import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from 'src/repositories/ProductRepository';
import { ProductSchema } from 'src/schemas/ProductSchema';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../services/ProductService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    exports: [ProductService, ProductRepository]
})
export class ProductModule { }
