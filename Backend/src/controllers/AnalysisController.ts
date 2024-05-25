import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { AnalysisService } from 'src/services/AnalysisService';

@ApiTags('analytics')
@Controller('analytics')
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) { }

    @Get('/overview')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.analysisService.getAnalysis());
    }
}
