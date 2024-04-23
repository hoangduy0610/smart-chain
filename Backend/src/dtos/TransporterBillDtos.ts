import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateTransporterBillDto {
    @ApiProperty({ type: String, required: true })
    readonly ownerId: string;

    @ApiProperty({ type: String, required: true })
    readonly batchId: string;
}

export class EditTransporterBillDto extends OmitType(CreateTransporterBillDto, [] as const) { }
