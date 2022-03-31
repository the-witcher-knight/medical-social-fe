import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Container,
  CssBaseline,
  Box,
  Alert,
  Avatar,
  Typography,
  Button,
  Grid,
  TextField,
  InputBase,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { toast } from 'react-toastify';
import { getUserAuthentication } from '../util/auth-util';
import { editProfile, getAccount, resetUpdateSuccess } from '../reducers/authentication';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const ProfileEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorMessage = useAppSelector(state => state.authentication.errorMessage);
  const loading = useAppSelector(state => state.authentication.loading);
  const updateSuccess = useAppSelector(state => state.authentication.updateSuccess);

  const userData = getUserAuthentication();
  const userAccount = useAppSelector(state => state.authentication.account);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      login: userData.sub,
      medicalRecord: '',
      authority: userData.auth,
      files: '', // for doctor degree
      pharmacyName: '',
      address: '', // form pharmacy
    },
  });

  useEffect(() => {
    dispatch(getAccount());
  }, []);

  useEffect(() => {
    if (errorMessage && errorMessage !== '') {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Update profile successfully');
      dispatch(resetUpdateSuccess());
      navigate('/');
    }
  }, [updateSuccess]);

  const onSubmit = values => {
    if (!userAccount || userAccount.id === null || userAccount.id === undefined) {
      toast.warning('User account is not found, please reload page or logout and login again');
      return;
    }

    const newUser = { ...values, authorities: [values.authority], id: userAccount.id }; // get user data from form

    // Remove properties that are not needed or null
    Object.keys(newUser).forEach(
      k => (newUser[k] == null || newUser[k] === '' || k === 'authority') && delete newUser[k]
    );

    // TODO: dispatch update user
    dispatch(editProfile(newUser));
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
            Profile Edit
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {userData.auth === 'ROLE_PHARMACY' ? (
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

              {userData.auth === 'ROLE_DOCTOR' && (
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

              {userData.auth === 'ROLE_USER' && (
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
                      disabled
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileEdit;
