import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { ProductDto } from 'src/dtos/ProductDtos';
import { CreateSellerStorageDto, EditSellerStorageDto } from 'src/dtos/SellerStorageDtos';
import { CreateTransporterBillDto, EditTransporterBillDto } from 'src/dtos/TransporterBillDtos';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';
import { ProductService } from 'src/services/ProductService';
import { SellerStorageService } from 'src/services/SellerStorageService';
import { TransporterBillService } from 'src/services/TransporterBillService';

@ApiTags('seller-storage')
@Controller('seller/storage')
export class SellerStorageController {
    constructor(private readonly sellerStorageService: SellerStorageService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_SELLER)
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.sellerStorageService.findAllByRoleAndId(req.user.role, req.user.id));
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_SELLER)
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.sellerStorageService.findById(id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_SELLER)
    async create(@Req() req, @Res() res, @Body() dto: CreateSellerStorageDto) {
        return res.status(200).json(await this.sellerStorageService.create(dto));
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_SELLER)
    async update(@Req() req, @Res() res, @Param('id') id: string, @Body() dto: EditSellerStorageDto) {
        return res.status(200).json(await this.sellerStorageService.update(id, dto));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_SELLER)
    async delete(@Req() req, @Res() res, @Param('id') id: string) {
        console.log(req.user);
        return res.status(200).json(await this.sellerStorageService.delete(req.user.username, id));
    }
}
