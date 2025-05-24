# Test info

- Name: GET bad request users?page=--
- Location: /home/mp/Dokumenty/AppTesting/playwrightTestsExercise/tests/users/userGet.spec.js:39:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
    at /home/mp/Dokumenty/AppTesting/playwrightTestsExercise/tests/users/userGet.spec.js:41:35
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
   8 | https://reqres.in/api/users/?page=a
   9 | */
  10 | test('GET Request users/2', { tag: '@smoke' }, async ({ requestContext }) => {
  11 |     const response = await requestContext.get('users/2');
  12 |
  13 |     expect(response.status()).toBe(200);
  14 |
  15 |     const text = await response.text();
  16 |     expect(text).toContain('Janet');
  17 |
  18 |     const json = await response.json();
  19 |     console.log(json)
  20 |     SchemaValidator.validateSchema(json, 'user.response.schema.json');
  21 | });
  22 |
  23 | badUsers.forEach(({ user }) => {
  24 |     test(`GET bad request users/2 user: ${user}`, { tag: '@smoke' }, async ({ requestContext }) => {
  25 |         const response = await requestContext.get('users/' + user);
  26 |         expect(response.status()).toBe(404);
  27 |     });
  28 | });
  29 |
  30 | test('GET Request users?page=2', async ({ requestContext }) => {
  31 |     const response = await requestContext.get('users?page=2');
  32 |     expect(response.status()).toBe(200);
  33 |     const json = await response.json();
  34 |     console.log(json)
  35 |     SchemaValidator.validateSchema(json, 'get.users.response.schema.json');
  36 | });
  37 |
  38 | badUsers.forEach(({ user }) => {
  39 |     test(`GET bad request users?page=${user}`, async ({ requestContext }) => {
  40 |         const response = await requestContext.get('users?page=' + user);
> 41 |         expect(response.status()).toBe(404);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  42 |     });
  43 | });
  44 |
  45 |
```