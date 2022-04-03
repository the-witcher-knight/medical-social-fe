import React, { useEffect } from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getMedicine } from './pharmacy-medicine.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidatedForm, ValidatedField } from 'src/shared/components/ValidatedForm';
import { updateMedicine, createMedicine } from './pharmacy-medicine.reducer';

export default function MedicineUpdate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pharmacyMedicineId } = useParams();
  const isNew = !pharmacyMedicineId;

  const loading = useAppSelector(state => state.pharmacyMedicine.loading);
  const medicine = useAppSelector(state => state.pharmacyMedicine.medicine);

  useEffect(() => {
    if (!isNew) {
      dispatch(getMedicine(pharmacyMedicineId));
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = values => {
    console.log('Submit: ', values);
    // TODO: dispatch update or create medicine
    if (isNew) {
      dispatch(createMedicine(values));
    } else {
      dispatch(updateMedicine(values));
    }
    goBack();
  };

  const defaultValues = () =>
    isNew
      ? {
          medicine: {
            name: 'Medicine Name',
            description: 'Medicine Description\nNext Line',
            price: 0,
            unit: 'pill',
          },
          amount: 1,
        }
      : { ...medicine };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        {pharmacyMedicineId ? `Edit Medicine ${pharmacyMedicineId}` : 'Add New Medicine'}
      </Typography>
      <ValidatedForm onSubmit={onSubmit} defaultValues={defaultValues()}>
        {!isNew && <ValidatedField name="id" label="ID" disabled />}
        <ValidatedField
          name="medicine.name"
          label="Medicine Name"
          rules={{ required: true }}
          helperText="Please enter medicine name"
        />
        <ValidatedField
          name="medicine.description"
          label="Description"
          multiline
          maxRows={4}
          rules={{ required: true }}
          helperText="Please enter description"
        />
        <ValidatedField
          name="amount"
          label="Amount"
          rules={{ required: true }}
          helperText="Please enter amount"
          type="number"
        />
        <ValidatedField
          name="medicine.price"
          label="Price"
          rules={{ required: true }}
          type="number"
          helperText="Please enter price"
        />
        <ValidatedField
          name="medicine.unit"
          label="Unit"
          rules={{ required: true }}
          helperText="Please enter unit"
        />
        <Box component="div" display="flex" justifyContent="between">
          <Button
            type="button"
            variant="contained"
            mt={2}
            fullWidth
            color="primary"
            onClick={goBack}
          >
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp;Back
          </Button>
          &nbsp;
          <Button type="submit" variant="contained" mt={2} fullWidth color="secondary">
            <FontAwesomeIcon icon="save" />
            &nbsp;Save
          </Button>
        </Box>
      </ValidatedForm>
    </Paper>
  );
}
