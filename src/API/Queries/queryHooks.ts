import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { handleApiResponse } from "../apiUtils";
import { addDays, format, getDate } from "date-fns";

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Products/GetAllProducts")
      ),
  });
}
export function useProductQuery({ id }: { id: number }) {
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
export function useOrderQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Orders/GetOrder/{id}", { params: { path: { id } } })
      ),
  });
}
