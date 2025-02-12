import { ProductsByCategory } from "../Types/types";
import {ProductDTO} from "../Types/types";
import { format } from "date-fns";

export async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

export function getProductsByCategory(
  products: ProductDTO[]
): ProductsByCategory {
  let productsByCat = products.reduce(function (result, product) {
    const category = product.category?.trim() || "Без категория";
    (result[category] = result[category] || []).push(product);
    return result;
  }, {} as ProductsByCategory);

  Object.entries(productsByCat).forEach(([cat, products]) => {
    products.sort((a, b) => (a.name > b.name ? 1 : -1));
  });

  let sortedKeys = Object.keys(productsByCat).sort((a, b) => {
    if (a === "Без категория") return 1;  // Move "No category" to the end
    if (b === "Без категория") return -1;
    return a > b ? 1 : -1;
  });
  
  let sortedProductsByCat = {} as ProductsByCategory;
  sortedKeys.forEach((key) => (sortedProductsByCat[key] = productsByCat[key]));
  return sortedProductsByCat;
}

export const customInvalidProps = (message: string) => {
  return {
    onInvalid: (e) => (e.target as HTMLInputElement).setCustomValidity(message),
    onInput: (e) => (e.target as HTMLInputElement).setCustomValidity(""),
  };
};

export function dateToString(date: Date | string): string | undefined {
  //check if date is Date
  if (date instanceof Date) {
    return format(date, "dd.MM.yyyy");
  }
  else {
    //check if date is valid string
    if (isNaN(Date.parse(date))) {
      return undefined;
    }
    return format(date, "dd.MM.yyyy");
  }

}

export function getCssVariable(variableName: string): string | null {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(variableName).trim() || null;
}

/** 
 * Get the 'special' price of the product with discount applied
// @param cenaDrebno - price of the product as used in store with included Vat
// @param discountPercent - discount in percent, like 20 for 20%
**/
export function getSpecialPrice(
  product:ProductDTO,
  discountPercent: number,
): number {
  // If the product has to keep its priceDrebno, we return priceDrebno
  // First we take price without Vat
  // Next we apply discount, if product hasDiscount
  // Next we add half of Vat to the result
  // Last we round to 2 decimal places
  if(product.keepPriceDrebno) return product.priceDrebno!;
  let vat = 0.2;
  let halfVat = vat / 2;
  let discount = discountPercent / 100;
  if(!product.hasDiscount) discount = 0;
  let final = ((product.priceDrebno! / (1 + vat)) * (1 - discount)) * (1 + halfVat);

  return Math.round((final + Number.EPSILON) * 100) / 100;
}

export function isV4uuid(uuidString:string | undefined | null) {
  if (typeof uuidString !== 'string') {
    return false; // Not a string, so cannot be a UUID
  }

  // Regular expression for UUID v4 format (case-insensitive)
  const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidv4Regex.test(uuidString);
}