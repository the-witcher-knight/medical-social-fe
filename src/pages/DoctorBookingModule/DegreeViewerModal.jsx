import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/configs/store';
import { getDegreeDoctor } from './booking.reducer';
import { Modal, Box, Typography, LinearProgress, Button } from '@mui/material';

export default function DegreeViewerModal() {
  const { doctorId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [degreeUrl, setDegreeUrl] = useState('');

  useEffect(() => {
    dispatch(getDegreeDoctor(doctorId)).then(res => setDegreeUrl(res.payload.data));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate('/doctor-booking');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Booking Modal"
      aria-describedby="doctor-booking-modal"
    >
      <Box
        sx={{
          top: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5">Review Degree of Doctor</Typography>
        {degreeUrl && degreeUrl !== '' ? (
          <img
            style={{ width: '100%', height: '100%' }}
            src={'http://localhost:8080/files/' + degreeUrl}
            loading="lazy"
          />
        ) : (
          <LinearProgress />
        )}
        <Button type="button" fullWidth onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
