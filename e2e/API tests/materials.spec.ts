import { test, expect } from "@playwright/test";
import { endpoint, testCrudOperations } from "./utils/crudTestUtil";
import { createTestMaterial } from "./utils/testData";

test.describe("Materials Api Tests", () => {
  test("GET materials should return status 200(Ok)", async ({ request }) => {
    const response = await request.get(endpoint("/api/Materials/GetMaterials"));
    expect(response.status()).toBe(200);
  });

  test("should perform CRUD operations on materials", async ({ request }) => {
    // Create test category first
    let cleanUpStack = [];
    const testMaterial = await createTestMaterial(request, cleanUpStack);

    expect(testMaterial).toBeDefined();

    await testCrudOperations(request, {
      endpoints: {
        getAll: "/api/Materials/GetMaterials",
        getById: "/api/Materials/GetMaterial/{id}",
        create: "/api/Materials/AddMaterial",
        update: "/api/Materials/UpdateMaterial",
        delete: "/api/Materials/DeleteMaterial/{id}",
      },
      testData: {...testMaterial, id:undefined},
      updateData: {
        name: "Updated Test Material",
      },
    });

    // Clean up - using Promise.all to properly handle async operations
    for (const endpoint of [...cleanUpStack].reverse()) {
      await request.delete(endpoint);
    }
  });
});
