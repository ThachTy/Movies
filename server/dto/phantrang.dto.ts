import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class PhanTrang {
  @Matches(/[0-9]/, { message: 'Số Trang không hợp lệ' })
  @ApiProperty({ type: 'string', name: 'soTrang', example: '1' })
  soTrang: string;

  @Matches(/[0-9]/, { message: 'Số Phần Tử không hợp lệ' })
  @ApiProperty({ type: 'string', name: 'soPhanTu', example: '5' })
  soPhanTu: string;
}
