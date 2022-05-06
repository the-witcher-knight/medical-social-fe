import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import {
  styled,
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  LinearProgress,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPrescription, getSchedule } from './schedule-manager.reducer';
import { toast } from 'react-toastify';

export default function WritePrescriptionDialog() {
  const dispatch = useAppDispatch();
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const { loading, schedule, prescriptionSuccess } = useAppSelector(state => state.scheduleManager);

  React.useEffect(() => {
    dispatch(getSchedule(scheduleId));
  }, []);

  React.useEffect(() => {
    if (prescriptionSuccess) {
      toast.success('Prescription created successfully');
      handleClose();
    }
  }, [prescriptionSuccess]);

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/schedule-manager');
  };

  const { control, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content',
  });

  const onSubmit = values => {
    const prescription = {
      content: JSON.stringify(values),
      doctor: { id: schedule.doctor.id },
      patient: { id: schedule.user.id },
    };
    console.log(prescription);
    dispatch(createPrescription(prescription));
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
        <Typography id="modal-title" variant="h6" component="h3" mb={1} color={blue[400]}>
          Write Prescription for {scheduleId}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {loading && <LinearProgress />}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => (
            <Grid container key={index} marginBottom={2} spacing={2}>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name={`content.${index}.name`}
                  rules={{ required: true }}
                  render={({ field }) => <TextField fullWidth label="Medicine Name" {...field} />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name={`content.${index}.quantity`}
                  rules={{ required: true }}
                  render={({ field }) => <TextField fullWidth label="Quantity" {...field} />}
                />
              </Grid>
              <Grid item xs={10}>
                <Controller
                  control={control}
                  name={`content.${index}.note`}
                  rules={{ required: true }}
                  render={({ field }) => <TextField fullWidth label="Note" {...field} />}
                />
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={() => remove(index)}
                >
                  <FontAwesomeIcon icon="times" />
                </Button>
              </Grid>
            </Grid>
          ))}

          <Grid container justifyContent="end">
            <Grid item>
              <Button
                type="button"
                variant="outlined"
                color="info"
                onClick={() => append({ name: '', quantity: '', note: '' })}
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;Add More
              </Button>
              &nbsp;
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
