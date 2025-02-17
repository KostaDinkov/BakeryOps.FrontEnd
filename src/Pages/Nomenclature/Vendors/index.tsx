import Container from '../../../Components/Containers/Container'
import { Outlet } from 'react-router'

export default function Index() {
  return (
    <Container fullWidth >
      <Outlet/>
    </Container>
  )
}
