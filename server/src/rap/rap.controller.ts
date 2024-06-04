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
  Param,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';

/* */
import { RapService } from './rap.service';
import { responseCreatetor } from '@/base';
import { CreaterRapDTO, CreaterPhanTrangDTO } from '@dto/index';

@ApiTags('QuanLyRap')
@Controller('Rap')
export class RapController {
  private _service = new RapService();

  //#region Rap
  @Get('/LayDanhSachRap')
  danhSachRap(@Req() req, @Res() res) {
    return this._service.danhSachRap(res);
  }
  //#endregion

  //#region Danh sách loại Rap
  @Get('/LayDanhSachCumRap')
  danhSachCumRap(@Res() res) {
    return this._service.danhSachCumRap(res);
  }
  //#endregion

  //#region Phân Trang
  @Get('/DanhSachRapPhanTrang')
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

    return this._service.danhSachRapPhanTrang(res, {
      soTrang: Number(soTrang),
      soPhanTu: Number(soPhanTu),
    });
  }
  //#endregion

  //#region Tìm Kiếm
  @Get('/TimKiemRap')
  @ApiQuery({
    name: 'timKiem',
    required: true,
    description: 'Tên rạp cần tìm',
  })
  timKiemRap(@Query() query, @Res() res) {
    let { timKiem } = query;

    if (timKiem === '')
      return responseCreatetor(res, 200, 'Giá trị tìm kiếm không hợp lệ');

    return this._service.timKiemRap(res, timKiem);
  }
  //#endregion

  //#region Thêm
  @Post('/DangKy')
  @ApiBody({ type: CreaterRapDTO })
  dangKy(@Res() res, @Body() body: CreaterRapDTO) {
    let { ma_cum_rap }: any = body;
    if (isNaN(ma_cum_rap * 1))
      return responseCreatetor(res, 200, 'Mã cụm rạp không đúng');
    return this._service.dangKy(res, body);
  }
  //#endregion

  //#region Lấy thông tin
  @Post('/ThongTinRap')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ma_rap: { type: 'string', example: 'ABCNV' },
      },
    },
  })
  thongTinRap(@Body() body, @Res() res) {
    let { ma_rap } = body;

    return this._service.thongTinRap(res, Number(ma_rap));
  }
  //#endregion

  //#region Cập nhật
  @Put('/CapNhatRap')
  @ApiQuery({
    name: 'token',
    type: 'string',
    required: true,
  })
  @ApiBody({
    schema: {
      properties: {
        ma_rap: { type: 'string', example: '3' },
        ten_rap: { type: 'string', example: 'Rap 123' },
        ma_cum_rap: { type: 'string', example: '1' },
      },
    },
  })
  capNhatRap(@Query() query, @Body() body, @Res() res) {
    let { token } = query;
    // let codedToken = verifyToken(token);

    // Kiểm tra token
    // if (token === '' || codedToken === null || codedToken === null)
    //   return responseCreatetor(res, 200, 'Token không hợp lệ');

    if (isNaN(body.ma_rap * 1) || isNaN(body.ma_cum_rap * 1))
      return responseCreatetor(res, 200, 'Mã rạp, mã cụm rạp không đúng');

    return this._service.capNhatRap(res, body);
  }
  //#endregion

  //#region Xóa
  @Delete('/XoaRap')
  @ApiQuery({
    name: 'token',
    type: 'string',
    required: true,
  })
  @ApiBody({
    schema: {
      properties: {
        ma_rap: {
          type: 'string',
          example: '1',
        },
      },
    },
  })
  xoaRap(@Query() query, @Body() body, @Res() res) {
    // let { token } = query;

    // let codedToken = verifyToken(token);

    // // Kiểm tra token
    // if (token === '' || codedToken === null || codedToken === null)
    //   return responseCreatetor(res, 200, 'Token không hợp lệ');

    return this._service.xoaRap(res, Number(body.ma_rap));
  }
  //#endregion

  //#region Phim
  @Get('/DanhSachPhim')
  @ApiQuery({ name: 'ma_rap', type: 'string', required: true })
  danhSachPhim(@Res() res, @Query() query) {
    this._service.danhSachPhim(res, query.ma_rap * 1);
  }
  //#endregion
}
