import { test, expect, APIRequestContext } from '@playwright/test';
import { paths } from "../../../src/API/apiSchema";

export function endpoint<T extends keyof paths>(path: T): T {
    return path;
  }

interface CrudEndpoints {
  getAll: keyof paths;
  getById: keyof paths;
  create: keyof paths;
  update: keyof paths;
  delete: keyof paths;
}

interface TestConfig<T> {
  endpoints: CrudEndpoints;
  testData: T;
  updateData: Partial<T>;
  idField?: string;
  createStatus?: number;
  deleteStatus?: number;
}

export async function testCrudOperations<T extends { id?: string }>(
  request: APIRequestContext,
  config: TestConfig<T>
) {
  const {
    endpoints,
    testData,
    updateData,
    idField = 'id',
    createStatus = 201,
    deleteStatus = 204
  } = config;

  // CREATE
  const createResponse = await request.post(endpoints.create, {
    data: testData
  });
  expect(createResponse.status()).toBe(createStatus);
  const createdEntity = await createResponse.json();
  expect(createdEntity[idField]).toBeDefined();

  // READ
  const getResponse = await request.get(
    endpoints.getById.replace('{id}', createdEntity[idField])
  );
  expect(getResponse.status()).toBe(200);
  const fetchedEntity = await getResponse.json();
  expect(fetchedEntity[idField]).toBe(createdEntity[idField]);

  // UPDATE
  const updateResponse = await request.put(
    endpoints.update,
    {
      data: {
        ...testData,
        [idField]: createdEntity[idField],
        ...updateData
      }
    }
  );
  expect(updateResponse.status()).toBe(200);

  // DELETE
  const deleteResponse = await request.delete(
    endpoints.delete.replace('{id}', createdEntity[idField])
  );
  expect(deleteResponse.status()).toBe(deleteStatus);

  // Verify deletion
  const verifyDeleteResponse = await request.get(
    endpoints.getById.replace('{id}', createdEntity[idField])
  );
  expect(verifyDeleteResponse.status()).toBe(404);
}
