import * as React from 'react';
import { Link } from 'react-router-dom'
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '@base/constant'
import { signup } from '@config/api/user';
import { setLocalStorage } from '@base/index';
import { useNavigate } from 'react-router-dom';



function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="/">
                Your Website
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data: any) => {
        try {
            let response = await signup(data).catch(error => {
                throw error;
            }).then(res => {
                return res;
            })

            if (response.token) {
                setLocalStorage(response.token, 'login');
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }

        } catch (error) {
            console.error(error)
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item sm={12} xs={12}>
                                {/* Họ Tên */}
                                <Controller name='fullname' control={control} rules={{ required: 'Username is required' }}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="fullname"
                                            label="Full Name"
                                            autoComplete="family-name"
                                            error={!!errors.fullname}
                                            helperText={errors.fullname ? errors.fullname.message?.toString() : ''}
                                        />
                                    }}>
                                </Controller>

                            </Grid>
                            <Grid item xs={12}>
                                {/* Email */}
                                <Controller name='email' control={control} rules={{ required: "Email is required", pattern: { value: EMAIL_REGEX, message: 'Email is incorect' } }}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            autoComplete="family-name"
                                            error={!!errors.email}
                                            helperText={errors.email ? errors.email.message?.toString() : ''}
                                        />
                                    }}>
                                </Controller>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Mật Khẩu */}
                                <Controller name='password' control={control} rules={{ required: 'Password is required', pattern: { value: PASSWORD_REGEX, message: 'Password has at least one uppercase letter, at least one number, and is at least 8 characters long' } }}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            type='password'
                                            autoComplete="new-password"
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password.message?.toString() : ''}
                                        />
                                    }}>
                                </Controller>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Phone */}
                                <Controller name='phone' control={control} rules={{ required: 'Phone is required', pattern: { value: PHONE_REGEX, message: "Invalid phone number Viet Nam. Ex: 0912345678 || 391234567" } }}
                                    render={({ field }) => {
                                        return <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            autoComplete="new-account"
                                            error={!!errors.phone}
                                            helperText={errors.phone ? errors.phone.message?.toString() : ''}
                                        />
                                    }}>
                                </Controller>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container >
        </ThemeProvider >
    );
}