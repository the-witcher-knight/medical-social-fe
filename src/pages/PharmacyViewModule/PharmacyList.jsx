import { Paper, Typography, Divider, Tooltip, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import UserTableManager from 'src/shared/components/UserTableManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { getPharmacyList } from './pharmacy-view.reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'pharmacyName',
    headerName: 'Name',
    editable: false,
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    editable: false,
    width: 400,
  },
  {
    field: 'login',
    headerName: 'Username',
    editable: false,
    width: 150,
  },
];

export default function PharmacyList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, pharmacyList, errorMessage } = useAppSelector(state => state.pharmacyView);

  useEffect(() => {
    dispatch(getPharmacyList());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const nextPage = () => {
    console.log('nextPage');
  };

  const onClickAction = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a pharmacy');
    }
  };

  const onClickViewMedicine = pharmacy => {
    if (pharmacy) {
      navigate(`${pharmacy.id}/medicine`);
    }
  };

  const ToolbarItems = ({ apiRef }) => (
    <>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Tooltip title="View medicine">
        <Button
          color="info"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onClickViewMedicine)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; View Medicine
        </Button>
      </Tooltip>
    </>
  );

  return (
    <Paper sx={{ margin: 3, padding: 2, flexGrow: 3 }}>
      <Typography variant="h5" component="h3" color={blue[400]}>
        Pharmacy List
      </Typography>
      <Divider sx={{ marginTop: 2 }} />
      <div style={{ height: 600, width: '100%' }}>
        <UserTableManager
          sx={{ border: 'none' }}
          columns={columns}
          rows={pharmacyList}
          loading={loading}
          nextPage={nextPage}
          otherToolbarItems={ToolbarItems}
        />
      </div>
    </Paper>
  );
}
