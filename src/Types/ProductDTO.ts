export default interface Product{
    
        id: string;
        name: string;
        barcode: string;
        category: string;
        priceDrebno: number;
        priceEdro: number;
        code: string;
        dateCreated: string;
        unit:string;
        hasDiscount: boolean;
        keepPriceDrebno: boolean;
        inPriceList: boolean;
}