
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
/* */
import { lichChieuTheoPhimVaHeThongRap } from '@config/api/lichchieu'
import { getSessionStorage } from '@base/index'
import { TICKET_STORAGE_KEY } from '@base/constant'
import ScheduleCard from './components/ScheduleCard'
import Seat from './components/seat';
import { TicketType, ticketAction } from '@config/reducer/ticketReducer'

import './ticketpage.css'
import Payment from './components/payment';

function TicketPage() {
    const ticket: TicketType = useSelector((state: any) => state.ticketReducer as TicketType);
    const dispatch = useDispatch();
    const [seats, setSeats] = useState([]);
    const [rapPhim, setRapPhim] = useState<any>([]);


    useEffect(() => {
        const ticket = getSessionStorage(TICKET_STORAGE_KEY);
        const fetchRap = async () => {
            await lichChieuTheoPhimVaHeThongRap(ticket.movie, ticket.theater).then(res => {
                setRapPhim(res);
                setSeats(res[0].RapPhim.Ghe);
                dispatch(ticketAction({ showtime: res[0].ma_lich_chieu, price: res[0].gia_ve }))
            })
        }
        fetchRap();
    }, [])

    const handelChangeRapPhim = (malichchieu: string, seat: [], price: number) => {
        setSeats(seat);
        dispatch(ticketAction({ showtime: malichchieu, price }))
    }

    const renderSeats = (list: any[]) => {
        return list.map((item, index) => {
            return <span className='seat-td' key={index}><Seat ghe={item} price={ticket.price as number}>{item.ten_ghe}</Seat></span>
        })
    }


    return (
        <main className='ticket'>
            <div className="container mx-auto">
                <h3 className='text-3xl font-semibold mb-5'>{rapPhim.length !== 0 && rapPhim[0].Phim?.ten_phim}</h3>
                {/* Schedule Theater */}
                <div className='ticket__filter'>
                    <FormControl className='w-full'>
                        <RadioGroup
                            className='w-full gap-[0.5em] place-items-center'
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="0"
                            name="radio-buttons-group"
                        >
                            <Swiper className='w-full h-full' breakpoints={{ 500: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }} >
                                {
                                    rapPhim[0] && rapPhim.map((item: any, index: number) => {
                                        return <SwiperSlide className='flex-grow'>
                                            <FormControlLabel
                                                style={{ margin: 0 }}
                                                onChange={() => handelChangeRapPhim(item?.ma_lich_chieu, item?.RapPhim.Ghe, item?.gia_ve)}
                                                key={`radio-rapPhim-${index}`}
                                                value={index} control={<Radio style={{ color: 'white' }} />}
                                                label={<ScheduleCard
                                                    tenCumRap={item?.RapPhim.CumRap.ten_cum_rap}
                                                    tenRap={item?.RapPhim.ten_rap}
                                                    ngayGioChieu={item?.ngay_gio_chieu}
                                                    giaVe={item?.gia_ve}
                                                ></ScheduleCard>
                                                } />
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </RadioGroup>
                    </FormControl>
                </div>

                {/* Seat */}
                <div className='seat'>
                    <div className='seat__content'>
                        {
                            seats[0] && renderSeats(seats)
                        }
                    </div>
                    <ul className='seat__insctruct'>
                        <li><span className='seat-none'>None</span></li>
                        <li><span className='seat-booked'>Booked</span></li>
                        <li><span className='seat-choosed'>Choosed</span></li>
                        <li><span className='seat-vip'><i className="fa-solid fa-crown mr-2 text-[gold]"></i>Vip  </span></li>
                    </ul>
                    <p><a href='#payment' role='button' className='btn btn-confirmation'>Payment Confirmation</a></p>
                </div>

                {/* Payment */}
                <Payment></Payment>
            </div>
        </main >
    )
}
export default TicketPage
