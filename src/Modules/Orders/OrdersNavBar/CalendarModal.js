import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DatePicker, { registerLocale } from "react-datepicker";
import { bg } from "date-fns/locale";
import  "./CalendarModal.css";
import {formatISO} from 'date-fns';
import {useNavigate} from "react-router-dom";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
  textAlign:"center",
};

export default function CalendarModal({open, setOpen}) {
  
  const handleClose = () => setOpen(false);
  registerLocale("bg", bg);
  const navigate = useNavigate();

  const handleOnCalendarChange = (date)=>{
    const dateStr = formatISO(date, {representation:"date"});
    setOpen(false);
    navigate(`/orders/forDay/${dateStr}`)
  }

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="calendarBox" sx={style}>
          
          <DatePicker inline locale={bg} onChange={handleOnCalendarChange}/>
        </Box>
      </Modal>
    </div>
  );
}