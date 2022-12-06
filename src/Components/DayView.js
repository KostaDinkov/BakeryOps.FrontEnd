import React from "react";
import { ordersApi } from "../API/ordersApi";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { useLoaderData,useParams } from "react-router-dom";
import OrderCard from "./OrderCard";
import styles from "./DayView.module.css";

export async function DayViewLoader({ params }) {
  let dateParam = new Date(params.date);
  let orderDate = format(dateParam, "dd-MM-yyyy", { locale: bg });
  const orders = await ordersApi.getOrdersForDate(orderDate);
  return orders;
}

export default function DayView() {
  const orders = useLoaderData();
  const isOrders = orders.length > 0;
  let params = useParams();

  return isOrders ? (
    <div className={styles.layoutContainer}>
      <div className={styles.title}>
        <h1>{formatDate(orders[0].pickupDate)}</h1>
      </div>
      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.noOrders}>Няма поръчки за {format(new Date(params.date),"do MMMM, yyyy г.", { locale: bg })}</div>
  );
}

function formatDate(dateString) {
  return format(new Date(dateString), "EEEE, do MMMM yyyy г.", { locale: bg });
}
