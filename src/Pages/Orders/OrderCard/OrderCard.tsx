
import styles from "./OrderCard.module.css";
import OrderItem from "./OrderItem";
import EditIcon from "@mui/icons-material/Edit";
import {Link} from "react-router-dom";
import {type OrderDTO} from "../../../Types/types";
import {format} from "date-fns";
import PrintIcon from '@mui/icons-material/Print';

const OrderCard = ({ order }:{order:OrderDTO}) => {

  const containerStyles = () => {
    for (const item of order.orderItems) {
      if (!item.isComplete) {
        return [
          styles.orderCardContainer,
          styles.orderCardContainerNotComplete,
        ].join(" ");
      }
    }

    return [styles.orderCardContainer, styles.orderCardContainerComplete].join(
      " "
    );
  };

  return (
    <div className={containerStyles()}>
      <div className={styles.cardHeader}>
        <span className={styles.pickupTime}>{format(new Date(order.pickupDate),"HH:mm")}</span>{" "}
        <span>{order.clientName}</span>
        <div className={styles.editIcon}>
          <Link  to={`/orders/print/${order.id}`}>
            <PrintIcon fontSize="small" cursor="pointer" sx={{color:"white"}} />
          </Link>
          <Link  to={`/orders/update/${order.id}`}>
            <EditIcon fontSize="small" cursor="pointer" sx={{color:"white"}} />
          </Link>
        </div>
      </div>
      <div className={styles.headerDetails}>
        <span>тел: {order.clientPhone}</span>
        {order.advancePaiment !== 0 && (
          <span
            className={[styles.textBadge, styles.textBadgeYellow].join(" ")}
          >
            Капаро: {order.advancePaiment} лв.
          </span>
        )}
        {order.isPaid === true && (
          <span className={[styles.textBadge, styles.textBadgeRed].join(" ")}>
            ПЛАТЕНА
          </span>
        )}
      </div>
      
        {order.orderItems.map((item, index) => (
          <OrderItem key={item.id as number} itemId={item.id as number} order={order} />
        ))}
      
    </div>
  );
};

export default OrderCard;
