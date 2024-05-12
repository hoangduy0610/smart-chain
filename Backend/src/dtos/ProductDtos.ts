import { ApiProperty } from '@nestjs/swagger';

export class AttributeDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    readonly value: string;
}

export class ProductDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    readonly price: string;

    @ApiProperty({ type: String, required: true })
    readonly description: string;

    @ApiProperty({ type: [AttributeDto], required: true })
    readonly attributes: AttributeDto[];

    @ApiProperty({ type: String, required: true })
    readonly imageUrl: string;
}