import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto, ForgotPasswordDto, SetNewPasswordDto, ValidateOtpDto } from 'src/dtos/AuthDto';
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

	@Post('/forgot-password')
	@ApiOperation({ summary: 'Quên MK', description: 'Api Reset password' })
	async forgot(@Req() req, @Res() res, @Body() userAuthDto: ForgotPasswordDto) {
		return res.status(HttpStatus.OK).json(await this.authService.forgotPassword(userAuthDto.username));
	}

	@Post('/validate-otp')
	@ApiOperation({ summary: 'Xác nhận OTP'})
	async validateOtp(@Req() req, @Res() res, @Body() dto: ValidateOtpDto) {
		return res.status(HttpStatus.OK).json(await this.authService.validateOtp(dto));
	}

	@Post('/set-new-password')
	@ApiOperation({ summary: 'Đặt lại MK' })
	async setNewPassword(@Req() req, @Res() res, @Body() dto: SetNewPasswordDto) {
		return res.status(HttpStatus.OK).json(await this.authService.setNewPassword(dto));
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
