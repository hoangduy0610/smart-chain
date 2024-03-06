import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
    @ApiProperty({ type: String, required: true, example: "hoangduy06104" }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly password: string;
}