import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { handleApiResponse } from "../apiUtils";
import { addDays, format, getDate } from "date-fns";
import { CategoryDTO, OrderDTO } from "../../Types/types";



export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Products/GetAllProducts")
      ),
  });
}
export function useProductQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Products/GetProduct/{id}", {
          params: { path: { id } },
        })
      ),
  });
}
export function useClientsQuery() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () =>
      await handleApiResponse(async () => apiClient.GET("/api/Clients")),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
export function useOrdersQuery() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Orders/GetOrders")
      ),
  });
}
export function useOrdersByDateQuery({ date }: { date: Date }) {
  return useQuery({
    queryKey: ["orders", date],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Orders/GetOrdersBetween", {
          params: { query: { startDate: format(date, "yyyy-MM-dd") } },
        })
      ),
  });
}
export function useOrderQuery({ id }: { id: string }):UseQueryResult<OrderDTO,Error> {
  return useQuery<OrderDTO,Error>({
    queryKey: ["order", id],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Orders/GetOrder/{id}", { params: { path: { id } } })
      ),
  });
}

export function useCategoriesQuery():UseQueryResult<CategoryDTO[],Error> {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Categories/GetCategories")
      ),
  });
}

export function useVendorsQuery() {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Vendors/GetVendors")
      ),
  });
}

export function useMaterialsQuery() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Materials/GetMaterials")
      ),
  });
}

export function useUnitsQuery() {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Units/GetUnits")
      ),
  });
}

export function useDeliveriesQuery() {
  return useQuery({
    queryKey: ["deliveries"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Deliveries/GetAll")
      ),
  });
}

export function useRecipesQuery() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Recipes/GetRecipes")
      ),
  });
}
