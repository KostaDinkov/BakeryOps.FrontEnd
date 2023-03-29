import React from "react";
import ProductDTO from "../../Types/ProductDTO";
import { getSpecialPrice } from "../OrderForm/OrderFormHelperFunctions";
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
        <span className={styles.categoryName}>{name} | Цена в лв. </span>
        {showPriceDrebno && <span className={styles.categoryName}>дребно</span>}
        {showPriceEdro && <span className={styles.categoryName}>едро</span>}
        {showPriceSpecial && <span className={styles.categoryName}>спец.</span>}
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
