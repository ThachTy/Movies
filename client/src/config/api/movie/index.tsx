import http from '@config/http'



const danhSachPhim = async () => {
    return await http.get('/phim/laydanhsachphim').then(res => res.data);
}

const thongTinPhim = async (id: string | undefined) => {
    return await http.post(`/phim/thongtinphim`, { ma_phim: id }).then(res => res.data);
}
const lichChieuTheoPhim = async (maPhim: string | undefined) => {
    return await http.get(`/LichChieu/LayDanhSachLichChieuTheoMaPhim`, { params: { ma_phim: maPhim } }).then(res => res.data);
}

const timKiemPhim = async (value: string) => {
    return await http.get(`/Phim/TimKiemPhim`, { params: { timKiem: value } }).then(res => res.data);
}



export { danhSachPhim, thongTinPhim, lichChieuTheoPhim, timKiemPhim }