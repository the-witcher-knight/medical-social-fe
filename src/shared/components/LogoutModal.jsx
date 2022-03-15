import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const LogoutModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to logout?
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="error">
            Logout
          </Button>
          &nbsp;
          <Button variant="text">Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default LogoutModal;
