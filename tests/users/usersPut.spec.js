import { test, expect } from '../../utils/Fixtures';
import { createNewUser } from '../../utils/CreateNewUser'
import { newUsersValid as newUsers } from '../../testingData/UsersValidValues';
import { newUsersInvalid as invalidUsers } from '../../testingData/UsersInvalidValues';
import { removeUser } from '../../utils/RemoveUser';
import { SchemaValidator } from '../../utils/SchemaValidator';

let user;
const filteredInvalidUsers = invalidUsers.filter(user => 
    !user.description.includes("missing `name`") && 
    !user.description.includes("missing `job`")
);
test.beforeAll(async () => {
    user = await createNewUser("Trevor", "photographer");
    console.log('LOG:'+ user.id);
});

test.afterAll(async () => {
    await removeUser(user.id);
});

/*
{
payload:
{
    "name": "morpheus",
    "job": "leader",
}
respose:
{
    "name": "morpheus",
    "job": "leader",
    "id": "495",
    "createdAt": "2025-05-26T10:30:48.555Z"
}
*/
/* curl -X PUT -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
https://reqres.in/api/users/ \
-d '{"name": "Norman", "job": "Teacher"}'
*/

// Move the forEach loops inside test.describe to ensure proper execution order
test.describe('PUT Request Tests', () => {
    // Valid users tests
    for (const newUserValues of newUsers) {
        test(`PUT Request users with ${newUserValues.description}`, async ({ requestContext }) => {
            const response = await requestContext.put('users/' + user.id, { data: newUserValues.payload });
            expect(response.status()).toBe(200);
            const json = await response.json();
            console.log(newUserValues.payload);
            expect(json.job).toContain(newUserValues.payload.job);
            expect(json.name).toContain(newUserValues.payload.name);
            console.log(json);
            SchemaValidator.validateSchema(json, 'put.user.response.schema.json');
        });
    }

    // Invalid users tests
    for (const invalidUserValues of filteredInvalidUsers) {
        test(`PUT Request users with ${invalidUserValues.description}`, async ({ requestContext }) => {
            const response = await requestContext.put('users/' + user.id, { data: invalidUserValues.payload });
            expect(response.status()).toBe(400);
        });
    }

    // Additional edge case tests
    test(`PUT Request users id update`, async ({ requestContext }) => {
        const response = await requestContext.put('users/' + user.id, { data: { id: user.id } });
        expect(response.status()).toBe(400);
    });

    test(`PUT Request users createdAt update`, async ({ requestContext }) => {
        const response = await requestContext.put('users/' + user.id, { data: { createdAt: new Date().toISOString() } });
        expect(response.status()).toBe(400);
    });
});
