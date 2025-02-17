import Container from '../../Components/Containers/Container'
import { Outlet } from 'react-router'

export default function RecipesIndex() {
  return (
    <Container fullWidth >
      <Outlet/>
    </Container>
  )
}
