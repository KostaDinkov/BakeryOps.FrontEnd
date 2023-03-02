import React from "react";
import DayColumn from "./DayColumn";
import { useLoaderData } from "react-router-dom";
import styles from "./ColumnView.module.css"
import {  OrdersService } from "../API/ordersApi";
import OrderDTO from "../Types/OrderDTO";

export async function loader() {
    let data = await OrdersService.GetOrdersAsync("2023-03-01", "2023-03-03");   
    return data;  
}

function ColumnView() {
  const orders = useLoaderData() as OrderDTO[][];
  return (
    <div className={styles.daysContainer}>
      {orders.map((group, index) => (
        <DayColumn key={index} data={group} />
      ))}
    </div>
  );
}

export default ColumnView;
