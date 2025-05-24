import { test, expect } from '../utils/Fixtures';
import { SchemaValidator } from '../utils/SchemaValidator';
import { newUser, updatedUser } from '../testingData/Users';

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

test('API GET Request users/2',{tag: '@smoke'}, async ({ requestContext }) => {
    const response = await requestContext.get('users/2'); 

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Janet'); 

    const json = await response.json();
    console.log(json)
    SchemaValidator.validateSchema(json, 'user.response.schema.json');
});


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

test('API DELETE Requset users/2', async ({ requestContext }) => {
    const response = await requestContext.delete('users/2');
    expect(response.status()).toBe(204);
});