export default interface OrderItemDTO{
    productId: number;
    productName: string;
    productAmount: number;
    description: string;
    cakeFoto?: string;
    cakeTitle?: string;
    isInProgress: boolean;
    isComplete: boolean;
    price: number;
    unit:string;
  }