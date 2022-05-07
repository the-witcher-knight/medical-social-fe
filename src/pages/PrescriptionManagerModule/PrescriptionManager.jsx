import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Divider, Paper, Tooltip, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import UserTableManager from 'src/shared/components/UserTableManager';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { getPrescriptionListByLogin } from './prescription-manager.reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'createAt',
    headerName: 'Create Date',
    editable: false,
    width: 150,
    valueGetter: params => dayjs(Date.parse(params.row.createAt)).format('DD-MM-YYYY HH:mm'),
  },
  {
    field: 'doctorAccount',
    headerName: 'Doctor Account',
    editable: false,
    width: 150,
    valueGetter: params => params.row.doctor.login,
  },
  {
    field: 'doctorName',
    headerName: 'Doctor',
    editable: false,
    width: 300,
    valueGetter: params => `${params.row.doctor.firstName} ${params.row.doctor.lastName}`,
  },
];

export default function PrescriptionManager() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = getUserAuthentication();

  const [pagination, setPagination] = React.useState({
    page: 0,
    size: 30,
  });

  const nextPage = () => {
    console.log('next page');
  };

  const { loading, prescriptionList } = useAppSelector(state => state.prescriptionManager);

  React.useEffect(() => {
    dispatch(getPrescriptionListByLogin(userData.sub));
  }, []);

  const onClickAction = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a doctor');
    }
  };

  const onViewPrescription = values => {
    navigate(`/prescription-manager/${values.id}/detail`, {
      state: { backgroundLocation: location },
    });
  };

  const toolBarItems = ({ apiRef }) => (
    <>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Tooltip title="Review Degree of selected doctor">
        <Button
          color="info"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onViewPrescription)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp;View Prescription
        </Button>
      </Tooltip>
    </>
  );

  return (
    <Paper sx={{ marginTop: 5, padding: 2, flexGrow: 3 }}>
      <Typography variant="h5" component="h3" color={blue[400]}>
        My Prescriptions
      </Typography>
      <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
      <div style={{ height: 600, width: '100%' }}>
        <UserTableManager
          sx={{ border: 'none' }}
          columns={columns}
          rows={prescriptionList}
          loading={loading}
          nextPage={nextPage}
          otherToolbarItems={toolBarItems}
        />
      </div>
    </Paper>
  );
}
