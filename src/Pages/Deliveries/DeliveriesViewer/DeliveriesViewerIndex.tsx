import { useMutation } from "@tanstack/react-query";
import { useDeliveriesQuery } from "../../../API/Queries/queryHooks";
import GenericDataViewer from "../../../Components/GenericDataViewer/GenericDataViewer";
import QueryViewWrapper from "../../../Components/QueryWrapper/QueryViewWrapper";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import { isoDateToString } from "../../../system/utils";
import { DeliveryDTO } from "../../../Types/types";
import { useNavigate } from "react-router";
import { useHandleApiResponse } from "../../../API/apiUtils";
import { apiClient } from "../../../API/apiClient";
export default function DeliveriesViewerIndex() {
  const navigate = useNavigate();
  const deliveriesQuery = useDeliveriesQuery();
  const handleApiResponse = useHandleApiResponse();

  const deleteMutation = useMutation({
    mutationFn: async (selectedItem: DeliveryDTO) =>
      await handleApiResponse(async () =>
        apiClient.DELETE("/api/Deliveries/Delete/{id}", {
          params: { path: { id: selectedItem.id! } },
        })
      ),
    onSuccess: () => {
      deliveriesQuery.refetch();
    },
  });

  return (
    <>
      <TitleBar title="Доставки" />
      <QueryViewWrapper<DeliveryDTO> query={deliveriesQuery}>
        {(data) => {
          return (
            <GenericDataViewer<DeliveryDTO & { id: string }>
              items={data as DeliveryDTO[]& { id: string }[]}
              viewConfig={[
                { vendorName: { label: "Доставчик" }, },
                {
                  total: {
                    label: "Обща сума",
                    valueFormatter: (value) => `${value} лв.`,
                  },
                },
                {
                  tax: {
                    label: "ДДС",
                    valueFormatter: (value) => `${value} лв.`,
                  },
                },
                {
                  totalWithTax: {
                    label: "Обща сума с ДДС",
                    valueFormatter: (value) => `${value} лв.`,
                  },
                },
                {
                  deliveryDate: {
                    label: "Дата на доставка",
                    valueFormatter: (value) => isoDateToString(value),
                  },
                },
                { invoiceNumber: { label: "Фактура" } },
                { notes: { label: "Бележки" } },
                {
                  items: {
                    label: "Материали",
                    columnDef: [
                      { field: "materialName", headerName: "Име" },
                      { field: "quantity", headerName: "Количество" },
                      { field: "materialUnit", headerName: "Мярка" },
                      { field: "unitPrice", headerName: "Цена" },
                      { field: "lotNumber", headerName: "Партида" },
                      {
                        field: "expirationDate",
                        headerName: "Срок на годност",
                        valueFormatter: (value) => isoDateToString(value),
                      },
                      {
                        field: "totalWithTax",
                        headerName: "Обща сума с ДДС",
                        valueFormatter: (value, row) =>
                          (row.quantity * row.unitPrice).toFixed(2) + " лв",
                      },
                      { field: "notes", headerName: "Бележки" },
                    ],
                  },
                },
              ]}
              actions={{
                delete: (item) => deleteMutation.mutate(item),
                edit: (selectedItem) =>
                  navigate("./update", { state: { selectedItem } }),
                add: () => navigate("./create"),
              }}
              displayKeys={["deliveryDate", "vendorName","invoiceNumber", "totalWithTax"]}
              title="Доставки"
             
            ></GenericDataViewer>
          );
        }}
      </QueryViewWrapper>
    </>
  );
}
