import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Box } from '@mui/material';
import React, { useEffect } from 'react';

export default function ScheduleAppointmentHeader({ children, appointmentData, ...rest }) {
  const { startAt, endAt } = appointmentData;
  const [disabledVideoCall, setDisabledVideoCall] = React.useState(true);

  const enableCallVideoButton = () => {
    const now = Date.now();
    if (Date.parse(startAt) <= now && Date.parse(endAt) > now) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setDisabledVideoCall(!enableCallVideoButton());
  }, []);

  return (
    <AppointmentTooltip.Header {...rest} appointmentData={appointmentData}>
      <Box component="div" display="flex" flexDirection="row" height="48px">
        <IconButton
          size="small"
          sx={{ width: '48px', height: '48px' }}
          disabled={disabledVideoCall}
        >
          <FontAwesomeIcon icon="video" size="sm" />
        </IconButton>
      </Box>
    </AppointmentTooltip.Header>
  );
}
