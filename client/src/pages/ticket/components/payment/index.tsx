
import { useSelector } from 'react-redux'
import { TicketType } from '@config/reducer/ticketReducer'
import { getLocalStorage } from '@src/base'
import { LOGIN_STORAGE_KEY } from '@src/base/constant'
import { useNavigate } from 'react-router-dom'

import { datve } from '@config/api/datve'
function Payment() {
    const navigate = useNavigate();
    const ticket = useSelector((state: any) => state.ticketReducer as TicketType)

    const renderSeatForPayment = (seat: any, price: number) => {
        return seat.map((item: any, index: number) => {
            return <tr key={`row-payment-${index}`} className='payment_row'>
                <td className='text-center align-middle'>{index + 1}</td>
                <td className='text-center align-middle'>{item?.ten_ghe}</td>
                <td className='text-center align-middle'>{item?.loai_ghe}</td>
                <td className='text-center align-middle'>{price.toLocaleString()}</td>
            </tr >
        })
    }

    const handelRequestPayment = async () => {
        const token = getLocalStorage(LOGIN_STORAGE_KEY);
        !token && navigate('/login');

        let response = await datve({ token, danh_sach_ma_ghe: ticket.seat, ma_lich_chieu: ticket.showtime?.toString() })

        window.location.reload();
        console.log(response)
    }

    return (
        <div id='payment'>
            <div className='container mx-auto'>
                <table className='table table-fixed table__payment'>
                    <thead>
                        <tr>
                            <th className='payment_heading text-center'>Number</th>
                            <th className='payment_heading text-center'>Name Seat</th>
                            <th className='payment_heading text-center'>Type Seat</th>
                            <th className='payment_heading text-center'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket && renderSeatForPayment(ticket.seat, ticket.price ? ticket.price : 0)}
                    </tbody>
                    <tfoot className='table__footer'>
                        <br />
                        <tr>
                            <th className='text-end th-count' scope='row' colSpan={3} >Count Ticket</th>
                            <td className='text-center'>{ticket.seat?.length}</td>
                        </tr>
                        <tr>
                            <th className='text-right th-total' scope='row' colSpan={3}>Total</th>
                            <td className='text-center td-total'>{ticket.total?.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>

                <button className='btn btn-payment' disabled={(ticket.seat ?? []).length > 0 ? false : true} onClick={handelRequestPayment} >Payment Ticket</button>

            </div>
        </div >
    )
}

export default Payment
