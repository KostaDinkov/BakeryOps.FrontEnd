import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { defaultOrderFormData } from "../appContext";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CalendarModal from "./CalendarModal";
import { formatISO } from "date-fns";

const NavBar = () => {
  const [formState, setFormState] = useState({ isFormOpen: false });
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const todayStr = formatISO(new Date());
  return (
    <div className={styles.navBarContainer}>
      <Link to="/">
        <Button className={styles.buttonMain} variant="contained" >
          Начало
        </Button>
      </Link>
      <Link to={`/orders/forDay/${todayStr}`}>
        <Button className={styles.buttonMain} variant="contained" >
          Днес
        </Button>
      </Link>
      <Button
        className={styles.buttonMain}
        variant="contained"
        onClick={() => {
          setCalendarOpen(true);
        }}
      >
        Избери Дата
      </Button>

      <Link to="/orders/post/">
        <Button className={styles.buttonNew} variant="contained" color="secondary">
          Нова Поръчка
        </Button>
      </Link>

      <CalendarModal open={calendarOpen} setOpen={setCalendarOpen} />
    </div>
  );
};

export default NavBar;
