export default interface OrderItemDTO{
    productId: number;
    
    productAmount: number;
    description: string;
    cakeFoto?: string;
    cakeTitle?: string;
    isInProgress: boolean;
    isComplete: boolean;
    product:{
      name:string;
      priceDrebno:number;
      priceEdro:number;
      unit:string;
    }
  }