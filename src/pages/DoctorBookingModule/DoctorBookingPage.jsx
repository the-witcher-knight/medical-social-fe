import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Tooltip, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import {
  getAllChatRoom,
  getDoctors,
  getDegreeDoctor,
  createChatRoom,
  resetCreatedChatRoom,
  openBookingForm,
  setSelectedDoctor,
} from './booking.reducer';
import UserTableManager from 'src/shared/components/UserTableManager';
import BookingFormModal from './BookingFormModal';
import { toast } from 'react-toastify';

const DoctorBookingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(state => state.bookingDoctor.loading);
  const doctorList = useAppSelector(state => state.bookingDoctor.doctorList);
  const chatRoomList = useAppSelector(state => state.bookingDoctor.chatRoomList);
  const createdChatRoom = useAppSelector(state => state.bookingDoctor.createdChatRoom);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 30,
  });

  useEffect(() => {
    if (!isLoading && createdChatRoom) {
      dispatch(getAllChatRoom());
      dispatch(resetCreatedChatRoom()); // update new chat room list
    }
  }, [createdChatRoom]);

  useEffect(() => {
    dispatch(getDoctors(pagination.page, pagination.size));
  }, [pagination]);

  const nextPage = () => {
    console.log('nextPage');
  };

  const onClickAction = (values, action) => {
    if (values) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a doctor');
    }
  };

  const onReviewDegree = values => {
    if (values) {
      dispatch(getDegreeDoctor(values.id)).then(res => {
        window.open('http://localhost:8080/files/' + res.payload.data, '_blank');
      });
    }
  };

  const onBookDoctor = values => {
    if (values) {
      console.log(values);
      dispatch(setSelectedDoctor(values));
      dispatch(openBookingForm());
    }
  };

  const onInboxDoctor = values => {
    if (values && values.id) {
      const doctorId = values.id;
      if (chatRoomList && chatRoomList.length > 0) {
        const hadRoom = chatRoomList.find(room => room.users.find(user => user.id === doctorId));
        if (!hadRoom) {
          dispatch(createChatRoom(doctorId));
        }
        // TODO: with current room
      }
      navigate('/message');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      editable: false,
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      editable: false,
      width: 150,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      editable: false,
      valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      width: 200,
    },
  ];

  const DoctorListToolbarItems = ({ apiRef }) => (
    <>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Tooltip title="Reviewer selected doctor">
        <Button
          color="secondary"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onReviewDegree)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; Review Degree
        </Button>
      </Tooltip>
      <Tooltip title="book exam">
        <Button
          color="info"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onBookDoctor)}
        >
          <FontAwesomeIcon icon="paw" />
          &nbsp; Book Examination
        </Button>
      </Tooltip>
      <Tooltip title="Inbox with Doctor">
        <Button
          color="warning"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onInboxDoctor)}
        >
          <FontAwesomeIcon icon="envelope" />
          &nbsp; Inbox
        </Button>
      </Tooltip>
    </>
  );

  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: 600, width: '90%' }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Active Doctor List
        </Typography>
        {/* Show Doctor List or Booking Form here */}
        <UserTableManager
          columns={columns}
          rows={doctorList}
          loading={isLoading}
          nextPage={nextPage}
          otherToolbarItems={DoctorListToolbarItems}
        />
        <BookingFormModal />
      </div>
    </Box>
  );
};
export default DoctorBookingPage;
