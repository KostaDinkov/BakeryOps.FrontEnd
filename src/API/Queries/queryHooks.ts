import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { handleApiResponse } from "../apiUtils";
import { addDays, format, getDate } from "date-fns";

export  function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Products/GetAllProducts")
      ),
  });
}
export  function useProductQuery({id}:{id:number}) {
  return useQuery({
    queryKey: ["product",id],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Products/GetProduct/{id}",{params:{path:{id}}})
      ),
  });
}
export  function useClientsQuery() {
    return useQuery({
      queryKey: ["clients"],
      queryFn: async () =>
        await handleApiResponse(async () =>
          apiClient.GET("/api/Clients")
      ),
      staleTime: 1000 * 60 * 60 * 24,

    });
 }
export function useOrdersQuery(){
  const today = new Date();
  const startDate = format(today, "dd-MM-yyyy");
  const endDate = format(addDays(today,3), "dd-MM-yyyy");
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Orders", {params:{query:{startDate,endDate}}})
      ),
  });
}
export function useOrderQuery({id}:{id:string}){

  return useQuery({
    queryKey: ["order",id],
    queryFn: async () =>
      await handleApiResponse(async () =>
        apiClient.GET("/api/Orders/{id}", {params:{path:{id}}})
      ),
  });
}