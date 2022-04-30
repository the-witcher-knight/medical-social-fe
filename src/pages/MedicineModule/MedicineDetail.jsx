import React, { useEffect } from 'react';
import { Typography, Paper, Grid, Button, LinearProgress, Divider } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getMedicine } from './pharmacy-medicine.reducer';
import { Box } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lightBlue } from '@mui/material/colors';

export default function MedicineDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { pharmacyMedicineId } = useParams();

  const pharmacyMedicine = useAppSelector(state => state.pharmacyMedicine.medicine);

  useEffect(() => {
    dispatch(getMedicine(pharmacyMedicineId));
  }, []);

  const onClickBack = () => {
    navigate(-1);
  };

  const onClickEdit = () => {
    navigate(`/medicine-manager/${pharmacyMedicineId}/edit`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Paper style={{ height: '100%', width: 800 }}>
      <Box p={2}>
        <Typography variant="h5" component="h1" align="left" color={lightBlue[800]} gutterBottom>
          Detail of Medicine {pharmacyMedicineId}
        </Typography>
        <Divider />
        {pharmacyMedicine ? (
          <>
            <Box component="div" p={2}>
              <Grid container component="dl" spacing={2}>
                <Grid item xs={3}>
                  <Typography component="dt" variant="subtitle1">
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="dd" variant="body1">
                    {pharmacyMedicine.id}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container component="dl" spacing={2}>
                <Grid item xs={3}>
                  <Typography component="dt" variant="subtitle1">
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="dd" variant="body1">
                    {pharmacyMedicine.medicine.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container component="dl" spacing={2}>
                <Grid item xs={3}>
                  <Typography component="dt" variant="subtitle1">
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="dd" variant="body1">
                    {pharmacyMedicine.medicine.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container component="dl" spacing={2}>
                <Grid item xs={3}>
                  <Typography component="dt" variant="subtitle1">
                    Price
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="dd" variant="body1">
                    {pharmacyMedicine.medicine.price}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container component="dl" spacing={2}>
                <Grid item xs={3}>
                  <Typography component="dt" variant="subtitle1">
                    Unit
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="dd" variant="body1">
                    {pharmacyMedicine.medicine.unit}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container component="dl" spacing={2}>
                <Grid item xs={3}>
                  <Typography component="dt" variant="subtitle1">
                    Amount
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="dd" variant="body1">
                    {pharmacyMedicine.amount}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box component="div" display="flex" p={2}>
              <Button variant="contained" onClick={onClickBack}>
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;Back
              </Button>
              &nbsp;
              <Button variant="contained" color="secondary" onClick={onClickEdit}>
                <FontAwesomeIcon icon="wrench" />
                &nbsp;Edit
              </Button>
            </Box>
          </>
        ) : (
          <LinearProgress />
        )}
      </Box>
    </Paper>
  );
}
