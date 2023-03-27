import { useState } from "react";
import ProductsService from "../../API/productsService";
import ProductDTO from "../../Types/ProductDTO";
import { useLoaderData } from "react-router-dom";
import { getProductsByCategory } from "../../system/utils";
import Category from "./Category";
import styles from "./PriceList.module.scss";
import Checkbox from "@mui/material/Checkbox";

export const loader = async () => {
  var products = await ProductsService.getProducts();
  return products;
};

export default function PriceList({ isPrint }: { isPrint: boolean }) {
  const [showPriceDrebno, setShowPriceDrebno] = useState(true);
  const [showPriceEdro, setShowPriceEdro] = useState(true);
  const [showPriceSpecial, setShowPriceSpecial] = useState(true);
  const [forPrint, setForPrint] = useState(false);

  const products = useLoaderData() as ProductDTO[];
  const productsByCat = getProductsByCategory(products);

  const handlePrint = () => {
    var styleElement = document.getElementById("pageStyle");
    if (styleElement) {
      styleElement.innerHTML = `@page{size:A4 portrait; margin: 0.75cm;}`;
    }
    window.print();
  };
  return (
    <div className={styles.priceListContainer}>
      <h1>Ценоразпис</h1>
      <div className={styles.priceListMenu}>
        <button onClick={handlePrint}>Отпечатай</button>
        <div className={styles.priceListOptions}>
          <span>Цени на дребно:</span>
          <Checkbox
            checked={showPriceDrebno}
            onChange={(e) => setShowPriceDrebno(e.target.checked)}
          />
          <span>Цени на едро:</span>
          <Checkbox
            checked={showPriceEdro}
            onChange={(e) => setShowPriceEdro(e.target.checked)}
          />
          <span>Цени специални:</span>
          <Checkbox
            checked={showPriceSpecial}
            onChange={(e) => setShowPriceSpecial(e.target.checked)}
          />
          <span>За Печат:</span>
          <Checkbox
            checked={forPrint}
            onChange={(e) => setForPrint(e.target.checked)}
          />
        </div>
      </div>
      {Object.entries(productsByCat).map(([cat, products]) => {
        return (
          <Category
            key={cat}
            name={cat}
            products={products}
            showPriceDrebno={showPriceDrebno}
            showPriceEdro={showPriceEdro}
            showPriceSpecial={showPriceSpecial}
            forPrint={forPrint}
          />
        );
      })}
    </div>
  );
}
