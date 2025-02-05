import { useState } from "react";
import { ProductDTO } from "../../../Types/types";
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ProductDetails from "../../../Components/ProductDetails";
import styles from "./ProductsPage.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../API/apiClient";

export default function ProductsPage({ products }: { products: ProductDTO[] }) {
  // Extract unique categories from the products list
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ) as string[];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null
  );
  const [detailsEditing, setDetailsEditing] = useState(false);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

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
      if (data.data && (data.data as ProductDTO).id)
        setSelectedProduct(data.data);
    },
  });
  const onSubmit = (data: ProductDTO) => {
    console.log(data);
    productMutation.mutate(data);
  };

  // When editing, disable selection of other category/product
  const handleCategoryClick = (category: string) => {
    if (!detailsEditing) {
      setSelectedCategory(category);
      setSelectedProduct(null);
    }
  };

  const handleProductClick = (product: ProductDTO) => {
    if (!detailsEditing) setSelectedProduct(product);
  };

  return (
    <Box className={styles.container}>
      {/* Category Panel */}
      <Paper className={styles.categoryPanel}>
        <Typography variant="h6" gutterBottom>
          Категории
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItemButton
              key={category}
              selected={selectedCategory === category}
              disabled={detailsEditing}
              onClick={() => handleCategoryClick(category)}
              className={styles.categoryItem}
            >
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Product List Panel */}
      {selectedCategory && (
        <Paper className={styles.productListPanel}>
          <Typography variant="h6" gutterBottom>
            Продукти в {selectedCategory}
          </Typography>
          <List>
            {filteredProducts.map((product) => (
              <ListItemButton
                key={product.id}
                selected={selectedProduct?.id === product.id}
                disabled={detailsEditing}
                onClick={() => handleProductClick(product)}
                className={styles.productItem}
              >
                <ListItemText primary={product.name || "Unnamed Product"} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {/* Product Details Panel */}
      {selectedProduct && (
        <Box className={styles.productDetailsPanel}>
          <ProductDetails
            product={selectedProduct}
            onSubmit={onSubmit}
            onEditChange={(editing) => setDetailsEditing(editing)}
          />
        </Box>
      )}
    </Box>
  );
}
