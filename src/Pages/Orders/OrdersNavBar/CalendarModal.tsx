
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {formatISO} from 'date-fns';
import {useNavigate} from "react-router-dom";
import { DateCalendar } from '@mui/x-date-pickers';
import styles from './CalendarModal.module.css';



export default function CalendarModal({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleOnCalendarChange = (date:string)=>{
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
        <Box id="calendarBox" className={styles.calendarBox}>
          <DateCalendar    onChange={handleOnCalendarChange}/>
        </Box>
      </Modal>
    
  );
}