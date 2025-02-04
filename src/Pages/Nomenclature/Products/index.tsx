import { useProductsQuery } from "../../../API/Queries/queryHooks";
import ProductPage from "./ProductsPage"


export default function ProductsHome() {
 const productsQuery = useProductsQuery();
 
   if (productsQuery.isLoading) {
     return <div>Loading...</div>;
   } else if (productsQuery.isError) {
     return <div>Error: {productsQuery.error.message}</div>;
   }
   return(
   <ProductPage products={productsQuery.data}/>
)
  
}
