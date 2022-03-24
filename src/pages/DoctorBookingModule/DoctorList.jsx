import React, { useEffect, useState } from 'react';
import { Divider, Tooltip, Button } from '@mui/material';
import UserTableManager from 'src/shared/components/UserTableManager';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDoctors, getDegreeDoctor } from './booking.reducer';
import { useNavigate } from 'react-router-dom';

const DoctorListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(state => state.bookingDoctor.loading);
  const doctors = useAppSelector(state => state.bookingDoctor.doctorList);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 30,
  });

  useEffect(() => {
    dispatch(getDoctors(pagination.page, pagination.size));
  }, [pagination]);

  const nextPage = () => {
    console.log('nextPage');
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
      // TODO: navigate to exam booking doctor with doctor id
      // navigate('/doctor-booking/' + values.id, { state: { backgroundLocation: location } }); chưa support vụ này
      navigate('/doctor-booking/' + values.id);
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
          onClick={() => onReviewDegree([...apiRef.getSelectedRows()][0][1])}
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
          onClick={() => onBookDoctor([...apiRef.getSelectedRows()][0][1])}
        >
          <FontAwesomeIcon icon="paw" />
          &nbsp; Book Examination
        </Button>
      </Tooltip>
    </>
  );

  return (
    <UserTableManager
      columns={columns}
      rows={doctors}
      loading={isLoading}
      nextPage={nextPage}
      otherToolbarItems={DoctorListToolbarItems}
    />
  );
};

export default DoctorListPage;
