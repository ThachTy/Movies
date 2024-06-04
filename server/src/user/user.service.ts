import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  responseCreatetor,
  hashCrypt,
  compareCrypt,
  createToken,
} from '@/base';
import { MailService } from '@src/mail/mail.service';

const ROUND_SALT = 10;

@Injectable()
export class UserService {
  _prisma = new PrismaClient();
  _mail = new MailService();

  //#region  Danh sách
  async danhSachNguoiDung(res): Promise<unknown> {
    let data = [];
    let message = '';
    try {
      data = await this._prisma.nguoiDung
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
  async danhSachNguoiDungPhanTrang(
    res,
    { soTrang, soPhanTu },
  ): Promise<unknown> {
    let message = '';
    let data = null;
    let countUser = 0;

    try {
      countUser = await this._prisma.nguoiDung.count();
      let skip = (soTrang <= 1 ? 0 : soTrang - 1) * soPhanTu;
      let take = soPhanTu;

      if (soPhanTu >= countUser) {
        skip = 0;
        take = countUser;
      }

      data = await this._prisma.nguoiDung
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
  async timKiemNguoiDung(res, value): Promise<unknown> {
    let users = await this._prisma.nguoiDung.findMany({
      where: { ho_ten: { contains: value } },
      select: {
        ho_ten: true,
        email: true,
        so_dt: true,
        LoaiNguoiDung: { select: { ten_loai_nguoi_dung: true } },
      },
    });

    return responseCreatetor(res, 200, 'Thành công', users);
  }
  //#endregion

  //#region Danh sách Loại Người Dùng
  async danhSachLoaiNguoiDung(res): Promise<unknown> {
    let message = '';
    let data = [];
    try {
      data = await this._prisma.loaiNguoiDung
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

  //#region Đăng Nhập
  async dangNhap(res, email, mat_khau): Promise<unknown> {
    let token = null;
    let message = '';

    try {
      let user = await this._prisma.nguoiDung
        .findFirst({
          where: { email },
        })
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
      let checkPassword = user && (await compareCrypt(mat_khau, user.mat_khau));

      if (!user || !checkPassword) {
        message = 'Thông tin đăng nhập không đúng';
      } else {
        message = 'Đăng nhập Thành công';
        token = user && createToken({ id: user.ma_nguoi_dung }, '1h');

        await this._mail.sendMail(
          user.email,
          'Đăng Nhập',
          'Đăng Nhập thành công',
        );
      }
    } catch (error) {
      console.error(error);
      message = 'Đăng nhập không thành công';
    } finally {
      return responseCreatetor(res, 200, message, {}, token);
    }
  }
  //#endregion

  //#region Đăng Ký
  async dangKy(res, newUser): Promise<unknown> {
    let token = null;
    let message = '';

    try {
      let user = await this._prisma.nguoiDung.findFirst({
        where: { email: newUser.email },
      });

      if (user) {
        message = 'Email đã tồn tại';
        return;
      } else {
        let passwordCrypted = await hashCrypt(newUser.mat_khau, ROUND_SALT);
        let ma_loai_nguoi_dung = newUser.ma_loai_nguoi_dung * 1;
        let slideUser = {
          email: newUser.email,
          ho_ten: newUser.ho_ten,
          so_dt: newUser.so_dt,
          mat_khau: passwordCrypted,
          ma_loai_nguoi_dung,
          avatar: newUser.avatar,
        };

        newUser = await this._prisma.nguoiDung
          .create({
            data: { ...slideUser },
          })
          .then(async (res) => {
            message = 'Đăng Ký thành công';
            token =
              newUser && createToken({ id: newUser.ma_nguoi_dung }, '15m');
            await this._mail.sendMail(
              res.email,
              'Đăng Ký Tài Khoản',
              'Đăng ký tài khoản thành công',
            );
            return res;
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.error(error);
      message = 'Đăng ký không thành công';
    } finally {
      return responseCreatetor(res, 200, message, {}, token);
    }
  }
  //#endregion

  //#region Lấy Thong Tin
  async thongTinNguoiDung(res, id): Promise<unknown> {
    let message = '';
    let data = null;
    try {
      data =
        id &&
        (await this._prisma.nguoiDung
          .findUnique({
            where: { ma_nguoi_dung: id },
            select: {
              ho_ten: true,
              email: true,
              so_dt: true,
              avatar: true,
              LoaiNguoiDung: true,
            },
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
  async capNhatNguoiDung(res, valueUpdate, id): Promise<unknown> {
    const hashMatKhau = await hashCrypt(valueUpdate.mat_khau, ROUND_SALT);

    let ma_loai_nguoi_dung = valueUpdate.ma_loai_nguoi_dung * 1;
    let slideUser = {
      ma_nguoi_dung: id,
      ho_ten: valueUpdate.ho_ten,
      email: valueUpdate.email,
      mat_khau: hashMatKhau,
      so_dt: valueUpdate.so_dt,
      ma_loai_nguoi_dung,
    };
    const user =
      valueUpdate &&
      (await this._prisma.nguoiDung.update({
        where: { ma_nguoi_dung: id },
        data: slideUser,
        select: {
          ho_ten: true,
          email: true,
          so_dt: true,
          LoaiNguoiDung: { select: { ten_loai_nguoi_dung: true } },
        },
      }));

    return responseCreatetor(res, 200, 'Cập Nhật thành công', user);
  }
  //#endregion

  //#region  Xóa
  async xoaNguoiDung(res, id) {
    let message = '';
    try {
      let user = null;
      user = await this._prisma.nguoiDung
        .delete({
          where: { ma_nguoi_dung: id },
        })
        .catch((error) => {
          if (error) return null;
        });

      message = !user
        ? `Xóa không thành công`
        : `Xóa tài khoản ${user.ho_ten} thành  công`;
    } catch (error) {
      console.error(error);
    } finally {
      return responseCreatetor(res, 200, message);
    }
  }
  //#endregion
}
