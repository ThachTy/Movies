import { Outlet } from "react-router-dom";
/* */
import Header from "@components/header";
import Footer from "@components/footer";
import Banner from "@components/banner";
import Nofication from "@components/nofication";
import Tools from '@components/tools'
import SearchMovies from "@src/components/search";
import SearchMoviesProvider from '@context/SearchMoviesContext'

function HomeLayout() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header></Header>
      <Banner></Banner>
      <SearchMoviesProvider>
        <Tools></Tools>
        <SearchMovies />
      </SearchMoviesProvider>
      <Outlet />
      <Nofication />
      <Footer></Footer>
    </div >
  );
}

export default HomeLayout;
