import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DatVeService } from './datve.service';
import { CreaterDatVeDTO } from '@/dto';

@ApiTags('QuanLyDatVe')
@Controller('DatVe')
export class DatVeController {
  private _service = new DatVeService();

  //#region Them
  @Post('/Them')
  @ApiBody({ type: CreaterDatVeDTO })
  themDanhSachVe(@Res() res, @Body() body: CreaterDatVeDTO) {
    return this._service.themDanhSachVe(res, body);
  }
  //#endregion

  //#region  Xoa
  @Delete('/Xoa')
  @ApiBody({
    schema: { properties: { ma_dat_ve: { type: 'string', example: '1' } } },
  })
  xoaDatVe(@Res() res, @Body() body) {
    return this._service.xoaDatVe(res, body);
  }
  //#endregion
}
