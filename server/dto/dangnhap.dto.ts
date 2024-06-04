import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class DangNhapDto {
  @ApiProperty({ name: 'email', type: 'string' })
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, {
    message: 'Email không hợp lệ',
  })
  email: string;

  @ApiProperty({ name: 'matKhau', type: 'string', example: 'Passw0rd' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Mật khẩu không hợp lệ',
  })
  mat_khau: string;
}
