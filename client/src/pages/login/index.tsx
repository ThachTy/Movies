import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import { login } from '@config/api/user'
import { setSessionStorage } from '@base/index';
import { LOGIN_STORAGE_KEY } from '@base/constant';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@base/constant';
import { setNoficationAction } from '@config/reducer/noficationReducer';
import { useDispatch } from 'react-redux';
import { FormLabel } from '@mui/material';



function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function SignIn() {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        document.querySelector("#login-form")?.scrollIntoView();
    }, []
    )

    const onSubmit = async (data: any) => {
        console.log(data)
        try {
            await login(data).then(res => {
                if (res.token) {
                    res.token && setSessionStorage(res.token, LOGIN_STORAGE_KEY);
                    dispatch(setNoficationAction({ isOpen: true, message: res.message, error: false }));
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1000)
                }
            }).catch((error) => {
                let { message } = error.response.data;
                dispatch(setNoficationAction({ isOpen: true, message: message, error: true }));
            })
        }
        catch (error) {
            console.error({ error })
        }
    };

    return (

        <Container id='login-form' component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <i className="fa-solid fa-user"></i>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    {/* Email */}
                    <Controller name='email' control={control} rules={{ required: "Email is required", pattern: { value: EMAIL_REGEX, message: 'Email is incorect' } }}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />}>
                    </Controller>
                    {/* Password */}
                    <Controller name='password' control={control} rules={{ required: 'Password is required', pattern: { value: PASSWORD_REGEX, message: 'Password has at least one uppercase letter, at least one number, and is at least 8 characters long' } }}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />}>
                    </Controller>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}