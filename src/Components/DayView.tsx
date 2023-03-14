import React, {useState} from "react";
import { ordersApi } from "../API/ordersApi";
import { format, formatISO } from "date-fns";
import { bg } from "date-fns/locale";
import { Params, useLoaderData, useParams } from "react-router-dom";
import OrderCard from "./OrderCard";
import styles from "./DayView.module.css";
import OrderDTO from "../Types/OrderDTO";

export async function DayViewLoader({ params }:{params:Readonly<Params<string>>}) {
  let dateParam = formatISO(new Date(params.date as string), { representation: "date" });
  return await ordersApi.getOrdersAsync(dateParam);  
}

export default function DayView() {
  const ordersByDate = useLoaderData() as OrderDTO[][];
  const isOrders = ordersByDate[0].length > 0;
  const [orders, setOrders] = useState(ordersByDate[0]);
  let params = useParams();

  PubSub.subscribe("DBOrdersUpdated", async (msg)=>{
    setOrders((await DayViewLoader({params}))[0]);
  })
 

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
    <div className={styles.noOrders}>
      Няма поръчки за{" "}
      {format(new Date(params.date as string), "do MMMM, yyyy г.", { locale: bg })}
    </div>
  );
}

function formatDate(dateString:string) {
  return format(new Date(dateString), "EEEE, do MMMM yyyy г.", { locale: bg });
}
