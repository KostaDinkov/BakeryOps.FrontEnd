import { add, formatISO } from "date-fns";
import { NotFoundError, UnauthorizedError } from "../system/errors";
import OrderDTO from "../Types/OrderDTO";

export const hostName = "http://localhost:5000";
export const eventHubUrl = `${hostName}/eventHub`;

export class OrdersService {
  static async GetOrdersAsync(
    ...args: [startDate?: string, endDate?: string]
  ): Promise<OrderDTO[][]> {
    let startDate = args[0] || undefined;
    let endDate = args[1] || undefined;

    if (startDate === undefined) {
      startDate = formatISO(new Date(), { representation: "date" });
      endDate = formatISO(add(new Date(), { days: 3 }), {
        representation: "date",
      });
    } else if (endDate === undefined) {
      endDate = startDate;
    }

    let response = await fetch(
      `${hostName}/api/orders?startDate=${startDate}&endDate=${endDate}`,
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

  static async GetOrderAsync(id: number): Promise<OrderDTO> {
    try {
      let response = await fetch(`${hostName}/api/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 404) {
        throw new NotFoundError();
      }
      if(response.status === 200){
        return await response.json();
      }
      throw Error(response.status + " "+ response.statusText)
      
    } catch (error) {
      console.log("API error: getOrders", error);
      throw error;
    }
  }

  static async PostOrderAsync(data: OrderDTO): Promise<OrderDTO> {
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

  static async PutOrderAsync(
    orderId: number,
    data: OrderDTO
  ): Promise<OrderDTO> {
    try {
      const response = await fetch(`${hostName}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if(response.status == 200){
        return response.json();
      }
      throw new Error(response.status+ " " +response.statusText)
      
    } catch (error: any) {
      console.log("API error " + error.message);
      throw error;
    }
  }

  static async DeleteOrderAsync(orderId: number): Promise<OrderDTO | null> {
    try {
      let response = await fetch(`${hostName}/api/orders/${orderId}`, {
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
export const ordersApi = {
  getOrdersAsync: async function (
    ...args: [startDate?: string, endDate?: string]
  ): Promise<OrderDTO[][]> {
    let startDate = args[0] || undefined;
    let endDate = args[1] || undefined;

    if (startDate === undefined) {
      startDate = formatISO(new Date(), { representation: "date" });
      endDate = formatISO(add(new Date(), { days: 3 }), {
        representation: "date",
      });
    } else if (endDate === undefined) {
      endDate = startDate;
    }

    let response = await fetch(
      `${hostName}/api/orders?startDate=${startDate}&endDate=${endDate}`,
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
  },
  getOrder: function (id: number): OrderDTO | null {
    fetch(`${hostName}/api/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          return null;
        }
        return response.json();
      })
      .catch((error) => {
        console.log("API error: getOrders", error);
      });
    return null;
  },
  postOrder: async (data: OrderDTO) => {
    try {
      const response = await fetch(`${hostName}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error: any) {
      console.log("API error " + error.message);
    }
  },
  putOrder: async (orderId: number, data: OrderDTO) => {
    try {
      const response = await fetch(`${hostName}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error: any) {
      console.log("API error " + error.message);
    }
  },
  deleteOrder: async (orderId: number) => {
    fetch(`${hostName}/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export const productsApi = {
  getProducts: async () => {
    const response = await fetch(`${hostName}/api/products`);
    return await response.json();
  },
};

export const auth = {
  login: async (userData: { userName: string; password: string }) :Promise<Response>  => {
    let response = await fetch(`${hostName}/api/security`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response
    
  },
};
