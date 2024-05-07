import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { CreateBatchProductDto, EditBatchProductDto } from 'src/dtos/BatchProductDtos';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { BatchProductInterfaces } from 'src/interfaces/BatchProductInterfaces';
import { BatchProductService } from 'src/services/BatchProductService';
import { StampService } from 'src/services/StampService';

@ApiTags('batch-product')
@Controller('batch-product')
export class BatchProductController {
    constructor(
        private readonly batchProductService: BatchProductService,
        private readonly stampService: StampService,
    ) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.batchProductService.findAllByRoleAndId(req.user.role, req.user.id));
    }

    @Get('/scan/:id')
    async scanStamp(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.stampService.scanStamp(id));
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.batchProductService.findById(id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async create(@Req() req, @Res() res, @Body() batchProductDto: CreateBatchProductDto) {
        return res.status(200).json(await this.batchProductService.create(req.user.id, batchProductDto));
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async update(@Req() req, @Res() res, @Param('id') id: string, @Body() batchProductDto: EditBatchProductDto) {
        return res.status(200).json(await this.batchProductService.update(id, batchProductDto));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_FARMER)
    async delete(@Req() req, @Res() res, @Param('id') id: string) {
        console.log(req.user);
        return res.status(200).json(await this.batchProductService.delete(req.user.username, id));
    }
}
