import { apiClient } from "../../API/apiClient";
import { DeliveryDTO } from "../../Types/types";
import { IItemOperations } from "../Nomenclature/GenericCRUD/GenericCRUD";

export const deliveryOperations:IItemOperations<DeliveryDTO> = {
    queryKey: ["deliveries"],
    getItems: async () => {
        const result = await apiClient.GET("/api/Deliveries/GetAll");
        return result.data as unknown as DeliveryDTO[];
    },
    createItem: async (item) => {
        const result  = await apiClient.POST("/api/Deliveries/Create", {body: item});
        return result.data as unknown as DeliveryDTO;
    },
    updateItem: async (item) => {
        const result = await apiClient.PUT("/api/Deliveries/Update", {body: item});
        return result.data as unknown as DeliveryDTO;
    },
    deleteItem: async (id) => {
        await apiClient.DELETE("/api/Deliveries/Delete/{id}", {params: {path: {id}}});
        return;
    },
}