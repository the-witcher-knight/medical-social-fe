import ActionModal from './ActionModal';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { dateToString, extractTimeFromString } from 'src/shared/util/time-ultil';
import { Box, Typography, Button, Divider, Tooltip, TextField, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserTableManager from 'src/shared/components/UserTableManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import {
  openModal,
  setSelectedSchedule,
  getScheduleByDoctorLoginAtDate,
} from './bookingManager.reducer';
import { DIALOG_ACTION } from './constant';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDayJS from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import { toast } from 'react-toastify';

const BookingManager = () => {
  const dispatch = useAppDispatch();

  const user = getUserAuthentication();
  const dialogOpen = useAppSelector(state => state.bookingManager.dialogOpen);
  const isLoading = useAppSelector(state => state.bookingManager.loading);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'startAt',
      headerName: 'Start Time',
      width: 150,
      valueGetter: params => extractTimeFromString(params.value),
    },
    {
      field: 'endAt',
      headerName: 'End Time',
      width: 150,
      valueGetter: params => extractTimeFromString(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell(params) {
        if (params.value === 'CREATED') {
          return <Chip label="Created" color="secondary" />;
        } else if (params.value === 'CONFIRMED') {
          return <Chip label="Confirmed" color="info" />;
        } else if (params.value === 'DONE') {
          return <Chip label="Done" color="success" />;
        }
      },
    },
  ];
  const scheduleList = useAppSelector(state => state.bookingManager.scheduleList);

  const [date, setDate] = useState(Date.now());
  const onChangeDate = num => {
    setDate(num);
  };

  useEffect(() => {
    dispatch(getScheduleByDoctorLoginAtDate({ login: user.sub, date: dateToString(date) }));
  }, [date]);

  const nextPage = () => {
    console.log('next page');
  };

  const onActionClick = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a schedule');
    }
  };

  const onConfirmSchedule = values => {
    dispatch(setSelectedSchedule(values));
    dispatch(
      openModal({
        title: `Are you sure confirm this schedule with id ${values.id}?`,
        action: DIALOG_ACTION.CONFIRM,
      })
    );
  };

  const onDeleteSchedule = values => {
    dispatch(setSelectedSchedule(values));
    dispatch(
      openModal({
        title: `Are you sure delete this schedule with id ${values.id}?`,
        action: DIALOG_ACTION.DELETE,
      })
    );
  };

  const onReviewMedicalRecord = values => {
    dispatch(setSelectedSchedule(values));
    dispatch(
      openModal({
        title: `This is medical record of schedule with id ${values.id}?`,
        action: DIALOG_ACTION.REVIEW,
      })
    );
  };

  const toolBarItems = ({ apiRef }) => (
    <>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Tooltip title="Confirm schedule">
        <Button
          color="info"
          aria-label="confirm"
          size="small"
          onClick={() => onActionClick([...apiRef.getSelectedRows()], onConfirmSchedule)}
        >
          <FontAwesomeIcon icon="check" />
          &nbsp; Confirm
        </Button>
      </Tooltip>
      <Tooltip title="Delete schedule">
        <Button
          color="error"
          aria-label="delete"
          size="small"
          onClick={() => onActionClick([...apiRef.getSelectedRows()], onDeleteSchedule)}
        >
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </Tooltip>
      <Tooltip title="Review medical record">
        <Button
          color="secondary"
          aria-label="delete"
          size="small"
          onClick={() => onActionClick([...apiRef.getSelectedRows()], onReviewMedicalRecord)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; Review
        </Button>
      </Tooltip>
      <Box component="div">
        <LocalizationProvider dateAdapter={AdapterDayJS}>
          <DatePicker
            value={date}
            onChange={onChangeDate}
            renderInput={params => (
              <TextField {...params} variant="standard" size="small" fullWidth />
            )}
          />
        </LocalizationProvider>
      </Box>
    </>
  );

  return (
    <Box component="div" mt={5} display="flex" justifyContent="center">
      <div style={{ height: 600, width: '90%' }}>
        <Typography variant="h5" align="center" component="h1">
          Booking Manager
        </Typography>
        <UserTableManager
          columns={columns}
          rows={scheduleList}
          nextPage={nextPage}
          loading={isLoading}
          otherToolbarItems={toolBarItems}
        />
        {dialogOpen && <ActionModal />}
      </div>
    </Box>
  );
};
export default BookingManager;
