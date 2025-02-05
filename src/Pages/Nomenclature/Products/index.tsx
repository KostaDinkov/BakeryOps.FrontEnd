import { Button } from "@mui/material";
import { useProductsQuery } from "../../../API/Queries/queryHooks";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import ProductPage from "./ProductsPage";
import { Link, Outlet } from "react-router-dom";

export default function ProductsHome() {
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  } else if (productsQuery.isError) {
    return <div>Error: {productsQuery.error.message}</div>;
  }
  return (
    <div className="w-full">
      <TitleBar title={"Продукти"}>
				<Link to="./">
					<Button >Продукти</Button>
				</Link>
        <Link to="./priceList">
					<Button >Ценова листа</Button>
				</Link>
      </TitleBar>
		  <Outlet/>
    </div>
  );
}
