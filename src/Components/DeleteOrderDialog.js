import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteOrderDialog({open, setOpen, onDelete}) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete= async ()=>{
    setOpen(false);
    onDelete();
  }

  return (

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Изтриване на поръчка"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Сигурни ли сте, че искате да изтриете тази поръчка?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Откажи</Button>
          <Button onClick={handleDelete} autoFocus>
            Изтрий
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}