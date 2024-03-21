import { Body, Controller, Delete, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
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
    @Roles(EnumRoles.ROLE_ADMIN)
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.productService.findAll());
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async findOne(@Req() req, @Res() res) {
        return res.status(200).json(await this.productService.findByOwnerId(req.user.id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN)
    async create(@Req() req, @Res() res, @Body() productDto: ProductInterfaces) {
        return res.status(200).json(await this.productService.create(productDto));
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async update(@Req() req, @Res() res, @Query('id') id: string, @Body() productDto: ProductInterfaces) {
        return res.status(200).json(await this.productService.update(id, productDto));
    }

    @Delete('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async delete(@Req() req, @Res() res, @Query('id') id: string) {
        return res.status(200).json(await this.productService.delete(req.user.username, id));
    }
}
