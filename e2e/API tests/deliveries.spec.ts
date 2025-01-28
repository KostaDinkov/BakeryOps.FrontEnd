import { test, expect } from "@playwright/test";
import { paths } from "../../src/API/apiSchema";
import { DeliveryDTO, MaterialDTO, VendorDTO } from "../../src/Types/types";
import { endpoint, testCrudOperations } from "./utils/crudTestUtil";
import { createTestDelivery, getRandomInvoiceNumber, testDelivery, testMaterial } from "./utils/testData";


test.describe("Deliveries Api Tests", () => {
  test("GET all deliveries should return status 200(Ok)", async ({
    request,
  }) => {
    const response = await request.get(endpoint("/api/Deliveries/GetAll"));
    expect(response.status()).toBe(200);
  });

  test("should perform CRUD operations on deliveries", async ({ request }) => {
    
    const cleanUpQueue = [];
    const testDelivery = await createTestDelivery(request, cleanUpQueue);
    
    
    await testCrudOperations(request, {
      endpoints: {
        getAll: "/api/Deliveries/GetAll",
        getById: "/api/Deliveries/GetById/{id}",
        create: "/api/Deliveries/Create",
        update: "/api/Deliveries/Update",
        delete: "/api/Deliveries/Delete/{id}",
      },
      testData: {...testDelivery, id: undefined, invoiceNumber:getRandomInvoiceNumber()},
      updateData: {
        notes: "Updated test delivery",
      },
    });
    await Promise.all(
      cleanUpQueue.map(endpoint => request.delete(endpoint))
    );
  });
});
