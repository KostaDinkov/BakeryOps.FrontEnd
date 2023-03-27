
import { ProductsByCategory } from "../Types/helpers";
import ProductDTO from "../Types/ProductDTO";

export async function sleep(msec:number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

export function getProductsByCategory(products: ProductDTO[]): ProductsByCategory {
  let productsByCat = products.reduce(function (result, product) {
    (result[product.category] = result[product.category] || []).push(product);
    return result;
  }, {} as ProductsByCategory);
  Object.entries(productsByCat).forEach(([cat, products]) => {products.sort((a,b)=>a.name >b.name?1:-1)});
  let sortedKeys = Object.keys(productsByCat).sort((a,b)=>a>b?1:-1);
  let sortedProductsByCat = {} as ProductsByCategory;
  sortedKeys.forEach(key=>sortedProductsByCat[key]=productsByCat[key]);
  return sortedProductsByCat;  
}