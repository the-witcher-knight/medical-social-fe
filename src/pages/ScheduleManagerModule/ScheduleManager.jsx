import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getUserAuthentication, isAdmin, isDoctor, isUser } from 'src/shared/util/auth-util';
import { getDoctorSchedules, getPatientSchedules } from './schedule-manager.reducer';
import ScheduleTooltip from './ScheduleTooltip';
import { connectProps } from '@devexpress/dx-react-core';
import EditForm from './EditForm';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

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

export default function ScheduleManager() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.scheduleManager.loading);
  const scheduleList = useAppSelector(state => state.scheduleManager.scheduleList);
  const updateSuccess = useAppSelector(state => state.scheduleManager.updateSuccess);
  const [data, setData] = React.useState([]);

  const today = React.useMemo(() => Date.now(), []);
  const [currentDate, setCurrentDate] = React.useState(today);
  const [currentViewName, setCurrentViewName] = React.useState('Week');

  const [formVisible, setFormVisible] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState(null);

  const userData = React.useMemo(() => getUserAuthentication(), []);

  React.useEffect(() => {
    if (isDoctor(userData)) {
      dispatch(getDoctorSchedules(userData.sub));
    } else if (isUser(userData) || isAdmin(userData)) {
      dispatch(getPatientSchedules(userData.sub));
    } else {
      toast.error('User not permission');
    }
  }, []);

  React.useEffect(() => {
    const list = scheduleList.map(item => ({
      id: item.id,
      startDate: item.startAt,
      endDate: item.endAt,
      title: `Schedule of ${item.doctor.firstName} ${item.doctor.lastName} and ${item.user.firstName} ${item.user.lastName}`,
      status: item.status,
      patient: item.user,
      doctor: item.doctor,
    }));
    setData(list);
  }, [scheduleList]);

  React.useEffect(() => {
    if (updateSuccess) {
      toast.success('Update schedule successfully');
      dispatch(getDoctorSchedules(userData.sub));
    }
  }, [updateSuccess]);

  const onEditingAppointmentChange = editingAppointment => {
    setSelectedSchedule(editingAppointment);
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const appointmentTooltipContent = connectProps(ScheduleTooltip, () => {
    return {
      editable: isDoctor(userData),
    };
  });

  const appointmentForm = connectProps(EditForm, () => {
    return {
      visible: formVisible,
      visibleChange: toggleFormVisibility,
      appointmentData: selectedSchedule,
      cancelAppointment: () => false, // TODO: cancel appointment
    };
  });

  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5" component="h3" color={lightBlue[800]}>
          My Schedules
        </Typography>
        <Scheduler data={data} height={660}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
          />
          <EditingState onEditingAppointmentChange={onEditingAppointmentChange} />
          <DayView startDayHour={7} endDayHour={19} />
          <WeekView startDayHour={7} endDayHour={19} />
          <Appointments />
          <Toolbar {...(loading ? { rootComponent: ToolbarWithLoading } : null)} />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip contentComponent={appointmentTooltipContent} showCloseButton />
          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={formVisible}
            onVisibilityChange={toggleFormVisibility}
            readOnly
          />
        </Scheduler>
      </Paper>
    </Box>
  );
}
