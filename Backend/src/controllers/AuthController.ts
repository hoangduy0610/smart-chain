import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dtos/AuthDto';
import { RolesGuard } from 'src/guards/RoleGuard';
import { AuthService } from 'src/services/AuthService';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('/signin')
	@ApiOperation({ summary: 'Đăng nhập', description: 'Api đăng nhập người dùng' })
	async auth(@Req() req, @Res() res, @Body() userAuthDto: AuthDto) {
		return res.status(HttpStatus.OK).json(await this.authService.login(userAuthDto));
	}

	// @Post('/signup')
	// @ApiOperation({ summary: 'Đăng ký', description: 'Api đăng ký người dùng' })
	// async signup(@Req() req, @Res() res, @Body() userAuthDto: AuthDto) {
	// 	return res.status(HttpStatus.OK).json(await this.authService.register(userAuthDto));
	// }

	@Get('/callback')
	@ApiOperation({ summary: 'Callback', description: 'Api callback' })
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@ApiBearerAuth()
	async callback(@Req() req, @Res() res) {
		return res.status(HttpStatus.OK).json({ msg: "ok" });
	}
}
