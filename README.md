# Playwright Tests Exercise
Playwright exercise  
API is from URL: [https://reqres.in](https://reqres.in)  
Example tests for methods **GET**, **POST**, **PUT**, and **DELETE**.
## Requirements: ##
- node.js v19.9.0
- npm v9.6.3 \
  *or*
- docker
- docker compose

## Run: ##
```bash
npx playwright test --ui
```
*OR*
``` bash
npx playwright test
```

#### Docker Compose ####
```bash
docker compose up
```
Test results is in: **./playwright-report/index.html**
#### Run CI  in Github action ###
The setting for github action is in /.github/workflows/main.yml  
It's run if:
 - push on branches main
 - pull_request on branches main
 - at 11:00 everyday

## Known Issue ##
If the command `npx playwright show-report` opens an empty browser window, check whether the port used for the report is already occupied by another service.

## Test cases ##
### Test Case ID: TC001 ##  
**Title:** GET valid request for user with ID 2  
**Description:** Verify that the `users/2` endpoint returns status 200, includes the name "Janet", and matches the expected JSON schema.  
**Input:**  
- Method: GET  
- Endpoint: `users/2`
   
**Expected Output:**  
- Status code `200`  
- Response contains the string `"Janet"`  
- JSON response is valid against `user.response.schema.json`
  
**Tags:** @smoke  
**Notes:** Includes schema validation
   
### Test Case ID: TC002 ###  
**Title:** GET request with invalid user IDs  
**Description:** Iterate over invalid user IDs and verify the `users/:id` endpoint returns status 404.  
**Input:**  
- Method: GET  
- Endpoints like: `users/abc`, `users/-1`, `users/9999`
  
**Expected Output:**  
- Status code `404`

**Tags:** -  
**Notes:** Uses `badUsers` array to iterate over invalid inputs  

### Test Case ID: TC003 ###
**Title:** GET valid request for users on page 2  
**Description:** Verify that the `users?page=2` endpoint returns status 200 and the response matches the expected JSON schema.  
**Input:**  
- Method: GET  
- Endpoint: `users?page=2`

**Expected Output:**  
- Status code `200`  
- JSON response is valid against `get.users.response.schema.json`

**Tags:** —  
**Notes:** Includes schema validation  
  
### Test Case ID: TC004 ### 
**Title:** GET request with invalid page query parameters  
**Description:** Iterate over invalid `page` query values and verify that the `users?page=<value>` endpoint returns status 404.  
**Input:**  
- Method: GET  
- Endpoints like: `users?page=abc`, `users?page=-1`, `users?page=9999`
 
**Expected Output:**  
- Status code `404`

**Tags:** —  
**Notes:** Uses `badUsers` array to iterate over invalid inputs  

---

### Test Case ID: TC005 ##  
**Title:** POST valid user with valid parametrs  
**Description:**  
Verify API accepts `name` and `job` values containing valid special characters such as `'`, `"`, `%`, maximum length values (255 characters).  
**Input:**  
- **Method:** POST  
- **Endpoint:** `/api/users`  
- **Payload:**  '/testingData/NewUsersValidValues.js'  
  
**Expected Output:**  
- Status code: `201 Created`  

**Tags:** —  
**Notes:** Response contains exact values from the payload  
JSON response conforms to user.create.response.schema.json
