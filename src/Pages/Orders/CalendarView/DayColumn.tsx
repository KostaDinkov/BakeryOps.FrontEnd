
import styles from "./DayColumn.module.css";

import {format} from 'date-fns';
import { Link } from "react-router-dom";
import {OrderDTO} from "../../../Types/types";
import { bg } from "date-fns/locale";
import OrderCardCompact from "../OrderCardCompact/OrderCardCompact";


const DayColumn = ({ data }:{data:OrderDTO[]}) => {
  if(data.length===0){
    return (
      <div>No orders for the day{}</div>
    )
  }
  
  const date = new Date(data[0].pickupDate);
  return (
    <section>
      <header>
        <Link to={`/orders/forDay/${format(date,"yyyy-MM-dd")}`}>
          <span className={styles.date}>{format(date,"dd")}</span>{" "}
          <span className={styles.monthYear}>{format(date,"MMMM yyyy",{locale:bg})}</span>
        </Link>
      </header>
      <div className={styles.orderList}>
        {data.map((order) => (
          <OrderCardCompact key={order.id} order={order}></OrderCardCompact>
        ))}
      </div>
    </section>
  );
};

export default DayColumn;
