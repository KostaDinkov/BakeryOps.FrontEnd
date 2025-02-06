import Container from "../../../Components/Containers/Container";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import CategoriesPage from "./CategoriesPage";

export default function Index() {
  return (
    <Container fullWidth>
      <TitleBar title="Категории" />
      <CategoriesPage />
    </Container>
  );
}
