import { test, expect } from '@playwright/test';
import { endpoint, testCrudOperations } from './utils/crudTestUtil';
import { testClient } from './utils/testData';

test.describe('Clients Api Tests', () => {
  test('GET clients should return status 200(Ok)', async ({request}) => {
    const response = await request.get(endpoint('/api/Clients'));
    expect(response.status()).toBe(200);
  });

  test('should perform CRUD operations on clients', async ({request}) => {

    await testCrudOperations(request, {
      endpoints: {
        getAll: '/api/Clients',
        getById: '/api/Clients/{id}',
        create: '/api/Clients',
        update: '/api/Clients',
        delete: '/api/Clients/{id}'
      },
      testData: testClient,
      updateData: {
        name: "Updated Test Client",
        isCompany: true
      }
    });
  });
});
