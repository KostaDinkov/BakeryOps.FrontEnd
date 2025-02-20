import { components } from "../API/apiSchema";

export type VendorDTO = components["schemas"]["VendorDTO"];
export type DeliveryDTO = components["schemas"]["DeliveryDto"];
export type DeliveryItemDTO = components["schemas"]["DeliveryItemDto"];
export type MaterialDTO = components["schemas"]["MaterialDto"];
export type CategoryDTO = components["schemas"]["CategoryDTO"];
export type ClientDTO = components["schemas"]["ClientDTO"];
export type Unit = components["schemas"]["Unit"];
export type RecipeDTO = components["schemas"]["RecipeDto"];
export type OrderDTO = components["schemas"]["OrderDTO"];
export type OrderItemDTO = components["schemas"]["OrderItemDTO"];
export type ProductDTO = components["schemas"]["Product"];
export type UserDTO = components["schemas"]["NewUserDTO"];
export type MaterialPriceHistory = components["schemas"]["MaterialPriceHistoryDto"];

export interface ProductsByCategory {
    [category: string]: ProductDTO[];
  }


