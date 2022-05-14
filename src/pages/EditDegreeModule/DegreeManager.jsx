import React from 'react';
import {
  styled,
  Paper,
  Typography,
  LinearProgress,
  Box,
  InputBase,
  Button,
  Divider,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount, updateUser } from 'src/shared/reducers/authentication';
import Zoom from 'react-img-zoom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { ApiSingleton } from 'src/configs/singleton-api';

const API_URL = ApiSingleton.getInstance().instance.apiUrl;

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(2),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: blue[500],
}));

const getDegreeDoctor = async doctorId => {
  const res = await axios.get(`${API_URL}/admin/users/degree/${doctorId}`);
  return res.data;
};

export default function DegreeManager() {
  const dispatch = useAppDispatch();

  const [degree, setDegree] = React.useState();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    defaultValues: {
      files: '', // for doctor degree
    },
  });

  const userData = getUserAuthentication();

  const loading = useAppSelector(state => state.authentication.loading);
  const doctorAccount = useAppSelector(state => state.authentication.account);
  const updateSuccess = useAppSelector(state => state.authentication.updateSuccess);
  const errorMessage = useAppSelector(state => state.authentication.errorMessage);

  React.useEffect(() => {
    dispatch(getAccount()).then(resAccount => {
      const id = resAccount.payload.id;
      getDegreeDoctor(id).then(res => {
        setDegree(res);
      });
    });
  }, []);

  React.useEffect(() => {
    if (updateSuccess) {
      toast.success('Update profile success');
      dispatch(getAccount()).then(resAccount => {
        const id = resAccount.payload.id;
        getDegreeDoctor(id).then(res => {
          setDegree(res);
        });
      });
    }
  }, [updateSuccess]);

  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const onSubmit = values => {
    if (!doctorAccount || !userData) {
      toast.warn('Something wrong, please login again');
      return;
    }
    // eslint-disable-next-line no-debugger
    debugger;

    const formData = new FormData();

    // Add old data
    Object.keys(doctorAccount)
      .filter(key => doctorAccount[key] !== null && doctorAccount[key] !== undefined)
      .forEach(key => {
        if (key === 'createdDate' || key === 'lastModifiedDate') {
          return; // ignore createdDate and lastModifiedDate
        } else {
          formData.append(key, doctorAccount[key]);
        }
      });

    // Add current role
    formData.append('authorities', Array.of(userData.auth));

    if (degree) formData.append('deletedFiles[0].id', degree.id);
    // Add current doctor degree
    formData.append('files', values.files[0]);

    dispatch(updateUser(formData));
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTitle variant="h5" align="left">
        Degree Manager
      </StyledTitle>
      {loading && <LinearProgress />}
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="center"
      >
        <Box component="div" m={1} p={1}>
          {degree ? (
            <Zoom
              img={`${ApiSingleton.getInstance().instance.baseUrl}/files/${degree.path}`}
              zoomScale={3}
              width={500}
              height={500}
              loading="lazy"
            />
          ) : (
            <LinearProgress />
          )}
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          component="div"
          m={1}
          p={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={3}>
            <InputBase fullWidth label="Degree" name="files" type="file" {...register('files')} />
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                <FontAwesomeIcon icon="save" />
                &nbsp;Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledPaper>
  );
}
