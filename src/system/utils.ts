import ClientDTO from "../Types/ClientDTO";
import ProductDTO from "../Types/ProductDTO";

export async function sleep(msec:number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

