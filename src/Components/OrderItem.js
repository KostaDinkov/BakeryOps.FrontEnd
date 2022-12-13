import React from "react";
import styles from "./OrderItem.module.css";
import { useNavigate } from "react-router-dom";
import { ordersApi } from "../API/ordersApi";

const OrderItem = ({ item, order }) => {
  let navigate = useNavigate();

  let handleProgressChange = () => {
    item.isInProgress = !item.isInProgress;
    updateOrder();
  };

  let handleCompleteChange = () => {
    item.isComplete = !item.isComplete;

    updateOrder();
  };

  async function updateOrder() {
    await ordersApi.putOrder(order.id, order);
    navigate(0);
  }

  return (
    <dl
      className={
        item.isComplete
          ? styles.completed
          : item.isInProgress
          ? styles.inProgress
          : null
      }
    >
      <dt className={styles.itemHeader}>
        <span className={styles.itemName}>{item.product.name} </span>
        <span style={{ flexShrink: "0" }}>{item.productAmount} бр.</span>
        <span>
          <input
            type="checkbox"
            name="isInProgress"
            id="isInProgress"
            defaultChecked={item.isInProgress}
            onChange={handleProgressChange}
          />
        </span>
        <span>
          <input
            type="checkbox"
            name="isComplete"
            id="isComplete"
            defaultChecked={item.isComplete}
            onChange={handleCompleteChange}
          />
        </span>
      </dt>

      <dd>
        {item.description !== "" && (
          <div className={styles.itemDetails}>
            <span className={styles.itemDetailsBadge}> Забележка:</span>
            {item.description}
          </div>
        )}
        {item.cakeFoto !== "" && (
          <div className={styles.itemDetails}>
            <span className={styles.itemDetailsBadge}>Фото:</span>
            {item.cakeFoto}
          </div>
        )}
        {item.cakeTitle !== "" && (
          <div className={styles.itemDetails}>
            <span className={styles.itemDetailsBadge}>Надпис:</span>
            {item.cakeTitle}
          </div>
        )}
      </dd>
    </dl>
  );
};

export default OrderItem;
