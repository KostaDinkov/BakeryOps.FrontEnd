import React from "react";
import { components } from "../../../API/apiSchema";
import { apiClient } from "../../../API/apiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Product = components["schemas"]["Product"];

export default function ProductsPage() {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Products/GetAllProducts");
      console.log(response);
      if (response.response.ok) {
        const byCategory = Object.groupBy(
          response.data as unknown as Product[],
          (p: Product) => p.category
        );
        console.log(byCategory);
        return byCategory;
      }
    },
  });
  return productsQuery.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Products</h1>

      {Object.entries(productsQuery.data ?? {}).map(([category, products]) => {
        return (
          <Accordion key={category}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <strong>{category}</strong>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {products?.map((product: Product) => {
                  return <li key={product.id}>{product.name}</li>;
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
