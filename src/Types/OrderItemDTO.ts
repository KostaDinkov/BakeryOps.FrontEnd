export default interface OrderItemDTO{
    id?:number;
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
      category:string;
    }
  }