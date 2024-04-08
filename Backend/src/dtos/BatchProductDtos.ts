import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateBatchProductDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    readonly status: string;

    @ApiProperty({ type: String, required: true })
    readonly productId: string;

    @ApiProperty({ type: Number, required: true })
    readonly quantity: number;
}

export class EditBatchProductDto extends OmitType(CreateBatchProductDto, ['productId'] as const) { }
