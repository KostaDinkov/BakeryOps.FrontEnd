import React, { useEffect, useState } from "react";
import DayColumn from "./DayColumn";
import { useLoaderData, useNavigate, useFetcher } from "react-router-dom";
import styles from "./ColumnView.module.css";
import { OrdersService } from "../API/ordersApi";
import OrderDTO from "../Types/OrderDTO";
import { formatISO, addDays } from "date-fns";
import PubSub from "pubsub-js";

export async function loader() {
  let today = formatISO(new Date(), { representation: "date" });
  let endDate = formatISO(addDays(new Date(), 3), { representation: "date" });
  let data = await OrdersService.GetOrdersAsync(today, endDate);
  return data;
}

function ColumnView() {
  const [orders, setOrders] = useState(useLoaderData() as OrderDTO[][]);

  useEffect(() => {
    PubSub.subscribe("DBOrdersUpdated", reload);
  }, []);

  async function reload(msg: string) {
    console.log("Received DBOrdersUpdated");
    let loaderData = await loader();
    setOrders(loaderData);
  }

  return (
    <div className={styles.daysContainer}>
      {orders.map((group, index) => (
        <DayColumn key={index} data={group} />
      ))}
    </div>
  );
}

export default ColumnView;
