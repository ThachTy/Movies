import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseCreatetor } from '@/base';

@Injectable()
export class LichChieuService {
  _prisma = new PrismaClient();

  //#region  Danh sách
  async danhSachLichChieu(res): Promise<unknown> {
    let data = [];
    let message = '';
    try {
      data = await this._prisma.lichChieu
        .findMany()
        .then((res) => {
          message = 'Thành công';
          return res;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.error(error);
      message = 'Không thành công';
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region Đăng Ký
  async dangKy(res, newLichChieu): Promise<unknown> {
    let message = '';
    let data = {};
    try {
      data = await this._prisma.lichChieu
        .create({
          data: newLichChieu,
        })
        .then(async (res) => {
          message = 'Đăng Ký thành công';
          return res;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.error(error);
      message = 'Đăng ký không thành công';
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region Danh sach Phim theo Rap
  async danhSachPhimTheoRap(res, ma_rap) {
    let message = '';
    let data = null;
    try {
      data = await this._prisma.lichChieu
        .findMany({
          where: { ma_rap },
          select: { Phim: true },
        })
        .then((res) => {
          message = 'Thành công';
          return res;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, [...data]);
    }
  }
  //#endregion

  //#region Danh sach Phim theo Ma phim
  async danhSachLichChieuTheoMaPhim(res, ma_phim) {
    let message = '';
    let data = null;
    try {
      data = await this._prisma.lichChieu
        .findMany({
          where: { ma_phim },
          include: {
            Phim: { where: { dang_chieu: true } },
            RapPhim: { include: { CumRap: { include: { HeThongRap: true } } } },
          },
        })
        .then((res) => {
          message = 'Thành công';
          return res;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, [...data]);
    }
  }
  //#endregion

  //#region Danh sach Cum Rap theo ma_lich_chieu và ma_he_thong
  async danhSachLichChieuTheoPhimVaHeThong(res, ma_he_thong_rap, ma_phim) {
    let message = '';
    let data = null;

    try {
      data = await this._prisma.lichChieu
        .findMany({
          select: {
            ma_lich_chieu: true,
            gia_ve: true,
            ma_phim: true,
            ngay_gio_chieu: true,
            Phim: { where: { ma_phim } },
            RapPhim: {
              select: {
                ma_rap: true,
                ten_rap: true,
                Ghe: {
                  orderBy: [{ vi_tri_hang: 'asc' }, { vi_tri_cot: 'asc' }],
                },
                CumRap: {
                  select: {
                    ma_cum_rap: true,
                    ten_cum_rap: true,
                    dia_chi: true,
                    HeThongRap: { where: { ma_he_thong_rap } },
                  },
                },
              },
            },
          },
        })
        .then((res) => {
          message = 'Thành công';

          let filterResult = res.filter((item) => {
            return (
              item.RapPhim.CumRap.HeThongRap !== null && item.Phim !== null
            );
          });
          return filterResult;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, [...data]);
    }
  }
  //#endregion

  //#region  Xóa
  async xoaLichChieu(res, ma_lich_chieu) {
    let message = '';
    let LichChieu = null;
    try {
      LichChieu = await this._prisma.lichChieu
        .delete({
          where: { ma_lich_chieu },
        })
        .catch((error) => {
          if (error) return null;
        });

      message = !LichChieu
        ? `Xóa không thành công`
        : `Xóa Rạp ${LichChieu.ten_LichChieu} thành công`;
    } catch (error) {
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message);
    }
  }
  //#endregion
}
