import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function LoginGoogle() {
    const loginGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            if (response.access_token) {
                //  lấy thông tin sau khi đăng nhập
                let profile = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `${response.token_type} ${response.access_token}` } })
                console.log(profile)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    });

    return (
        <button onClick={() => loginGoogle()}>Đăng nhập Google</button>
    )
}

export default LoginGoogle
