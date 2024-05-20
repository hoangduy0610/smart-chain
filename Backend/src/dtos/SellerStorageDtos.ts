import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateSellerStorageDto {
    @ApiProperty({ type: String, required: true })
    readonly owner: string;

    @ApiProperty({ type: String, required: true })
    readonly batchId: string;

    @ApiProperty({ type: Number, required: true })
    readonly quantity: number;

    @ApiProperty({ type: Number, required: true })
    readonly pricing: number;

    @ApiProperty({ type: Number, required: false })
    readonly sold: number;
}

export class EditSellerStorageDto extends OmitType(CreateSellerStorageDto, [] as const) { }
