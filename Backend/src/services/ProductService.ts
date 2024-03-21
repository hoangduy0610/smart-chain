import { Injectable } from '@nestjs/common';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';
import { ProductRepository } from 'src/repositories/ProductRepository';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }
    
    async create(product: ProductInterfaces): Promise<ProductInterfaces> {
        return await this.productRepository.create(product);
    }

    async findAll(): Promise<ProductInterfaces[]> {
        return await this.productRepository.findAll();
    }

    async findById(id: string): Promise<ProductInterfaces> {
        return await this.productRepository.findById(id);
    }

    async update(id: string, product: ProductInterfaces): Promise<ProductInterfaces> {
        return await this.productRepository.update(id, product);
    }

    async delete(username: string, id: string): Promise<ProductInterfaces> {
        return await this.productRepository.delete(username, id);
    }

    async findByOwnerId(ownerId: string): Promise<ProductInterfaces[]> {
        return await this.productRepository.findByOwnerId(ownerId);
    }
}
