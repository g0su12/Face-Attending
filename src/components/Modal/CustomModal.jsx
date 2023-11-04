import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const CustomModal = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
