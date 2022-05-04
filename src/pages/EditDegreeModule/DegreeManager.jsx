import React from 'react';
import { styled, Paper, Typography, LinearProgress, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount } from 'src/shared/reducers/authentication';
import Zoom from 'react-img-zoom';
import axios from 'axios';

const API_URL = process.env.API_URL;

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

  const [degreeUrl, setDegreeUrl] = React.useState();

  const loading = useAppSelector(state => state.authentication.loading);
  const doctorAccount = useAppSelector(state => state.authentication.account);

  React.useEffect(() => {
    dispatch(getAccount());
  }, []);

  React.useEffect(() => {
    if (doctorAccount) {
      dispatch(getDegreeDoctor(doctorAccount.id)).then(res => setDegreeUrl(res.payload));
    }
  }, [doctorAccount]);

  return (
    <StyledPaper elevation={3}>
      <StyledTitle variant="h5" align="left">
        Degree Manager
      </StyledTitle>
      {loading && <LinearProgress />}
      <Box component="div">
        {degreeUrl && degreeUrl !== '' ? (
          <Zoom
            img={'http://localhost:8080/files/' + degreeUrl}
            zoomScale={3}
            width={600}
            height={600}
            loading="lazy"
          />
        ) : (
          <LinearProgress />
        )}
      </Box>
    </StyledPaper>
  );
}
