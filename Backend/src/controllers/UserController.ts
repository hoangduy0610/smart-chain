import { Body, Controller, Delete, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnumRoles } from 'src/commons/EnumRoles';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/CreateUserDto';
import { Roles } from 'src/guards/RoleDecorator';
import { RolesGuard } from 'src/guards/RoleGuard';
import { UserService } from 'src/services/UserService';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN)
    async list(@Req() req, @Res() res) {
        return res.status(200).json(await this.userService.listUser(req.user));
    }

    // /user/find
    @Get('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async findOne(@Req() req, @Res() res) {
        return res.status(200).json(await this.userService.findUserById(req.user.id));
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(EnumRoles.ROLE_ADMIN)
    async create(@Req() req, @Res() res, @Body() userDto: CreateUserDto) {
        return res.status(200).json(await this.userService.createUser(req.user, userDto));
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    async update(@Req() req, @Res() res, @Query('id') id: string, @Body() userDto: UpdateUserDto) {
        return res.status(200).json(await this.userService.updateUser(userDto, id));
    }

    // @Delete('/')
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    // async delete(@Req() req, @Res() res, @Query('id') id: string) {
    //     return res.status(200).json(await this.userService.findUserById(id));
    // }
}
