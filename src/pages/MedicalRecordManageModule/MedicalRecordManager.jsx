import {
  styled,
  Grid,
  Divider,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress,
} from '@mui/material';
import { blue, teal } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
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

  useEffect(() => {
    dispatch(getAccount());
  }, []);

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      medicalRecord: [
        {
          diagnose: '', // Chuẩn đoán
          pathologicalProcess: '', // Quá trình bệnh lý
          treatments: '', // Phương pháp điều trị
          testResults: '', // Kết quả xét nghiệm
          note: '', // Ghi chú
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medicalRecord',
  });

  useEffect(() => {
    if (account && account.medicalRecord) {
      try {
        const medicalRecord = JSON.parse(account.medicalRecord);
        reset({ medicalRecord });
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
    formData.set('medicalRecord', JSON.stringify(values.medicalRecord));

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
          {fields.map((item, idx) => (
            <Box sx={{ marginBottom: 2 }} key={idx}>
              <Divider sx={{ marginBottm: 2 }}>
                <Typography variant="h6" component="h6" fontWeight="bold" color={teal[300]}>
                  {`Medical Record ${idx + 1}`}
                </Typography>
              </Divider>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Controller
                    control={control}
                    name={`medicalRecord.${idx}.diagnose`}
                    render={({ field }) => (
                      <StyledTextField fullWidth label="Diagnose" {...field} />
                    )}
                  />
                </Grid>

                <Grid item xs={9}>
                  <Controller
                    control={control}
                    name={`medicalRecord.${idx}.pathologicalProcess`}
                    render={({ field }) => (
                      <StyledTextField fullWidth label="Pathological Process" {...field} />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name={`medicalRecord.${idx}.treatments`}
                    render={({ field }) => (
                      <StyledTextField fullWidth label="Treatments" {...field} />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name={`medicalRecord.${idx}.testResults`}
                    render={({ field }) => (
                      <StyledTextField fullWidth label="Test Results" {...field} />
                    )}
                  />
                </Grid>

                <Grid item xs={11}>
                  <Controller
                    control={control}
                    name={`medicalRecord.${idx}.note`}
                    render={({ field }) => <StyledTextField fullWidth label="Note" {...field} />}
                  />
                </Grid>

                <Grid item xs={1}>
                  <Button variant="contained" color="error" onClick={() => remove(idx)}>
                    <FontAwesomeIcon icon="trash" />
                    &nbsp; Remove
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}

          <Box mt={2} display="flex">
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              <FontAwesomeIcon icon="save" />
              &nbsp;Save
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="outlined"
              color="info"
              onClick={() =>
                append({
                  diagnose: '',
                  pathologicalProcess: '',
                  treatments: '',
                  testResults: '',
                  note: '',
                })
              }
            >
              <FontAwesomeIcon icon="plus" />
              &nbsp;Add More
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledPaper>
  );
}
