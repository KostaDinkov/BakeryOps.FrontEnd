import { apiClient } from "../../API/apiClient";
import { DeliveryDTO } from "../../Types/types";
import { IItemOperations } from "../../Components/GenericCRUD/GenericCRUD";
import { handleApiResponse } from "../../API/apiUtils";

export const deliveryOperations: IItemOperations<DeliveryDTO> = {
  queryKey: ["deliveries"],
  getItems: async () => {
    return handleApiResponse(async () =>
      apiClient.GET("/api/Deliveries/GetAll")
    );
  },
  createItem: async (item) =>
    handleApiResponse(
      async () => await apiClient.POST("/api/Deliveries/Create", { body: item })
    ),
  updateItem: async (item) =>
    handleApiResponse(async () =>
      apiClient.PUT("/api/Deliveries/Update", { body: item })
    ),
  deleteItem: async (id) =>
    handleApiResponse(async () =>
      apiClient.DELETE("/api/Deliveries/Delete/{id}", {
        params: { path: { id } },
      })
    ),
};
