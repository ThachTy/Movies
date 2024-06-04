import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';

/* */
import YoutubeComments from '@src/components/youtubeComments';
import { ticketAction } from '@config/reducer/ticketReducer'
import { lichChieuTheoPhim, thongTinPhim } from '@config/api/movie'
import { setSessionStorage } from '@base/index'
import { TICKET_STORAGE_KEY } from '@base/constant'
import "./moviePage.css"

function MoviePage() {
    const params = useParams();
    const dispatch = useDispatch();
    const [detail, setDetail] = useState({
        trailer: "", hinh_anh: "", ten_phim: "", mo_ta: '',
        ngay_khoi_chieu: '',
        danh_gia: 0, hot: true, dang_chieu: true, sap_chieu: false
    });

    const [theater, setTheater] = useState<any[]>([]);
    const ngay_khoi_chieu = detail.ngay_khoi_chieu && new Date(detail.ngay_khoi_chieu).toLocaleDateString("en-GB", { day: "2-digit", month: '2-digit', year: 'numeric' })


    const handleChooseTheather = (theater: any) => {
        let { ma_he_thong_rap } = theater.heThongRap;
        let { ma_lich_chieu } = theater;
        dispatch(ticketAction({ schedule: ma_lich_chieu, theater: ma_he_thong_rap }))
        setSessionStorage({ movie: params.id, schedule: ma_lich_chieu, theater: ma_he_thong_rap }, TICKET_STORAGE_KEY)
    }

    useEffect(() => {
        // fetch
        const fetchThongTinPhim = async () => {
            await thongTinPhim(params.id).then(res => {
                setDetail(res);
                dispatch(ticketAction({ movie: res.ma_phim }))
            });

            await lichChieuTheoPhim(params.id).then(res => {
                const uniqueObjects: any = {};
                const resultArray: any = [];

                res.forEach((item: any) => {
                    let heThongRap = item.RapPhim.CumRap.HeThongRap;
                    // Không trùng
                    if (!uniqueObjects[heThongRap.ma_he_thong_rap]) {
                        uniqueObjects[heThongRap.ma_he_thong_rap] = true;
                        resultArray.push({ heThongRap, ma_lich_chieu: item.ma_lich_chieu });
                    }
                });
                setTheater(resultArray);
            })
        }
        fetchThongTinPhim();
        document.getElementById("detail-movie")?.scrollIntoView();

    }, [params])

    const handleShowTheaters = () => {
        document.querySelector('.theater')?.classList.toggle('show');
    }

    return detail && (
        <div id='detail-movie' className='w-full h-fit' data-background={detail?.hinh_anh}>
            <div className='detail__top'>
                <img className='detail-img' src={detail?.hinh_anh} alt={detail?.ten_phim} />
                <h1 className='detail-name'>{detail?.ten_phim}</h1>
                <div className='detail__content '>
                    <div className='content__left'>
                        <iframe className='content-video' src={`https://www.youtube.com/embed/${detail?.trailer}?controls=1&autoplay=1&mute=1&playsinline=1`}>
                        </iframe>
                    </div>
                    <div className='content__right'>
                        <ul>
                            <li className='mb-2 flex justify-between items-center'>
                                <p>
                                    <i className="fa-regular fa-calendar-plus"></i><span className='mx-2'>Release: </span>{ngay_khoi_chieu}
                                </p>
                                <button onClick={handleShowTheaters} className='btn-buy-ticket fa-fade' role='button'>Buy Ticket</button>
                            </li>
                            <li className='mb-2'>
                                <p className='inline-block mr-5'>
                                    <i className="fa-regular fa-star"></i><span className='ml-2'>Type: </span>Action
                                </p>
                                <p className='inline-block'>
                                    <i className="fa-regular fa-star"></i><span className='mx-2'>Rate: </span>{detail?.danh_gia}/10
                                </p>
                            </li>
                            <li className='mb-2'>
                                <p >
                                    {detail?.mo_ta}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='detail__bottom'>
                <div className="container mx-auto h-fit py-5">
                    <YoutubeComments videoId={detail?.trailer}></YoutubeComments>
                </div>
            </div>

            {/* Theater */}
            <div className='theater'>
                <button onClick={handleShowTheaters} className='btn-buy-ticket' role='button'><i className="fa-solid fa-arrow-right-arrow-left"></i></button>
                <ul className='theater-list'>
                    {
                        theater[0] && theater.map((theater, index) => {
                            return (
                                <li className='theater-item' key={'theater-' + index}>
                                    <Link onClick={() => handleChooseTheather(theater)} className='theater-link' to={`/ticket/${theater.heThongRap.ten_he_thong_rap}`}>
                                        <img className='theater-logo' src={theater.heThongRap.logo} alt={theater.heThongRap.ten_he_thong_rap} />
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div >
    )
}

export default MoviePage

