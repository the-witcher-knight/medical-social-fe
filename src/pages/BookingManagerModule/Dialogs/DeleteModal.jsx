import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
// import { deleteSchedule } from '../bookingManager.reducer';

export default function DeleteModal() {
  const { scheduleId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const schedule = useAppSelector(state => state.bookingManager.schedule);
  const loading = useAppSelector(state => state.bookingManager.loading);
  const updated = useAppSelector(state => state.bookingManager.updateSuccess);

  React.useEffect(() => {
    // dispatch(getScheduleById(scheduleId));
  }, []);

  React.useEffect(() => {
    if (updated) {
      handleClose();
    }
  }, [loading]);

  const handleClose = () => {
    setOpen(false);
    navigate('/booking-manager');
  };

  const onAccept = () => {
    // dispatch(deleteSchedule(scheduleId));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure to delete the request with id {scheduleId} ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {JSON.stringify(schedule)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onAccept}>
          Accept
        </Button>
        <Button color="secondary" onClick={handleClose}>
          Deny
        </Button>
      </DialogActions>
    </Dialog>
  );
}
