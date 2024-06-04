import { Outlet } from "react-router-dom";
/* */
import Header from "@components/header";
import Footer from "@components/footer";
import Banner from "@src/components/banner";

function HomeLayout() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header></Header>
      <Banner></Banner>
      <main className="w-full h-fit">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
}

export default HomeLayout;
