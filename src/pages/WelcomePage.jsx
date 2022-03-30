import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { parseJwt } from 'src/shared/util/auth-util';
import { StorageAPI } from 'src/shared/util/storage-util';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const account = parseJwt(
    StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken')
  );

  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      {account ? (
        <Typography variant="h4">Welcome to the app, {account.sub}</Typography>
      ) : (
        <>
          <Typography variant="h4">Welcome to the app</Typography>
          <Paper>
            <Typography variant="h6">You are not logged in!</Typography>
            <Button component={Link} to="/authorization/sign-in">
              Sign in
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};
export default WelcomePage;
