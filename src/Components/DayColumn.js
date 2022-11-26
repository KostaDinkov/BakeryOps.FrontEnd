import React from "react";
import styles from "./DayColumn.module.css";
import OrderCard from "./OrderCard";
import moment from "moment/moment";
import { Link } from "react-router-dom";

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
        <Link to={`/orders/forDay/${date.format()}`}>
          <span className={styles.date}>{date.date()}</span>{" "}
          <span className={styles.monthYear}>{date.format("MMMM yyyy")}</span>
        </Link>
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
