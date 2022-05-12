import {
  styled,
  Divider,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccount, updateUser } from 'src/shared/reducers/authentication';
import { toast } from 'react-toastify';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(5),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function MedicalRecordManager() {
  const dispatch = useAppDispatch();

  const userData = getUserAuthentication();
  const { loading, account, updateSuccess, errorMessage } = useAppSelector(
    state => state.authentication
  );

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      diagnose: '', // Chuẩn đoán
      pathologicalProcess: '', // Quá trình bệnh lý
      treatments: '', // Phương pháp điều trị
      testResults: '', // Kết quả xét nghiệm
      note: '', // Ghi chú
    },
  });

  useEffect(() => {
    if (account && account.medicalRecord) {
      try {
        const data = JSON.parse(account.medicalRecord);
        reset(data);
        return;
      } catch (e) {
        toast.error('Error: ', e);
      }
    }
  }, [account]);

  const onSubmit = values => {
    if (!account || !userData) {
      toast.warn('Something wrong, please login again');
      return;
    }

    const formData = new FormData();

    // Add old data
    Object.keys(account)
      .filter(key => account[key] !== null && account[key] !== undefined)
      .forEach(key => {
        if (key === 'createdDate' || key === 'lastModifiedDate') {
          return; // ignore createdDate and lastModifiedDate
        } else {
          formData.append(key, account[key]);
        }
      });

    // Add current role
    formData.append('authorities', Array.of(userData.auth));

    // Add current medical record
    formData.set('medicalRecord', JSON.stringify(values));

    dispatch(updateUser(formData));
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" component="h3" mb={2} color={blue[400]}>
        Medical Record Manager
      </Typography>
      <Divider />
      {loading && <LinearProgress />}
      <Box mt={2} p={2}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="diagnose"
            render={({ field }) => <StyledTextField fullWidth label="Diagnose" {...field} />}
          />

          <Controller
            control={control}
            name="pathologicalProcess"
            render={({ field }) => (
              <StyledTextField fullWidth label="Pathological Process" {...field} />
            )}
          />

          <Controller
            control={control}
            name="treatments"
            render={({ field }) => <StyledTextField fullWidth label="Treatments" {...field} />}
          />

          <Controller
            control={control}
            name="testResults"
            render={({ field }) => <StyledTextField fullWidth label="Test Results" {...field} />}
          />

          <Controller
            control={control}
            name="note"
            render={({ field }) => <StyledTextField fullWidth label="Note" {...field} />}
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              <FontAwesomeIcon icon="save" />
              &nbsp;Save
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledPaper>
  );
}
