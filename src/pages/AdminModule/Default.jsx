import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Paper, Typography, Tooltip, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme, bColor }) => ({
  backgroundColor: bColor,
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: '#fff',
}));

const Default = () => {
  const navigate = useNavigate();

  const data = [
    {
      name: 'User Accounts',
      iconName: 'user',
      color: '#00695c',
      total: 10,
      path: '/admin/user-manager',
      description: 'Click to manage user accounts',
    },
    {
      name: 'Doctor Accounts',
      iconName: 'user',
      color: '#d84315',
      total: 10,
      path: '/admin/doctor-manager',
      description: 'Click to manage doctor accounts',
    },
    {
      name: 'Pharmacy Accounts',
      iconName: 'user',
      color: '#827717',
      total: 10,
      path: '/admin/pharmacy-manager',
      description: 'Click to manage pharmacy accounts',
    },
    {
      name: 'All Accounts',
      iconName: 'user',
      color: '#0277bd',
      total: 30,
      path: '/admin/all-accounts',
      description: 'Click to manage all accounts',
    },
  ];

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
      {data.map((item, index) => (
        <Item key={index} elevation={3} align="center" bColor={item.color}>
          <Stack direction="column" justify="space-between">
            <div style={{ width: '100%' }}>
              <Tooltip key={index} title={item.description}>
                <IconButton
                  sx={{ color: 'white' }}
                  size="large"
                  onClick={() => navigate(item.path)}
                >
                  <FontAwesomeIcon icon={['fas', item.iconName]} />
                </IconButton>
              </Tooltip>
            </div>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="h6">{item.total}</Typography>
          </Stack>
        </Item>
      ))}
    </Stack>
  );
};
export default Default;
