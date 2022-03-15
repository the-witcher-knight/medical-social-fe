import { Box, Skeleton } from '@mui/material';
import React from 'react';

const AnimationProgress = () => {
  return (
    <Box sx={{ margin: '10px' }} fullWidth>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
};

export default AnimationProgress;
