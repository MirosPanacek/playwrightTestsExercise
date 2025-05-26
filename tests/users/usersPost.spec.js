import { test, expect } from '../../utils/Fixtures';
import { SchemaValidator } from '../../utils/SchemaValidator';
import { newUsersValid as newUsers } from '../../testingData/UsersValidValues';
import { newUsersInvalid as invalidUsers } from '../../testingData/UsersInvalidValues';
import { removeUser } from '../../utils/RemoveUser';


let createdUsers = [];

test.afterAll(async () => {
    createdUsers.forEach(() =>{
        removeUser(createdUsers.id);
    });
});

/* curl -X POST -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
https://reqres.in/api/users/ \
-d '{"name": "Norman", "job": "Teacher"}'
*/
//TC005
newUsers.forEach((user) => {
    test(`TC005 POST Request users/ Description: ${user.description}`, async ({ requestContext }) => {
        const response = await requestContext.post('users/', { data: user.payload});
        expect(response.status()).toBe(201);
        const json = await response.json();
        expect(json.name).toContain(user.payload.name);
        expect(json.job).toContain(user.payload.job);
        console.log(json);
        createdUsers.push(json)
        SchemaValidator.validateSchema(json, 'create.user.response.schema.json');
    });
});

invalidUsers.forEach((user) => {
    test(`${user.description}`, async ({ requestContext }) => {
        const response = await requestContext.post('users/', { data: user.payload});
        expect(response.status()).toBe(400);
    });
});