import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";

/**
 * Custom hook for fetching items
 * @param queryKey the query key
 * @param url the url to fetch the items from
  */  
export function useItemsQuery({queryKey, url}:{queryKey:string, url:string}) {
    return useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        const response = await apiClient.GET(url);
        return response.data as unknown as any[];
      },
    });
  }

  