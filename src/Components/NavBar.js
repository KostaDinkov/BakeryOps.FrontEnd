import React,{useContext} from "react";
import styles from "./NavBar.module.css";
import AppContext from "../appContext";


const NavBar = () =>{

    const {isOrderFormOpen, setIsOrderFormOpen, setIsEdit} = useContext(AppContext);
    const openDialog = ()=>{
        if(!isOrderFormOpen){
            setIsOrderFormOpen(true);
            setIsEdit(false);
        }
    }
    return(
        <div className={styles.navBarContainer}>
           <button onClick={openDialog}>Open Dialog</button>
        </div>
    )
}

export default NavBar;