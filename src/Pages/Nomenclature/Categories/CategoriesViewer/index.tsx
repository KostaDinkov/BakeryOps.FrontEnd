import { CategoryDTO } from "../../../../Types/types";
import GenericCrud2 from "../../../../Components/GenericCRUD2/GenericCrud2";
import { useCategoriesQuery } from "../../../../API/Queries/queryHooks";
import QueryViewWrapper from "../../../../Components/QueryWrapper/QueryViewWrapper";
import { useNavigate } from "react-router";
import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { useMutation } from "@tanstack/react-query";
import { useHandleApiResponse } from "../../../../API/apiUtils";
import { apiClient } from "../../../../API/apiClient";

export default function CategoriesPage() {
  const handleApiResponse = useHandleApiResponse();
  const categoriesQuery = useCategoriesQuery();
  const navigate = useNavigate();

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE(`/api/Categories/DeleteCategory/{id}`, {
            params: { path: { id } },
          })
      ),
    onSuccess: () => {
      categoriesQuery.refetch();
    }
  });


  return (
    <>
      <TitleBar title="Категории" />
      <QueryViewWrapper<CategoryDTO> query={categoriesQuery}>
        {(data) => (
          <GenericCrud2<CategoryDTO & { id: string }>
            items={Array.isArray(data) ? data : [data]}
            viewConfig={[{ name: { label: "Име" } }]}
            displayKeys={["name"]}
            actions={{
              edit: (selectedItem) =>
                navigate("./update", { state: { selectedItem } }),
              delete: (selectedItem) => deleteCategoryMutation.mutate(selectedItem.id),
              add: () => navigate("./create"),
            }}
          />
        )}
      </QueryViewWrapper>
    </>
  );
}
