
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { bg } from "date-fns/locale";
import  "./CalendarModal.css";
import {formatISO} from 'date-fns';
import {useNavigate} from "react-router-dom";
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { background } from 'storybook/internal/theming';


const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
  textAlign:"center",
  background: "white",
  borderRadius: "10px",
};

export default function CalendarModal({open, setOpen}) {
  
  const handleClose = () => setOpen(false);
  //registerLocale("bg", bg);
  const navigate = useNavigate();

  const handleOnCalendarChange = (date)=>{
    const dateStr = formatISO(date, {representation:"date"});
    setOpen(false);
    navigate(`/orders/forDay/${dateStr}`)
  }

  return (

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="calendarBox" sx={style}>
          <DateCalendar    onChange={handleOnCalendarChange}/>
        </Box>
      </Modal>
    
  );
}