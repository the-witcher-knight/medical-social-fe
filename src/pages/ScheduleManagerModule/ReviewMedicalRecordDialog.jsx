import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, LinearProgress, Modal, Typography, Button } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { camelCaseToTitleCase } from 'src/shared/util/string-util';
import { getPatientData } from './schedule-manager.reducer';

const MedicalRecordDisplay = ({ medicalRecord }) => (
  <TreeView
    aria-label="file system navigator"
    defaultCollapseIcon={<FontAwesomeIcon icon="arrow-left" />}
    defaultExpandIcon={<FontAwesomeIcon icon="arrow-right" />}
    sx={{ height: 250, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}
  >
    {medicalRecord.map((record, index) => (
      <TreeItem key={index} nodeId={index} label={camelCaseToTitleCase(record.diagnose)}>
        {Object.keys(record).map((key, idx) => (
          <TreeItem
            key={index + '_' + idx}
            nodeId={key}
            label={camelCaseToTitleCase(key) + ': ' + record[key]}
          />
        ))}
      </TreeItem>
    ))}
  </TreeView>
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
          width: 600,
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
