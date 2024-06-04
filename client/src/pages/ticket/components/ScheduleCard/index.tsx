import React from 'react'


type Props = {
    tenCumRap: string;
    tenRap: string;
    ngayGioChieu: string;
    giaVe: string;
}

function ScheduleCard({ tenCumRap, tenRap, ngayGioChieu, giaVe }: Props) {

    let ngay = new Date(ngayGioChieu).toLocaleString('en-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toString();
    let gio = new Date(ngayGioChieu).toLocaleTimeString('en-BR', { hour: '2-digit', minute: '2-digit' }).toString();
    return (
        <section className='schedule-card'>
            <ul className="card-container">
                <li className='card-schedule'>{tenCumRap}</li>
                <li className='card-theater'>{tenRap}</li>
                <li className='card-theater'>{Number(giaVe).toLocaleString()}</li>
                <li className='card-theater'>
                    <span className='card-time'>{ngay}</span>
                    <span className='card-time'>{gio}</span>
                </li>
            </ul>
        </section>
    )
}

export default ScheduleCard

