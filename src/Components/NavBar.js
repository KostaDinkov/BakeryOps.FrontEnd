import React, {  useState } from "react";
import styles from "./NavBar.module.css";
import { defaultOrderFormData } from "../appContext";

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
      
      <Link to="/orders/post/"><button>Нова Поръчка</button></Link>
      

    </div>
  );
};

export default NavBar;
