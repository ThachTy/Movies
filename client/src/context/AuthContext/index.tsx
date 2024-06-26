import { createContext, useState, ReactNode } from 'react'
import { setSessionStorage, getSessionStorage, debounce } from '@base/index';
import { LOGIN_STORAGE_KEY } from '@base/constant';
import { login, loginGoogle } from '@config/api/user';
import { useDispatch } from 'react-redux';
import { setNoficationAction } from '@config/reducer/noficationReducer';
import { GoogleOAuthProvider } from '@react-oauth/google';

export type UserType = {
    email: string;
    password: string;
}

export type AuthContextType = {
    token: string | null;
    user: UserType | {};
    handleLogin: (data: UserType) => void;
    handleLogout: () => void;
    handleLoginGoogle?: () => void
}

export const AuthContext = createContext<AuthContextType | Object>({})

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const [token, setToken] = useState(getSessionStorage(LOGIN_STORAGE_KEY) ?? "")
    const [user, setUser] = useState<UserType | Object>({});

    const handleLogin = debounce(async (data: UserType | any) => {
        try {
            // call api in here
            let response = await login({ email: data[0].email, password: data[0].password }).then(res => res).catch(err => err.response.data);
            if (response.token) {
                setSessionStorage(response.token, LOGIN_STORAGE_KEY);
                dispatch(setNoficationAction({ isOpen: true, message: response.message, error: false }));
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500
                )
                return;
            }
            dispatch(setNoficationAction({ isOpen: true, message: response.message, error: true }));

        } catch (error) {
            console.error(error)
        }
    }, 500);

    const handleLogout = () => {
        setToken("")
        setUser({});
        sessionStorage.removeItem(LOGIN_STORAGE_KEY);
        window.location.href = "/login";
    }

    const handleLoginGoogle = async (response: any) => {
        try {
            if (response.access_token) {
                //  lấy thông tin sau khi đăng nhập
                let profile = await loginGoogle(response).then(res => console.log(res));
                setSessionStorage(response.access_token, LOGIN_STORAGE_KEY);
                dispatch(setNoficationAction({ isOpen: true, message: response.message, error: false }));
                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 1500)
                return;
            }
        } catch (error) {
            console.error(error)
        }

    }

    return <GoogleOAuthProvider clientId={import.meta.env.VITE_KEY_APP_GOOGLE}>
        <AuthContext.Provider value={{ token, user, handleLogin, handleLogout, handleLoginGoogle }}>{children}</AuthContext.Provider>
    </GoogleOAuthProvider>
}


export default AuthProvider;




