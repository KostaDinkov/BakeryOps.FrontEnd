import { Outlet } from "react-router";
import Container from "../../Components/Containers/Container";

export default function Index(){
    return (
        <Container fullWidth >
         <Outlet/>
        </Container>
    )
}