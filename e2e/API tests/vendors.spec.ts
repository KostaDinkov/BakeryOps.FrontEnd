import { test, expect } from '@playwright/test';
import { endpoint, testCrudOperations } from './utils/crudTestUtil';
import { createTestVendor } from './utils/testData';

test.describe('Vendors Api Tests', () => {
  test('GET vendors should return status 200(Ok)', async ({request}) => {
    const response = await request.get(endpoint('/api/Vendors/GetVendors'));
    expect(response.status()).toBe(200);
  });

  test('should perform CRUD operations on vendors', async ({request}) => {

    const cleanUpStack = [];
    const testVendor = await createTestVendor(request, cleanUpStack);
    expect(testVendor).toBeDefined();

    await testCrudOperations(request, {
      endpoints: {
        getAll: '/api/Vendors/GetVendors',
        getById: '/api/Vendors/GetVendor/{id}',
        create: '/api/Vendors/AddVendor',
        update: '/api/Vendors/UpdateVendor',
        delete: '/api/Vendors/DeleteVendor/{id}'
      },
      testData: {...testVendor, id:undefined},
      updateData: {
        name: "Updated Test Vendor",
        description: "Updated vendor description"
      },
      deleteStatus: 204
    });
    for (const endpoint of [...cleanUpStack].reverse()) {
        await request.delete(endpoint);
      }
  });
});
