import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

function PopupExample() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Popup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div style={{ padding: '20px' }}>Popup Content</div>
      </Dialog>
    </div>
  );
}

export default PopupExample;
