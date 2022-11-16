import React from "react";
import styles from "./DayColumn.module.css";
import OrderCard from "./OrderCard";
import moment from "moment/moment";

const DayColumn = ({ data }) => {
  
  const date = moment(data[0].pickupDate);

  data = data.sort((a, b) => {
    if (a.pickupTime > b.pickupTime) {
      return 1;
    } else if (a.pickupTime === b.pickupTime) {
      return 0;
    }
    return -1;
  });
  return (
    <section>
      <header>
        <div><span className = {styles.date}>{date.date()}</span> <span>{date.format("MMMM yyyy")}</span></div>
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
