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

---
# 📋 Test cases

| TC ID  | Title                                           | Method | Endpoint / Payload                                                  | Expected Output                    | Notes                                |
|--------|-------------------------------------------------|--------|----------------------------------------------------------------------|------------------------------------|--------------------------------------|
| TC001  | GET valid request for user with ID 2            | GET    | `users/2`                                                            | 200 OK<br>Contains "Janet"<br>Valid against `user.response.schema.json` | Includes schema validation          |
| TC002  | GET with invalid user IDs                       | GET    | `users/abc`, `users/-1`, `users/9999`                                | 404 Not Found                      | Iterates over `badUsers` array       |
| TC003  | GET valid users on page 2                       | GET    | `users?page=2`                                                       | 200 OK<br>Valid against `get.users.response.schema.json` | Includes schema validation          |
| TC004  | GET with invalid page query parameters          | GET    | `users?page=abc`, `users?page=-1`, `users?page=9999`                 | 404 Not Found                      | Iterates over `badUsers` array       |
| TC005  | POST valid - standard values                    | POST   | `{ "name": "morpheus", "job": "leader" }`                            | 201 Created<br>Valid JSON response | Standard input                       |
| TC006  | POST valid - apostrophes in both fields         | POST   | `{ "name": "O'Connor", "job": "team's leader" }`                     | 201 Created<br>Valid JSON response | Apostrophes in strings               |
| TC007  | POST valid - double quotes in both fields       | POST   | `{ "name": "\"Trinity\"", "job": "\"Operator\"" }`                   | 201 Created<br>Valid JSON response | Double quotes in strings             |
| TC008  | POST valid - percent signs in both fields       | POST   | `{ "name": "100% Neo", "job": "100% Hacker" }`                       | 201 Created<br>Valid JSON response | Percent signs included               |
| TC009  | POST valid - mix of apostrophes, quotes, % signs| POST   | `{ "name": "Mr. \"Anderson\" O'Neil", "job": "Security's \"Top 1%\"" }` | 201 Created<br>Valid JSON response | Special characters combined          |
| TC010  | POST valid - long strings with special characters| POST  | `{ "name": "A'%\"aaaa...(255)", "job": "B\"%'bbbb...(255)" }`        | 201 Created<br>Valid JSON response | Max length with special chars        |
| TC011  | POST invalid - missing `job` field              | POST   | `{ "name": "morpheus" }`                                            | 400 Bad Request                    | Required field missing               |
| TC012  | POST invalid - missing `name` field             | POST   | `{ "job": "Developer" }`                                            | 400 Bad Request                    | Required field missing               |
| TC013  | POST invalid - empty payload                    | POST   | `{}`                                                                | 400 Bad Request                    | Both required fields missing         |
| TC014  | POST invalid - integers in both fields          | POST   | `{ "name": 124, "job": 150 }`                                       | 400 Bad Request                    | Invalid data types                   |
| TC015  | POST invalid - integer in `job`                 | POST   | `{ "name": "Tereza", "job": 150 }`                                  | 400 Bad Request                    | `job` is not a string                |
| TC016  | POST invalid - integer in `name`                | POST   | `{ "name": 12, "job": "Doctor" }`                                   | 400 Bad Request                    | `name` is not a string               |
| TC017  | POST invalid - empty strings                    | POST   | `{ "name": "", "job": "" }`                                         | 400 Bad Request                    | Edge case – empty strings            |
| TC018  | POST invalid - null values                      | POST   | `{ "name": null, "job": null }`                                     | 400 Bad Request                    | Null values not allowed              |
| TC019  | POST invalid - boolean values                   | POST   | `{ "name": true, "job": true }`                                     | 400 Bad Request                    | Incorrect data type                  |
| TC020  | POST invalid - overly long strings              | POST   | `{ "name": "A'%\"aaaa...", "job": "B\"%'bbbb..." }`                 | 400 Bad Request or 413 Payload Too Large | Edge case – string length > 255     |
| TC021  | POST invalid - extra field                      | POST   | `{ "name": "Johan", "job": "Leader", "age": 48 }`                   | 400 Bad Request                    | Should be rejected                   |
| TC022  | DELETE user - valid user id                     | DELETE | `users/{id}`                                                         | 204 No Content                     | Standard deletion                    |
| TC023  | DELETE user - invalid user id                   | DELETE | `users/{id}`                                                         | 400 Bad Request                    | Invalid ID: -1, null, empty, string, injection |
| TC024  | PUT valid - standard values                     | PUT    | `/api/users/{id}`<br>{ "name": "morpheus", "job": "leader" }        | 201 Created<br>Valid JSON response | Standard input                       |
| TC025  | PUT valid - apostrophes in both fields          | PUT    | `/api/users/{id}`<br>{ "name": "O'Connor", "job": "team's leader" } | 201 Created<br>Valid JSON response | Apostrophes in input                 |
| TC026  | PUT valid - double quotes in both fields        | PUT    | `/api/users/{id}`<br>{ "name": "\"Trinity\"", "job": "\"Operator\"" } | 201 Created<br>Valid JSON response | Double quotes                        |
| TC027  | PUT valid - percent signs in both fields        | PUT    | `/api/users/{id}`<br>{ "name": "100% Neo", "job": "100% Hacker" }   | 201 Created<br>Valid JSON response | Percent signs                        |
| TC028  | PUT valid - mix of apostrophes, quotes, % signs | PUT    | `/api/users/{id}`<br>{ "name": "Mr. \"Anderson\" O'Neil", "job": "Security's \"Top 1%\"" } | 201 Created<br>Valid JSON response | Mixed special characters             |
| TC029  | PUT valid - long strings with special characters| PUT    | `/api/users/{id}`<br>{ "name": "A'%\"aaa...(255)", "job": "B\"%'bbb...(255)" } | 201 Created<br>Valid JSON response | Max length + special chars           |
| TC030  | PUT invalid - empty payload                     | PUT    | `/api/users/{id}`<br>{}                                             | 400 Bad Request / Validation Error | No fields provided                   |
| TC031  | PUT invalid - int in both fields                | PUT    | `/api/users/{id}`<br>{ "name": 124, "job": 150 }                    | 400 Bad Request / Validation Error | Should be strings                    |
| TC032  | PUT invalid - int in `job`                      | PUT    | `/api/users/{id}`<br>{ "name": "Tereza", "job": 150 }               | 400 Bad Request / Validation Error | Job should be a string               |
| TC033  | PUT invalid - int in `name`                     | PUT    | `/api/users/{id}`<br>{ "name": 12, "job": "Doctor" }                | 400 Bad Request / Validation Error | Name should be a string              |
| TC034  | PUT invalid - empty strings                     | PUT    | `/api/users/{id}`<br>{ "name": "", "job": "" }                      | 400 Bad Request / Validation Error | Empty strings not allowed            |
| TC035  | PUT invalid - null values                       | PUT    | `/api/users/{id}`<br>{ "name": null, "job": null }                  | 400 Bad Request / Validation Error | Null values are invalid              |
| TC036  | PUT invalid - boolean values                    | PUT    | `/api/users/{id}`<br>{ "name": true, "job": true }                  | 400 Bad Request / Validation Error | Invalid types                        |
| TC037  | PUT invalid - strings exceed 255 characters     | PUT    | `/api/users/{id}`<br>{ "name": "A'%\"aaa...(256)", "job": "B\"%'bbb...(256)" } | 400 Bad Request / Validation Error | Input exceeds max length             |
| TC038  | PUT invalid - extra field present               | PUT    | `/api/users/{id}`<br>{ "name": "Johan", "job": "Leader", "age": 48 }` | 400 Bad Request / Validation Error | Unexpected field                     |
| TC039  | PUT invalid - extra field `id` present          | PUT    | `/api/users/{id}`<br>{ "id": 2 }`                                   | 400 Bad Request / Validation Error | `id` is readonly                     |
| TC040  | PUT invalid - extra field `createdAt` present   | PUT    | `/api/users/{id}`<br>{ "createdAt": "2024-01-01T00:00:00Z" }`       | 400 Bad Request / Validation Error | `createdAt` is readonly              |

