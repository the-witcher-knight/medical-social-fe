import React, { useEffect } from 'react';
import { Typography, Button, Modal, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getMedicine } from './pharmacy-medicine.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidatedForm, ValidatedField } from 'src/shared/components/ValidatedForm';
import { updateMedicine, createMedicine } from './pharmacy-medicine.reducer';
import { toast } from 'react-toastify';
import { lightBlue } from '@mui/material/colors';

export default function MedicineUpdate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const { pharmacyMedicineId } = useParams();
  const [isNew, setIsNew] = React.useState(!pharmacyMedicineId);

  const loading = useAppSelector(state => state.pharmacyMedicine.loading);
  const medicine = useAppSelector(state => state.pharmacyMedicine.medicine);
  const updateSuccess = useAppSelector(state => state.pharmacyMedicine.updateSuccess);

  useEffect(() => {
    if (!isNew) {
      dispatch(getMedicine(pharmacyMedicineId));
    }
  }, []);

  const goBack = () => {
    navigate('/medicine-manager');
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Medicine updated successfully');
      goBack();
    }
  }, [updateSuccess]);

  const handleClose = () => {
    setOpen(false);
    goBack();
  };

  const onClickBack = () => {
    goBack();
  };

  const onSubmit = values => {
    if (isNew) {
      dispatch(createMedicine(values));
    } else {
      dispatch(updateMedicine(values));
    }
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="medicine-update-modal"
      aria-describedby="medicine-update-description"
    >
      <Box
        sx={{
          top: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          padding: 2,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" component="h3" color={lightBlue[800]} gutterBottom>
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
            rules={{ required: true, min: 1 }}
            helperText="Please enter amount"
            type="number"
          />
          <ValidatedField
            name="medicine.price"
            label="Price"
            rules={{ required: true, min: 1 }}
            type="number"
            helperText="Please enter price"
          />
          <ValidatedField
            name="medicine.unit"
            label="Unit"
            rules={{ required: true }}
            helperText="Please enter unit"
          />
          <Box component="div" display="flex" justifyContent="left">
            <Button type="button" variant="contained" mt={2} color="primary" onClick={onClickBack}>
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;Back
            </Button>
            &nbsp;
            <Button type="submit" variant="contained" mt={2} color="secondary">
              <FontAwesomeIcon icon="save" />
              &nbsp;Save
            </Button>
          </Box>
        </ValidatedForm>
      </Box>
    </Modal>
  );
}
