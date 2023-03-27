import React, { useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ProductDTO from "../../Types/ProductDTO";
import ProductCountDialog from "./ProductCountDialog";
import { ProductSelectorValues } from "./OrderFormHelperFunctions";
import styles from './ProductsAccordion.module.scss';
import { ProductsByCategory } from "../../Types/helpers";
import { getProductsByCategory } from "../../system/utils";



export default function ProductsAccordion({
  products,
  addNewProductSelector,
}: {
  products: ProductDTO[];
  addNewProductSelector: (selectorValues: ProductSelectorValues) => void;
}) {
  let productsByCat = getProductsByCategory(products);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [product, setProduct] = React.useState<ProductDTO | null>(null);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [callerElement, setCallerElement] = React.useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    let firstCategory = document.querySelector(
      "div.category"
    ) as HTMLDivElement;
    
    firstCategory.focus();
  }, []);

  const handleDialogOpen = (product: ProductDTO, element: HTMLElement) => {
    setProduct(product);
    setCallerElement(element);
    setDialogOpen(true);
  };

  const handleDialogClose = (caller: HTMLElement) => {
    setDialogOpen(false);
    caller.focus();
  };

  const handleKeyDown =
    (category: string, product: ProductDTO | null) =>
    (event: React.KeyboardEvent<HTMLElement>) => {
      let target = event.target as HTMLElement;

      if (event.key === "ArrowLeft") {
        setExpanded(false);
        (target.closest("div.category") as HTMLElement).focus();
      }
      if (event.key === "ArrowRight") {
        setExpanded(category);
      }
      if (event.key === "ArrowDown") {
        target.nextElementSibling &&
          (target.nextElementSibling as HTMLElement).focus();
      }
      if (event.key === "ArrowUp") {
        target.previousElementSibling &&
          (target.previousElementSibling as HTMLElement).focus();
      }
      if (event.key === "Enter") {
        product && handleDialogOpen(product, event.target as HTMLElement);
      }
    };

  return (
    <div className={styles.container}>
      {Object.entries(productsByCat).map((group) => (
        <Category 
          
          key={group[0]}
          isExpanded={expanded === group[0]}
          onKeyDown={handleKeyDown(group[0], null)}
          name={group[0]}
          setExpanded={setExpanded}
        >
          <div className={"products"}>
            <ul>
              {group[1].map((p) => (
                <li
                  key={p.id}
                  tabIndex={0}
                  onKeyDown={handleKeyDown(group[0], p)}
                  onClick = {(evt)=>{
                    evt.stopPropagation();
                    handleDialogOpen(p,evt.target as HTMLElement);
                  }}
                >
                  <Typography>{p.name}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </Category>
      ))}
      {product && callerElement && (
        <ProductCountDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          addNewProductSelector={addNewProductSelector}
          product={product}
          caller={callerElement}
        />
      )}
    </div>
  );
}

function Category(props: any) {
  let { isExpanded, setExpanded, onKeyDown, name } = props;

  let prodContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isExpanded) {
      (prodContainer.current?.querySelector("li") as HTMLLIElement).focus();
    }
  }, [isExpanded]);

  return (
    <div
      
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={[styles.category, "category"].join(" ")}
      onClick={() => {
        if (isExpanded) {
          setExpanded(false);
        } else setExpanded(name);
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <div hidden={!isExpanded} ref={prodContainer}>
        {props.children}
      </div>
    </div>
  );
}
