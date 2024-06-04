import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';

/* */
import { LichChieuService } from './lichchieu.service';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreaterLichChieuDTO } from '@dto/index';

@Controller('LichChieu')
export class LichChieuController {
  private _service = new LichChieuService();

  //#region LichChieu
  @Get('/LayDanhSachLichChieu')
  danhSachLichChieu(@Req() req, @Res() res) {
    return this._service.danhSachLichChieu(res);
  }
  //#endregion

  //#region LichChieu theo mã phim
  @Get('/LayDanhSachLichChieuTheoMaPhim')
  @ApiQuery({ type: 'string', name: 'ma_phim' })
  danhSachLichChieuTheoMaPhim(@Res() res, @Query() query) {
    return this._service.danhSachLichChieuTheoMaPhim(
      res,
      Number(query.ma_phim),
    );
  }
  //#endregion

  //#region LichChieu theo mã Phim và Hệ Thống Rạp
  @Get('/LayLichChieuTheoPhimVaHeThong')
  @ApiQuery({ type: 'string', name: 'ma_he_thong_rap' })
  @ApiQuery({ type: 'string', name: 'ma_phim' })
  danhSachLichChieuTheoPhimVaHeThong(@Res() res, @Query() query) {
    return this._service.danhSachLichChieuTheoPhimVaHeThong(
      res,
      Number(query.ma_he_thong_rap),
      Number(query.ma_phim),
    );
  }
  //#endregion

  //#region Thêm
  @Post('/Them')
  @ApiBody({ type: CreaterLichChieuDTO })
  dangKy(@Res() res, @Body() body: CreaterLichChieuDTO) {
    return this._service.dangKy(res, body);
  }
  //#endregion

  //#region Xóa
  @Delete('/XoaLichChieu')
  xoaLichChieu(@Body() body, @Res() res) {
    return this._service.xoaLichChieu(res, Number(body.ma_LichChieu));
  }
  //#endregion
}
