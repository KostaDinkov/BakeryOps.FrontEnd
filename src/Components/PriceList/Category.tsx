import React from "react";
import ProductDTO from "../../Types/ProductDTO";
import { getSpecialPrice } from "../../Pages/Orders/OrderForm/OrderFormHelperFunctions";
import styles from "./Category.module.scss";
import useClientDiscount from "./useClientDiscount";

export default function Category({
  name,
  products,
  showPriceDrebno,
  showPriceEdro,
  showPriceSpecial,
  forPrint,
}: {
  name: string;
  products: ProductDTO[];
  showPriceDrebno: boolean;
  showPriceEdro: boolean;
  showPriceSpecial: boolean;
  forPrint: boolean;
}) {
  const discount = useClientDiscount();
  return forPrint && products.filter((p) => p.inPriceList).length === 0 ? (
    <></>
  ) : (
    <div className={styles.categoryContainer}>
      <div className={styles.productRow}>
        <span className={styles.categoryHeader}>
          <span className={styles.categoryName}>{name}</span>
          <span className = {styles.categoryText}>Цена в лв.</span>
        </span>
        {showPriceDrebno && <span className={styles.categoryHeader}>Маг. Жана</span>}
        {showPriceEdro && <span className={styles.categoryHeader}>Дистр.</span>}
        {showPriceSpecial && <span className={styles.categoryHeader}>Спец.</span>}
      </div>

      {products.map((product) => {
        return forPrint && !product.inPriceList ? (
          <React.Fragment key={product.id}></React.Fragment>
        ) : (
          <div className={styles.productRow} key={product.id}>
            <span>{product.name}</span>
            {showPriceDrebno && <span>{product.priceDrebno}</span>}
            {showPriceEdro && <span>{product.priceEdro}</span>}
            {showPriceSpecial && (
              <span>{getSpecialPrice(product, discount)}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
