import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Link as MuiLink,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';

const theme = createTheme();

const SignUpComponent = () => {
  const dispatch = useAppDispatch();

  const errorMessage = useAppSelector(state => state.authentication.errorMessage);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      authority: '',
      confirmPassword: '',
    },
  });

  const onSubmit = values => {
    console.log(values);
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
            paddingBottom: '2rem',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FontAwesomeIcon icon="user-shield" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="firstname"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      autoComplete="given-name"
                      label="First Name"
                      autoFocus
                      error={!!errors.firstname}
                      helperText={errors.firstname && 'Please enter your first name'}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="lastname"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Last Name"
                      autoComplete="family-name"
                      error={!!errors.lastname}
                      helperText={errors.lastname && 'Please enter your last name'}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="authority"
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="authority-selection">Authority</InputLabel>
                      <Select
                        labelId="authority-selecton"
                        id="authority-selection"
                        value={value}
                        onChange={onChange}
                        label="Authority"
                        error={!!errors.authority}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'ROLE_USER'}>User</MenuItem>
                        <MenuItem value={'ROLE_DOCTOR'}>Doctor</MenuItem>
                        <MenuItem value={'ROLE_PHARMACY'}>Pharmacy Manager</MenuItem>
                        <MenuItem value={'ROLE_ADMIN'}>Admin</MenuItem>
                      </Select>
                      {errors.authority && (
                        <FormHelperText error>Please choose your authority</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Username"
                      error={!!errors.username}
                      helperText={errors.username && 'Please enter a username'}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="password"
                      fullWidth
                      label="Password"
                      error={!!errors.password}
                      helperText={errors.password && 'Please enter a password'}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="password"
                      fullWidth
                      label="Confirm Password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword && 'Please enter a current password'}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/authorization/sign-in" variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpComponent;
