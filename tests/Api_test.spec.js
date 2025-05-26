import { test, expect } from '../utils/Fixtures';
import { SchemaValidator } from '../utils/SchemaValidator';

/* curl -X POST -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
https://reqres.in/api/users/ \
-d '{"name": "Norman", "job": "Teacher"}'
*/

test('API PUT Request users/2', async ({ requestContext }) => {
    const response = await requestContext.put('users/2', { data: updatedUser });
    expect(response.status()).toBe(200);
    const json = await response.json();
    console.log(json)
    expect(json.job).toContain(updatedUser.job);
    expect(json.name).toContain(updatedUser.name);
    console.log(json)
    SchemaValidator.validateSchema(json, 'put.user.response.schema.json');
    
});
