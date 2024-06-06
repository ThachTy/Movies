import { Link } from "react-router-dom";
import Carousel from "@components/carousel";
import './moviesTemplate.css'
type Props = {
  heading: string;
  list: object[];
  delay?: number;
  reverse?: boolean;
};

function MoviesTemplate({ heading, list, delay, reverse }: Props) {

  return (
    <div className="movies-template">
      <Link to="/">
        <h1 className="movies-heading ">
          {heading} <span>{">"}</span>
        </h1>
      </Link>
      <Carousel reverse={reverse} delay={delay} list={list} ></Carousel>
    </div>
  );
}

export default MoviesTemplate;
