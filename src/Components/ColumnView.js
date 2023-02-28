import React from "react";
import DayColumn from "./DayColumn";
import { useLoaderData } from "react-router-dom";
import styles from "./ColumnView.module.css"
import { ordersApi } from "../API/ordersApi";
import { UnauthorizedError } from "../system/errors";

export async function loader() {
    let response = await ordersApi.getOrders("2023-03-01", "2023-03-02"); 
    if(response.status === 401){
      throw new UnauthorizedError
    }
    return await response.json();  
}

function ColumnView() {
  const orders = useLoaderData();
  
  //check if orders is an array or single object

  return (
    <div className={styles.daysContainer}>
      {orders.map((group, index) => (
        <DayColumn key={index} data={group} />
      ))}
    </div>
  );
}

export default ColumnView;
