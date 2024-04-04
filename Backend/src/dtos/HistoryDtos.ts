import { ApiProperty } from '@nestjs/swagger';

export class HistoryDto {
    @ApiProperty({ type: String, required: true })
    readonly batchId: string;

    @ApiProperty({ type: String, required: true })
    readonly action: string;
}
