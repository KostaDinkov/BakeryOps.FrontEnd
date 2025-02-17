import { useNavigate } from "react-router";
import { apiClient } from "../../../../API/apiClient";
import { useHandleApiResponse } from "../../../../API/apiUtils";
import { useClientsQuery } from "../../../../API/Queries/queryHooks";
import GenericDataViewer from "../../../../Components/GenericDataViewer/GenericDataViewer";
import QueryViewWrapper from "../../../../Components/QueryWrapper/QueryViewWrapper";
import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { ClientDTO } from "../../../../Types/types";
import { useMutation } from "@tanstack/react-query";

export default function Index() {
  const handleApiResponse = useHandleApiResponse();
  const clientsQuery = useClientsQuery();
  const navigate = useNavigate();

  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE(`/api/Clients/{id}`, {
            params: { path: { id } },
          })
      ),
    onSuccess: () => {
      clientsQuery.refetch();
    }
  });

  return (
    <>
      <TitleBar title="Клиенти" />
      <QueryViewWrapper<ClientDTO> query={clientsQuery}>
        {(data) => (
          <GenericDataViewer<ClientDTO & { id: string }>
            items={data}
            viewConfig={[
              { name: { label: "Име" } },
              { email: { label: "Имейл" } },
              { phone: { label: "Телефон" } },
              { isCompany: { label: "Компания?" } },
              { hasDiscount: { label: "Отстъпка?" } },
              { isSpecialPrice: { label: "Специална цена?" } },
            ]}
            actions={{
              delete: (selectedItem) => deleteClientMutation.mutate(selectedItem.id),
              edit: (selectedItem)=> navigate('./update', {state: {selectedItem}}),
              add: ()=> navigate('./create'),
            }}
            displayKeys={["name"]}
            title="Клиенти"
          />
        )}
      </QueryViewWrapper>
    </>
  );
}
