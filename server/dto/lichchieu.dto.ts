import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LichChieuDto {
  @ApiProperty({ type: 'string', name: 'ma_rap' })
  @IsString()
  ma_rap: string;

  @ApiProperty({ type: 'string', name: 'ma_phim' })
  @IsString()
  ma_phim: string;

  @ApiProperty({ type: 'string', name: 'ngay_khoi_chieu' })
  @IsString()
  ngay_khoi_chieu: string;

  @ApiProperty({ type: 'number', name: 'gia_ve' })
  @IsNumber()
  gia_ve: number;
}
