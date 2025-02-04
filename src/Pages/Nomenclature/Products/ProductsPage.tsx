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

export default function ProductsPage({ products }: { products: ProductDTO[] }) {
  // Extract unique categories from the products list
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ) as string[];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null
  );

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <Box display="flex" minHeight="100vh">
      {/* Category Panel */}
      <Paper sx={{ width: 250, m: 1, p: 1 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItemButton
              key={category}
              selected={selectedCategory === category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedProduct(null);
              }}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
                "&:hover": {
                  backgroundColor: "primary.light",
                },

                mb: 0.5,
              }}
            >
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Product List Panel */}
      {selectedCategory && (
        <Paper sx={{ width: 300, m: 1 }}>
          <Typography variant="h6" gutterBottom>
            Products in {selectedCategory}
          </Typography>
          <List>
            {filteredProducts.map((product) => (
              <ListItemButton
                key={product.id}
                selected={selectedProduct?.id === product.id}
                onClick={() => setSelectedProduct(product)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "secondary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "secondary.light",
                  },

                  mb: 0.5,
                }}
              >
                <ListItemText primary={product.name || "Unnamed Product"} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {/* Product Details Panel */}
      {selectedProduct && (
        <Box sx={{ flex: 1, m: 1 }}>
          <ProductDetails
            product={selectedProduct}
            onSubmit={(data) => {
              // handle updated data; e.g., send to API or update state
              console.log("Updated product:", data);
            }}
          />
        </Box>
      )}
    </Box>
  );
}
