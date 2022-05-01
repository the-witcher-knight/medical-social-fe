import React, { useEffect, useState } from 'react';
import { lightBlue } from '@mui/material/colors';
import { Chip, Typography, Divider, Tooltip, Button, Paper } from '@mui/material';
import UserTableManager from 'src/shared/components/UserTableManager';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getDegreeDoctor, getDoctors, updateDoctor } from '../admin.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const DoctorManagerPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.admin.loading);
  const updateSuccess = useAppSelector(state => state.admin.updateSuccess);
  const errorMessage = useAppSelector(state => state.admin.errorMessage);
  const rows = useAppSelector(state => state.admin.dataList);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 30,
  });

  useEffect(() => {
    dispatch(getDoctors(pagination.page, pagination.size));
  }, [pagination]);

  useEffect(() => {
    if (!isLoading && errorMessage) {
      toast.error(errorMessage);
    }
  }, [isLoading, errorMessage]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getDoctors(pagination.page, pagination.size));
      toast.success('Update success');
    }
  }, [updateSuccess]);

  const nextPage = () => {
    setPagination(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const onActiveOrDeActiveDoctor = values => {
    if (values) {
      const formData = new FormData();
      Object.keys(values)
        .filter(key => values[key] !== null && values[key] !== undefined)
        .forEach(key => {
          if (key === 'files') {
            formData.append(key, values[key][0]);
          } else if (key === 'activated') {
            formData.append(key, !values[key]); // activated or inactivated
          } else if (key === 'createdDate' || key === 'lastModifiedDate') {
            formData.append(key, dayjs(Date.parse(values[key])).format('YYYY-MM-DDTHH:mm:ss[Z]'));
          } else {
            formData.append(key, values[key]);
          }
        });
      dispatch(updateDoctor(formData));
    }
  };

  const onReviewDegree = values => {
    if (values) {
      dispatch(getDegreeDoctor(values.id)).then(res => {
        window.open('http://localhost:8080/files/' + res.payload.data, '_blank');
      });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'login', headerName: 'Username', width: 150 },
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
    {
      field: 'activated',
      headerName: 'Activated',
      editable: false,
      width: 150,
      renderCell: params =>
        params.row.activated ? (
          <Chip color="success" label="Active" />
        ) : (
          <Chip color="error" label="InActive" />
        ),
    },
  ];

  const reviewDegreeToolbarItems = ({ apiRef }) => (
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
          onClick={() => onReviewDegree([...apiRef.getSelectedRows()][0][1])}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; Review Degree
        </Button>
      </Tooltip>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Tooltip title="Active selected row">
        <Button
          color="info"
          aria-label="active"
          size="small"
          onClick={() => onActiveOrDeActiveDoctor([...apiRef.getSelectedRows()][0][1])} // coi chừng lỗi
        >
          <FontAwesomeIcon icon="check" />
          &nbsp; Activate
        </Button>
      </Tooltip>
      <Tooltip title="Deactive selected row">
        <Button
          color="info"
          aria-label="deactive"
          size="small"
          onClick={() => onActiveOrDeActiveDoctor([...apiRef.getSelectedRows()][0][1])} // coi chừng lỗi
        >
          <FontAwesomeIcon icon="times" />
          &nbsp; Deactivate
        </Button>
      </Tooltip>
    </>
  );

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" component="h3" color={lightBlue[800]} gutterBottom>
        Doctor Manager
      </Typography>
      <Divider />
      <div style={{ height: 600, width: 800, marginTop: 2 }}>
        <UserTableManager
          sx={{ border: 'none' }}
          columns={columns}
          rows={rows}
          loading={isLoading}
          nextPage={nextPage}
          otherToolbarItems={reviewDegreeToolbarItems}
        />
      </div>
    </Paper>
  );
};
export default DoctorManagerPage;
