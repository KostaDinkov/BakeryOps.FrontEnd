import { isValid, format } from "date-fns";
import ValidationResult from "../../../Types/ValidationResult";
import OrderDTO from "../../../Types/OrderDTO";
import ProductDTO from "../../../Types/ProductDTO";
import ClientDTO from "../../../Types/ClientDTO";
import SelectorOption from "../../../Types/SelectorOptions";
import OrderItemDTO from "../../../Types/OrderItemDTO";


export const dateTimeFormat = "yyyy-MM-dd'T'HH:mm:ss";

export function getNewDateWithHours(date: Date, hoursStr: string): string {
  let parts = hoursStr.split(":");
  date.setHours(parseInt(parts[0]));
  date.setMinutes(parseInt(parts[1]));
  const dateStr = getStringFromDate(date);
  console.log(`DateStr: ${dateStr}`);
  
  return dateStr;
  
}

export function getStringFromDate(date: Date): string {
  return format(date, dateTimeFormat);
}

export function validateOrder(order: OrderDTO): ValidationResult {
  let validationResult: ValidationResult = {
    isValid: false,
    errors: [],
  };

  if (order.clientName === "" || order.clientName.length < 3) {
    validationResult.errors.push("Невалидно име на клиент.");
  }
  if (order.pickupDate === "" || !isValid(new Date(order.pickupDate))) {
    validationResult.errors.push(
      `Невалидна дата за получаване: ${order.pickupDate} `
    );
  } else {
    order.pickupDate = getStringFromDate(new Date(order.pickupDate));
  }

  if (order.orderItems.length === 0) {
    validationResult.errors.push(
      "Поръчката трябва да съдържа минимум 1 продукт"
    );
  }

  order.orderItems.forEach((element, index) => {
    if (element.productId === undefined || element.productId === null) {
      validationResult.errors.push(
        `Невалидна стойност за продукт номер ${index + 1}`
      );
    }
    if (element.productAmount <= 0) {
      validationResult.errors.push(
        `Невалидна стойност за количество за продукт номер ${index + 1} - ${
          element.productAmount
        }`
      );
    }
  });

  if (validationResult.errors.length === 0) {
    validationResult.isValid = true;
  }
  return validationResult;
}

export function getDefaultOrderFormData(): OrderDTO {
  return {
    operatorId: 0,
    pickupDate: getStringFromDate(
      (() => {
        let date = new Date();
        date.setHours(9, 0, 0, 0);
        return date;
      })()
    ),
    createdDate: getStringFromDate(new Date()),
    status: 0,
    clientName: "",
    clientPhone: "",
    isPaid: false,
    advancePaiment: 0,
    orderItems: [],
  };
}

export class ProductSelectorValues {
  productId?: string;
  productCategory: string;
  productAmount: number;
  cakeFoto: string;
  cakeTitle: string;
  description: string;
  itemUnitPrice: number;

  constructor(item?: OrderItemDTO | undefined) {
    this.productId = item?.productId ;
    this.productAmount = item?.productAmount || 0;
    this.cakeFoto = item?.cakeFoto || "";
    this.cakeTitle = item?.cakeTitle || "";
    this.description = item?.description || "";
    this.productCategory = item?.product.category || "";
    this.itemUnitPrice = item?.itemUnitPrice || 0.0;
  }
}

export function productsToOptions(products: ProductDTO[]): SelectorOption[] {
  if (products.length >= 1) {
    let options = products.map((p) => ({
      value: p.id.toString(),
      label: p.name,
      code: p.code,
      category: p.category,
    }));
    return options;
  }
  return [];
}

export function getHoursOptions(): SelectorOption[] {
  let availableHours = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  let hoursOptions = availableHours.map((hour) => ({
    value: hour,
    label: hour,
  }));
  return hoursOptions;
}

export function getOrderTimeOrDefault(pickupDate: string): SelectorOption {
  let option = getHoursOptions().filter(
    (option) => option.label === format(new Date(pickupDate), "HH:mm")
  )[0];
  if (!option) {
    return getHoursOptions()[0];
  }
  return option;
}

export function clientsToOptions(clients: ClientDTO[]): {
  value: string;
  label: string;
}[] {
  if (clients.length > 0) {
    let options = clients.map((c) => ({
      value: c.id.toString(),
      label: c.name,
    }));
    return options;
  }
  return [];
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
  if(product.keepPriceDrebno) return product.priceDrebno;
  let vat = 0.2;
  let halfVat = vat / 2;
  let discount = discountPercent / 100;
  if(!product.hasDiscount) discount = 0;
  let final = ((product.priceDrebno / (1 + vat)) * (1 - discount)) * (1 + halfVat);

  return Math.round((final + Number.EPSILON) * 100) / 100;
}

export function getItemUnitPrice(
  item: OrderItemDTO,
  products: ProductDTO[],
  client: ClientDTO | undefined | null
): number {
  if (item.itemUnitPrice !== 0) {
    return item.itemUnitPrice;
  }
  let product = products.filter((p) => p.id === item.productId)[0];

  if (client && client.isSpecialPrice) {
    return getSpecialPrice(product, client.discountPercent);
  }
  return product.priceDrebno;
}
