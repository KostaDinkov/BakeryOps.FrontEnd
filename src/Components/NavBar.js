import React from "react";
import styles from "./NavBar.module.css";
import OrderFormControl from "./OrderFormControl";

const NavBar = () =>{

    return(
        <div className={styles.navBarContainer}>
            <OrderFormControl text="Нова Поръчка"/>
        </div>
    )
}

export default NavBar;