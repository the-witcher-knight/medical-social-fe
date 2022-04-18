import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  Button,
  Alert,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { splitStringNewLine } from 'src/shared/util/string-util';
import { useAppSelector, useAppDispatch } from 'src/configs/store';
import { getPatientById } from '../bookingManager.reducer';
import { Box } from '@mui/system';

export default function RecordReviewModal() {
  const { patientId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const patient = useAppSelector(state => state.bookingManager.patient);

  React.useEffect(() => {
    dispatch(getPatientById(patientId));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate('/booking-manager');
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="medical-record-dialog">
      <DialogTitle id="alert-dialog-title">
        You are viewing the patient&rsquo;s medical record with id {patientId}
      </DialogTitle>
      <DialogContent>
        {patient ? (
          <Box component="div">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">Patient Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {patient.lastName} &nbsp; {patient.firstName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container paddingTop={1} spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1">Medical Record:</Typography>
              </Grid>
              <Grid item xs={8}>
                {patient.medicalRecord ? (
                  <List>
                    {splitStringNewLine(patient.medicalRecord).map((line, idx) => (
                      <ListItem key={idx}>{line}</ListItem>
                    ))}
                  </List>
                ) : (
                  <ListItem key="no-line">The patient not have medical record</ListItem>
                )}
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Alert severity="error">Patient not found</Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" fullWidth onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
