import React from "react";
import styles from "./OrderCard.module.css";
import OrderItem from "./OrderItem";

const OrderCard = ({ order }) => {
  const pickupTime = order.pickupTime;
  return (
    <div className={styles.orderCardContainer}>
      <div className={styles.cardHeader}>
        <span className={styles.pickupTime}>{pickupTime}</span>{" "}
        <span>{order.clientName}</span>
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
          <OrderItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
