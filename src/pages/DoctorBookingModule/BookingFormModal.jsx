import {
  Modal,
  Typography,
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from '@mui/material';
import AdapterDayJS from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { getDoctorScheduleOfDoctorAtCurrentDay, createDoctorSchedule } from './booking.reducer';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { combineDateAndTime } from 'src/shared/util/time-ultil';
import dayjs from 'dayjs';

const BookingFormModal = () => {
  const { doctorId } = useParams(); // get doctorId from url
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const { handleSubmit, watch, control } = useForm({
    defaultValues: {
      date: Date.now(),
      startAt: new Date().setUTCHours(1, 0, 0, 0), // Giờ UTC còn render ra giờ VN
      endAt: new Date().setUTCHours(2, 30, 0, 0),
    },
  });

  const scheduleList = useAppSelector(state => state.bookingDoctor.doctorScheduleList);
  const currentAccount = useAppSelector(state => state.authentication.account);

  // const watchDate = watch('date');

  // TODO: watch date change and get all schedule of doctor at that day
  // useEffect(() => {
  //   if (watchDate) {
  //     console.log(dayjs(watchDate).format('YYYY-MM-DDTHH:mm:ss[Z]')); // [Z] is for server timezone (UTC)
  //   }
  // }, [watchDate]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = values => {
    const { date, startAt, endAt } = values;

    if (startAt >= endAt) {
      toast.error("Start time can't be greater than end time");
      return;
    }

    if (startAt < Date.now()) {
      toast.error("Start time can't be less than current time");
      return;
    }

    const schedule = {
      startAt: combineDateAndTime(date, startAt),
      endAt: combineDateAndTime(date, endAt),
      doctor: {
        id: doctorId,
      },
      user: {
        id: currentAccount.id,
      },
    };
    // console.log(schedule);
    dispatch(createDoctorSchedule(schedule));
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
        <Typography variant="h5">You want to book doctor {doctorId} ?</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayJS}>
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
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayJS}>
                <TimePicker
                  label="Start time"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
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
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayJS}>
                <TimePicker
                  label="End time"
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
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
            Book
          </Button>
        </Box>
        <Accordion>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon="eye" />}>
            The time doctor was busy ...
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {scheduleList.map(schedule => (
                <li key={schedule.id}>
                  {schedule.startAt} - {schedule.endAt}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Modal>
  );
};
export default BookingFormModal;
