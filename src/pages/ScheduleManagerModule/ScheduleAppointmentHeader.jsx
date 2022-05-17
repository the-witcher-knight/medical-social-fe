import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserAuthentication } from 'src/shared/util/auth-util';

export default function ScheduleAppointmentHeader({ children, appointmentData, ...rest }) {
  const { startDate, endDate, patient, doctor } = appointmentData;

  const [disabledVideoCall, setDisabledVideoCall] = React.useState(true);
  const userData = getUserAuthentication();

  const navigate = useNavigate();
  const location = useLocation();

  const enableCallVideoButton = () => {
    const now = Date.now();
    // eslint-disable-next-line no-debugger
    debugger;
    if (Date.parse(startDate) <= now && Date.parse(endDate) > now) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setDisabledVideoCall(!enableCallVideoButton());
  }, []);

  const callVideo = () => {
    if (userData.sub === patient.login) {
      navigate(`/schedule-manager/video-call/from/${patient.id}/to/${doctor.id}`, {
        state: { backgroundLocation: location },
      });
    } else if (userData.sub === doctor.login) {
      navigate(`/schedule-manager/video-call/from/${doctor.id}/to/${patient.id}`, {
        state: { backgroundLocation: location },
      });
    }
  };

  return (
    <AppointmentTooltip.Header {...rest} appointmentData={appointmentData}>
      <Box component="div" display="flex" flexDirection="row" height="48px">
        <IconButton
          size="small"
          sx={{ width: '48px', height: '48px' }}
          disabled={disabledVideoCall}
          onClick={callVideo}
        >
          <FontAwesomeIcon icon="video" size="sm" />
        </IconButton>
      </Box>
    </AppointmentTooltip.Header>
  );
}
