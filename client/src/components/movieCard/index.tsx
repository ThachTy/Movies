
import { Link } from "react-router-dom";
import "./card.css";


type Props = {
  item: { ten_phim: string, hinh_anh: string, mo_ta: string, ma_phim: string };
}

function MovieCard({ item }: Props) {

  return (
    <Link className="btn-details" to={`/movie/${item?.ma_phim}`}>
      <div className="card h-full w-full">
        <p className="card-heading">{item?.ten_phim}</p>
        <div className="card-poster">
          <img className="card-img" src={item?.hinh_anh} alt="" />
          <div className="card-content p-2">
            <i className="fa-solid fa-ticket"></i>
          </div>
        </div>
      </div >
    </Link>
  );
}

export default MovieCard;
