import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { Modal, Box, Button, Typography, LinearProgress, Grid } from '@mui/material';
import { getSchedule, partialUpdateSchedule } from './schedule-manager.reducer';
import { extractTimeFromString } from 'src/shared/util/time-ultil';

export default function ConfirmDialog() {
  const { scheduleId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const loading = useAppSelector(state => state.scheduleManager.loading);
  const schedule = useAppSelector(state => state.scheduleManager.schedule);

  useEffect(() => {
    dispatch(getSchedule(scheduleId));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate(location.state.backgroundLocation);
  };

  const handleConfirm = () => {
    dispatch(partialUpdateSchedule({ id: scheduleId, status: 'CONFIRMED' }));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Are you sure you want to confirm this schedule?
        </Typography>
        {loading && <LinearProgress />}
        {schedule && (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={4}>
              <Typography variant="body2" component="p">
                With patient
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" component="p">
                {schedule.user.firstName} {schedule.user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" component="p">
                At time
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" component="p">
                {extractTimeFromString(schedule.startAt)} - {extractTimeFromString(schedule.endAt)}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleConfirm} disabled={loading}>
            Confirm
          </Button>
          &nbsp;
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
