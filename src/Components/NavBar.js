import React, {  useState } from "react";
import styles from "./NavBar.module.css";
import { defaultOrderFormData } from "../appContext";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

const NavBar = () => {
  const [formState, setFormState] = useState({ isFormOpen: false });

  //const {isOrderFormOpen, setIsOrderFormOpen, setIsEdit} = useContext(AppContext);
  const openOrderForm = () => {
    if (!formState.isFormOpen) {
      setFormState((state) => ({ ...state, isFormOpen: true }));
    }
  };
  return (
    <div className={styles.navBarContainer}>
      <Link to="/"><Button variant="contained">Начало</Button></Link>
      <Link to="/today/"><Button variant="contained">Днес</Button></Link>
      <Link to="/orders/post/"><Button variant="contained">Нова Поръчка</Button></Link>
      

    </div>
  );
};

export default NavBar;
