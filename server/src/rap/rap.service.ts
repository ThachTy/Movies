import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseCreatetor } from '@/base';
import { MailService } from '@src/mail/mail.service';
import { LichChieuService } from '@src/lichchieu/lichchieu.service';
import { isInt } from 'class-validator';

@Injectable()
export class RapService {
  _prisma = new PrismaClient();

  _lichChieuSv = new LichChieuService();

  _mail = new MailService();

  //#region  Danh sách
  async danhSachRap(res): Promise<unknown> {
    let data = [];
    let message = '';
    try {
      data = await this._prisma.heThongRap
        .findMany({ include: { CumRap: { include: { RapPhim: true } } } })
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

  //#region Danh Sách Phân Trang
  async danhSachRapPhanTrang(res, { soTrang, soPhanTu }): Promise<unknown> {
    let message = '';
    let data = null;
    let countUser = 0;

    try {
      countUser = await this._prisma.rapPhim.count();
      let skip = (soTrang <= 1 ? 0 : soTrang - 1) * soPhanTu;
      let take = soPhanTu;

      if (soPhanTu >= countUser) {
        skip = 0;
        take = countUser;
      }

      data = await this._prisma.rapPhim
        .findMany({
          skip,
          take,
        })
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
      return res.status(200).send({
        code: 200,
        message,
        soTrang,
        soPhanTu,
        soLuong: countUser,
        data,
      });
    }
  }
  //#endregion

  //#region Tìm Theo Tên
  async timKiemRap(res, value): Promise<unknown> {
    try {
      let movies = await this._prisma.rapPhim.findMany({
        where: { ten_rap: { contains: value } },
        // select: {
        //   ma_phim: true,
        //   ten_phim: true,
        //   trailer: true,
        //   hinh_anh: true,
        //   mo_ta: true,
        //   ngay_khoi_chieu: true,
        //   sap_chieu: true,
        //   danh_gia: true,
        //   dang_chieu: true,
        //   hot: true,
        // },
      });
      if (movies.length !== 0)
        return responseCreatetor(res, 200, 'Thành công', movies);

      return responseCreatetor(res, 200, 'Không tìm thấy Rap', []);
    } catch (error) {
      console.error(error);
      return responseCreatetor(res, 200, 'Không thành công', []);
    }
  }
  //#endregion

  //#region Danh sách Loại Người Dùng
  async danhSachCumRap(res): Promise<unknown> {
    let message = '';
    let data = [];
    try {
      data = await this._prisma.cumRap
        .findMany()
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
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region Đăng Ký
  async dangKy(res, newRap): Promise<unknown> {
    let message = '';
    let data = {};

    try {
      let ma_cum_rap = isInt(newRap.ma_cum_rap * 1)
        ? newRap.ma_cum_rap * 1
        : null;

      const slideRap: any = {
        ten_rap: newRap.ten_rap,
        ma_cum_rap,
      };

      data = await this._prisma.rapPhim
        .create({
          data: slideRap,
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

  //#region Lấy Thong Tin
  async thongTinRap(res, id): Promise<unknown> {
    let message = '';
    let data = null;
    try {
      data =
        id &&
        (await this._prisma.rapPhim
          .findFirst({
            where: { ma_rap: id },
          })
          .then((res) => {
            message = 'Thành công';
            return res;
          })
          .catch((err) => {
            throw err;
          }));
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region Cập Nhật
  async capNhatRap(res, valueUpdate): Promise<unknown> {
    let data = null;
    let message = '';

    try {
      const slideRap: any = {
        ma_rap: valueUpdate.ma_rap * 1,
        ten_rap: valueUpdate.ten_rap,
        ma_cum_rap: valueUpdate.ma_cum_rap * 1,
      };
      data = await this._prisma.rapPhim
        .update({
          where: { ma_rap: slideRap.ma_rap },
          data: slideRap,
        })
        .then((res) => {
          message = 'Thành công';
          return res;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.error(error);
      message = 'Không thành công';
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region  Xóa
  async xoaRap(res, ma_rap) {
    let message = '';
    let rap = null;
    try {
      rap = await this._prisma.rapPhim
        .delete({
          where: { ma_rap },
        })
        .catch((error) => {
          if (error) return null;
        });

      message = !rap
        ? `Xóa không thành công`
        : `Xóa Rạp ${rap.ten_rap} thành công`;
    } catch (error) {
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message);
    }
  }
  //#endregion

  //#region Phim
  async danhSachPhim(res, ma_rap) {
    this._lichChieuSv.danhSachPhimTheoRap(res, ma_rap);
  }
  //#endregion
}
