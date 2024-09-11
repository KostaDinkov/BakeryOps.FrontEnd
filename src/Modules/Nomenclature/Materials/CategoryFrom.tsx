import { TextField, Button } from "@mui/material";
import styles from "./MaterialForm.module.scss";
import Category from "../../../Types/Category";

export default function CategoryFrom({
  onSubmit,
}: {
  onSubmit: (formData: Category) => void;
}) {
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let category = {} as Category;
    category.name = formData.get("name") as string;

    onSubmit(category);
};
  return (
    <form className={styles.materialForm} onSubmit={handleSubmit}>
      <TextField label="Име" id="name" name="name" />
      <Button type="submit" variant="contained" color="primary">
        Запази
      </Button>
    </form>
  );
}
