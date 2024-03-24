import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { HistoryDto } from 'src/dtos/HistoryDtos';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { HistoryInterfaces } from 'src/interfaces/HistoryInterfaces';
import { HistoryService } from 'src/services/HistoryService';

@ApiTags('history')
@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN)
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.historyService.findAll());
    }

    @Get('/by-batch/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async listByBatch(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.historyService.findByBatchId(id));
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.historyService.findById(id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async create(@Req() req, @Res() res, @Body() historyDto: HistoryDto) {
        return res.status(200).json(await this.historyService.create(historyDto, req.user.roles[0]));
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async update(@Req() req, @Res() res, @Query('id') id: string, @Body() historyDto: HistoryDto) {
        return res.status(200).json(await this.historyService.update(id, historyDto, req.user.roles[0]));
    }

    @Delete('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async delete(@Req() req, @Res() res, @Query('id') id: string) {
        return res.status(200).json(await this.historyService.delete(req.user.username, id));
    }
}
