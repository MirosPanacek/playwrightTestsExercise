import { test, expect } from '../../utils/Fixtures';
import { SchemaValidator } from '../../utils/SchemaValidator';
import { badUsers } from '../../testingData/usersGetBadRequset'

// test runs on basic datasets in enviroment
/*
/* curl -X GET -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" \
https://reqres.in/api/users?pag=a
*/
/*
TC001
*/
test('TC001 GET Request users/2', { tag: '@smoke' }, async ({ requestContext }) => {
    const response = await requestContext.get('users/2');

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Janet');

    const json = await response.json();
    console.log(json)
    SchemaValidator.validateSchema(json, 'user.response.schema.json');
});

/*
TC002
*/
badUsers.forEach(({ user }) => {
    test(`TC002 GET bad request users/2 user: ${user}`, { tag: '@smoke' }, async ({ requestContext }) => {
        const response = await requestContext.get('users/' + user);
        expect(response.status()).toBe(404);
    });
});

/*
TC003
*/
test('TC003 GET Request users?page=2', async ({ requestContext }) => {
    const response = await requestContext.get('users?page=2');
    expect(response.status()).toBe(200);
    const json = await response.json();
    console.log(json)
    SchemaValidator.validateSchema(json, 'get.users.response.schema.json');
});

/*
TC004
*/
badUsers.forEach(({ user }) => {
    test(`TC004 GET bad request users?page=${user}`, async ({ requestContext }) => {
        const response = await requestContext.get('users?page=' + user);
        expect(response.status()).toBe(404);
    });
});

