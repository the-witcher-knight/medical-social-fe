import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount } from 'src/shared/reducers/authentication';

const WelcomePage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    dispatch(getAccount());
  }, []);

  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h4">Welcome to the app, {account.login}</Typography>
    </Box>
  );
};
export default WelcomePage;
