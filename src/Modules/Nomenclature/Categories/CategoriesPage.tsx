import { z } from "zod";
import { apiClient } from "../../../API/apiClient";
import { components } from "../../../API/apiSchema";
import GenericCRUDView, { IItemOperations } from "../GenericCRUD/GenericCRUD";
import { TextField } from "@mui/material";

type CategoryDTO = components["schemas"]["CategoryDTO"];

const categorySchema: z.ZodSchema<CategoryDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z.string().min(3).max(50),
});

export default function CategoriesPage() {
  const categoryOperations: IItemOperations<CategoryDTO>=
  {
    queryKey: ["categories"],
    getItems: async () => {
      const result = await apiClient.GET("/api/Categories/GetCategories");
      return result.data as unknown as CategoryDTO[];
    },
    createItem :async (item: CategoryDTO) => {
      const result = await apiClient.POST("/api/Categories/AddCategory", {
        body: item,
      });
      return result.data as unknown as CategoryDTO;
    },
    updateItem: async (item: CategoryDTO) => {
      const result = await apiClient.PUT("/api/Categories/UpdateCategory", {
        body: item,
      });
      return result.data as unknown as CategoryDTO;
    },
    deleteItem: async (id: string) => {
      await apiClient.DELETE("/api/Categories/DeleteCategory/{id}", {params:{path:{id}}}); ;
    },

  }

  const CategoriesList:React.FC<{data:CategoryDTO[],setSelectedItem:React.Dispatch<CategoryDTO|null>}> = ({data,setSelectedItem})=>{
    return(
      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={() => setSelectedItem(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    )
  }

  const CategoryDetails: React.FC<{ selectedItem: CategoryDTO|null }> = ({ selectedItem }) => {
    return (
      selectedItem &&
      (<dl>
        <dt>Име</dt>
        <dd>{selectedItem.name}</dd>
      </dl>)
      
    );
  }

  const CategoryFormFields:React.FC<{selectedItem:CategoryDTO | null} > = ({selectedItem}) => {
    return(
      <>
      <TextField
        name="name"
        label="Име"
        defaultValue = {selectedItem?.name}
        />
      </>
    )
  }
  return (
    <GenericCRUDView
      title={"Категории"}
      ItemFormFields={CategoryFormFields}
      ItemsList={CategoriesList}
      ItemDetails={CategoryDetails}
      itemSchema={categorySchema}
      itemOperations={categoryOperations}
      newBtnText="Добави Категория"
    />
  );
}
