import { test as base, expect } from '@playwright/test';
import { baseURL, extraHTTPHeaders } from './RequestConfig.js';

export const test = base.extend({
  requestContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders,
    });
    await use(context);
    await context.dispose();
  },
});

export { expect };