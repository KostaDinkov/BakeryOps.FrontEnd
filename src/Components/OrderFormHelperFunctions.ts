import {formatISO, isValid } from "date-fns";
import ValidationResult from "../Types/ValidationResult";
import OrderDTO from "../Types/OrderDTO";
import ProductDTO from "../Types/ProductDTO";

export function getNewDateWithHours(date: Date, hoursStr: string): Date {
  console.log(hoursStr);
  let parts = hoursStr.split(":");
  date.setHours(parseInt(parts[0]));
  date.setMinutes(parseInt(parts[1]));
  console.log(date);
  return date;
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
    order.pickupDate = formatISO(
      new Date(order.pickupDate)
      
    );
  }

  if (order.orderItems.length === 0) {
    validationResult.errors.push(
      "Поръчката трябва да съдържа минимум 1 продукт"
    );
  }

  order.orderItems.forEach((element, index) => {
    if (element.productId === undefined || element.productId === -1) {
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
    pickupDate: "",
    createdDate: formatISO(new Date()),
    status: 0,
    clientName: "",
    clientPhone: "",
    isPaid: false,
    advancePaiment: 0,
    orderItems: [],
  };
}

export class DefaultSelectorValues {
  productId: number;
  productAmount: number;
  cakeFoto: string;
  cakeTitle: string;
  description: string;
  constructor() {
    this.productId = -1;
    this.productAmount = 0;
    this.cakeFoto = "";
    this.cakeTitle = "";
    this.description = "";
  }
}

export function productsToOptions(
  products: ProductDTO[]
): { value: number; label: string; code: string }[] {
  if (products.length >= 1) {
    let options = products.map((p) => ({
      value: p.id,
      label: p.name,
      code: p.code,
    }));
    return options;
  }
  return [];
}

export function getHoursOptions(): { value: string; label: string }[] {
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
