import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper, styled, LinearProgress, Box, Button, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getDoctorSchedules } from './make-appointment.reducer';

const classes = {
  toolbarRoot: `schedule-manager-toolbarRoot`,
  progress: `schedule-manager-progress`,
};

const StyledDiv = styled('div')({
  [`&.${classes.toolbarRoot}`]: {
    position: 'relative',
  },
});

const StyledLinearProgress = styled(LinearProgress)(() => ({
  [`&.${classes.progress}`]: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
}));

const ToolbarWithLoading = ({ children, ...restProps }) => (
  <StyledDiv className={classes.toolbarRoot}>
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <StyledLinearProgress className={classes.progress} />
  </StyledDiv>
);

export default function DoctorSchedule() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { doctorLogin } = useParams();

  const today = React.useMemo(() => Date.now(), []);
  const [currentDate, setCurrentDate] = React.useState(today);
  const [currentViewName, setCurrentViewName] = React.useState('Week');

  const loading = useAppSelector(state => state.makeAppointment.loading);
  const bookingCompleted = useAppSelector(state => state.makeAppointment.bookingCompleted);
  const scheduleList = useAppSelector(state => state.makeAppointment.scheduleList);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    dispatch(getDoctorSchedules(doctorLogin));
  }, []);

  // Show toast here
  React.useEffect(() => {
    if (bookingCompleted) {
      toast.success('Set Appointment successfully!');
      dispatch(getDoctorSchedules(doctorLogin));
    }
  }, [bookingCompleted]);

  React.useEffect(() => {
    const list = scheduleList.map(item => ({
      id: item.id,
      startDate: item.startAt,
      endDate: item.endAt,
      title: `Has appointmet at time`,
      status: item.status,
      patient: item.user,
      doctor: item.doctor,
    }));
    setData(list);
  }, [scheduleList]);

  const onClickBack = () => {
    navigate('/make-appointment');
  };

  const onMakeAppointment = () => {
    navigate('/make-appointment/' + doctorLogin + '/set-appointment', {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" component="h3" color={lightBlue[800]}>
        Schedules of the doctor
      </Typography>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
        />

        <DayView startDayHour={7} endDayHour={19} />
        <WeekView startDayHour={7} endDayHour={19} />
        <Appointments />
        <Toolbar {...(loading ? { rootComponent: ToolbarWithLoading } : null)} />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip showCloseButton />
      </Scheduler>
      <Box component="div" mt={2} padding={2}>
        <Button variant="outlined" color="primary" onClick={onClickBack}>
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;Back
        </Button>
        &nbsp;
        <Button variant="outlined" color="secondary" onClick={onMakeAppointment}>
          <FontAwesomeIcon icon="pen" />
          &nbsp;Make Appointment
        </Button>
      </Box>
    </Paper>
  );
}
