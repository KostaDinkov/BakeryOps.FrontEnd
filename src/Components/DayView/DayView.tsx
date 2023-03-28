import React, { useEffect, useState } from "react";
import { OrdersService } from "../../API/ordersApi";
import { format, formatISO } from "date-fns";
import { bg } from "date-fns/locale";
import {
  Params,
  useLoaderData,
  useParams,
  useNavigation,
} from "react-router-dom";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./DayView.module.css";
import OrderDTO from "../../Types/OrderDTO";
import { sleep } from "../../system/utils";
import LinearProgress from "@mui/material/LinearProgress";
import OrderStripe from "./OrderStripe";

export async function DayViewLoader({
  params,
}: {
  params: Readonly<Params<string>>;
}) {
  let dateParam = formatISO(new Date(params.date as string), {
    representation: "date",
  });
  let orders = await OrdersService.GetOrdersAsync(dateParam);
  //await sleep(3000);
  return orders;
}

export default function DayView() {
  const ordersByDate = useLoaderData() as OrderDTO[][];
  const { state } = useNavigation();
  const [orders, setOrders] = useState(ordersByDate[0]);
  const [stripes, setStripes] = useState(true);
  let params = useParams();

  useEffect(() => {
    setOrders(ordersByDate[0]);
  }, [ordersByDate]);
  
  useEffect(()=>{
    PubSub.subscribe("DBOrdersUpdated", async (msg) => {
      setOrders((await DayViewLoader({ params }))[0]);
    });
  },[])
  

  function isOrders(): boolean {
    if (ordersByDate && ordersByDate.length > 0 && orders?.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <>
      {isOrders() ? (
        <div className={styles.layoutContainer}>
          {state === "loading" && <LinearProgress />}
          <div className={styles.title}>
            <h1>{formatDate(orders[0].pickupDate)}</h1>
          </div>
          {stripes ? (
            <div className={styles.ordersContainer}>
              {orders.map((order) => (
                <OrderStripe key = {order.id} order={order}/>
              ))}
            </div>
          ) : (
            <div className={styles.ordersContainer}>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div data-test="DayView-noOrdersDiv" className={styles.noOrders}>
          Няма поръчки за{" "}
          {format(new Date(params.date as string), "do MMMM, yyyy г.", {
            locale: bg,
          })}
        </div>
      )}
    </>
  );
}

function formatDate(dateString: string) {
  return format(new Date(dateString), "EEEE, do MMMM yyyy г.", { locale: bg });
}
