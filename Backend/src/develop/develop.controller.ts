import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import { UserService } from 'src/services/UserService';

@ApiTags('develop')
@Controller('develop')
export class DevelopController {
    constructor(private readonly userService: UserService) { }

    @Post('/create-user')
    async createUser(@Req() req, @Res() res, @Body() userDto: CreateUserDto) {
        return res.status(200).json(await this.userService.createUser(req.user, userDto));
    }
}
