import React, { useState, useEffect } from 'react';
import { Divider, Tooltip, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import UserTableManager from 'src/shared/components/UserTableManager';
import { toast } from 'react-toastify';
import {
  getDoctors,
  getAllChatRoom,
  resetCreatedChatRoom,
  createChatRoom,
} from './make-appointment.reducer';

const DoctorList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoading = useAppSelector(state => state.makeAppointment.loading);
  const doctorList = useAppSelector(state => state.makeAppointment.doctorList);
  const chatRoomList = useAppSelector(state => state.makeAppointment.chatRoomList);
  const createdChatRoom = useAppSelector(state => state.makeAppointment.createdChatRoom);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 30,
  });

  useEffect(() => {
    dispatch(getDoctors(pagination.page, pagination.size));
  }, [pagination]);

  useEffect(() => {
    dispatch(getAllChatRoom());
  }, []);

  useEffect(() => {
    if (createdChatRoom) {
      dispatch(getAllChatRoom());
    }
  }, [createdChatRoom]);

  const nextPage = () => {
    console.log('nextPage');
  };

  const onClickAction = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a doctor');
    }
  };

  const onReviewDegree = values => {
    if (values) {
      navigate('degree/' + values.id, { state: { backgroundLocation: location } });
    }
  };

  const onInboxDoctor = values => {
    if (values && values.id) {
      const doctorId = values.id;
      if (chatRoomList && chatRoomList.length > 0) {
        const hadRoom = chatRoomList.find(room => room.users.find(user => user.id === doctorId));
        if (hadRoom) {
          // TODO: with current room
          navigate('/message');
          return;
        }
      }
      dispatch(createChatRoom(doctorId)).then(() => {
        navigate('/message');
      });
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
          color="info"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onReviewDegree)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; Review Degree
        </Button>
      </Tooltip>
      <Tooltip title="Inbox with Doctor">
        <Button
          color="info"
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
    <div style={{ height: 600, width: '90%' }}>
      <UserTableManager
        columns={columns}
        rows={doctorList}
        loading={isLoading}
        nextPage={nextPage}
        otherToolbarItems={DoctorListToolbarItems}
      />
    </div>
  );
};
export default DoctorList;
