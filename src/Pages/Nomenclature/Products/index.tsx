import { Button } from "@mui/material";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import { Link, Outlet } from "react-router";
import Container from "../../../Components/Containers/Container";

export default function ProductsHome() {

  return (
    <Container fullWidth>
      <TitleBar title={"Продукти"}>
				<Link to="./">
					<Button >Продукти</Button>
				</Link>
        <Link to="./priceList">
					<Button >Ценова листа</Button>
				</Link>
      </TitleBar>
		  <Outlet/>
    </Container>
  );
}
