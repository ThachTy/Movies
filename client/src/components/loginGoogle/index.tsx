import { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from '@context/AuthContext'
import './loginGoogle.css';

function LoginGoogle() {
    const authContext: any = useContext(AuthContext);

    const loginGoogle = useGoogleLogin({
        onSuccess: (response) => authContext.handleLoginGoogle(response),
        onError: (error) => {
            console.log(error)
        }
    });

    return (
        <button className='btn-loginGoogle' onClick={() => loginGoogle()}>Đăng nhập Google <i className="fa-brands fa-google"></i></button>
    )
}

export default LoginGoogle
