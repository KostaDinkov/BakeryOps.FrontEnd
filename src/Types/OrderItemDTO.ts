export default interface OrderItemDTO{
    productId: number;
    productAmount: number;
    description: string;
    cakeFoto?: string;
    cakeTitle?: string;
    isInProgress: boolean;
    isComplete: boolean;
  }