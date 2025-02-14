import { useMutation } from "@tanstack/react-query";
import { useRecipesQuery } from "../../../API/Queries/queryHooks";
import GenericCrud2 from "../../../Components/GenericCRUD2/GenericCrud2";
import QueryViewWrapper from "../../../Components/QueryWrapper/QueryViewWrapper";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import { RecipeDTO } from "../../../Types/types";
import { useHandleApiResponse } from "../../../API/apiUtils";
import { apiClient } from "../../../API/apiClient";
import { useNavigate } from "react-router";

export default function RecipeViewerIndex() {
  const recipesQuery = useRecipesQuery();
  const navigate = useNavigate();
  const handleApiResponse = useHandleApiResponse();
  const deleteRecipeMutation = useMutation({
    mutationFn: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE(`/api/Recipes/DeleteRecipe/{id}`, {
            params: { path: { id } },
          })
      ),
      onSuccess: () => recipesQuery.refetch(),
  });

  return (
    <>
      <TitleBar title="Рецепти" />
      <QueryViewWrapper<RecipeDTO> query={recipesQuery}>
        {(data) => {
          return (
            <GenericCrud2<RecipeDTO>
              items={data}
              viewConfig={[
                { name: { label: "Име" } },
                { description: { label: "Описание" } },
                { cost: { label: "Себестойност" } },
                { yield: { label: "Изходно количество" } },
                { workHours: { label: "Работни часове" } },
                {
                  ingredients: {
                    label: "Съставки",
                    columnDef: [
                      { field: "materialName", headerName: "Материал" },
                      { field: "quantity", headerName: "Количество" },
                    ],
                  },
                },
                {
                  subRecipes: {
                    label: "Подрецепти",
                    columnDef: [
                      { field: "subRecipeName", headerName: "Подрецепта" },
                      { field: "quantity", headerName: "Количество" },
                    ],
                  },
                },
              ]}
              actions={{
                delete: (selectedItem)=> deleteRecipeMutation.mutate(selectedItem.id),
                edit: (selectedItem)=> navigate(`/recipes/update/`,{state:{selectedItem}}),
                add:()=> navigate(`/recipes/create/`),
              }}
              displayKeys={["name"]}
            />
          );
        }}
      </QueryViewWrapper>
    </>
  );
}
