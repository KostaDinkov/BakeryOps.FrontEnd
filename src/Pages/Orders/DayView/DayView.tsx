import { useEffect, useState } from "react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import {
  useLoaderData,
  useParams,
  useNavigation,
} from "react-router-dom";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./DayView.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import OrderStripe from "./OrderStripe";
import { OrderDTO } from "../../../Types/types";
import { useOrdersByDateQuery } from "../../../API/Queries/queryHooks";


export default function DayView() {
  
  const { state } = useNavigation();
  
  const [stripes, setStripes] = useState(true);
  let {date} = useParams();

  const ordersForDateQuery= useOrdersByDateQuery({date:new Date(date)});
  
  useEffect(()=>{
    PubSub.subscribe("DBOrdersUpdated", async (msg) => {
      
    });
  },[])
  
  if(ordersForDateQuery.isLoading){
    return <LinearProgress />
  }
  if(ordersForDateQuery.isError){
    return <div>Error loading orders</div>
  }

  function isOrders(): boolean {
    if (ordersForDateQuery.data && ordersForDateQuery.data.length > 0 ) {
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
            <h1>{formatDate(ordersForDateQuery.data[0].pickupDate)}</h1>
          </div>
          {stripes ? (
            <div className={styles.ordersContainer}>
              {ordersForDateQuery.data.map((order:OrderDTO) => (
                <OrderStripe key = {order.id} order={order}/>
              ))}
            </div>
          ) : (
            <div className={styles.ordersContainer}>
              {ordersForDateQuery.data.map((order:OrderDTO) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div data-test="DayView-noOrdersDiv" className={styles.noOrders}>
          Няма поръчки за{" "}
          {format(new Date(date), "do MMMM, yyyy г.", {
            locale: bg,
          })}
        </div>
      )}
    </>
  );
}

function formatDate(date: string) {
  return format(new Date(date), "EEEE, do MMMM yyyy г.", { locale: bg });
}
