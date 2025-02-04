import { components } from "../../../API/apiSchema";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useProductsQuery } from "../../../API/Queries/queryHooks";

import { getProductsByCategory } from "../../../system/utils";

type Product = components["schemas"]["Product"];

export default function ProductsPage() {
  
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  } else if (productsQuery.isError) {
    return <div>Error: {productsQuery.error.message}</div>;
  }

  const productsByCategory = getProductsByCategory(productsQuery.data);

  return (
    <div>
      <h1>Products</h1>

      {Object.entries(productsByCategory).map(([category, products]) => {
        return (
          <Accordion key={category}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <strong>{category}</strong>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {products?.map((product: Product) => {
                  return <li key={product.id}>{product.name}</li>;
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
