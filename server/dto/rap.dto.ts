import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RapDto {
  @ApiProperty({ type: 'string', name: 'ten_rap' })
  @IsString()
  ten_rap: string;

  @ApiProperty({ type: 'string', name: 'ma_cum_rap' })
  @IsString()
  ma_cum_rap: string;
}
