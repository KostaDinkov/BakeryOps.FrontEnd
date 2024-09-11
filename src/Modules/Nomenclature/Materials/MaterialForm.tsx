import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Category from "../../../Types/Category";
import { Material } from "../../../Types/Material";
import Vendor from "../../../Types/Vendor";
import styles from "./MaterialForm.module.scss";

export default function MaterialForm({
  selectedMaterial,
  categories,
  vendors,
  onSubmit,
}: {
  selectedMaterial: Material;
  categories: Category[];
  vendors: Vendor[];
  onSubmit: (formData: Material, mode: "create" | "update") => void;
}) {
  const isNew = selectedMaterial?.id === "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();

    let material = {} as Material;

    
    material.id = selectedMaterial.id ;
    material.name = formData.get("name") as string;
    material.unit = formData.get("unit") as string;
    material.category = categories.filter(
      (c) => c.name === formData.get("category")
    )[0];
    material.vendor = vendors.filter(
      (v) => v.name === formData.get("vendor")
    )[0];
    material.description = formData.get("description") as string;

    onSubmit(material, isNew ? "create" : "update");
  };

  return (
    selectedMaterial && (
      <form className={styles.materialForm} onSubmit={handleSubmit}>
        <TextField
          label="Име"
          id="name"
          name="name"
          defaultValue={selectedMaterial.name}
        />
        <TextField
          label="Мярка"
          id="unit"
          name="unit"
          defaultValue={selectedMaterial.unit}
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            label="Категория"
            id="category"
            name="category"
            defaultValue={
              isNew
                ? ""
                : categories.filter(
                    (category) => category.id === selectedMaterial.category.id
                  )[0].name
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="vendor-label">Доставчик</InputLabel>
          <Select
            labelId="vendor-label"
            id="vendor"
            name="vendor"
            label="Доставчик"
            defaultValue={
              isNew
                ? ""
                : vendors.filter((v) => v.id === selectedMaterial.vendor.id)[0]
                    .name
            }
          >
            {vendors.map((vendor) => (
              <MenuItem key={vendor.name} value={vendor.name}>
                {vendor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Описание"
          id="description"
          name="description"
          defaultValue={selectedMaterial.description || ""}
        />
        <Button variant="contained" color="primary" type="submit">
          Запази
        </Button>
      </form>
    )
  );
}
