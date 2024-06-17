import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateTransporterBillDto {
    @ApiProperty({ type: String, required: true })
    readonly owner: string;

    @ApiProperty({ type: String, required: true })
    readonly batchId: string;

    @ApiProperty({ type: String, required: true })
    readonly departure: string;

    @ApiProperty({ type: String, required: true })
    readonly destination: string;
}

export class EditTransporterBillDto extends OmitType(CreateTransporterBillDto, ['owner', 'batchId'] as const) { }
