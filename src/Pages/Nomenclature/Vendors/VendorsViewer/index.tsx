import { useNavigate } from "react-router";
import { apiClient } from "../../../../API/apiClient";
import { useHandleApiResponse } from "../../../../API/apiUtils";
import { useVendorsQuery } from "../../../../API/Queries/queryHooks";
import GenericCrud2 from "../../../../Components/GenericCRUD2/GenericCrud2";
import QueryViewWrapper from "../../../../Components/QueryWrapper/QueryViewWrapper";
import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { VendorDTO } from "../../../../Types/types";
import { useMutation } from "@tanstack/react-query";

export default function Index() {
  const handleApiResponse = useHandleApiResponse();
  const vendorsQuery = useVendorsQuery();
  const navigate = useNavigate();

  const deleteVendorMutation = useMutation({
    mutationFn: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE(`/api/Vendors/DeleteVendor/{id}`, {
            params: { path: { id } },
          })
      ),
    onSuccess: () => {
      vendorsQuery.refetch();
    }
  });

  return (
    <>
      <TitleBar title="Доставчици" />
      <QueryViewWrapper<VendorDTO> query={vendorsQuery}>
        {(data) => (
          <GenericCrud2<VendorDTO & { id: string }>
            items={data}
            viewConfig={[
              { name: { label: "Име" } },
              { phoneNumber: { label: "Телефон" } },
              { email: { label: "Имейл" } },
              { address: { label: "Адрес" } },
            ]}
            actions={{
              delete: (selectedItem) => deleteVendorMutation.mutate(selectedItem.id),
              edit: (selectedItem)=> navigate('./update', {state: {selectedItem}}),
              add: ()=> navigate('./create'),
            }}
            displayKeys={["name"]}
            title="Доставчици"
          />
        )}
      </QueryViewWrapper>
    </>
  );
}
