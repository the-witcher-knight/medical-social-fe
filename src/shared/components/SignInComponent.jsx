import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  Box,
  CssBaseline,
  Avatar,
  Alert,
  TextField,
  Button,
  Grid,
  Link as MuiLink,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { signin } from 'src/shared/reducers/authentication';

const theme = createTheme();

const SignInComponent = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.authentication.loading);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const loginSuccess = useAppSelector(state => state.authentication.loginSuccess);
  const errorMessage = useAppSelector(state => state.authentication.errorMessage);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loading, loginSuccess]);

  const onSubmit = values => {
    console.log(values);
    dispatch(signin(values));
  };

  return (
    <ThemeProvider theme={theme}>
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
            <FontAwesomeIcon icon="user-shield" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  error={!!errors.username}
                  helperText={errors.username && 'Please enter a username'}
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password && 'Please enter a password'}
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="remember"
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={<Checkbox checked={value} onChange={onChange} />}
                  label="Remember Me"
                />
              )}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <MuiLink component={Link} to="/authorization/forgot-password" variant="body2">
                  Forgot password?
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink component={Link} to="/authorization/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInComponent;
