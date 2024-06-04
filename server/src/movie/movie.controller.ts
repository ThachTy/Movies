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
import { MovieService } from './movie.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { responseCreatetor } from '@/base';
import { CreaterPhimDTO, CreaterPhanTrangDTO } from '@dto/index';

@ApiTags('QuanLyPhim')
@Controller('Phim')
export class MovieController {
  private _service = new MovieService();

  //#region Phim
  @Get('/LayDanhSachPhim')
  danhSachPhim(@Req() req, @Res() res) {
    return this._service.danhSachPhim(res);
  }
  //#endregion

  //#region Danh sách loại Phim
  @Get('/LayDanhSachLoaiPhim')
  danhSachLoaiPhim(@Res() res) {
    return this._service.danhSachLoaiPhim(res);
  }
  //#endregion

  //#region Phân Trang
  @Get('/DanhSachPhimPhanTrang')
  @ApiQuery({
    name: 'soTrang',
    type: 'number',
  })
  @ApiQuery({
    name: 'soPhanTu',
    type: 'number',
  })
  phimPhanTrang(@Query() query: CreaterPhanTrangDTO, @Res() res) {
    let { soTrang, soPhanTu } = query;

    return this._service.danhSachPhimPhanTrang(res, {
      soTrang: Number(soTrang),
      soPhanTu: Number(soPhanTu),
    });
  }
  //#endregion

  //#region Tìm Kiếm
  @Get('/TimKiemPhim')
  @ApiQuery({
    name: 'timKiem',
    required: true,
    description: 'Tên Người dùng cần tìm',
  })
  timKiemPhim(@Query() query, @Res() res) {
    let { timKiem } = query;

    if (timKiem === '')
      return responseCreatetor(res, 200, 'Giá trị tìm kiếm không hợp lệ');

    return this._service.timKiemPhim(res, timKiem);
  }
  //#endregion

  //#region Thêm
  @Post('/DangKy')
  @ApiBody({
    type: CreaterPhimDTO,
  })
  dangKy(@Res() res, @Body() body: CreaterPhimDTO) {
    return this._service.dangKy(res, body);
  }
  //#endregion

  //#region Lấy thông tin
  @Post('/ThongTinPhim')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ma_phim: { type: 'string', example: 'ABCNV' },
      },
    },
  })
  thongTinPhim(@Body() body, @Res() res) {
    let { ma_phim } = body;

    return this._service.thongTinPhim(res, Number(ma_phim));
  }
  //#endregion

  //#region Cập nhật
  @Put('/CapNhatPhim')
  @ApiQuery({
    name: 'token',
    type: 'string',
    required: true,
  })
  @ApiBody({
    schema: {
      properties: {
        ma_phim: { type: 'string', example: '1716176145638' },
        ten_phim: { type: 'string', example: 'Phim 123' },
        trailer: { type: 'string', example: 'trailer.url' },
        hinh_anh: { type: 'string', example: 'hinhAnh.jpg' },
        mo_ta: { type: 'string', example: 'Phim hay' },
        ngay_khoi_chieu: { type: 'string', example: 'USER' },
        danh_gia: { type: 'number', example: '5' },
        hot: { type: 'boolean', example: 'TRUE FALSE' },
        dang_chieu: { type: 'boolean', example: true },
        sap_chieu: { type: 'boolean', example: false },
      },
    },
  })
  capNhatPhim(@Query() query, @Body() body: CreaterPhimDTO, @Res() res) {
    let { token } = query;
    // let codedToken = verifyToken(token);

    // Kiểm tra token
    // if (token === '' || codedToken === null || codedToken === null)
    //   return responseCreatetor(res, 200, 'Token không hợp lệ');

    return this._service.capNhatPhim(res, body);
  }
  //#endregion

  //#region Xóa
  @Delete('/XoaPhim')
  @ApiQuery({
    name: 'token',
    type: 'string',
    required: true,
  })
  @ApiBody({
    schema: {
      properties: {
        ma_phim: {
          type: 'string',
          example: '1716019147836',
        },
      },
    },
  })
  xoaPhim(@Query() query, @Body() body, @Res() res) {
    // let { token } = query;

    // let codedToken = verifyToken(token);

    // // Kiểm tra token
    // if (token === '' || codedToken === null || codedToken === null)
    //   return responseCreatetor(res, 200, 'Token không hợp lệ');

    return this._service.xoaPhim(res, body.ma_phim);
  }
  //#endregion
}
