import React from "react";
import styles from "./OrderCard.module.css";
import OrderItem from "./OrderItem";
import EditIcon from "@mui/icons-material/Edit";
import {Link} from "react-router-dom";

const OrderCard = ({ order }) => {

  const containerStyles = () => {
    for (const item of order.orderItems) {
      if (!item.isComplete) {
        return [
          styles.orderCardContainer,
          styles.orderCardContainerNotComplete,
        ].join(" ");
      }
    }

    return [styles.orderCardContainer, styles.orderCardContainerComplete].join(
      " "
    );
  };

  return (
    <div className={containerStyles()}>
      <div className={styles.cardHeader}>
        <span className={styles.pickupTime}>{order.pickupTime}</span>{" "}
        <span>{order.clientName}</span>
        <div className={styles.editIcon}>
          <Link to={`/orders/put/${order.id}`}>
            <EditIcon fontSize="small" cursor="pointer" sx={{color:"white"}} />
          </Link>
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
          
          <OrderItem key={index} item={item} order={order} />
          
          
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
