import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  responseCreatetor,
  hashCrypt,
  compareCrypt,
  createToken,
  changeDateToString,
} from '@/base';
import { MailService } from '@src/mail/mail.service';

const ROUND_SALT = 10;

@Injectable()
export class MovieService {
  _prisma = new PrismaClient();
  _mail = new MailService();

  //#region  Danh sách
  async danhSachPhim(res): Promise<unknown> {
    let data = [];
    let message = '';
    try {
      data = await this._prisma.phim
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

  //#region Danh Sách Phân Trang
  async danhSachPhimPhanTrang(res, { soTrang, soPhanTu }): Promise<unknown> {
    let message = '';
    let data = null;
    let countUser = 0;

    try {
      countUser = await this._prisma.phim.count();
      let skip = (soTrang <= 1 ? 0 : soTrang - 1) * soPhanTu;
      let take = soPhanTu;

      if (soPhanTu >= countUser) {
        skip = 0;
        take = countUser;
      }

      data = await this._prisma.phim
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
  async timKiemPhim(res, value): Promise<unknown> {
    try {
      let movies = await this._prisma.phim.findMany({
        where: { ten_phim: { contains: value } },
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

      return responseCreatetor(res, 200, 'Không tìm thấy Phim', []);
    } catch (error) {
      console.error(error);
      return responseCreatetor(res, 200, 'Không thành công', []);
    }
  }
  //#endregion

  //#region Danh sách Loại Người Dùng
  async danhSachLoaiPhim(res): Promise<unknown> {
    let message = '';
    let data = [];
    try {
      // data = await this._prisma.loaiPhim
      //   .findMany()
      //   .then((res) => {
      //     message = 'Thành công';
      //     return res;
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });
    } catch (error) {
      message = 'Không thành công';
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message, data);
    }
  }
  //#endregion

  //#region Đăng Nhập
  async dangNhap(res, email, mat_khau): Promise<unknown> {
    return new Promise(null);

    // let token = null;
    // let message = '';
    // try {
    //   let user = await this._prisma.phim
    //     .findFirst({
    //       where: { email },
    //     })
    //     .then((res) => res)
    //     .catch((err) => {
    //       throw err;
    //     });
    //   let checkPassword = user && (await compareCrypt(mat_khau, user.mat_khau));
    //   if (!user || !checkPassword) {
    //     message = 'Thông tin đăng nhập không đúng';
    //   } else {
    //     message = 'Đăng nhập Thành công';
    //     token = user && createToken({ id: user.ma_tai_khoan }, '15m');
    //     await this._mail.sendMail(
    //       user.email,
    //       'Đăng Nhập',
    //       'Đăng Nhập thành công',
    //     );
    //   }
    // } catch (error) {
    //   console.error(error);
    //   message = 'Đăng nhập không thành công';
    // } finally {
    //   return responseCreatetor(res, 200, message, {}, token);
    // }
  }
  //#endregion

  //#region Đăng Ký
  async dangKy(res, newMovie): Promise<unknown> {
    let message = '';
    let data = {};
    try {
      let slideMovie = {
        ...newMovie,
        ma_phim: new Date().getTime().toString(),
        ngay_khoi_chieu: changeDateToString(newMovie.ngay_khoi_chieu),
      };

      data = await this._prisma.phim
        .create({
          data: slideMovie,
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
  async thongTinPhim(res, id): Promise<unknown> {
    let message = '';
    let data = null;
    try {
      data =
        id &&
        (await this._prisma.phim
          .findFirst({
            where: { ma_phim: id },
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
  async capNhatPhim(res, valueUpdate): Promise<unknown> {
    let data = null;
    let message = '';

    try {
      data = await this._prisma.phim
        .update({
          where: { ma_phim: valueUpdate.ma_phim },
          data: valueUpdate,
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
  async xoaPhim(res, maPhim) {
    let message = '';
    let movie = null;
    try {
      movie = await this._prisma.phim
        .delete({
          where: { ma_phim: maPhim },
        })
        .catch((error) => {
          if (error) return null;
        });
      message = !movie
        ? `Xóa không thành công`
        : `Xóa phim ${movie.ten_phim} thành  công`;
    } catch (error) {
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message);
    }
  }
  //#endregion
}
