import { test, expect } from '@playwright/test';
import { endpoint, testCrudOperations } from './utils/crudTestUtil';
import { createTestCategory, testCategory } from './utils/testData';

test.describe('Categories Api Tests', () => {
  test('GET categories should return status 200(Ok)', async ({request}) => {
    const response = await request.get(endpoint('/api/Categories/GetCategories'));
    expect(response.status()).toBe(200);
  });

  test('should perform CRUD operations on categories', async ({request}) => {

    await testCrudOperations(request, {
      endpoints: {
        getAll: '/api/Categories/GetCategories',
        getById: '/api/Categories/GetCategory/{id}',
        create: '/api/Categories/AddCategory',
        update: '/api/Categories/UpdateCategory',
        delete: '/api/Categories/DeleteCategory/{id}'
      },
      testData: testCategory,
      updateData: {
        name: "Updated Test Category"
      }
    });
  });
});
