import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '@context/AuthContext'

function AuthPrivate() {
    const { token }: any = useContext(AuthContext);

    if (!token) return <Navigate to={"/login"}></Navigate>

    return (
        <Outlet />
    )
}

export default AuthPrivate
