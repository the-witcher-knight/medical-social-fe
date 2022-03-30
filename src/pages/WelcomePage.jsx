import { Box, Button, Paper, Typography, Link as MuiLink } from '@mui/material';
import React from 'react';
import { parseJwt } from 'src/shared/util/auth-util';
import { StorageAPI } from 'src/shared/util/storage-util';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const account = parseJwt(
    StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken')
  );

  return (
    <Box component="div" mt={5} display="flex" flexDirection="column" justifyContent="center">
      <Paper elevation={3}>
        <Box component="div" p={2} height="60vh">
          <Typography variant="h5" align="center" component="h1">
            Welcome to Medical Social Application
          </Typography>
          {account && account.sub ? (
            <Typography variant="body1">Greeting {account.sub}</Typography>
          ) : (
            <Typography>
              You seem to be not logged in, please &nbsp;
              <MuiLink component={Link} to="/authorization/sign-in" variant="body2">
                login
              </MuiLink>
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
export default WelcomePage;
