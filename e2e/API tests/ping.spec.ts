import { test, expect } from '@playwright/test';

test('Api server should be running', async ({ request }) => {
    const response = await request.get('/api/health/ping');
    expect(response.status()).toBe(200);
});