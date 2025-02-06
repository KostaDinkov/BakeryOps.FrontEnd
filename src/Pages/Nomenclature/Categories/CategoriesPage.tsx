import React from "react";
import { TextField } from "@mui/material";
import { CategoryDTO } from "../../../Types/types";
import { customInvalidProps } from "../../../system/utils";
import GenericCrud2 from "../../../Components/GenericCRUD2/GenericCrud2";
import { useCategoriesQuery } from "../../../API/Queries/queryHooks";
import QueryViewWrapper from "../../../Components/QueryWrapper/QueryViewWrapper";

export default function CategoriesPage() {

  const categoriesQuery = useCategoriesQuery();


  function ItemForm({
    selectedItem,
    handleSave,
    Buttons,
    
  }: {
    selectedItem: CategoryDTO | null;
    handleSave: (item: object) => void;
    Buttons: React.FC;
  }) {
    const [formData, setFormData] = React.useState<CategoryDTO | null>(
      selectedItem 
    );
    //Todo: Implement form submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let newCategory = formData;
      if(!newCategory){
        return;
      }
      //Todo: Call handleSave with the object constructed from the form data
      handleSave(newCategory);
    };

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          required
          {...customInvalidProps("Името на категорията е задължително")}
          name="name"
          label="Име"
          value={formData?.name || ""}
          onChange={(e) => setFormData({...formData, name:e.target.value})}
        />
        <Buttons />
      </form>
    );
  }

  return (
    <QueryViewWrapper<CategoryDTO> query={categoriesQuery}>
      {(data) => (
        <GenericCrud2<CategoryDTO>
          items={data}
          viewConfig={[
            { name: { label: "Име" } },
          ]}
          displayKeys={["name"]}
        />
      )}
    </QueryViewWrapper>
  );
}
