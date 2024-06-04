import { useState } from "react";
import { setSeatAction, removeSeatAction } from '@config/reducer/ticketReducer'
import { useDispatch } from "react-redux";
type Props = {
    children: any;
    ghe: { ma_ghe: string, ten_ghe: string, loai_ghe: string, trang_thai: boolean };
    price: number;
}
function Seat({ children, ghe, price }: Props) {
    const dispatch = useDispatch();
    const [isChoosed, setIsChoosed] = useState(false);


    const handleChooseSeat = () => {
        setIsChoosed((prev) => {
            return !prev;
        })
        !isChoosed && dispatch(setSeatAction({ seat: [{ ...ghe }], price, total: price }));

        isChoosed && dispatch(removeSeatAction({ seat: [{ ...ghe }], total: price }));

    }

    return (
        <button onClick={handleChooseSeat} className={`btn-seat ${ghe?.trang_thai ? "booked" : isChoosed ? 'choosed' : ''} `} disabled={ghe.trang_thai} type='button'>
            {ghe.loai_ghe === "VIP" && <i className="fa-solid fa-crown text-[gold]"></i>}{children}</button>
    )
}

export default Seat
