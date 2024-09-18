
import { NotFoundError, UnauthorizedError } from "../system/errors";
import {ClientDTO} from "../Types/ClientDTO";


export const hostName = import.meta.env.VITE_API_SERVER_URL;


  export const getAllItems= async (): Promise<ClientDTO[]> => {
    let response = await fetch(
      `${hostName}/api/clients`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Unauthorized");
    }
    return response.json();
  }

  export const  getItemById = async (id: number | string): Promise<ClientDTO> =>{
    try {
      let response = await fetch(`${hostName}/api/clients/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 404) {
        throw new NotFoundError("Item Not found");
      }
      return await response.json();
    } catch (error) {
      console.log("API error: getOrders", error);
      throw error;
    }
  }

  export const createItem = async (data: ClientDTO): Promise<ClientDTO> => {
    try {
      const response = await fetch(`${hostName}/api/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error: any) {
      console.log("API error " + error.message);
      throw error;
    }
  }

  export const  updateItem = async(client:ClientDTO): Promise<ClientDTO> =>{
    try {
      const response = await fetch(`${hostName}/api/clients`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(client),
      });

      return response.json();
    } catch (error: any) {
      console.log("API error " + error.message);
      throw error;
    }
  }

  export const deleteItem= async (orderId: number | string): Promise<ClientDTO | null> =>{
    try {
      let response = await fetch(`${hostName}/api/clients/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.json();
    } catch (error: any) {
      console.log("API error " + error.message);
      return null;
    }
  }

