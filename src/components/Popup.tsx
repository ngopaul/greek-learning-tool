import React, { ReactNode } from 'react';
import { Box, IconButton, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type PopupProps = {
  open: boolean,
  onClose: () => void,
  title: string,
  children: ReactNode,
}

const Popup = ({ open, onClose, title, children }: PopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper" // This enables scrolling when content overflows
      aria-labelledby={`${title}-dialog`}
      aria-describedby={`${title}-description`}
      maxWidth="md" // Adjust width based on your requirement
      fullWidth // Makes sure the dialog spans the width
    >
      {/* Dialog Title with Close Button */}
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id={`${title}-dialog`} variant="h6">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent dividers>
        {/* Wraps content inside DialogContent to ensure scrolling */}
        <Box mt={2}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
