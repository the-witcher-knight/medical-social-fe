import { Divider, Tooltip, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import UserTableManager from 'src/shared/components/UserTableManager';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  getAllMedicineOfPharmacy,
  setSelectedMedicine,
  openDeleteDialog,
  resetUpdateSuccess,
} from './pharmacy-medicine.reducer';

export default function MedicineList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(state => state.pharmacyMedicine.loading);
  const medicineList = useAppSelector(state => state.pharmacyMedicine.medicineList);
  const updateSuccess = useAppSelector(state => state.pharmacyMedicine.updateSuccess);

  useEffect(() => {
    dispatch(getAllMedicineOfPharmacy());
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Medicine updated successfully');
      dispatch(getAllMedicineOfPharmacy());
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess]);

  const withSelectedRow = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warning('Please select a medicine');
    }
  };

  const addNewMedicine = () => {
    navigate('new');
  };

  const editMedicine = values => {
    navigate(`${values.id}/edit`);
  };

  const viewMedicine = values => {
    navigate(`${values.id}/detail`);
  };

  const deleteMedicine = values => {
    dispatch(setSelectedMedicine(values));
    dispatch(openDeleteDialog());
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
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Tooltip title="Add new medicine">
        <Button color="primary" arial-label="Add new medicine" onClick={() => addNewMedicine()}>
          <FontAwesomeIcon icon="plus" />
          &nbsp; Add new medicine
        </Button>
      </Tooltip>
      <Tooltip title="View medicine">
        <Button
          color="secondary"
          arial-label="View medicine"
          onClick={() => withSelectedRow([...apiRef.getSelectedRows()], viewMedicine)}
        >
          <FontAwesomeIcon icon="eye" />
          &nbsp; View medicine
        </Button>
      </Tooltip>
      <Tooltip title="Update medicine">
        <Button
          color="info"
          arial-label="update medicine"
          onClick={() => withSelectedRow([...apiRef.getSelectedRows()], editMedicine)}
        >
          <FontAwesomeIcon icon="wrench" />
          &nbsp; Update medicine
        </Button>
      </Tooltip>
      <Tooltip title="Delete Medicine">
        <Button
          color="error"
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
    <div style={{ height: 600, width: '90%' }}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Medicine List
      </Typography>
      <UserTableManager
        rows={medicineList}
        columns={columns}
        otherToolbarItems={toolbarItems}
        nextPage={nextPage}
        loading={loading}
      />
    </div>
  );
}
