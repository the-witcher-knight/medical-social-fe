import React from 'react';
import { styled, Paper, Box, TextField, InputBase, Button, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { getAccount, updateUser } from 'src/shared/reducers/authentication';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthorityConstant } from 'src/shared/authority-constant';
import { toast } from 'react-toastify';

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function EditProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = getUserAuthentication();

  const loading = useAppSelector(state => state.authentication.loading);
  const account = useAppSelector(state => state.authentication.account);

  React.useEffect(() => {
    dispatch(getAccount());
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      medicalRecord: '',
      pharmacyName: '',
      address: '',
      files: [],
    },
  });

  React.useEffect(() => {
    if (account) {
      reset(account);
    }
  }, [account]);

  const onSubmit = values => {
    const formData = new FormData();

    if (!account || account.id === null || account.id === undefined) {
      toast.warning('User account is not found, please reload page or logout and login again');
      return;
    }

    // Add old data
    Object.keys(account)
      .filter(key => account[key] !== null && account[key] !== undefined)
      .forEach(key => {
        if (key === 'files') {
          formData.append(key, account[key][0]);
        } else if (key === 'createdDate' || key === 'lastModifiedDate') {
          return; // ignore createdDate and lastModifiedDate
        } else {
          formData.append(key, account[key]);
        }
      });

    // Add current role
    formData.append('authorities', Array.of(userData.auth));

    // update new data
    Object.keys(values)
      .filter(key => values[key] !== null && values[key] !== undefined)
      .forEach(key => {
        if (key === 'files') {
          formData.set(key, values[key][0]);
        } else if (key === 'createdDate' || key === 'lastModifiedDate') {
          return; // ignore createdDate and lastModifiedDate
        } else {
          formData.set(key, values[key]);
        }
      });

    dispatch(updateUser(formData));
  };

  return (
    <StyledPaper elevation={3}>
      {loading && <LinearProgress />}
      <Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
        {userData.auth === 'ROLE_PHARMACY' ? (
          <>
            <Controller
              control={control}
              name="pharmacyName"
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  label="Pharmacy Name"
                  error={!!errors.pharmacyName}
                  helperText={errors.pharmacyName && 'Please enter pharmacy name'}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  label="Pharmacy Address"
                  error={!!errors.address}
                  helperText={errors.address && 'Please enter pharmacy address'}
                  {...field}
                />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: true }}
              render={({ field }) => (
                <StyledTextField
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
            <Controller
              control={control}
              name="lastName"
              rules={{ required: true }}
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  label="Last Name"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName && 'Please enter your last name'}
                  {...field}
                />
              )}
            />
          </>
        )}

        <Box display="flex" justifyContent="flex-start">
          <StyledButton type="submit" variant="contained" color="primary" disabled={loading}>
            <FontAwesomeIcon icon="save" />
            &nbsp;Save
          </StyledButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}
