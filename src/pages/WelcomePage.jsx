import { Box, Paper, Typography, Link as MuiLink, styled } from '@mui/material';
import React from 'react';
import { getUserAuthentication } from 'src/shared/util/auth-util';
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';

const StyledImage = styled('img')(({ theme }) => ({
  maxWidth: '350px',
  height: 'auto',
  marginRight: theme.spacing(2),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: blue[600],
}));

const StyledGreeting = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  fontWeight: 'light',
  marginBottom: theme.spacing(2),
}));

const WelcomePage = () => {
  const account = getUserAuthentication();

  return (
    <Paper
      elevation={2}
      sx={{ margin: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: 3 }}
    >
      <StyledImage src="/medical-robot.jpg" alt="Medical Robot" />
      <Box sx={{ flex: 1, padding: 3 }}>
        <StyledTitle>Welcome to the Medical Social</StyledTitle>
        {account && account.sub ? (
          <StyledGreeting>Greeting {account.sub}</StyledGreeting>
        ) : (
          <StyledGreeting>
            Please &nbsp;
            <MuiLink component={Link} to="/authorization/sign-in">
              SignIn
            </MuiLink>
            &nbsp; or &nbsp;
            <MuiLink component={Link} to="/authorization/sign-up">
              SignUp
            </MuiLink>
            &nbsp; to continue.
          </StyledGreeting>
        )}
      </Box>
    </Paper>
  );
};
export default WelcomePage;
