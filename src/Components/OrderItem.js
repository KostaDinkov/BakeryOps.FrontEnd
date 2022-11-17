import React, { useState } from "react";
import styles from "./OrderItem.module.css";

const OrderItem = ({ item }) => {
  let [isComplete, setIsComplete] = useState(item.isComplete);
  let [isInProgress, setIsInProgress] = useState(item.isInProgress);

  let handleProgressChange = ()=>{
    setIsInProgress(!isInProgress);
  }

  let handleCompleteChange = ()=>{
    setIsComplete(!isComplete);
  }

  
  return (
    <dl>
      <dt className={styles.itemHeader}>
        <span className={styles.itemName}>{item.product.name} </span>
        <span>{item.productAmount} бр.</span>
        <span>
          <input
            type="checkbox"
            name="isInProgress"
            id="isInProgress"
            checked={isInProgress}
            onChange = {handleProgressChange}
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
        {item.description !== "" && <div>Забележка: {item.description}</div>}
        {item.cakeFoto !== "" && <div>Фото: {item.cakeFoto}</div>}
        {item.cakeTitle !== "" && <div>Надпис: {item.cakeTitle}</div>}
      </dd>
    </dl>
  );
};

export default OrderItem;
