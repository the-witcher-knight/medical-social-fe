import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

export default function PrescriptionForm() {
  const isOpen = true;

  const handleClose = () => {
    console.log('close');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="prescription-dialog"
      aria-describedby="prescription-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Prescription</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
