import React, { useState } from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import useFirebase from '@/hook/useFirebase';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Logout = () => {
  const firebase = useFirebase();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      if (firebase) {
        await firebase.auth().signOut();
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemText primary="Logout" />
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;
