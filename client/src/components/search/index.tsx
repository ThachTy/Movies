import { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules'
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { debounce } from '@base/index';
import { timKiemPhim, danhSachPhim } from '@config/api/movie'
import { Link } from 'react-router-dom'

import "swiper/swiper-bundle.css";
import './search.css';
import { SearchMoviesContext } from '@src/context/SearchMoviesContext';


type PropsChildrenType = {
    handleClose: () => void;
}

const ModalContent = ({ handleClose }: PropsChildrenType) => {
    const [movies, setMovies] = useState([])
    const listMoviesRef = useRef([])

    useEffect(() => {
        const fetchMovies = async () => {
            await danhSachPhim().then(res => {
                listMoviesRef.current = res;
                setMovies(res);
            })
        }
        fetchMovies();
    }, [])

    const handleChangeSearch = debounce(async (e) => {
        try {
            await timKiemPhim(e[0].target.value)
                .then(res => {
                    res ? setMovies(res) : setMovies(listMoviesRef.current);
                })

        } catch (error) {
            console.error(error)
        };
    }, 500)

    return <Box className='search__movies'>
        <button type='button' className='btn-close btn' onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>
        <section className='search__content'>
            <div className='search__left'>
                <input checked onChange={(e) => handleChangeSearch(e)} className='input-search' placeholder='Search...' type="text" autoFocus={true} name="input-movies" id="input-search-movies" />
            </div>

            <Swiper className='search__right'
                modules={[Mousewheel, FreeMode]}
                slidesPerView={3}
                centeredSlides={true}
                direction={'vertical'}
                mousewheel={{
                    enabled: true
                }}
                loop={true}
                freeMode={true}
                scrollbar={{ draggable: true }}>
                {
                    movies.length !== 0 && movies.map((swiper: any, index: number) => {
                        return <SwiperSlide className='swiper-slide' key={`swiperslide-search-${index}`}>
                            {({ isActive }) => {
                                return <Link onClick={handleClose} className='swiper-slide-link' to={`/movie/${swiper.ma_phim}`}>
                                    <section className={isActive ? "swiper-slide-content active" : "swiper-slide-content"}>
                                        <div className='swiper-slide-poster'>
                                            <img className='swiper-slide-image' src={swiper.hinh_anh} alt={swiper.ten_phim}></img>
                                        </div>
                                        <div className='swiper-slide-detail'>
                                            <h1 className='detail-name'>{swiper.ten_phim}</h1>
                                        </div>
                                    </section >
                                </Link>
                            }}
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </section>
    </Box >
}

function SearchMovies() {
    const { open, handleClose }: any = useContext(SearchMoviesContext);

    return (
        <>
            <Modal open={open} onClose={handleClose}
                children={<ModalContent handleClose={handleClose}></ModalContent>}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
            </Modal>
        </>
    )
}

export default SearchMovies
