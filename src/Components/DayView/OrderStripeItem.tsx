import OrderItemDTO from "../../Types/OrderItemDTO";
import styles from "./OrderStripeItem.module.scss";

export default function OrderStripe({ item }: { item: OrderItemDTO }) {
  return (
    <div className={styles.stripeItemContainer}>
      <div>
        <span className={styles.itemAmount}>
          <strong>{item.productAmount}</strong>{" "}{item.product.unit}
        </span>

        <span className={styles.productName}>{item.product.name}</span>
      </div>
      <div>
        {item.cakeFoto && (
          <span>
            <strong> Фото:</strong> {item.cakeFoto}
          </span>
        )}
        {item.cakeTitle && (
          <span>
            <strong> Надпис:</strong> {item.cakeTitle}
          </span>
        )}
        {item.description && (
          <span>
            <strong> Бележка:</strong> {item.description}
          </span>
        )}
      </div>
    </div>
  );
}
