import React from 'react';
import { styled, Grid, IconButton, Button } from '@mui/material';
import classNames from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lightBlue } from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';

const classes = {
  flexibleSpace: `schedule-tooltip-flexibleSpace`,
  prioritySelector: `schedule-tooltip-prioritySelector`,
  content: `schedule-tooltip-content`,
  contentContainer: `schedule-tooltip-contentContainer`,
  text: `schedule-tooltip-text`,
  title: `schedule-tooltip-title`,
  icon: `schedule-tooltip-icon`,
  contentItemIcon: `schedule-tooltip-contentItemIcon`,
  grayIcon: `schedule-tooltip-grayIcon`,
  colorfulContent: `schedule-tooltip-colorfulContent`,
  lens: `schedule-tooltip-lens`,
  textCenter: `schedule-tooltip-textCenter`,
  dateAndTitle: `schedule-tooltip-dateAndTitle`,
  titleContainer: `schedule-tooltip-titleContainer`,
  container: `schedule-tooltip-container`,
  bullet: `schedule-tooltip-bullet`,
  prioritySelectorItem: `schedule-tooltip-prioritySelectorItem`,
  priorityText: `schedule-tooltip-priorityText`,
  priorityShortText: `schedule-tooltip-priorityShortText`,
  cellLowPriority: `schedule-tooltip-cellLowPriority`,
  cellMediumPriority: `schedule-tooltip-cellMediumPriority`,
  cellHighPriority: `schedule-tooltip-cellHighPriority`,
  headerCellLowPriority: `schedule-tooltip-headerCellLowPriority`,
  headerCellMediumPriority: `schedule-tooltip-headerCellMediumPriority`,
  headerCellHighPriority: `schedule-tooltip-headerCellHighPriority`,
};

const StyledTooltipContent = styled('div')(
  ({ theme: { spacing, typography, palette }, color }) => ({
    [`&.${classes.content}`]: {
      padding: spacing(3, 1),
      paddingTop: 0,
      backgroundColor: palette.background.paper,
      boxSizing: 'border-box',
      width: '400px',
    },
    [`& .${classes.contentContainer}`]: {
      paddingBottom: spacing(1.5),
    },
    [`& .${classes.text}`]: {
      ...typography.body2,
      display: 'inline-block',
    },
    [`& .${classes.title}`]: {
      ...typography.h6,
      color: palette.text.secondary,
      fontWeight: typography.fontWeightBold,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
    },
    [`& .${classes.icon}`]: {
      verticalAlign: 'middle',
    },
    [`& .${classes.contentItemIcon}`]: {
      textAlign: 'center',
    },
    [`& .${classes.grayIcon}`]: {
      color: palette.action.active,
    },
    [`& .${classes.colorfulContent}`]: {
      color: color[300],
    },
    [`& .${classes.lens}`]: {
      width: spacing(4.5),
      height: spacing(4.5),
      verticalAlign: 'super',
    },
    [`& .${classes.textCenter}`]: {
      textAlign: 'center',
    },
    [`& .${classes.dateAndTitle}`]: {
      lineHeight: 1.1,
    },
    [`& .${classes.titleContainer}`]: {
      paddingBottom: spacing(2),
    },
    [`& .${classes.container}`]: {
      paddingBottom: spacing(1.5),
    },
  })
);

export default function ScheduleTooltip({ appointmentData, formatDate, editable }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onConfirmSchedule = () => {
    navigate(`/schedule-manager/confirm/${appointmentData.id}`, {
      state: { backgroundLocation: location },
    });
  };

  const onReviewMedicalRecord = () => {
    navigate(`/schedule-manager/review-medical-record/${appointmentData.patient.id}`, {
      state: { backgroundLocation: location },
    });
  };

  const onDeleteSchedule = () => {
    navigate(`/schedule-manager/delete/${appointmentData.id}`, {
      state: { backgroundLocation: location },
    });
  };

  const onWritePrescription = () => {
    navigate(`/schedule-manager/write-prescription/${appointmentData.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <StyledTooltipContent className={classes.content} color={lightBlue}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classNames(classes.textCenter)}>
          <FontAwesomeIcon
            icon="circle"
            className={classNames(classes.lens, classes.colorfulContent)}
          />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {formatDate(appointmentData.startDate, { day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <FontAwesomeIcon icon="clock" className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <FontAwesomeIcon icon="pen" className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>{appointmentData.status}</div>
        </Grid>
      </Grid>
      {editable && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '20px',
          }}
          className={classes.contentContainer}
        >
          <Button variant="outlined" size="small" color="primary" onClick={onReviewMedicalRecord}>
            <FontAwesomeIcon icon="eye" />
            &nbsp;View
          </Button>
          &nbsp;
          {appointmentData && appointmentData.status !== 'CONFIRMED' && (
            <Button variant="outlined" size="small" color="secondary" onClick={onConfirmSchedule}>
              <FontAwesomeIcon icon="check" />
              &nbsp;CONFIRM
            </Button>
          )}
          &nbsp;
          <Button variant="outlined" size="small" color="secondary" onClick={onWritePrescription}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;Prescription
          </Button>
          &nbsp;
          <Button variant="outlined" size="small" color="error" onClick={onDeleteSchedule}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;DELETE
          </Button>
        </div>
      )}
    </StyledTooltipContent>
  );
}
