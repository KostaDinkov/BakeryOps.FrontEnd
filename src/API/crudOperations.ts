import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";


export function useItemsQuery({queryKey, url}:{queryKey:string, url:string}) {
    return useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        const response = await apiClient.GET(url);
        return response.data;
      },
    });
  }