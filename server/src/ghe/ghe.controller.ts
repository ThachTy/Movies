import { Controller, Get, Res, Body } from '@nestjs/common';
import { GheService } from './ghe.service';

@Controller('Ghe')
export class GheController {
  _service = new GheService();

  @Get('/DanhSachGhe')
  danhsachGhe(@Res() res, @Body() body) {
    return this._service.danhSachGheTheoRap(res, body);
  }
}
