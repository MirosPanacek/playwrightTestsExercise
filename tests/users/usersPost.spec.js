import { test, expect } from '../utils/Fixtures';
import { SchemaValidator } from '../utils/SchemaValidator';
import { newUser } from '../testingData/Users';

test.beforeEach(async () => {

});

test.afterEach(async () => {

});

/* curl -X POST -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
https://reqres.in/api/users/ \
-d '{"name": "Norman", "job": "Teacher"}'
*/
test('API POST Request users/', async ({ requestContext }) => {
    const response = await requestContext.post('users/', { data: newUser });
    expect(response.status()).toBe(201);
    const json = await response.json();
    expect(json.name).toContain(newUser.name);
    expect(json.job).toContain(newUser.job);
    console.log(json);
    SchemaValidator.validateSchema(json, 'create.user.response.schema.json');

});