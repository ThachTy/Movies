import http from "@config/http";

const login = async ({ email, password }: { email: string | undefined, password: string | undefined }): Promise<any> => {
  return await http.post("/nguoidung/dangnhap", { email, mat_khau: password });
};

const signup = async (user: { fullname: string | undefined, email: string | undefined, password: string | undefined, phone: string | undefined }): Promise<any> => {
  return await http.post("/nguoidung/dangky", { ho_ten: user.fullname, email: user.email, mat_khau: user.password, so_dt: user.phone, ma_loai_nguoi_dung: "1" });
};

const detailsUser = async (token: string) => {
  return await http.post("/nguoidung/thongtinnguoidung", { token });
}


export { login, signup, detailsUser };
