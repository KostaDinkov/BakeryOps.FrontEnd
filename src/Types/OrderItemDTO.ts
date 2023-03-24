export default interface OrderItemDTO{
    id?:number;
    productId: number;
    productAmount: number;
    description: string;
    cakeFoto?: string;
    cakeTitle?: string;
    isInProgress: boolean;
    isComplete: boolean;
    itemUnitPrice: number;
    product:{
      name:string;
      priceDrebno:number;
      priceEdro:number;
      unit:string;
      category:string;
    }
  }