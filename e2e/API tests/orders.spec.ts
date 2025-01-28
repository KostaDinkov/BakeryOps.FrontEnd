import { test, expect } from "@playwright/test";
import { paths } from "../../src/API/apiSchema";
import { OrderDTO } from "../../src/Types/types";
import { endpoint, testCrudOperations } from "./utils/crudTestUtil";
import { createTestOrder, testOrder } from "./utils/testData";

test.describe("Orders Api Tests", () => {
  test("GET orders should return status 200(Ok)", async ({ request }) => {
    const response = await request.get(endpoint("/api/Orders/GetOrders"));
    expect(response.status()).toBe(200);
  });

  test("should perform CRUD operations on orders", async ({ request }) => {
    const cleanUpQueue = [];
    const testOrder = await createTestOrder(request, cleanUpQueue);
    await testCrudOperations(request, {
      endpoints: {
        getAll: "/api/Orders/GetOrders",
        getById: "/api/Orders/GetOrder/{id}",
        create: "/api/Orders/CreateOrder",
        update: "/api/Orders/UpdateOrder",
        delete: "/api/Orders/DeleteOrder/{id}",
      },
      testData: { ...testOrder, id: undefined },
      updateData: {
        clientName: "Updated Test Client",
      },
    });
    await Promise.all(
      cleanUpQueue.map(endpoint => request.delete(endpoint))
    );
  });
});
