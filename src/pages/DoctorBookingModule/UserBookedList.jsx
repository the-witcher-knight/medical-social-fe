import React, { useEffect, useState } from 'react';
import {
  Alert,
  LinearProgress,
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAllScheduleOfUser } from './booking.reducer';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { dateToString, dateToViewString, extractTimeFromString } from 'src/shared/util/time-ultil';
import { Box } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

const UserBookedList = () => {
  const dispatch = useAppDispatch();
  const userData = getUserAuthentication();
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const scheduleList = useAppSelector(state => state.bookingDoctor.scheduleList);
  const loading = useAppSelector(state => state.bookingDoctor.loading);

  useEffect(() => {
    if (userData && userData.sub && selectedDate) {
      const data = { userLogin: userData.sub, date: dateToString(selectedDate) };
      dispatch(getAllScheduleOfUser(data));
    }
  }, [selectedDate]);

  const handleChangeDate = date => {
    setSelectedDate(date);
  };

  return (
    <div style={{ height: 600, width: '90%' }}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Booked List
      </Typography>
      <Box component="div" m={1}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleChangeDate}
            renderInput={params => <TextField {...params} margin="normal" fullWidth />}
          />
        </LocalizationProvider>
        {loading ? (
          <LinearProgress />
        ) : (
          <List>
            {scheduleList && scheduleList.length > 0 ? (
              scheduleList.map(item => (
                <ListItem key={item.id}>
                  <Typography variant="body1" component="h5" align="center" gutterBottom>
                    Start <Button color="info">{extractTimeFromString(item.startAt)}</Button> - End
                    <Button color="info">{extractTimeFromString(item.endAt)}</Button> with
                    doctor&nbsp;
                    <Link variant="body2">{item.doctor.id}</Link>
                  </Typography>
                </ListItem>
              ))
            ) : (
              <ListItem key="no-schedule">
                <Alert severity="warning">
                  <Typography variant="body1" component="h5" align="center" gutterBottom>
                    User not have schedule at date {dateToViewString(selectedDate)}
                  </Typography>
                </Alert>
              </ListItem>
            )}
          </List>
        )}
      </Box>
    </div>
  );
};
export default UserBookedList;
