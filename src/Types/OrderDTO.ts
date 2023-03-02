import OrderItemDTO from "./OrderItemDTO";

export default interface OrderDTO{  
        id?: number;
        operatorId: number;
        pickupDate: string;
        createdDate: string;
        clientName: string;
        clientPhone: string;
        clientId?: number;
        isPaid: boolean;
        advancePaiment: number;
        status: number;
        orderItems: OrderItemDTO[];     
}