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

## Known Issue ##
If the command `npx playwright show-report` opens an empty browser window, check whether the port used for the report is already occupied by another service.

