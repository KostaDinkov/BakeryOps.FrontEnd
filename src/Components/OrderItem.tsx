import React, { useState, useEffect } from "react";
import styles from "./OrderItem.module.css";
import { OrdersService } from "../API/ordersApi";
import PubSub from "pubsub-js";
import OrderItemDTO from "../Types/OrderItemDTO";
import OrderDTO from "../Types/OrderDTO";


const OrderItem = ({ itemId, order }: { itemId: number; order: OrderDTO }) => {
  const [item,setItem] = useState(
    order.orderItems.find((i) => i.id === itemId) as OrderItemDTO
  );
  const [isInProgress, setIsInProgress] = useState(item.isInProgress);
  const [isComplete, setIsComplete] = useState(item.isComplete);

  useEffect(()=>{
    //!IMPORTANT Update state when props change
    setItem(order.orderItems.find((i) => i.id === itemId) as OrderItemDTO); 
   
  },[order])

  useEffect(()=>{
    setIsInProgress(item.isInProgress);
    setIsComplete(item.isComplete);
  },[item])
  
  
  let handleProgressChange = () => {
    setIsInProgress(!isInProgress);
    item.isInProgress = !item.isInProgress;
    updateOrder();
  };

  let handleCompleteChange = () => {
    item.isComplete = !item.isComplete;
    setIsComplete(!isComplete);
    updateOrder();
  };

  async function updateOrder() {
    await OrdersService.PutOrderAsync(order.id as number, order);
    PubSub.publish("SendUpdateOrders");
  }

  return (
    <dl
      className={
        isComplete ? styles.completed : isInProgress ? styles.inProgress : null
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
            checked={isInProgress}           
            onChange={handleProgressChange}
          />
        </span>
        <span>
          <input
            type="checkbox"
            name="isComplete"
            id="isComplete"
            checked={isComplete}            
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
