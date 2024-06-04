/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `fk_cumrap_hethongrap` (`ma_he_thong_rap`),
  CONSTRAINT `fk_cumrap_hethongrap` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatVe` (
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_dat_ve` int NOT NULL AUTO_INCREMENT,
  `ma_nguoi_dung` int DEFAULT NULL,
  `ma_ghe` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ma_dat_ve`),
  KEY `fr_datve_cumrap` (`ma_lich_chieu`),
  KEY `fr_datve_nguoidung` (`ma_nguoi_dung`),
  KEY `fr_datve_ghe` (`ma_ghe`),
  CONSTRAINT `fr_datve_cumrap` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`),
  CONSTRAINT `fr_datve_ghe` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe` (`ma_ghe`),
  CONSTRAINT `fr_datve_nguoidung` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Ghe` (
  `ma_ghe` varchar(50) NOT NULL,
  `ten_ghe` varchar(255) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  `vi_tri_hang` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vi_tri_cot` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `fk_lichchieu_phim` (`ma_phim`),
  KEY `fk_lichchieu_rap` (`ma_rap`),
  CONSTRAINT `fk_lichchieu_phim` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`),
  CONSTRAINT `fk_lichchieu_rap` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiNguoiDung` (
  `ma_loai_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `ten_loai_nguoi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_loai_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `ma_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `ma_loai_nguoi_dung` int DEFAULT NULL,
  PRIMARY KEY (`ma_nguoi_dung`),
  KEY `fk_nguoidung_loainguoidung` (`ma_loai_nguoi_dung`),
  CONSTRAINT `fk_nguoidung_loainguoidung` FOREIGN KEY (`ma_loai_nguoi_dung`) REFERENCES `LoaiNguoiDung` (`ma_loai_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` text,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `fk_rapphim_cumrap` (`ma_cum_rap`),
  CONSTRAINT `fk_rapphim_cumrap` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'CGV Vincom Center Bà Triệu', '191 Bà Triệu, Hai Bà Trưng, Hà Nội', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'Lotte Cinema Landmark', 'Keangnam Landmark 72, Phạm Hùng, Từ Liêm, Hà Nội', 2);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'Galaxy Thảo Điềm', 'Vincom Mega Mall, Quận 2, TP. HCM', 3);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'BHD Nguyễn Du', '116 Nguyễn Du, Quận 1, TP. HCM', 4),
(5, 'Mega GS Hai Bà Trưng', '135 Hai Bà Trưng, Quận 1, TP. HCM', 5),
(6, 'Lotte Nguyễn Hữu Thọ', '37 Nguyễn Hữu Thọ, Quận 7, TP. HCM', 2);

INSERT INTO `DatVe` (`ma_lich_chieu`, `ma_dat_ve`, `ma_nguoi_dung`, `ma_ghe`) VALUES
(152, 125, 1, 'G034');
INSERT INTO `DatVe` (`ma_lich_chieu`, `ma_dat_ve`, `ma_nguoi_dung`, `ma_ghe`) VALUES
(152, 126, 1, 'G033');
INSERT INTO `DatVe` (`ma_lich_chieu`, `ma_dat_ve`, `ma_nguoi_dung`, `ma_ghe`) VALUES
(152, 139, 1, 'G034');
INSERT INTO `DatVe` (`ma_lich_chieu`, `ma_dat_ve`, `ma_nguoi_dung`, `ma_ghe`) VALUES
(152, 140, 1, 'G033'),
(152, 142, 1, 'G034'),
(152, 143, 1, 'G033'),
(152, 145, 1, 'G034'),
(152, 146, 1, 'G033'),
(152, 147, 1, 'G034'),
(152, 148, 1, 'G033'),
(152, 149, 1, 'LOTTE-G0406'),
(152, 150, 1, 'LOTTE-G0405'),
(152, 151, 1, 'G038'),
(152, 152, 1, 'G040');

INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`, `trang_thai`, `vi_tri_hang`, `vi_tri_cot`) VALUES
('BHD-G020', 'A1', 'Standard', 6, 0, 'A', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`, `trang_thai`, `vi_tri_hang`, `vi_tri_cot`) VALUES
('BHD-G021', 'A1', 'VIP', 7, 0, 'A', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`, `trang_thai`, `vi_tri_hang`, `vi_tri_cot`) VALUES
('CGV-G011', 'A1', 'Standard', 2, 0, 'A', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`, `trang_thai`, `vi_tri_hang`, `vi_tri_cot`) VALUES
('CGV-G012', 'A2', 'Standard', 2, 0, 'A', 2),
('CGV-G013', 'A3', 'Standard', 2, 0, 'A', 3),
('CGV-G014', 'A4', 'Standard', 2, 0, 'A', 4),
('CGV-G015', 'A5', 'Standard', 2, 0, 'A', 5),
('CGV-G016', 'B1', 'VIP', 2, 0, 'B', 1),
('CGV-G017', 'B2', 'VIP', 2, 0, 'B', 2),
('CGV-G018', 'B3', 'VIP', 2, 0, 'B', 3),
('CGV-G019', 'B4', 'VIP', 2, 0, 'B', 4),
('CGV-G020', 'B5', 'VIP', 2, 0, 'B', 5),
('G021', 'A1', 'Standard', 3, 0, 'A', 1),
('G022', 'A2', 'Standard', 3, 0, 'A', 2),
('G024', 'A4', 'Standard', 3, 1, 'A', 4),
('G025', 'A5', 'Standard', 3, 0, 'A', 5),
('G026', 'B1', 'VIP', 3, 0, 'B', 1),
('G027', 'B2', 'VIP', 3, 1, 'B', 2),
('G028', 'B3', 'VIP', 3, 0, 'B', 3),
('G029', 'B4', 'VIP', 3, 0, 'B', 4),
('G031', 'A1', 'Standard', 4, 0, 'A', 1),
('G032', 'A2', 'Standard', 4, 0, 'A', 2),
('G033', 'A3', 'Standard', 4, 1, 'A', 3),
('G034', 'A4', 'Standard', 4, 1, 'A', 4),
('G035', 'A5', 'Standard', 4, 0, 'A', 5),
('G036', 'B1', 'VIP', 4, 0, 'B', 1),
('G037', 'B2', 'VIP', 4, 0, 'B', 2),
('G038', 'B3', 'VIP', 4, 1, 'B', 3),
('G039', 'B4', 'VIP', 4, 0, 'B', 4),
('G040', 'B5', 'VIP', 4, 1, 'B', 5),
('GALAXY-G023', 'A3', 'Standard', 3, 0, 'A', 3),
('GALAXY-G030', 'B5', 'VIP', 3, 0, 'B', 5),
('LOTTE-G0401', 'C1', 'Standard', 4, 0, 'C', 1),
('LOTTE-G0402', 'C2', 'Standard', 4, 0, 'C', 2),
('LOTTE-G0403', 'C3', 'VIP', 4, 0, 'C', 3),
('LOTTE-G0404', 'C4', 'VIP', 4, 0, 'C', 4),
('LOTTE-G0405', 'D1', 'Standard', 4, 1, 'D', 1),
('LOTTE-G0406', 'D2', 'Standard', 4, 1, 'D', 2),
('MEGA-G001', 'A1', 'Standard', 1, 0, 'A', 1),
('Mega-G002', 'A2', 'Standard', 1, 0, 'A', 2),
('MEGA-G003', 'A3', 'Standard', 1, 0, 'A', 3),
('MEGA-G004', 'A4', 'Standard', 1, 0, 'A', 4),
('MEGA-G005', 'A5', 'Standard', 1, 0, 'A', 5),
('MEGA-G006', 'B1', 'VIP', 1, 0, 'B', 1),
('MEGA-G007', 'B2', 'VIP', 1, 0, 'B', 2),
('MEGA-G008', 'B3', 'VIP', 1, 0, 'B', 3),
('MEGA-G009', 'B4', 'VIP', 1, 0, 'B', 4),
('MEGA-G010', 'B5', 'VIP', 1, 0, 'B', 5);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'CGV', 'https://th.bing.com/th/id/OIP.WtNSSY-jq_VYcEkE3Jx6LAHaHa?rs=1&pid=ImgDetMain');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'Lotte', 'https://th.bing.com/th/id/OIP.jIOTy5cD8HYNtDZ78V2qmAHaHa?rs=1&pid=ImgDetMain');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'Galaxy', 'https://uploads-ssl.webflow.com/5fb85f26f126ce08d792d2d9/609aa776426639ea9ffedcaf_After_Galaxycinema.png');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'BHD Star Cineplex', 'https://play-lh.googleusercontent.com/Y-XSHhJp07-Rh7GS26-JzV0UQERVARl6vJuWkTKT1kdq16FJZypJNyCqdNmmQ-qu5nM_'),
(5, 'Mega GS', 'https://yt3.ggpht.com/a/AATXAJydUAkm7qkmkFlyZV9NK--v9HHqDXadlnE7AQ=s900-c-k-c0xffffffff-no-rj-mo');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(135, 1, 1, '2024-05-21 14:00:00', 100000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(136, 1, 2, '2024-05-21 14:00:00', 100000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(147, 1, 4, '2024-05-21 18:00:00', 150000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(151, 3, 3, '2024-05-21 18:00:00', 150000),
(152, 4, 4, '2024-05-21 20:00:00', 130000),
(154, 1, 3, '2024-05-21 18:00:00', 150000),
(155, 2, 4, '2024-05-21 20:00:00', 130000),
(156, 6, 6, '2024-05-22 10:00:00', 90000),
(157, 7, 7, '2024-05-22 12:00:00', 95000),
(158, 8, 7, '2024-05-22 14:00:00', 100000),
(159, 9, 9, '2024-05-22 16:00:00', 105000),
(160, 16, 10, '2024-05-22 18:00:00', 110000),
(161, 2, 3, '2024-05-21 18:00:00', 150000),
(162, 18, 4, '2024-05-21 20:00:00', 130000),
(163, 6, 6, '2024-05-22 10:00:00', 90000),
(164, 7, 7, '2024-05-22 12:00:00', 95000),
(165, 8, 8, '2024-05-22 14:00:00', 100000),
(166, 9, 9, '2024-05-22 16:00:00', 105000),
(167, 10, 10, '2024-05-22 18:00:00', 110000),
(168, 3, 1, '2024-05-21 18:00:00', 150000),
(169, 4, 5, '2024-05-21 20:00:00', 130000),
(170, 6, 7, '2024-05-22 10:00:00', 90000),
(171, 7, 2, '2024-05-22 12:00:00', 95000),
(172, 8, 9, '2024-05-22 14:00:00', 100000),
(173, 9, 8, '2024-05-22 16:00:00', 105000),
(174, 10, 6, '2024-05-22 18:00:00', 110000),
(175, 6, 2, '2024-05-22 18:00:00', 110000),
(176, 17, 4, '2024-05-31 18:00:00', 105000);

INSERT INTO `LoaiNguoiDung` (`ma_loai_nguoi_dung`, `ten_loai_nguoi_dung`) VALUES
(1, 'USER');
INSERT INTO `LoaiNguoiDung` (`ma_loai_nguoi_dung`, `ten_loai_nguoi_dung`) VALUES
(2, 'ADMIN');


INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `avatar`, `ma_loai_nguoi_dung`) VALUES
(1, 'Admin', 'admin@email.com', '0912345678', '$2b$10$HtmDQKy08FT4Gkqr7KqiM.vn0qC1afvGMn9pcFDLOgjG5dl61I54e', 'https://th.bing.com/th/id/OIP.k1jkY-qgTlzYmLkF4R4XXgHaHa?rs=1&pid=ImgDetMain', 2);


INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'Inception', '8hP9D6kZseM', 'https://c4.wallpaperflare.com/wallpaper/764/590/391/inception-leonardo-dicaprio-movie-posters-2400x3500-entertainment-movies-hd-art-wallpaper-preview.jpg', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.\r\n', '2010-07-16', 9, 1, 0, 1);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'The Matrix', 'm8e-FF8MsqU', 'https://c4.wallpaperflare.com/wallpaper/649/338/357/1366x768-px-morpheus-the-matrix-video-games-other-hd-art-wallpaper-preview.jpg', 'A computer hacker learns about the true nature of reality', '1999-03-31', 9, 1, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'Interstellar', 'zSWdZVtXT7E', 'https://c4.wallpaperflare.com/wallpaper/1023/915/631/nasa-space-suit-digital-art-space-wallpaper-preview.jpg', 'A journey through space and time', '2014-11-07', 9, 1, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'Avengers: Endgame', '0jNvJU52LvU', 'https://c4.wallpaperflare.com/wallpaper/212/657/279/the-avengers-avengers-endgame-ant-man-avengers-endgame-black-widow-hd-wallpaper-preview.jpg', 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.', '2019-04-26', 8, 1, 1, 0),
(5, 'The Dark Knight', 'EXeTwQWrcwY', 'https://c4.wallpaperflare.com/wallpaper/513/626/511/the-dark-knight-heath-ledger-movies-quote-wallpaper-preview.jpg', 'Batman faces the Joker in Gotham City', '2008-07-18', 9, 1, 0, 1),
(6, 'Parasite', '5xH0HfJHsaY', 'https://c4.wallpaperflare.com/wallpaper/71/836/993/women-gun-parasite-eve-the-3rd-birthday-wallpaper-preview.jpg', 'A dark comedy about class struggle', '2019-05-30', 9, 1, 1, 0),
(7, 'Joker', 'zAGVQLHvwOY', 'https://c4.wallpaperflare.com/wallpaper/221/116/854/joaquin-phoenix-joker-batman-fire-car-hd-wallpaper-preview.jpg', 'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.\r\n', '2019-10-04', 9, 1, 1, 0),
(8, 'Fight Club', 'SUXWAEX2jlg', 'https://c4.wallpaperflare.com/wallpaper/874/819/824/edward-norton-brad-pitt-men-actor-fight-club-hd-wallpaper-preview.jpg', 'A man forms an underground fight club', '1999-10-15', 9, 1, 1, 0),
(9, 'Pulp Fiction', 's7EdQ4FqbhY', 'https://c4.wallpaperflare.com/wallpaper/126/608/994/black-and-white-pulp-fiction-samuel-l-jackson-john-travolta-black-background-4000x2500-art-monochrome-hd-art-wallpaper-preview.jpg', 'Interwoven stories of crime in Los Angeles', '1994-10-14', 9, 1, 0, 1),
(10, 'Forrest Gump', 'bLvqoHBptjg', 'https://c4.wallpaperflare.com/wallpaper/96/707/647/actor-comedy-drama-forrest-wallpaper-preview.jpg', 'The life story of a unique man', '1994-07-06', 9, 1, 1, 0);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'Mega-Rap-1', 5);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'CGV-Rap-1', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'Galaxy-Rap-1', 3);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'Lottle-Rap-1', 2),
(6, 'BHD-Rap-1', 4),
(7, 'BHD-Rap-2', 4),
(8, 'Lottle-Rap-2', 2),
(9, 'Galaxy-Rap-2', 3),
(10, 'Galaxy-Rap-3', 3),
(16, 'Lottle-Rap-3', 2),
(17, 'Lottle-Rap-1', 6),
(18, 'Lottle-Rap-2', 6);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;