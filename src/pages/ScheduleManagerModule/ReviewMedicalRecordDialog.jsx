import {
  Box,
  LinearProgress,
  List,
  Modal,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { camelCaseToTitleCase } from 'src/shared/util/string-util';
import { getPatientData } from './schedule-manager.reducer';

const MedicalRecordDisplay = ({ medicalRecord }) => (
  <List>
    {Object.keys(medicalRecord).map(key => (
      <ListItem key={key}>
        <ListItemText primary={camelCaseToTitleCase(key)} secondary={medicalRecord[key]} />
      </ListItem>
    ))}
  </List>
);

export default function ReviewMedicalRecordDialog() {
  const { patientId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const { loading, patientData } = useAppSelector(state => state.scheduleManager);

  useEffect(() => {
    dispatch(getPatientData(patientId));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate('/schedule-manager');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h3" color={blue[400]}>
          Medical Record of Patient {patientId}
        </Typography>
        {loading && <LinearProgress />}
        {patientData && patientData.medicalRecord && (
          <MedicalRecordDisplay medicalRecord={JSON.parse(patientData.medicalRecord)} />
        )}
        <Button variant="contained" color="primary" mt={3} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
