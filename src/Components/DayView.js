import React from "react";
import { ordersApi } from "../API/ordersApi";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { useLoaderData } from "react-router-dom";
import OrderCard from "./OrderCard";
import styles from "./DayView.module.css";

export async function DayViewLoader({ params }) {
  let today = format(new Date(), "dd-MM-yyyy", { locale: bg });
  const orders = await ordersApi.getOrdersForDate(today);
  return orders;
}

export default function DayView() {
  const orders = useLoaderData();

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.title}><h1>{formatDate(orders[0].pickupDate)}</h1></div>
      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function formatDate(dateString) {
  return format(new Date(dateString), "EEEE, do MMMM yyyy г.", { locale: bg });
}
