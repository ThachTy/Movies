import React from "react";
import Carousel from "@components/carousel";

import { Link } from "react-router-dom";

type Props = {
  heading: string;
  list: object[];
  delay?: number;
  reverse?: boolean;
};

function MoviesTemplate({ heading, list, delay, reverse }: Props) {

  return (
    <div className="w-full h-fit py-[1.5em] pl-[5em]">
      <Link to="/">
        <h1 className="text-[1.5em] pb-2 font-semibold ">
          {heading} <span>{">"}</span>
        </h1>
      </Link>
      <Carousel reverse={reverse} delay={delay} list={list} ></Carousel>
    </div>
  );
}

export default MoviesTemplate;
