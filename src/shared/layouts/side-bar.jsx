import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUserAuthentication, isAdmin, isDoctor, isPharmacy } from 'src/shared/util/auth-util';

const drawerWidth = 240;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const SideBar = ({ open, handleClose }) => {
  const theme = useTheme();
  const user = getUserAuthentication();

  const defaultRoutes = [
    {
      name: 'Home',
      path: '/',
      icon: 'home',
    },
    {
      name: 'Schedule Manager',
      path: '/schedule-manager',
      icon: 'calendar-check',
    },
    {
      name: 'Make Appointment',
      path: '/make-appointment',
      icon: 'calendar-plus',
    },
  ];

  const doctorRoutes = [
    {
      name: 'Booking Manager',
      path: '/booking-manager',
      icon: 'clipboard-user',
    },
  ];

  const adminRoutes = [
    {
      name: 'User Manager',
      path: '/admin/user-manager',
      icon: 'users',
    },
    {
      name: 'Doctor Manager',
      path: '/admin/doctor-manager',
      icon: 'user-doctor',
    },
    {
      name: 'Pharmacy Manager',
      path: '/admin/pharmacy-manager',
      icon: 'house-medical',
    },
  ];

  const pharmacyRoutes = [
    {
      name: 'Medicine Manager',
      path: '/medicine-manager',
      icon: 'capsules',
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleClose}>
          {theme.direction === 'rtl' ? (
            <FontAwesomeIcon icon="arrow-right" />
          ) : (
            <FontAwesomeIcon icon="arrow-left" />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {defaultRoutes.map(r => (
          <ListItemButton
            key={r.name}
            component={Link}
            to={r.path}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon={r.icon} />
            </ListItemIcon>
            <ListItemText primary={r.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        ))}
      </List>
      {isDoctor(user) && (
        <>
          <Divider />
          <List>
            {doctorRoutes.map(r => (
              <ListItemButton
                key={r.name}
                component={Link}
                to={r.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={r.icon} />
                </ListItemIcon>
                <ListItemText primary={r.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
      {isPharmacy(user) && (
        <>
          <Divider />
          <List>
            {pharmacyRoutes.map(r => (
              <ListItemButton
                key={r.name}
                component={Link}
                to={r.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={r.icon} />
                </ListItemIcon>
                <ListItemText primary={r.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
      {isAdmin(user) && (
        <>
          <Divider />
          <List>
            {adminRoutes.map(r => (
              <ListItemButton
                key={r.name}
                component={Link}
                to={r.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={r.icon} />
                </ListItemIcon>
                <ListItemText primary={r.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
    </Drawer>
  );
};
export default SideBar;
