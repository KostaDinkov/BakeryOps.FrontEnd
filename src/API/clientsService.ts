
import { NotFoundError, UnauthorizedError } from "../system/errors";
import ClientDTO from "../Types/ClientDTO";
export const hostName = process.env.REACT_APP_SERVER_URL;;

export default class ClientsService {
  static async GetClientsAsync(): Promise<ClientDTO[][]> {
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
      throw new UnauthorizedError();
    }
    return response.json();
  }

  static async GetClientAsync(id: number): Promise<ClientDTO> {
    try {
      let response = await fetch(`${hostName}/api/clients/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 404) {
        throw new NotFoundError();
      }
      return await response.json();
    } catch (error) {
      console.log("API error: getOrders", error);
      throw error;
    }
  }

  static async PostClientAsync(data: ClientDTO): Promise<ClientDTO> {
    try {
      const response = await fetch(`${hostName}/api/orders`, {
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

  static async PutClientAsync(
    orderId: number,
    data: ClientDTO
  ): Promise<ClientDTO> {
    try {
      const response = await fetch(`${hostName}/api/clients/${orderId}`, {
        method: "PUT",
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

  static async DeleteClientAsync(orderId: number): Promise<ClientDTO | null> {
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
}
