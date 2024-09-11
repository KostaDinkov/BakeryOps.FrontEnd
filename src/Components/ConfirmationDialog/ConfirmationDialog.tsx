import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({
  isOpen,
  setIsOpen,
  title,
  promptText,
  agreeBtnText,
  disagreeBtnText,
  handleAgree,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title:string;
  promptText: string;
  agreeBtnText: string;
  disagreeBtnText: string;
  handleAgree: () => void;
}) {

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {promptText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{disagreeBtnText}</Button>
          <Button onClick={() => {handleAgree(); setIsOpen(false);}} autoFocus>
            {agreeBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
