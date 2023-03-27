import ProductDTO from "../Types/ProductDTO";

export default class ProductsService {

    static hostName = process.env.REACT_APP_API_SERVER_URL;
    
    static async getProducts(): Promise<ProductDTO[]> {
        const response = await fetch(`${this.hostName}/api/products`);
      return await response.json();
    }
    
  };