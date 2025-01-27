import request from "superagent";
import { describe, it, expect } from "vitest";
import { baseUrl } from "./testsConfig";

const testOrder = {
 
  operatorId: null,
  pickupDate: "2025-01-01T20:00:00.571Z",
  createdDate: "2025-01-01T20:00:00.571Z",
  clientName: "Test Client",
  clientPhone: "0889123456",
  clientId: null,
  isPaid: true,
  advancePaiment: 10,
  status: 0,
  orderItems: [
    {
      productId: "f0d5a20c-fce3-fb44-87cf-003f3cb21aa5",
      productAmount:1,
      description: "lorem ipsum",
      cakeFoto: "c200",
      cakeTitle: "Happy Birthday",
      itemUnitPrice: 10,
      isInProgress: false,
      isComplete: false,
    },
  ],
};

describe("OrdersController", () => {
  it("should get an order by id", async () => {
    const id = "some-uuid"; // Replace with a valid UUID
    const response = await request.get(`${baseUrl}/api/Orders/GetOrder/${id}`);
    expect(response.status).toBe(200);
  });

  it("should get orders between dates", async () => {
    const response = await request
      .get(`${baseUrl}/api/Orders/GetOrdersBetween`)
      .query({
        startDate: "2023-01-01T00:00:00Z",
        endDate: "2023-12-31T23:59:59Z",
      });
    expect(response.status).toBe(200);
  });

  it("should get all orders", async () => {
    const response = await request.get(`${baseUrl}/api/Orders/GetOrders`);
    expect(response.status).toBe(200);
  });

  it("should create and delete an order", async () => {
    let response = await request
      .post(`${baseUrl}/api/Orders/CreateOrder`)
      .send(testOrder);
    expect(response.status).toBe(200);

    const order = response.body;
    response = await request.delete(`${baseUrl}/api/Orders/DeleteOrder/${order.id}`);
    expect(response.status).toBe(200);

    // Check if the order was deleted - should return 404
    try {
      await request.get(`${baseUrl}/api/Orders/GetOrder/${order.id}`);
      throw new Error('Expected 404 status code');
    } catch (error: any) {
      expect(error.status).toBe(404);
    }
  });

  it("should update an order", async () => {
    const updatedOrder = {
      id: "some-uuid",
      pickupDate: "2023-10-02T00:00:00Z",
      clientId: "some-uuid",
      orderItems: [],
    };
    const response = await request
      .put(`${baseUrl}/api/Orders/UpdateOrder/${updatedOrder.id}`)
      .send(updatedOrder);
    expect(response.status).toBe(200);
  });

  
});
