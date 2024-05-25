import { ApiProperty, OmitType } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ type: String, required: true }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly password: string;
    @ApiProperty({ type: String, required: true }) readonly name: string;
    @ApiProperty({ type: String, required: true }) readonly phoneNumber: string;
    @ApiProperty({ type: String, required: true }) readonly roles: string;
    @ApiProperty({ type: String, required: true }) readonly email: string;
}

export class UpdateUserDto extends OmitType(CreateUserDto, ['password', 'username'] as const) { }