import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import { grey, lightBlue } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getUserAuthentication } from 'src/shared/util/auth-util';
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
      role: AuthorityConstant.ALL,
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
      path: '/user-manager',
      name: 'User Manager',
      icon: 'users',
      role: [AuthorityConstant.ADMIN],
    },
    {
      path: '/edit-profile',
      name: 'Edit Profile',
      icon: 'user-edit',
      role: AuthorityConstant.ALL,
    },
    {
      path: '/degree-manager',
      name: 'Degree Manager',
      icon: 'graduation-cap',
      role: [AuthorityConstant.DOCTOR],
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
                component={NavLink}
                to={r.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  m: 1,
                  borderRadius: 2,
                }}
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: lightBlue[300],
                        color: 'white',
                      }
                    : {
                        color: grey[700],
                      }
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  <FontAwesomeIcon icon={r.icon} color="inherit" />
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
