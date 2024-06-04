import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/header'
import Footer from '@src/components/footer'
function TicketLayout() {
    return (
        <>
            <Header></Header>
            <Outlet />
            <Footer></Footer>
        </>
    )
}

export default TicketLayout
