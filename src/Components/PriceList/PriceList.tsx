import { useState } from "react";
import ProductsService from "../../API/productsService";
import ProductDTO from "../../Types/ProductDTO";
import { useLoaderData } from "react-router-dom";
import { getProductsByCategory } from "../../system/utils";
import Category from "./Category";
import styles from "./PriceList.module.scss";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ProductsByCategory } from "../../Types/helpers";

export const loader = async () => {
  var products = await ProductsService.getProducts();
  return products;
};

export default function PriceList({ isPrint }: { isPrint: boolean }) {
  const [showPriceDrebno, setShowPriceDrebno] = useState(true);
  const [showPriceEdro, setShowPriceEdro] = useState(true);
  const [showPriceSpecial, setShowPriceSpecial] = useState(true);
  const [forPrint, setForPrint] = useState(false);
  const [search, setSearch] = useState("");

  const products = useLoaderData() as ProductDTO[];
  const [productsByCat,setProductsByCat] = useState(getProductsByCategory(products));

  const handlePrint = () => {
    var styleElement = document.getElementById("pageStyle");
    if (styleElement) {
      styleElement.innerHTML = `@page{size:A4 portrait; margin: 0.75cm;}`;
    }
    window.print();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setProductsByCat(filterProducts(e.target.value));
  };

  const filterProducts = (searchStr:string) => {
    const filteredProducts = products.filter((p) => {
      let terms = searchStr.split(" ");
      return terms.every((term) =>
        (p.name.toLowerCase()+p.code).includes(term.toLowerCase())
      );
    });
    return getProductsByCategory(filteredProducts);
  };
  return (
    <div className={styles.priceListContainer}>
      <p className={styles.companyLabel}>
        <em>Сладкарска Работилница Жана ООД - гр. Ихтиман</em>
      </p>
      <h1>Ценоразпис</h1>
      <div className={styles.priceListMenu}>
        <div className={styles.buttons}>
          <Button onClick={handlePrint} variant="outlined">
            Отпечатай
          </Button>
          <TextField
            onChange={handleFilterChange}
            size="small"
            label="Филтър"
          />
        </div>
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
