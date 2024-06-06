import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Put,
  Query,
  Body,
  Delete,
} from '@nestjs/common';

/* */
import { UserService } from '@src/user/user.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { responseCreatetor, verifyToken } from '@/base';
import {
  CreaterUserDTO,
  CreaterDangNhapDTO,
  CreaterPhanTrangDTO,
} from '@dto/index';

@ApiTags('QuanLyNguoiDung')
@Controller('NguoiDung')
export class UserController {
  private _service = new UserService();

  //#region Người Dùng
  @Get('/LayDanhSachNguoiDung')
  danhSachNguoiDung(@Req() req, @Res() res) {
    return this._service.danhSachNguoiDung(res);
  }
  //#endregion

  //#region Danh sách
  @Get('/LayDanhSachLoaiNguoiDung')
  danhSachLoaiNguoiDung(@Res() res) {
    return this._service.danhSachLoaiNguoiDung(res);
  }
  //#endregion

  //#region Phân Trang
  @Get('/LayDanhSachNguoiDungPhanTrang')
  @ApiQuery({
    name: 'soTrang',
    type: 'number',
  })
  @ApiQuery({
    name: 'soPhanTu',
    type: 'number',
  })
  nguoiDungPhanTrang(@Query() query: CreaterPhanTrangDTO, @Res() res) {
    let { soTrang, soPhanTu } = query;

    return this._service.danhSachNguoiDungPhanTrang(res, {
      soTrang: Number(soTrang),
      soPhanTu: Number(soPhanTu),
    });
  }
  //#endregion

  //#region Tìm Kiếm User
  @Get('/TimKiemNguoiDung')
  @ApiQuery({
    name: 'timKiem',
    required: true,
    description: 'Tên Người dùng cần tìm',
  })
  timKiemNguoiDung(@Query() query, @Res() res) {
    let { timKiem } = query;

    if (timKiem === '')
      return responseCreatetor(res, 200, 'Giá trị tìm kiếm không hợp lệ');

    return this._service.timKiemNguoiDung(res, timKiem);
  }
  //#endregion

  //#region Đăng Nhập
  @Post('/DangNhap')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin@email.com' },
        mat_khau: {
          type: 'string',
          example: 'Passw0rd',
          description: 'Mật khẩu có ít nhất 8 ký tự , 1 chữ hoa, 1 số',
        },
      },
    },
  })
  async dangNhap(@Body() createrDangNhap: CreaterDangNhapDTO, @Res() res) {
    let { email, mat_khau } = createrDangNhap;

    return this._service.dangNhap(res, email, mat_khau);
  }
  //#endregion

  //#region Đăng Ký
  @Post('/DangKy')
  @ApiBody({
    type: CreaterUserDTO,
  })
  dangKy(@Res() res, @Body() body: CreaterUserDTO) {
    return this._service.dangKy(res, body);
  }
  //#endregion

  //#region Lấy thông tin
  @Post('/ThongTinNguoiDung')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'ABCNV' },
      },
    },
  })
  thongTinNguoiDung(@Body() body, @Res() res) {
    let { token } = body;
    let codedToken = verifyToken(token);

    console.log(codedToken['id']);
    // Kiểm tra token
    if (token === '' || codedToken === null || codedToken === null)
      return responseCreatetor(res, 200, 'Token không hợp lệ');

    return this._service.thongTinNguoiDung(res, codedToken['id']);
  }
  //#endregion

  //#region Cập nhật
  @Put('/CapNhatNguoiDung')
  @ApiQuery({
    name: 'token',
    type: 'string',
    required: true,
  })
  @ApiBody({ type: CreaterUserDTO })
  capNhatNguoiDung(@Query() query, @Body() body: CreaterUserDTO, @Res() res) {
    let { token } = query;
    let codedToken = verifyToken(token);

    // Kiểm tra token
    if (token === '' || codedToken === null || codedToken === null)
      return responseCreatetor(res, 200, 'Token không hợp lệ');

    return this._service.capNhatNguoiDung(res, body, codedToken['id']);
  }
  //#endregion

  //#region Xóa
  @Delete('/XoaNguoiDung')
  @ApiQuery({
    name: 'token',
    type: 'string',
    required: true,
  })
  xoaNguoiDung(@Query() query, @Res() res) {
    let { token } = query;

    let codedToken = verifyToken(token);

    // Kiểm tra token
    if (token === '' || codedToken === null || codedToken === null)
      return responseCreatetor(res, 200, 'Token không hợp lệ');

    return this._service.xoaNguoiDung(res, codedToken['id']);
  }
  //#endregion
}
