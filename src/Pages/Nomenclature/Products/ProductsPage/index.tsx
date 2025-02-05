import { useProductsQuery } from "../../../../API/Queries/queryHooks";
import Products from "./Products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductDTO } from "../../../../Types/types";
import { apiClient } from "../../../../API/apiClient";

export default function ProductsHome() {
  const productsQuery = useProductsQuery();

  const queryClient = useQueryClient();
  const productMutation = useMutation({
    mutationFn: (product: ProductDTO) => {
      console.log(product);
      return apiClient.PUT("/api/Products/UpdateProduct/{id}", {
        params: { path: { id: product.id } },
        body: product,
      });
    },
    onSuccess: (data) => {
      //console.log(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const onSubmit = (data: ProductDTO) => {
    console.log(data);
    productMutation.mutate(data);
  };

  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  } else if (productsQuery.isError) {
    return <div>Error: {productsQuery.error.message}</div>;
  }
  return (
    <Products products={productsQuery.data} onSubmit={onSubmit}/>
  );
}
