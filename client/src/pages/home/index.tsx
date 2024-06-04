import React, { useEffect, useState } from "react";

import MoviesTemplate from "@templates/MoviesTemplate";
import { danhSachPhim } from '@config/api/movie'


function HomePages() {
  const [movies, setMoives] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await danhSachPhim().then(res => { setMoives(res) })
    }
    fetchData()
  }, []
  )

  return (
    <main id="home" className="w-full h-full">
      <MoviesTemplate delay={3000} list={movies} heading="Most Watchlisted This Week"></MoviesTemplate>
      <MoviesTemplate delay={4000} list={movies} reverse={true} heading="Comming Soon"></MoviesTemplate>
      <MoviesTemplate delay={2000} list={movies} heading="Tune In Now: Popular Shows"></MoviesTemplate>
      <MoviesTemplate delay={3500} list={movies} reverse={true} heading="Most Popular in Viet Nam"></MoviesTemplate>
    </main >
  );
}

export default HomePages;
