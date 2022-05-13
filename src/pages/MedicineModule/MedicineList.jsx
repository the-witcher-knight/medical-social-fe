import { Divider, Tooltip, Button, Typography, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import UserTableManager from 'src/shared/components/UserTableManager';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllMedicineOfPharmacy } from './pharmacy-medicine.reducer';
import { blue } from '@mui/material/colors';
import { DataGridBuilder } from 'src/shared/components/DataGridBuilder';

export default function MedicineList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const medicineDataGridBuilder = new DataGridBuilder();

  const loading = useAppSelector(state => state.pharmacyMedicine.loading);
  const medicineList = useAppSelector(state => state.pharmacyMedicine.medicineList);
  const updateSuccess = useAppSelector(state => state.pharmacyMedicine.updateSuccess);
  const errorMessage = useAppSelector(state => state.pharmacyMedicine.errorMessage);

  useEffect(() => {
    dispatch(getAllMedicineOfPharmacy());
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getAllMedicineOfPharmacy());
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, []);

  const withSelectedRow = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a medicine');
    }
  };

  const addNewMedicine = () => {
    navigate('new', { state: { backgroundLocation: location } });
  };

  const editMedicine = values => {
    navigate(`${values.id}/edit`, { state: { backgroundLocation: location } });
  };

  const viewMedicine = values => {
    navigate(`${values.id}/detail`);
  };

  const deleteMedicine = values => {
    navigate(`${values.id}/delete`, { state: { backgroundLocation: location } });
  };

  const nextPage = () => {
    console.log('Next page');
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'medicine.name',
      headerName: 'Medicine Name',
      width: 150,
      valueGetter(params) {
        return params.row.medicine.name;
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
    },
    {
      field: 'medicine.unit',
      headerName: 'Unit',
      width: 100,
      valueGetter(params) {
        return params.row.medicine.unit;
      },
    },
    {
      field: 'medicine.price',
      headerName: 'Price',
      width: 100,
      valueGetter(params) {
        return params.row.medicine.price;
      },
    },
  ];

  const toolbarItems = ({ apiRef }) => (
    <>
      <Tooltip title="View medicine">
        <Button
          color="primary"
          arial-label="View medicine"
          onClick={() => withSelectedRow([...apiRef.getSelectedRows()], viewMedicine)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; View medicine
        </Button>
      </Tooltip>
      <Tooltip title="Add new medicine">
        <Button color="primary" arial-label="Add new medicine" onClick={() => addNewMedicine()}>
          <FontAwesomeIcon icon="plus" />
          &nbsp; Add new medicine
        </Button>
      </Tooltip>
      <Tooltip title="Update medicine">
        <Button
          color="primary"
          arial-label="update medicine"
          onClick={() => withSelectedRow([...apiRef.getSelectedRows()], editMedicine)}
        >
          <FontAwesomeIcon icon="wrench" />
          &nbsp; Update medicine
        </Button>
      </Tooltip>
      <Tooltip title="Delete Medicine">
        <Button
          color="primary"
          arial-label="Delete medicine"
          onClick={() => withSelectedRow([...apiRef.getSelectedRows()], deleteMedicine)}
        >
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete medicine
        </Button>
      </Tooltip>
    </>
  );

  return (
    <Paper sx={{ padding: 2, flexGrow: 3 }}>
      <Typography variant="h5" component="h3" color={blue[400]} gutterBottom>
        Medicine List
      </Typography>
      <Divider />
      <div style={{ height: 600, width: '100%' }}>
        {medicineDataGridBuilder
          .withBasic(columns, medicineList, loading, { border: 'none' })
          .withLoadingOverlay()
          .withToolbar(true, toolbarItems)
          .getComponent()}
      </div>
    </Paper>
  );
}
