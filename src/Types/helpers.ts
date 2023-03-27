import ProductDTO from "./ProductDTO";

export interface ProductsByCategory {
  [category: string]: ProductDTO[];
}
