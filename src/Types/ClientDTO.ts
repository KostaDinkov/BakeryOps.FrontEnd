import OrderDTO from "./OrderDTO";

export default interface ClientDTO {
  id: number;
  name: string;
  phone: string;
  email: string;
  isCompany: boolean;
  isSpecialPrice: boolean;
  orders: OrderDTO[];
}
