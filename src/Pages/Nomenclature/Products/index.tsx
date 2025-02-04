import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useProductsQuery } from "../../../API/Queries/queryHooks";
import ProductsPage from "./ProductsPage"



export default function ProductsHome() {
  const productsQuery = useProductsQuery();
  return productsQuery.isLoading ? (
    <div>Loading...</div>
  ) : (
   <ProductsPage />
  );
}
