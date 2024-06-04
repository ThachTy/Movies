import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
//   ma_da_ve      Int  @id @default(autoincrement())
//   ma_lich_chieu Int?
//   ma_nguoi_dung Int?
//   ma_ghe        Int?

export class DatVeDto {
  @ApiProperty({ type: 'string', name: 'ma_lich_chieu', example: '1' })
  ma_lich_chieu: string;

  @ApiProperty({ type: 'string', name: 'token', example: '3123' })
  token: string;

  @ApiProperty({ type: 'string', name: 'ma_ghe', example: 'G027' })
  ma_ghe?: string;

  @ApiProperty({
    type: 'array',
    name: 'danh_sach_ma_ghe',
    items: { type: 'object', example: { ma_ghe: 'G027' } },
  })
  danh_sach_ghe?: string[];
}
