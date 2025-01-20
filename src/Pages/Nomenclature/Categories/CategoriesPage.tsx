import React from "react";
import GenericCRUDView, {
  IItemOperations,
  ItemFormType,
} from "../../../Components/GenericCRUD/GenericCRUD";
import z from "zod";
import { handleApiResponse } from "../../../API/apiUtils";
import { TextField } from "@mui/material";
import { apiClient } from "../../../API/apiClient";
import { CategoryDTO } from "../../../Types/types";
import { customInvalidProps } from "../../../system/utils";
import {twoColumnGrid} from "../../../styles/globalStyles.module.css"

export default function CategoriesPage() {
  //Todo: Implement item schema. See the example below
  const categorySchema: z.ZodSchema<CategoryDTO> = z.object({
    id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
    name: z.string().min(3,{message:"Името на категорията трябва да е от минимум 3 символа"}).max(50),
  });

  //Todo: Implement item operations. See the example below

  /**
   * React functional component for creating and updating crud items
   * @param selectedItem  provided when the form is being used for updating and item. If not null, the form should be populated with the selectedItem data
   * @param { (item: object): void;} handleSave call this function inside handleSubmit with the object constructed from the form data
   * @param Buttons the 'Save' and 'Cancel' buttons provided by the GenericCRUDView component
   * @param queryData optional data that can be used in the form
   * @returns
   */
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

  /**
   * React functional component for listing crud items
   * @param data the list of items to be displayed
   * @param setSelectedItem function to set the selected item
   * @returns
   */
  function ItemsList({
    data,
    setSelectedItem,
  }: {
    data: CategoryDTO[];
    setSelectedItem: React.Dispatch<CategoryDTO | null>;
  }) {
    //Todo: implement the proper view for the list items
    //Todo: for each item implement onClick event that calls setSelectedItem with the item

    return <ul>
    {data.map((item) => (
      <li key={item.id} onClick={() => setSelectedItem(item)}>
        {item.name}
      </li>
    ))}
  </ul>;
  }

  /**
   * React functional component for displaying the details of a selected item
   * @param selectedItem the selected item
   * @returns
   */
  function ItemDetails({
    selectedItem,
    queryData,
  }: {
    selectedItem: CategoryDTO | null;
    queryData?: object;
  }) {
    return selectedItem &&
    (<dl className={twoColumnGrid}>
      <dt>Име</dt>
      <dd>{selectedItem.name}</dd>
    </dl>);
  }

  //Todo:Implement item operations. See the example below
  const itemOperations: IItemOperations<CategoryDTO> = {
    queryKey: ["enter query key here"],
    getItems: async () =>
      await handleApiResponse(
        async () => await apiClient.GET("/api/Categories/GetCategories")
      ),
    createItem: async (item: CategoryDTO) =>
      await handleApiResponse(
        async () => await apiClient.POST("/api/Categories/AddCategory", {
          body: item,
        }) 
      ),
    updateItem: async (item: CategoryDTO) =>
      await handleApiResponse(
        async () => await apiClient.PUT("/api/Categories/UpdateCategory", {
          body: item,
        })
      ),
    deleteItem: async (id: string) =>
      await handleApiResponse(
        async () => await apiClient.DELETE("/api/Categories/DeleteCategory/{id}", {params:{path:{id}}}) 
      ),
  };

  // Todo: change 'title' and 'newBtnText' strings as fit
  return (
    <GenericCRUDView
      title={"Категории Стоки"}
      ItemForm={ItemForm}
      ItemsList={ItemsList}
      ItemDetails={ItemDetails}
      itemSchema={categorySchema}
      itemOperations={itemOperations}
      newBtnText={"Нова Категория"}
    />
  );
}
