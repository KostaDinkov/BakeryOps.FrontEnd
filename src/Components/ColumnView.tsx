import React from "react";
import DayColumn from "./DayColumn";
import { useLoaderData } from "react-router-dom";
import styles from "./ColumnView.module.css"
import {  OrdersService } from "../API/ordersApi";
import OrderDTO from "../Types/OrderDTO";
import {formatISO, addDays} from 'date-fns';

export async function loader() {
    let today = formatISO(new Date(),{representation:"date"});
    let endDate = formatISO(addDays(new Date(), 3), {representation:"date"});
    let data = await OrdersService.GetOrdersAsync(today, endDate);  
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
