import React,{useContext,useState} from "react";
import styles from "./NavBar.module.css";
import AppContext,{defaultOrderFormData} from "../appContext";
import OrderForm from "./OrderForm";


const NavBar = () =>{

    const [formState, setFormState]= useState({isFormOpen:false});
    
    //const {isOrderFormOpen, setIsOrderFormOpen, setIsEdit} = useContext(AppContext);
    const openOrderForm = ()=>{
        if(!formState.isFormOpen){
            setFormState((state)=>({...state, isFormOpen:true}))
        }
    }
    return(
        <div className={styles.navBarContainer}>
           <button onClick={openOrderForm}>Open Dialog</button>
           {formState.isFormOpen?<OrderForm formState={formState} initialFormData={defaultOrderFormData} isEdit={false} setFormState={setFormState}/>:<></>}
        </div>
    )
}

export default NavBar;