import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
    @ApiProperty({ type: String, required: true, example: "hoangduy06104" }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly password: string;
}

export class ForgotPasswordDto {
    @ApiProperty({ type: String, required: true, example: "hoangduy06104" }) readonly username: string;
}

export class ValidateOtpDto {
    @ApiProperty({ type: String, required: true }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly otp: string;
}

export class SetNewPasswordDto {
    @ApiProperty({ type: String, required: true, example: "hoangduy06104" }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly password: string;
    @ApiProperty({ type: String, required: true }) readonly token: string;
}