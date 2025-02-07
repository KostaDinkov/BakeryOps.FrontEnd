import { Outlet } from "react-router-dom";
import Container from "../../../Components/Containers/Container";

export default function Index() {
  return (
    <Container fullWidth>
      <Outlet/>
    </Container>
  );
}
