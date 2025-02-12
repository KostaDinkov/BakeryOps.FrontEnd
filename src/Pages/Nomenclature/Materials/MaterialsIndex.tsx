import { Outlet } from "react-router";
import Container from "../../../Components/Containers/Container";
import TitleBar from "../../../Components/TitleBar/TitleBar";


export default function Index() {
  return (
    <Container fullWidth>
      
      <Outlet/>
    </Container>
  )
}
