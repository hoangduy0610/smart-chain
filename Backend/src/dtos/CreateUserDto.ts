import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ type: String, required: true }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly name: string;
}