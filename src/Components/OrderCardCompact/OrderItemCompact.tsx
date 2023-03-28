import styles from "./OrderItemCompact.module.css";
import OrderItemDTO from "../../Types/OrderItemDTO";

const OrderItem = ({item}: { item: OrderItemDTO}) => {
  return (
    <div
      className={
        item.isComplete ? styles.completed : item.isInProgress ? styles.inProgress : null
      }
    >
      <div className={styles.itemRow}>
        <span className={styles.itemName}>{item.product.name} </span>
        <span className={styles.icons}>
          {item.cakeFoto && <span className={styles.iconFoto}>Ф</span>}
          {item.cakeTitle && <span className={styles.iconCakeTitle}>Н</span>}
          {item.description && (
            <span className={styles.iconDescription}>Б</span>
          )}
        </span>
        <span className={styles.itemAmount}>{item.productAmount} бр.</span>
      </div>
    </div>
  );
};

export default OrderItem;
