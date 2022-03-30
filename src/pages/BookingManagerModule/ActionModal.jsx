import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  List,
  ListItem,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/configs/store';
import { closeModal, getPaientById } from './bookingManager.reducer';
import { DIALOG_ACTION } from './constant';
import { partialUpdateSchedule as confirmSchedule } from './bookingManager.reducer';
import { toast } from 'react-toastify';
import { splitStringNewLine } from 'src/shared/util/string-util';
const ActionModal = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(state => state.bookingManager.dialogOpen);
  const selectedSchedule = useAppSelector(state => state.bookingManager.selectedSchedule);
  const patient = useAppSelector(state => state.bookingManager.patient);
  const dialogData = useAppSelector(state => state.bookingManager.dialogData);

  useEffect(() => {
    if (isOpen) {
      if (dialogData.action === DIALOG_ACTION.REVIEW) {
        dispatch(getPaientById(selectedSchedule.user.id));
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onAccept = () => {
    if (dialogData.action === DIALOG_ACTION.DELETE) {
      // dispatch(deleteSchedule(selectedSchedule.id));
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
      {dialogData.action === DIALOG_ACTION.REVIEW ? (
        <DialogContent>
          {patient && patient.medicalRecord ? (
            <List>
              {splitStringNewLine(patient.medicalRecord).map((line, idx) => (
                <ListItem key={idx}>{line}</ListItem>
              ))}
            </List>
          ) : (
            <ListItem key="no-line">The patient not have medical record</ListItem>
          )}
        </DialogContent>
      ) : (
        <DialogActions>
          <Button color="error" variant="contained" onClick={onAccept}>
            {dialogData.action}
          </Button>
          <Button onClick={handleClose}>Deny</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
export default ActionModal;
