import * as React from 'react';
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
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { getDoctorSchedules } from './schedule-manager.reducer';
import ScheduleTooltip from './ScheduleTooltip';
import { connectProps } from '@devexpress/dx-react-core';
import EditForm from './EditForm';
import { toast } from 'react-toastify';

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
    dispatch(getDoctorSchedules(userData.sub));
  }, []);

  React.useEffect(() => {
    const list = scheduleList.map(item => ({
      id: item.id,
      startDate: item.startAt,
      endDate: item.endAt,
      title: `Schedule with ${item.user.firstName} ${item.user.lastName}`,
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

  const appointmentForm = connectProps(EditForm, () => {
    return {
      visible: formVisible,
      visibleChange: toggleFormVisibility,
      appointmentData: selectedSchedule,
      cancelAppointment: () => false, // TODO: cancel appointment
    };
  });

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
        />
        <EditingState onEditingAppointmentChange={onEditingAppointmentChange} />
        <DayView startDayHour={7.5} endDayHour={17.5} />
        <WeekView startDayHour={7.5} endDayHour={17.5} />
        <Appointments />
        <Toolbar {...(loading ? { rootComponent: ToolbarWithLoading } : null)} />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip contentComponent={ScheduleTooltip} showCloseButton />
        <AppointmentForm
          overlayComponent={appointmentForm}
          visible={formVisible}
          onVisibilityChange={toggleFormVisibility}
          readOnly
        />
      </Scheduler>
    </Paper>
  );
}
