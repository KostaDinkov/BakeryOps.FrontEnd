import  { useState } from "react";
import styles from "./OrdersNavBar.module.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import CalendarModal from "./CalendarModal";
import { formatISO } from "date-fns";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const NavBar = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const todayStr = formatISO(new Date(), { representation: "date" });

  const navigate = useNavigate();

  return (
    <div className={styles.navBarContainer}>
       <div className="self-start flex flex-row items-center justify-between gap-2 py-4">
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={()=>{navigate(-1)}}/>
        <Typography variant="h5">Поръчки</Typography>
      </div>
      <div className="flex flex-1 gap-2 align-center justify-center">
        <Link to={`/orders/forDay/${todayStr}`}>
          <Button className={styles.buttonMain} variant="outlined">
            Днес
          </Button>
        </Link>
        <Button
          className={styles.buttonMain}
          variant="outlined"
          onClick={() => {
            setCalendarOpen(true);
          }}
        >
          Избери Дата
        </Button>
        <Link to="/orders/post/">
          <Button
            className={styles.buttonNew}
            variant="contained"
            color="secondary"
            data-test="NavBar-NewOrderBtn"
          >
            Нова Поръчка
          </Button>
        </Link>
      </div>

      <CalendarModal open={calendarOpen} setOpen={setCalendarOpen} />
    </div>
  );
};

export default NavBar;