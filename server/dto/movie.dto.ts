import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  Matches,
  isNumber,
  isString,
} from 'class-validator';

// ma_phim         String    @id @default(dbgenerated("(now() + 1)")) @db.VarChar(255)
//   ten_phim        String?   @db.VarChar(255)
//   trailer         String?   @db.VarChar(255)
//   hinh_anh        String?   @db.VarChar(255)
//   mo_ta           String?   @db.VarChar(255)
//   ngay_khoi_chieu DateTime? @db.Date
//   danh_gia        Int?
//   hot             Boolean?
//   dang_chieu      Boolean?
//   sap_chieu       Boolean?

export class MovieDto {
  @IsString()
  @ApiProperty({ type: 'string', name: 'tenPhim' })
  ten_phim?: string;

  @ApiProperty({ type: 'string', name: 'trailer' })
  @IsString()
  trailer?: string;

  @ApiProperty({ type: 'string', name: 'hinhAnh' })
  @IsString()
  hinh_anh?: string;

  @ApiProperty({ type: 'string', name: 'moTa' })
  @IsString()
  mo_ta?: string;

  @ApiProperty({ type: 'string', name: 'ngay_khoi_chieu' })
  @IsString()
  @Matches(/^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message:
      'Ngày khởi chiếu không đúng định dạng dd/mm/yyyy Ví du: 11/02/2022',
  })
  ngay_khoi_chieu?: string;

  @ApiProperty({ type: 'number', name: 'danhGia' })
  @IsNumber()
  danh_gia?: number;

  @ApiProperty({ type: 'boolean', name: 'hot' })
  @IsBoolean()
  hot?: boolean;
  @ApiProperty({ type: 'boolean', name: 'dangChieu' })
  @IsBoolean()
  dang_chieu?: boolean;

  @ApiProperty({ type: 'boolean', name: 'Sắp Chiếu' })
  @IsBoolean()
  sap_chieu?: boolean;
}
