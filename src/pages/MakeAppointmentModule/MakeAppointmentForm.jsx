import { Modal, Typography, Box, Avatar, TextField, Button } from '@mui/material';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { combineDateAndTime } from 'src/shared/util/time-ultil';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { createDoctorSchedule } from './make-appointment.reducer';

export default function MakeAppointmentForm() {
  const { doctorLogin } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(true);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      date: Date.now(),
      startAt: Date.now() + 3600000, // + 1 hour
      endAt: Date.now() + 5400000, // + 1 hour 30 minus
    },
  });

  const currentAccount = getUserAuthentication();
  const errorMessage = useAppSelector(state => state.makeAppointment.errorMessage);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const onSubmit = values => {
    const { date, startAt, endAt } = values; // not DayJS object

    const startTime = combineDateAndTime(date, startAt);
    const endTime = combineDateAndTime(date, endAt);

    const begin = new Date(startTime);
    const end = new Date(endTime);

    if (begin >= end) {
      toast.error("Start time can't be greater than end time");
      return;
    }

    if (begin <= Date.now()) {
      toast.error("Start time can't be equal or less than current time");
      return;
    }

    const schedule = {
      startAt: startTime,
      endAt: endTime,
      doctor: {
        login: doctorLogin,
      },
      user: {
        login: currentAccount.sub,
      },
    };
    dispatch(createDoctorSchedule(schedule));
    handleClose();
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FontAwesomeIcon icon="calendar-plus" />
        </Avatar>
        <Typography variant="h5">You want to book doctor {doctorLogin} ?</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  renderInput={params => (
                    <TextField {...params} margin="normal" fullWidth helperText={error?.message} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            control={control}
            name="startAt"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start time"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes']}
                  inputFormat="HH:mm"
                  mask="__:__"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  renderInput={params => (
                    <TextField {...params} margin="normal" fullWidth helperText={error?.message} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            control={control}
            name="endAt"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="End time"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes']}
                  inputFormat="HH:mm"
                  mask="__:__"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  renderInput={params => (
                    <TextField {...params} margin="normal" fullWidth helperText={error?.message} />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <FontAwesomeIcon icon="save" />
            &nbsp;Set Appointment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
