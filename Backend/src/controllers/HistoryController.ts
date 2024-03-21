import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
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

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async findOne(@Req() req, @Res() res, @Param('id') id: string) {
        return res.status(200).json(await this.historyService.findById(id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN)
    async create(@Req() req, @Res() res, @Body() historyDto: HistoryInterfaces) {
        return res.status(200).json(await this.historyService.create(historyDto));
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async update(@Req() req, @Res() res, @Query('id') id: string, @Body() historyDto: HistoryInterfaces) {
        return res.status(200).json(await this.historyService.update(id, historyDto));
    }

    @Delete('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async delete(@Req() req, @Res() res, @Query('id') id: string) {
        return res.status(200).json(await this.historyService.delete(req.user.username, id));
    }
}
