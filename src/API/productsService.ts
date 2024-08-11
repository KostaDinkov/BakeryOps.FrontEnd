import ProductDTO from "../Types/ProductDTO";

export default class ProductsService {

    static hostName = import.meta.env.VITE_API_SERVER_URL;
    
    static async getProducts(): Promise<ProductDTO[]> {
        const response = await fetch(`${this.hostName}/api/products/getAllProducts`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
      return await response.json();
    }
    
  };