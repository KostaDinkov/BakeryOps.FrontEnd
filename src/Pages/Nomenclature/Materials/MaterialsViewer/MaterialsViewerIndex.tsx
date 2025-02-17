import QueryViewWrapper from "../../../../Components/QueryWrapper/QueryViewWrapper";
import GenericDataViewer from "../../../../Components/GenericDataViewer/GenericDataViewer";
import { MaterialDTO } from "../../../../Types/types";
import { useMaterialsQuery } from "../../../../API/Queries/queryHooks";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../../API/apiClient";
import TitleBar from "../../../../Components/TitleBar/TitleBar";

export default function MaterialsViewerIndex() {
  const materialsQuery = useMaterialsQuery();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMaterialMutation = useMutation({
    mutationFn: async (id: string) =>
      await apiClient.DELETE(`/api/Materials/DeleteMaterial/{id}`, {
        params: { path: { id } },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["materials"]});
    },
  });

  return (
    <>
        <TitleBar title={"Материали"} />
        <QueryViewWrapper<MaterialDTO> query={materialsQuery}>
          {(data) => (
            <GenericDataViewer<MaterialDTO & { id: string }>
              items={data}
              viewConfig={[
                { name: { label: "Име" } },
                { categoryName: { label: "Категория" } },
                { latestPrice: { label: "Последна цена" } },
                { unitName: { label: "Мярка" } },
                { vendorName: { label: "Доставчик" } },
                { description: { label: "Активен" } },
              ]}
              actions={{
                delete: (selectedItem)=> deleteMaterialMutation.mutate(selectedItem.id),
                edit: (selectedItem) =>
                  navigate("./update", { state: { selectedItem } }),
                add: () => navigate("./create"),
              }}
              groupBy="categoryName"
              displayKeys={["name"]}
              title="Стоки"
            />
          )}
        </QueryViewWrapper>
    </>
  );
}
