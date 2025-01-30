import {
  CategoryDTO,
  ClientDTO,
  DeliveryDTO,
  MaterialDTO,
  OrderDTO,
  ProductDTO,
  VendorDTO,
} from "../../../src/Types/types";
import { paths } from "../../../src/API/apiSchema";
import { endpoint } from "./crudTestUtil";
import { test, expect, APIRequestContext } from "@playwright/test";

export const testCategory: CategoryDTO = {
  name: "Test Category",
};

export const testClient: ClientDTO = {
  name: "Test Client",
  phone: "0889123456",
  email: "test@example.com",
  discountPercent: 0,
  isCompany: false,
  isSpecialPrice: false,
};

const testVendor: VendorDTO = {
  name: "Test Vendor",
  address: "Test Address 123",
  phoneNumber: "0889123456",
  email: "vendor@example.com",
  description: "Test vendor description",
};

const unitId = "2BCB2274-F0DF-4327-A45D-8A8544309EC5"; //FIXME Hardcoded unitId - must exist in the database

export const getRandomInvoiceNumber = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export async function createTestCategory(
  request: APIRequestContext,
  cleanUpQueue: string[]
): Promise<CategoryDTO> {
  
    const createdCategory:CategoryDTO = await (await request.post(endpoint("/api/Categories/AddCategory"), {
    data: testCategory,
  })).json();

  cleanUpQueue.push(
      endpoint(`/api/Categories/DeleteCategory/{id}`).replace(
        "{id}",
        createdCategory.id));
  
  return createdCategory;
}

export async function createTestClient(
  request: APIRequestContext,
  cleanUpQueue: string[]
): Promise<ClientDTO> {
  const response = await request.post(endpoint("/api/Clients"), {
    data: testClient,
  });
  const createdClient = (await response.json()) as ClientDTO;

  cleanUpQueue.push(endpoint(`/api/Clients/{id}`).replace("{id}", createdClient.id));
  return createdClient;
}

export async function createTestVendor(
  request: APIRequestContext,
  cleanUpQueue: string[]
): Promise<VendorDTO> {
  const response = await request.post(endpoint("/api/Vendors/AddVendor"), {
    data: testVendor,
  });
  const createdVendor = (await response.json()) as VendorDTO;

  cleanUpQueue.push(endpoint(`/api/Vendors/DeleteVendor/{id}`).replace("{id}", createdVendor.id));
  return createdVendor;
}

export async function createTestMaterial(
  request: APIRequestContext,
  cleanUpQueue: string[]
): Promise<MaterialDTO> {
  const testMaterial: MaterialDTO = {
    name: "Test Material",
    description: "Test material description",
    unitId: unitId,
    categoryId: "",
  };

  const createdCategory = await createTestCategory(request, cleanUpQueue);
  testMaterial.categoryId = createdCategory.id;

  const response = await request.post(endpoint("/api/Materials/AddMaterial"), {
    data: testMaterial,
  });
  const createdMaterial = (await response.json()) as MaterialDTO;

  cleanUpQueue.push(endpoint(`/api/Materials/DeleteMaterial/{id}`).replace("{id}", createdMaterial.id));
  return createdMaterial;
}

export async function createTestOrder(
  request: APIRequestContext,
  cleanUpQueue: string[]
): Promise<OrderDTO> {
  const testOrder: OrderDTO = {
    pickupDate: "2025-01-01T20:00:00.571Z",
    createdDate: "2025-01-01T20:00:00.571Z",
    clientName: null,
    clientPhone: "0889123456",
    clientId: null,
    isPaid: true,
    advancePaiment: 10,
    status: 0,
    orderItems: [
      {
        productId: "F0D5A20C-FCE3-FB44-87CF-003F3CB21AA5", // FIXME: Hardcoded productId - must exist in the database
        productAmount: 1,
        description: "lorem ipsum",
        cakeFoto: "c200",
        cakeTitle: "Happy Birthday",
        itemUnitPrice: 10,
        isInProgress: false,
        isComplete: false,
      },
    ],
  };

  const createdClient = await createTestClient(request, cleanUpQueue);
  testOrder.clientId = createdClient.id;
  testOrder.clientName = createdClient.name;
  testOrder.clientPhone = createdClient.phone;

  const response = await request.post(endpoint("/api/Orders/CreateOrder"), {
    data: testOrder,
  });
  const createdOrder = (await response.json()) as OrderDTO;

  cleanUpQueue.push(endpoint(`/api/Orders/DeleteOrder/{id}`).replace("{id}", createdOrder.id));
  return createdOrder;
}

export async function createTestDelivery(
  request: APIRequestContext,
  cleanUpStack: string[]
): Promise<DeliveryDTO> {
  const testDelivery: DeliveryDTO = {
    deliveryDate: "2025-01-01T20:00:00.571Z",
    vendorId: "",
    vendorName: "",
    invoiceNumber: getRandomInvoiceNumber(),
    notes: "Test delivery",
    items: [
      {
        materialId: "",
        materialName: "",
        materialUnit: "",
        quantity: 10,
        unitPrice: 5,
        vat: 20,
        expirationDate: "2025-12-31",
        lotNumber: "LOT001",
        notes: "Test delivery item",
      },
    ],
    total: 50,
    tax: 10,
    totalWithTax: 60,
  };

  const createdVendor = await createTestVendor(request, cleanUpStack);
  testDelivery.vendorId = createdVendor.id;
  testDelivery.vendorName = createdVendor.name;

  const createdMaterial = await createTestMaterial(request, cleanUpStack);
  
  testDelivery.items[0].materialId = createdMaterial.id;
  testDelivery.items[0].materialName = createdMaterial.name;
  testDelivery.items[0].materialUnit = createdMaterial.unitId;

  const response = await request.post(endpoint("/api/Deliveries/Create"), {
    data: testDelivery,
  });
  const createdDelivery = (await response.json()) as DeliveryDTO;

  cleanUpStack.push(endpoint(`/api/Deliveries/Delete/{id}`).replace("{id}", createdDelivery.id));
  return createdDelivery;
}
