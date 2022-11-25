import React, {  useState } from "react";
import styles from "./NavBar.module.css";
import { defaultOrderFormData } from "../appContext";
import  Button  from "@mui/material/Button";
import { Link } from "react-router-dom";
import CalendarModal from "./CalendarModal";
import {formatISO} from "date-fns"

const NavBar = () => {
  const [formState, setFormState] = useState({ isFormOpen: false });
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const todayStr = formatISO(new Date())
  return (
    <div className={styles.navBarContainer}>
      <Link to="/"><Button className={styles.button} variant="contained">Начало</Button></Link>
      <Link to={`/orders/forDay/${todayStr}`}><Button className={styles.button} variant="contained">Днес</Button></Link>
      <Link to="/orders/post/"><Button className={styles.button} variant="contained">Нова Поръчка</Button></Link>
      <Button className={styles.button} variant="contained" onClick={()=>{setCalendarOpen(true)}}>Избери Дата</Button>
      <CalendarModal open={calendarOpen} setOpen={setCalendarOpen} />

    </div>
  );
};

export default NavBar;
