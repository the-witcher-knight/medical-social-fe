import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  LinearProgress,
  Typography,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { deleteMedicine, getMedicine } from './pharmacy-medicine.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lightBlue } from '@mui/material/colors';
import { toast } from 'react-toastify';

export default function MedicineDeleteDialog() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pharmacyMedicineId } = useParams();
  const [open, setOpen] = React.useState(true);

  const loading = useAppSelector(state => state.pharmacyMedicine.loading);
  const pharmacyMedicine = useAppSelector(state => state.pharmacyMedicine.medicine);
  const updateSuccess = useAppSelector(state => state.pharmacyMedicine.updateSuccess);

  React.useEffect(() => {
    dispatch(getMedicine(pharmacyMedicineId));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate('/medicine-manager');
  };

  React.useEffect(() => {
    if (updateSuccess) {
      toast.success('Medicine deleted successfully');
      handleClose();
    }
  }, [updateSuccess]);

  const handleDelete = () => {
    dispatch(deleteMedicine(pharmacyMedicineId));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-pharmacy-medicine-dialog"
      aria-describedby="delete-pharmacy-medicine-dialog-description"
    >
      <DialogTitle id="delete-pharmacy-medicine-dialog">
        <Typography variant="title" component="p">
          <FontAwesomeIcon icon="info-circle" size="1x" color={lightBlue[300]} />
          &nbsp;Are you sure you want to remove Medicine with ID {pharmacyMedicineId}?
        </Typography>
      </DialogTitle>
      {loading && <LinearProgress />}
      {pharmacyMedicine && (
        <Box p={3}>
          <Typography variant="body1" component="p">
            Medicine name: {pharmacyMedicine.medicine.name}
          </Typography>
        </Box>
      )}

      <DialogActions>
        <Button color="error" variant="contained" onClick={handleDelete} disabled={loading}>
          <FontAwesomeIcon icon="save" />
          &nbsp;Accept
        </Button>
        <Button onClick={handleClose}>
          <FontAwesomeIcon icon="times" />
          &nbsp;Deny
        </Button>
      </DialogActions>
    </Dialog>
  );
}
