import React from "react";
import styles from "./DayColumn.module.css";
import OrderCard from "./OrderCard";

const DayColumn = ({ data }) => {
  const date = data[0].pickupDate;
  const time = "10:30";

  data = data.sort((a,b)=>{
    if(a.pickupTime > b.pickupTime) 
        {return 1}
    else if(a.pickupTime=== b.pickupTime){
        return 0
    }
    return -1
  })
  return (
    <section>
      <header>
        <div>{date}</div>
      </header>
      <div className={styles.orderList}>
        {data.map((order) => (
          <OrderCard key={order.id} order={order}></OrderCard>
        ))}
      </div>
    </section>
  );
};

export default DayColumn;
