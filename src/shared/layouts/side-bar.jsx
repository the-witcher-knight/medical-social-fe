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
import { AuthorityConstant } from '../authority-constant';

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

  const routes = [
    {
      path: '/',
      name: 'Home',
      icon: 'home',
      role: [
        AuthorityConstant.USER,
        AuthorityConstant.ADMIN,
        AuthorityConstant.DOCTOR,
        AuthorityConstant.PHARMACY,
      ],
    },
    {
      path: '/schedule-manager',
      name: 'Schedule Manager',
      icon: 'calendar-check',
      role: [AuthorityConstant.USER, AuthorityConstant.ADMIN, AuthorityConstant.DOCTOR],
    },
    {
      path: '/make-appointment',
      name: 'Make Appointment',
      icon: 'calendar-plus',
      role: [AuthorityConstant.USER, AuthorityConstant.ADMIN],
    },
    {
      path: '/medicine-manager',
      name: 'Medicine Manager',
      icon: 'capsules',
      role: [AuthorityConstant.PHARMACY],
    },
    {
      path: '/admin/user-manager',
      name: 'User Manager',
      icon: 'users',
      role: [AuthorityConstant.ADMIN],
    },
    {
      path: '/admin/doctor-manager',
      name: 'Doctor Manager',
      icon: 'user-doctor',
      role: [AuthorityConstant.ADMIN],
    },
    {
      path: '/admin/pharmacy-manager',
      name: 'Pharmacy Manager',
      icon: 'house-medical',
      role: [AuthorityConstant.ADMIN],
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
        {routes.map(
          (r, idx) =>
            r.role.includes(user.auth) && (
              <ListItemButton
                key={idx}
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
            )
        )}
      </List>
    </Drawer>
  );
};
export default SideBar;
