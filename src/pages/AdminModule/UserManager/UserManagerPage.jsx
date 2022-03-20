import React from 'react';
import { Chip, Typography } from '@mui/material';
import { getMockDoctor } from 'src/shared/mocks/mock-doctor';
import UserTableManager from 'src/shared/components/UserTableManager';

const UserManagerPage = () => {
  // const doctors = useAppSelector
  const loading = false;

  const rows = getMockDoctor();

  const onActivateOrInActivateDoctor = values => {
    if (values) console.log('Activate or InActivate ', values);
  };

  const onDeleteDoctor = values => {
    if (values) console.log('Delete ', values);
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
    {
      field: 'degree',
      headerName: 'Degree',
      editable: false,
      width: 400,
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

  return (
    <div style={{ height: 600, width: '90%' }}>
      <Typography variant="h5" gutterBottom>
        Doctor Manager
      </Typography>
      <UserTableManager
        columns={columns}
        rows={rows}
        loading={loading}
        onActivateOrInActivate={onActivateOrInActivateDoctor}
        onDelete={onDeleteDoctor}
      />
    </div>
  );
};
export default UserManagerPage;
