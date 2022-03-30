import React, { useEffect } from 'react';
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
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  TextField,
  InputBase,
  TextareaAutosize,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { toast } from 'react-toastify';
import { signup } from '../reducers/authentication';

const theme = createTheme();

const SignUpComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorMessage = useAppSelector(state => state.authentication.errorMessage);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      medicalRecord: '',
      authority: '',
      confirmPassword: '',
      files: '', // for doctor degree
      pharmacyName: '',
      address: '', // form pharmacy
    },
  });

  const watchAuthority = useWatch({ control, name: 'authority' });

  const onChangeAuthority = () => {
    resetField('firstName');
    resetField('lastName');
    resetField('login');
    resetField('password');
    resetField('confirmPassword');
    resetField('pharmacyName');
    resetField('address');
    resetField('files');
    resetField('medicalRecord');
  };

  useEffect(() => {
    if (watchAuthority) {
      onChangeAuthority();
    }
  }, [watchAuthority]);

  const onSubmit = values => {
    if (values.password !== values.confirmPassword) {
      toast.error('Password and confirm password are not the same');
      return;
    }
    const newUser = { ...values, authorities: [values.authority] };
    Object.keys(newUser).forEach(
      k => (newUser[k] == null || newUser[k] === '' || k === 'authority') && delete newUser[k]
    );
    // TODO convert authority to ['authority']
    console.log(newUser);
    dispatch(signup(newUser)).then(() => {
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success('Sign up successfully');
        navigate('/authorization/sign-in');
      }
    });
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
              {watchAuthority === 'ROLE_PHARMACY' ? (
                <>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="pharmacyName"
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Pharmacy Name"
                          error={!!errors.pharmacyName}
                          helperText={errors.pharmacyName && 'Please enter pharmacy name'}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="address"
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Pharmacy Address"
                          error={!!errors.address}
                          helperText={errors.address && 'Please enter pharmacy address'}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="firstName"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          autoComplete="given-name"
                          label="First Name"
                          autoFocus
                          error={!!errors.firstName}
                          helperText={errors.firstName && 'Please enter your first name'}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="lastName"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Last Name"
                          autoComplete="family-name"
                          error={!!errors.lastName}
                          helperText={errors.lastName && 'Please enter your last name'}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}

              {watchAuthority === 'ROLE_DOCTOR' && (
                <Grid item xs={12}>
                  <InputBase
                    fullWidth
                    label="Degree"
                    name="files"
                    type="file"
                    {...register('files')}
                  />
                </Grid>
              )}

              {watchAuthority === 'ROLE_USER' && (
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="medicalRecord"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Medical Record"
                        multiline
                        maxRows={10}
                        error={!!errors.medicalRecord}
                        helperText={errors.medicalRecord && 'Please enter your medical record'}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="login"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Username"
                      error={!!errors.login}
                      helperText={errors.login && 'Please enter a username'}
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
