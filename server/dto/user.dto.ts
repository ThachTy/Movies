import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsNumberString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({ type: 'string', name: 'ho_ten', example: 'Demo User' })
  ho_ten?: string;

  @ApiProperty({ type: 'string', name: 'email', example: 'demo@email.com' })
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, {
    message: 'Email không hợp lệ',
  })
  email: string;

  @ApiProperty({ type: 'string', name: 'mat_khau', example: 'Passw0rd' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Mật khẩu không hợp lệ',
  })
  mat_khau: string;

  @IsString()
  @Matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, {
    message: 'Số điện thoại không đúng | Ví dụ : 0912345678 |391234567',
  })
  @ApiProperty({ type: 'string', name: 'so_dt', example: '0912345678' })
  so_dt?: string;

  @IsNumberString()
  @ApiProperty({
    type: 'string',
    name: 'ma_loai_nguoi_dung',
    example: '1',
  })
  ma_loai_nguoi_dung?: string;

  @ApiProperty({
    type: 'string',
    name: 'avatar',
  })
  avatar?: string;
}
