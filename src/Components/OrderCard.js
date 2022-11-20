import React, { useContext, useState } from "react";
import styles from "./OrderCard.module.css";
import OrderItem from "./OrderItem";
import EditIcon from "@mui/icons-material/Edit";
import AppContext from "../appContext";
import OrderForm from "./OrderForm";

const OrderCard = ({ order }) => {
  //const { setIsOrderFormOpen, setOrderFormData, setIsEdit}  = useContext(AppContext);
  const [formState, setFormState] = useState({ isFormOpen: false });
  const handleOnEditClick = () => {
    setFormState((state) => ({ ...state, isFormOpen: true }));
  };
  
  return (
    <div className={styles.orderCardContainer}>
      <div className={styles.cardHeader}>
        <span className={styles.pickupTime}>{order.pickupTime}</span>{" "}
        <span>{order.clientName}</span>
        <div className={styles.editIcon}>
          <EditIcon
            fontSize="small"
            cursor="pointer"
            onClick={handleOnEditClick}
          />
        </div>
      </div>
      <div className={styles.headerDetails}>
        <span>тел: {order.clientPhone}</span>
        {order.advancePaiment !== 0 && (
          <span
            className={[styles.textBadge, styles.textBadgeYellow].join(" ")}
          >
            Капаро: {order.advancePaiment} лв.
          </span>
        )}
        {order.isPaid === true && (
          <span className={[styles.textBadge, styles.textBadgeRed].join(" ")}>
            ПЛАТЕНА
          </span>
        )}
      </div>
      <ul>
        {order.orderItems.map((item, index) => (
          <OrderItem key={index} item={item} order={order}/>           
          
        ))}
      </ul>
      {formState.isFormOpen ? (
        <OrderForm
          formState={formState}
          setFormState={setFormState}
          isEdit={true}
          initialFormData={order}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderCard;
