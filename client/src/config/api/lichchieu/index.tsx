import http from '@config/http'


const lichChieuTheoPhim = async (id: string | undefined) => {
    return await http.get(`/LichChieu/LayDanhSachLichChieuTheoMaPhim`, { params: { ma_phim: id } }).then(res => res.data);
}

const lichChieuTheoPhimVaHeThongRap = async (maPhim: string | undefined, maHeThongRap: string | undefined) => {
    return await http.get(`/LichChieu/LayLichChieuTheoPhimVaHeThong`, { params: { ma_phim: maPhim, ma_he_thong_rap: maHeThongRap } }).then(res => res.data);
}




export { lichChieuTheoPhim, lichChieuTheoPhimVaHeThongRap }