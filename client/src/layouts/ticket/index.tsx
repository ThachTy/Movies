import { Outlet } from 'react-router-dom'
import Header from '@components/header'
import Footer from '@src/components/footer';
import Nofication from '@components/nofication';
function TicketLayout() {
    return (
        <>
            <Header></Header>
            <Outlet />
            <Nofication />
            <Footer></Footer>
        </>
    )
}

export default TicketLayout
