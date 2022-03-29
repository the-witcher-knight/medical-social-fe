import { Box, Typography } from '@mui/material';
import React from 'react';
import { parseJwt } from 'src/shared/util/auth-util';
import { StorageAPI } from 'src/shared/util/storage-util';

const WelcomePage = () => {
  const account = parseJwt(
    StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken')
  );

  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h4">Welcome to the app, {account.sub}</Typography>
    </Box>
  );
};
export default WelcomePage;
