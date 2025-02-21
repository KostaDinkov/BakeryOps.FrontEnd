import { test, expect } from "@playwright/test";
import { addDays, format } from "date-fns";

const baseUrl = "http://localhost:3002";
test.describe("Orders UI Tests", () => {
  async function fillForm(page){
    // Fill form with actual client data
    await page.getByLabel("Име на клиент").fill("Тест Клиент");
    await page.getByLabel("Телефон на клиент").fill("0888123456");

    // Set pickup date to tomorrow
    const tomorrow = addDays(new Date(), 1);
    const formattedDate = format(tomorrow, "ddMMyyyy HH:mm");
    await page.getByLabel("За дата и час").pressSequentially(formattedDate);

    // Add order item using first available product
    await page.getByRole("button", { name: "Добави Продукт" }).click();
    await page.getByLabel("Продукт").click();

    // Select first product from dropdown
    const firstProduct = await page.getByRole("option").first();
    await firstProduct.click();

    await page.getByLabel("Количество").fill("2");
  }
  test("creates a new order", async ({ page }) => {
    // Wait for both initial data loading responses
    await page.goto(`${baseUrl}/orders/create`);
    await fillForm(page);

    // Create a promise to wait for the POST response before clicking submit
    const createOrderPromise = page.waitForResponse(response =>
      response.url().includes('/api/Orders/CreateOrder') &&
      response.status() === 201
      
    );

    await page.getByRole("button", { name: "Запази Поръчката" }).click();

    // Wait for the response and get the created order data
    const response = await createOrderPromise;
    const responseData = await response.json();
    
    // Verify the response and navigation
    expect(response.ok()).toBeTruthy();
    await page.waitForURL(`${baseUrl}/orders`);
    expect(page.url()).toBe(`${baseUrl}/orders`);
  });

  test("updates existing order", async ({ page }) => {
    await page.goto(`${baseUrl}/orders/create`);
    await fillForm(page);
    const createOrderPromise = page.waitForResponse(response =>
      response.url().includes('/api/Orders/CreateOrder') &&
      response.status() === 201
    );

    await page.getByRole("button", { name: "Запази Поръчката" }).click();

    // Wait for the response and get the created order data
    const response = await createOrderPromise;
    const responseData = await response.json();
    const orderId = responseData.id;
    expect(orderId).not.toBeNull();
    
    // Navigate to the edit page
    await page.goto(`${baseUrl}/orders/update/${orderId}`);
    await page.waitForURL(`${baseUrl}/orders/update/${orderId}`);
    await page.getByLabel("Име на клиент").fill("Updated Test Client");
    await page.getByLabel("Количество").fill("3");

    const updateOrderPromise = page.waitForResponse(response =>
      response.url().includes('/api/Orders/UpdateOrder') &&
      response.status() === 200
    );
    await page.getByRole("button", { name: "Запази Поръчката" }).click();
    await updateOrderPromise;
    await page.waitForURL(`${baseUrl}/orders`);
    expect(page.url()).toBe(`${baseUrl}/orders`);


  });

});
