import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateSellerStorageDto {
    @ApiProperty({ type: String, required: true })
    readonly ownerId: string;

    @ApiProperty({ type: String, required: true })
    readonly batchId: string;

    @ApiProperty({ type: Number, required: true })
    readonly quantity: number;
}

export class EditSellerStorageDto extends OmitType(CreateSellerStorageDto, [] as const) { }
