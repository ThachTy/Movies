import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseCreatetor } from '@/base';
import { GheService } from '@src/ghe/ghe.service';
import { verifyToken } from '@/base/jwt';

@Injectable()
export class DatVeService {
  private readonly _prisma = new PrismaClient();
  private readonly _gheService = new GheService();

  //#region  Thêm
  async themDatVe(body) {
    let datVeAsync = this._prisma.datVe.create({
      data: {
        ...body,
        ma_nguoi_dung: Number(body.ma_nguoi_dung),
        ma_lich_chieu: Number(body.ma_lich_chieu),
      },
    });

    let gheAsync = this._gheService.capNhatTrangThaiGhe(body.ma_ghe, true);

    return await Promise.all([datVeAsync, gheAsync])
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  //#endregion

  //#region Thêm danh sách Đặt vé
  async themDanhSachVe(res, body) {
    let message = '';

    if (body.danh_sach_ma_ghe.length === 0)
      responseCreatetor(res, 200, 'Danh sách ghế trống', []);

    let jwt = verifyToken(body.token);

    console.log(jwt['id']);

    let arrayProsmise = body.danh_sach_ma_ghe.map(async (item) => {
      let res = await this._prisma.datVe.findMany({
        where: {
          OR: [
            { ma_ghe: item.ma_ghe },
            { Ghe: { ma_ghe: item.ma_ghe, trang_thai: true } },
          ],
        },
      });

      return {
        ma_lich_chieu: Number(body.ma_lich_chieu),
        ma_nguoi_dung: Number(jwt['id']),
        ma_ghe: item.ma_ghe,
      };
    });

    let result = await Promise.all(arrayProsmise);

    let gheAsync = result.map((item) => {
      return (
        !item.isBooked &&
        this._gheService.capNhatTrangThaiGhe(item.ma_ghe, true)
      );
    });

    let datVeAsync = this._prisma.datVe.createMany({
      data: result,
    });

    await Promise.all([...gheAsync, datVeAsync])
      .then(() => {
        message = 'Thành công';
      })
      .catch(() => {
        message = 'Không thành công';
      });

    responseCreatetor(res, 200, message, []);
  }
  //#endregion

  //#region  Xoa
  async xoaDatVe(res, body) {
    let data = null;
    let message = '';
    try {
      let datVe = await this._prisma.datVe.findUnique({
        where: { ma_dat_ve: Number(body.ma_dat_ve) },
      });

      if (datVe) {
        let gheAsync = this._gheService.capNhatTrangThaiGhe(body.ma_ghe, false);
        let datVeAsync = this._prisma.datVe.delete({
          where: { ma_dat_ve: datVe.ma_dat_ve },
        });
        await Promise.all([gheAsync, datVeAsync])
          .catch((err) => {
            throw err;
          })
          .then((res) => {
            message = 'Xóa vé thành công';
            return res;
          });
      } else {
        message = 'Không tìm thấy Đặt Vé';
      }
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
}
//#endregion
