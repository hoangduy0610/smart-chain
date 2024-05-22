import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { ProductDto } from 'src/dtos/ProductDtos';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';
import { ProductService } from 'src/services/ProductService';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.productService.findAllByRoleAndId(req.user.role, req.user.id));
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.productService.findById(id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async create(@Req() req, @Res() res, @Body() productDto: ProductDto) {
        return res.status(200).json(await this.productService.create(req.user.id, productDto));
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async update(@Req() req, @Res() res, @Param('id') id: string, @Body() productDto: ProductDto) {
        return res.status(200).json(await this.productService.update(id, productDto));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async delete(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.productService.delete(req.user.username, id));
    }
}
