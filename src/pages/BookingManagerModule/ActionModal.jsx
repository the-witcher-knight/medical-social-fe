import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import React from 'react';
import { useAppSelector, useAppDispatch } from 'src/configs/store';
import { closeModal } from './bookingManager.reducer';
import { DIALOG_ACTION } from './constant';
import { partialUpdateSchedule as confirmSchedule } from './bookingManager.reducer';
import { toast } from 'react-toastify';
const ActionModal = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(state => state.bookingManager.dialogOpen);
  const selectedSchedule = useAppSelector(state => state.bookingManager.selectedSchedule);
  const dialogData = useAppSelector(state => state.bookingManager.dialogData);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onAccept = () => {
    if (dialogData.action === DIALOG_ACTION.DELETE) {
      // dispatch(deleteSchedule(selectedSchedule.id));
      console.log('delete schedule ', selectedSchedule.id);
    } else if (dialogData.action === DIALOG_ACTION.CONFIRM) {
      if (selectedSchedule.status === 'CREATED') {
        dispatch(confirmSchedule({ ...selectedSchedule, status: 'CONFIRMED' })).then(() => {
          handleClose();
        });
      } else {
        toast.warning('This schedule is already confirmed');
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogData.title}</DialogTitle>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onAccept}>
          {dialogData.action}
        </Button>
        <Button onClick={handleClose}>Deny</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ActionModal;
