import { Routes, Route } from "react-router-dom";

/* Layout */
import HomeLayout from "@layouts/home";
import TicketLayout from '@layouts/ticket'

/* Pages */
import HomePage from "@pages/home";
import MoviePage from "@pages/movie";
import LoginPage from '@pages/login'
import Signup from '@pages/signup'
import NotFoundPage from '@pages/notfound'
import TicketPage from "@src/pages/ticket";

function Router() {
  return (
    <Routes>
      {/* Home */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/movie/:id" element={<MoviePage></MoviePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Route>


      <Route element={<TicketLayout />}>
        <Route path="/ticket/:tenHeThongRap" element={<TicketPage></TicketPage>}></Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes >
  );
}

export default Router;
