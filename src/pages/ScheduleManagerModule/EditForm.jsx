import React from 'react';
import {
  styled,
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useForm, Controller } from 'react-hook-form';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

const classes = {
  content: `appointment-form-content`,
  header: `appointment-form-header`,
  closeButton: `appointment-form-closeButton`,
  buttonGroup: `appointment-form-buttonGroup`,
  button: `appointment-form-button`,
  picker: `appointment-form-picker`,
  wrapper: `appointment-form-wrapper`,
  icon: `appointment-form-icon`,
  textField: `appointment-form-textField`,
  addButton: `appointment-form-addButton`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: '100%',
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: 'right',
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  [`& .${classes.wrapper}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function EditForm({
  visible,
  visibleChange,
  appointmentData,
  cancelAppointment,
  target,
  onHide,
}) {
  const [isNewAppointment] = React.useState(!appointmentData || !appointmentData.id);

  const defaultValues = isNewAppointment ? {} : { ...appointmentData };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = values => {
    console.log(values);
  };

  const cancelChanges = () => {
    visibleChange();
  };

  return (
    <AppointmentForm.Overlay visible={visible} target={target} fullSize onHide={onHide}>
      <StyledHeader />
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        margin="normal"
        padding={2}
        maxWidth="60vw"
      >
        <Typography variant="h5">{defaultValues.title}</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} marginTop={2}>
          <Controller
            control={control}
            name="status"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth disabled>
                <InputLabel id="status-selection-label">Status</InputLabel>
                <Select
                  labelId="status-selection-select-label"
                  id="status-selection-select"
                  value={value}
                  onChange={onChange}
                  label="Status"
                  error={!!errors.status}
                >
                  <MenuItem value={'CREATED'}>CREATED</MenuItem>
                  <MenuItem value={'CONFIRMED'}>CONFIRMED</MenuItem>
                  <MenuItem value={'DONE'}>DONE</MenuItem>
                </Select>
                {errors.status && <FormHelperText error>select one status</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="startDate"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Date"
                  disabled
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  renderInput={params => (
                    <TextField {...params} margin="normal" fullWidth helperText={error?.message} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            control={control}
            name="endDate"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Date"
                  disabled
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  renderInput={params => (
                    <TextField {...params} margin="normal" fullWidth helperText={error?.message} />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Button
            type="button"
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={cancelChanges}
          >
            Close
          </Button>
        </Box>
      </Box>
    </AppointmentForm.Overlay>
  );
}
