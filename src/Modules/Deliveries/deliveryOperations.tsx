import { apiClient } from "../../API/apiClient";
import { DeliveryDTO } from "../../Types/types";
import { IItemOperations } from "../Nomenclature/GenericCRUD/GenericCRUD";

export const deliveryOperations: IItemOperations<DeliveryDTO> = {
  queryKey: ["deliveries"],
  getItems: async () => {
    return handleRequest(async () => apiClient.GET("/api/Deliveries/GetAll"));
  },
  createItem: async (item) => {
    return handleRequest(
      async () => await apiClient.POST("/api/Deliveries/Create", { body: item })
    );
  },
  updateItem: async (item) => {
    return handleRequest(async () =>
      apiClient.PUT("/api/Deliveries/Update", { body: item })
    );
  },
  deleteItem: async (id) => {
    return handleRequest(async () =>
      apiClient.DELETE("/api/Deliveries/Delete/{id}", {
        params: { path: { id } },
      })
    );
  },
};

async function handleRequest(fetchCall) {
  const fetchResponse = await fetchCall();
  if (fetchResponse.error) {
    throw new Error(fetchResponse.error);
  }

  return fetchResponse;
}
