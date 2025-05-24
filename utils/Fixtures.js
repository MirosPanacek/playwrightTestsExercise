const base = require('@playwright/test');

exports.test = base.test.extend({
    requestContext: async ({ playwright }, use) => {
        const context = await playwright.request.newContext({
            baseURL: 'https://reqres.in/api/',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            }
        });
        await use(context);
        await context.dispose();
    }

    
});

exports.expect = base.expect;
