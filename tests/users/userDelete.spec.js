import { test, expect } from '../../utils/Fixtures';
import { createNewUser } from '../../utils/CreateNewUser';
import { invalidUsersId } from '../../testingData/InvalidUsersId';

let user;
test.beforeAll(async () => {
    console.log('About to create user...');
    user = await createNewUser("Tomy", "teacher");
    console.log('User created:', user);
    console.log('User ID:', user?.id);
});

/* curl -X DELETE -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
https://reqres.in/api/users/-1
*/
test.describe('DELETE Request Tests', () => {
    test(`DELETE Requset users/`, async ({ requestContext }) => {
        test.info().title = `DELETE Request users/${user.id}`;
        const response = await requestContext.delete('users/' + user.id);
        expect(response.status()).toBe(204);
    });

    for (const invalidId of invalidUsersId) {
        test(`DELETE Requset users/${invalidId.id}`, async ({ requestContext }) => {
            const response = await requestContext.delete('users/' + invalidId.id);
            expect(response.status()).toBe(400);
        }
        )};
});