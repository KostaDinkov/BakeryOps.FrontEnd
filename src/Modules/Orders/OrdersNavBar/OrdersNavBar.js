import React, { useState, useContext } from "react";
import styles from "./OrdersNavBar.module.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import CalendarModal from "./CalendarModal";
import { formatISO } from "date-fns";
import AppContext from "../../../appContext";


const NavBar = () => {
  const {isLogged,setIsLogged} = useContext(AppContext);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const todayStr = formatISO(new Date(), {representation:"date"});
  
  const navigate = useNavigate();
  
  function handleLogout(){
    localStorage.setItem("isLogged","false");
    localStorage.setItem("token","");
    setIsLogged(false);
    navigate("/");
  }
  return (
    <div className={styles.navBarContainer} >
      
      <Link to={`/orders/forDay/${todayStr}`}>
        <Button className={styles.buttonMain} variant="contained">
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
        <Button
          className={styles.buttonNew}
          variant="contained"
          color="secondary"
          data-test="NavBar-NewOrderBtn"
        >
          Нова Поръчка
        </Button>
      </Link>

      

      <CalendarModal open={calendarOpen} setOpen={setCalendarOpen} />
    </div>
  );
};

export default NavBar;
