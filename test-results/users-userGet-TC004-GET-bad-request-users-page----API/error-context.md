# Test info

- Name: TC004 GET bad request users?page=--
- Location: /home/mp/Dokumenty/AppTesting/playwrightTestsExercise/tests/users/userGet.spec.js:51:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 429
    at /home/mp/Dokumenty/AppTesting/playwrightTestsExercise/tests/users/userGet.spec.js:53:35
```

# Test source

```ts
   1 | import { test, expect } from '../../utils/Fixtures';
   2 | import { SchemaValidator } from '../../utils/SchemaValidator';
   3 | import { badUsers } from '../../testingData/usersGetBadRequset'
   4 |
   5 | // test runs on basic datasets in enviroment
   6 | /*
   7 | /* curl -X GET -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
   8 | https://reqres.in/api/users?pag=a
   9 | */
  10 | /*
  11 | TC001
  12 | */
  13 | test('TC001 GET Request users/2', { tag: '@smoke' }, async ({ requestContext }) => {
  14 |     const response = await requestContext.get('users/2');
  15 |
  16 |     expect(response.status()).toBe(200);
  17 |
  18 |     const text = await response.text();
  19 |     expect(text).toContain('Janet');
  20 |
  21 |     const json = await response.json();
  22 |     console.log(json)
  23 |     SchemaValidator.validateSchema(json, 'user.response.schema.json');
  24 | });
  25 |
  26 | /*
  27 | TC002
  28 | */
  29 | badUsers.forEach(({ user }) => {
  30 |     test(`TC002 GET bad request users/2 user: ${user}`, async ({ requestContext }) => {
  31 |         const response = await requestContext.get('users/' + user);
  32 |         expect(response.status()).toBe(404);
  33 |     });
  34 | });
  35 |
  36 | /*
  37 | TC003
  38 | */
  39 | test('TC003 GET Request users?page=2', async ({ requestContext }) => {
  40 |     const response = await requestContext.get('users?page=2');
  41 |     expect(response.status()).toBe(200);
  42 |     const json = await response.json();
  43 |     console.log(json)
  44 |     SchemaValidator.validateSchema(json, 'get.users.response.schema.json');
  45 | });
  46 |
  47 | /*
  48 | TC004
  49 | */
  50 | badUsers.forEach(({ user }) => {
  51 |     test(`TC004 GET bad request users?page=${user}`, async ({ requestContext }) => {
  52 |         const response = await requestContext.get('users?page=' + user);
> 53 |         expect(response.status()).toBe(404);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  54 |     });
  55 | });
  56 |
  57 |
```