import {
  styled,
  Box,
  Modal,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Button,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getPresciption } from './prescription-manager.reducer';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PrescriptionDisplay = ({ prescription }) => (
  <List sx={{ marginTop: 2 }}>
    {prescription.map((item, index) => (
      <StyledListItem key={index}>
        <ListItemText
          primary={`${index + 1}/ ${item.name} - ${item.quantity}`}
          secondary={item.note}
        />
      </StyledListItem>
    ))}
  </List>
);

export default function PrescriptionDetailDialog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { prescriptionId } = useParams();
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    dispatch(getPresciption(prescriptionId));
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate('/prescription-manager');
  };

  const { loading, prescription } = useAppSelector(state => state.prescriptionManager);

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
        <Typography id="modal-title" variant="h6" component="h3" mb={1} color={blue[400]}>
          Detail of Prescription {prescriptionId}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {loading && <LinearProgress />}
        {prescription && (
          <>
            <PrescriptionDisplay prescription={JSON.parse(prescription.content)} />
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="textSecondary">
                {new Date(prescription.createAt).toLocaleString()}
              </Typography>
            </Box>
          </>
        )}
        <Box component="div" mt={3}>
          <Button variant="outlined" fullWidth color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
