import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { closeDeleteDialog, deleteMedicine } from './pharmacy-medicine.reducer';

export default function MedicineDeleteDialog() {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(state => state.pharmacyMedicine.openDeleteDialog);
  const selectedMedicine = useAppSelector(state => state.pharmacyMedicine.selectedMedicine);

  const handleClose = () => {
    dispatch(closeDeleteDialog());
  };

  const handleDelete = () => {
    dispatch(deleteMedicine(selectedMedicine.id));
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {selectedMedicine ? (
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete {selectedMedicine.id}?
        </DialogTitle>
      ) : (
        <LinearProgress />
      )}

      <DialogActions>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Accept
        </Button>
        <Button onClick={handleClose}>Deny</Button>
      </DialogActions>
    </Dialog>
  );
}
