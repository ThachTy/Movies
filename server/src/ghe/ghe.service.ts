import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseCreatetor } from '@/base';

@Injectable()
export class GheService {
  private readonly _prisma = new PrismaClient();

  //#region  Danh Sách Ghế
  async danhSachGheTheoRap(res, ma_rap) {
    let data = null;
    let message = '';
    try {
      data = await this._prisma.ghe
        .findMany({ where: { ma_rap } })
        .then((res) => {
          message = 'Thành công';
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region  Cập nhật trạng thái ghế
  async capNhatTrangThaiGhe(ma_ghe, trang_thai) {
    let data = null;
    try {
      data = await this._prisma.ghe
        .update({ where: { ma_ghe }, data: { trang_thai } })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.error(error);
    } finally {
      return data;
    }
  }
  //#endregion

  //#region  Cập nhật trạng thái ghế
  async timGhe(ma_ghe) {
    let data = null;
    try {
      data = await this._prisma.ghe
        .findFirst({ where: { ma_ghe } })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.error(error);
    } finally {
      return data;
    }
  }
  //#endregion
}
