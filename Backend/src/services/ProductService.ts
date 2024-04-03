import { Injectable } from '@nestjs/common';
import { EnumRoles } from 'src/commons/EnumRoles';
import { ProductDto } from 'src/dtos/ProductDtos';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';
import { ProductRepository } from 'src/repositories/ProductRepository';
import { IdUtils } from 'src/utils/IdUtils';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async create(owner: string, product: ProductDto): Promise<ProductInterfaces> {
        const createProduct = {
            ...product,
            owner,
            productId: IdUtils.generateId(12),
        }
        return await this.productRepository.create(createProduct);
    }

    async findAll(): Promise<ProductInterfaces[]> {
        return await this.productRepository.findAll();
    }

    async findAllByRoleAndId(role: string, id: string): Promise<ProductInterfaces[]> {
        switch (role) {
            case EnumRoles.ROLE_ADMIN:
                return await this.productRepository.findAll();
            case EnumRoles.ROLE_FARMER:
                return await this.productRepository.findByOwnerId(id);
            default:
                return await this.productRepository.findByOwnerId(id);
        }
    }

    async findById(id: string): Promise<ProductInterfaces> {
        return await this.productRepository.findById(id);
    }

    async update(id: string, product: ProductDto): Promise<ProductInterfaces> {
        return await this.productRepository.update(id, product);
    }

    async delete(username: string, id: string): Promise<ProductInterfaces> {
        return await this.productRepository.delete(username, id);
    }

    async findByOwnerId(ownerId: string): Promise<ProductInterfaces[]> {
        return await this.productRepository.findByOwnerId(ownerId);
    }
}
