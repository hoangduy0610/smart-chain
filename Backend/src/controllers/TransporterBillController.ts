import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { ProductDto } from 'src/dtos/ProductDtos';
import { CreateTransporterBillDto, EditTransporterBillDto } from 'src/dtos/TransporterBillDtos';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { ProductInterfaces } from 'src/interfaces/ProductInterfaces';
import { ProductService } from 'src/services/ProductService';
import { TransporterBillService } from 'src/services/TransporterBillService';

@ApiTags('transporter-bills')
@Controller('transporter/bills')
export class TransporterBillController {
    constructor(private readonly transporterBillService: TransporterBillService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_TRANSPORTER)
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.transporterBillService.findAllByRoleAndId(req.user.role, req.user.id));
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_TRANSPORTER)
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.transporterBillService.findById(id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_TRANSPORTER)
    async create(@Req() req, @Res() res, @Body() dto: CreateTransporterBillDto) {
        return res.status(200).json(await this.transporterBillService.create(req.user.id, dto));
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_TRANSPORTER)
    async update(@Req() req, @Res() res, @Param('id') id: string, @Body() dto: EditTransporterBillDto) {
        return res.status(200).json(await this.transporterBillService.update(id, dto));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN, EnumRoles.ROLE_TRANSPORTER)
    async delete(@Req() req, @Res() res, @Param('id') id: string) {
        console.log(req.user);
        return res.status(200).json(await this.transporterBillService.delete(req.user.username, id));
    }
}
