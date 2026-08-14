import { ch, r } from '../helpers.js'

export const automationManualsB = [
  {
    id: 'api-testing',
    title: 'API Testing',
    tagline: 'Postman → Newman CI → code automation → OpenAPI contracts → security basics.',
    category: 'automation',
    accent: '#1A535C',
    cover: 'covers/api-testing-cover.png',
    duration: '8–10 weeks (part-time)',
    levelSpan: 'Beginner → Job-ready',
    who: 'QA and developers who want solid backend coverage — manual testers moving to API automation welcome.',
    outcomes: [
      'Design API tests from HTTP basics through schema validation and negative cases',
      'Automate Postman collections in CI with Newman and code-based runners',
      'Apply OpenAPI contract thinking and OWASP API security smoke checks',
    ],
    pace: {
      hoursPerDay: '1–1.5 hours/day (≈ 7–10 hrs/week)',
      recommended: '~8–10 weeks',
      accelerated: '~5–6 weeks at 2–3 hrs/day',
      slow: '~12 weeks if busy',
    },
    chapters: [
      ch({
        id: 'api-how',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this roadmap',
        minutes: 25,
        overview:
          'API tests give faster feedback than UI and catch contract breaks early. This path goes Postman → Newman → code → OpenAPI → security — with checkpoints and a public portfolio repo.',
        learn: ['8–10 week pacing', 'Tools you will touch', 'Job-ready API portfolio definition'],
        steps: [
          {
            title: 'Study pace',
            body: 'Plan 1–1.5 hours daily. API testing rewards consistency — HTTP vocabulary becomes second nature.',
            doThis: 'Create api-testing-journey repo on GitHub. Block calendar for 7 days.',
            items: [
              'Recommended: ~8–10 weeks at 7–10 hrs/week',
              'Accelerated: ~5–6 weeks at 2–3 hrs/day',
              'Slow: ~12 weeks',
            ],
          },
          {
            title: 'Lab APIs',
            body: 'JSONPlaceholder, httpbin, ReqRes, and Petstore OpenAPI are your sandboxes. Do not wait for a job to give you an API.',
            doThis: 'Bookmark jsonplaceholder.typicode.com and httpbin.org. Send first GET in browser or curl.',
          },
          {
            title: 'Checkpoints',
            body: 'Gate 1: Postman collection with tests. Gate 2: Newman in CI. Gate 3: code + OpenAPI + security portfolio.',
            doThis: 'Read checkpoint chapters. Copy pass criteria to README.',
          },
        ],
        checklist: ['Repo created', 'Postman or Insomnia installed', 'curl works in terminal'],
        practice: { title: 'Day zero', brief: 'README with goal, timeline, first commit.' },
        resources: [
          r('doc', 'MDN — HTTP Overview', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', 'EN'),
          r('lab', 'JSONPlaceholder', 'https://jsonplaceholder.typicode.com/', 'EN'),
        ],
      }),

      ch({
        id: 'api-http',
        phase: 'A · HTTP Foundations',
        level: 'beginner',
        title: 'HTTP vocabulary & manual exploration',
        minutes: 55,
        durationLabel: 'Week 1',
        overview:
          'Methods, status codes, headers, JSON bodies, auth headers. Explore with curl and browser DevTools before you automate — vocabulary prevents guessing.',
        learn: ['GET/POST/PUT/PATCH/DELETE', '2xx/4xx/5xx meaning', 'Headers: Content-Type, Authorization'],
        steps: [
          {
            title: 'Speak HTTP',
            body: 'GET reads (safe, idempotent). POST creates. PUT replaces. PATCH partial update. DELETE removes. Idempotency matters for retries.',
            doThis: 'Hit httpbin.org/get with curl. Inspect response headers and JSON body.',
            code: 'curl -i https://httpbin.org/get\ncurl -X POST https://httpbin.org/post -H "Content-Type: application/json" -d \'{"name":"qa"}\'',
          },
          {
            title: 'Status codes that matter',
            body: '200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation, 500 Server Error.',
            doThis: 'Trigger 404 and 401 on httpbin or a public API. Write expected status for 5 scenarios.',
          },
          {
            title: 'JSON request and response bodies',
            body: 'APIs speak JSON. Content-Type: application/json. Parse nested objects — data.user.email patterns.',
            doThis: 'GET jsonplaceholder/users/1. List 5 JSON paths you would assert (id, name, email, etc.).',
          },
          {
            title: 'Auth basics',
            body: 'Bearer token in Authorization header. API keys in header or query (prefer header). Never commit secrets.',
            doThis: 'Read httpbin.org/bearer docs. Send request with dummy Authorization header.',
          },
        ],
        checklist: ['I can explain 6 status codes', 'curl GET and POST work', 'I read JSON response paths'],
        practice: { title: 'HTTP cheat sheet', brief: 'Commit HTTP-NOTES.md: methods, codes, headers you use daily.' },
        resources: [
          r('doc', 'MDN — HTTP Methods', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods', 'EN'),
          r('lab', 'httpbin.org', 'https://httpbin.org/', 'EN'),
          r('lab', 'JSONPlaceholder Guide', 'https://jsonplaceholder.typicode.com/guide/', 'EN'),
        ],
      }),

      ch({
        id: 'api-postman',
        phase: 'A · HTTP Foundations',
        level: 'beginner',
        title: 'Postman collections & environments',
        minutes: 60,
        durationLabel: 'Week 1–2',
        overview:
          'Postman is the industry default for API exploration. Collections, environments, variables, and test scripts — organized like a real QA team.',
        learn: ['Collections and folders', 'Environment variables', 'Pre-request scripts', 'Tests tab assertions'],
        steps: [
          {
            title: 'Build a collection',
            body: 'Folder by resource: /users, /posts. Name requests as verbs: Get User, Create Post. Variables: {{baseUrl}}, {{userId}}.',
            doThis: 'Create JSONPlaceholder collection with 8 requests across users and posts.',
          },
          {
            title: 'Environment setup',
            body: 'Dev/staging/prod environments swap baseUrl without duplicating requests.',
            doThis: 'Create environments local and staging (same baseUrl for lab). Switch and re-run.',
          },
          {
            title: 'Tests tab assertions',
            body: 'pm.test("status is 200", () => pm.response.to.have.status(200)); pm.expect(json.id).to.eql(1);',
            doThis: 'Add 3 tests per request on GET user: status, content-type, body fields.',
            code: 'pm.test("Status is 200", function () {\n  pm.response.to.have.status(200);\n});\npm.test("User has email", function () {\n  var json = pm.response.json();\n  pm.expect(json.email).to.include("@");\n});',
          },
          {
            title: 'Chain variables',
            body: 'Create post → save id from response → use in GET /posts/{{postId}}.',
            doThis: 'POST new post, parse pm.response.json().id into pm.environment.set("postId", id).',
          },
        ],
        checklist: ['Collection with 8+ requests', 'Environment with baseUrl', 'Tests on every request'],
        practice: { title: 'CRUD folder', brief: 'Full CRUD on /posts: create, read, update, delete with chained postId.' },
        resources: [
          r('doc', 'Postman Learning Center', 'https://learning.postman.com/', 'EN'),
          r('doc', 'Postman — Writing Tests', 'https://learning.postman.com/docs/tests-and-scripts/test-scripts/test-examples/', 'EN'),
        ],
      }),

      ch({
        id: 'api-negative',
        phase: 'B · Test Design',
        level: 'intermediate',
        title: 'Negative tests & edge cases',
        minutes: 55,
        durationLabel: 'Week 2–3',
        overview:
          'Happy paths are table stakes. Pro API testers ship negative cases: invalid payloads, missing auth, wrong methods, boundary values.',
        learn: ['Negative case categories', 'Error body assertions', 'Boundary testing'],
        steps: [
          {
            title: 'Negative categories',
            body: 'Invalid JSON, missing required fields, wrong types, unauthorized, forbidden, not found, method not allowed.',
            doThis: 'Add 5 negative requests to collection. Assert 4xx status AND error message shape.',
          },
          {
            title: 'Assert error contracts',
            body: 'Errors should be predictable: { "error": "...", "code": "..." }. Assert keys exist, not just status.',
            doThis: 'Document expected error schema for 401 and 404 in ERROR-CONTRACTS.md.',
          },
          {
            title: 'Boundary values',
            body: 'Empty string, max length, zero, negative numbers, special characters in strings.',
            doThis: 'Test POST with empty title, 10k character body (if API allows), invalid email format.',
          },
          {
            title: 'Test data isolation',
            body: 'Unique titles with timestamp prevent collisions. Delete in teardown or use disposable resources.',
            doThis: 'Pre-request script: pm.environment.set("uniqueTitle", "post-" + Date.now());',
          },
        ],
        checklist: ['5+ negative tests', 'Error body assertions', 'Unique data per run'],
        practice: { title: 'Negative matrix', brief: 'Table in NEGATIVE-TESTS.md: scenario, request, expected status, expected body keys.' },
        resources: [
          r('doc', 'Postman — Test Scripts', 'https://learning.postman.com/docs/tests-and-scripts/test-scripts/intro-to-test-scripts/', 'EN'),
          r('lab', 'ReqRes API', 'https://reqres.in/', 'EN'),
        ],
      }),

      ch({
        id: 'api-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Test Design',
        level: 'intermediate',
        title: 'Checkpoint A — Postman collection portfolio',
        minutes: 30,
        durationLabel: 'Gate',
        overview: 'Prove Postman mastery before CI and code chapters.',
        learn: ['Collection checkpoint criteria'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'Export and commit collection JSON to repo.',
            doThis: 'Verify all items.',
            items: [
              'Collection: 15+ requests with folders',
              'Every request has 2+ tests in Tests tab',
              '5+ negative / edge case tests',
              'Environment file exported',
              'Chained create → read flow works',
              'Collection exported to repo postman/',
            ],
          },
        ],
        checklist: ['All criteria met', 'Collection runs green in Postman runner'],
        practice: { title: 'Export commit', brief: 'git add postman/*.json with clear commit message.' },
        resources: [r('doc', 'Postman — Export Collections', 'https://learning.postman.com/docs/getting-started/importing-and-exporting/exporting-data/', 'EN')],
      }),

      ch({
        id: 'api-newman',
        phase: 'C · Automation & CI',
        level: 'intermediate',
        title: 'Newman — CLI & GitHub Actions',
        minutes: 60,
        durationLabel: 'Week 3–4',
        overview:
          'Collections that only run in Postman GUI are hobbies. Newman runs them headless in CI on every PR.',
        learn: ['newman run', 'Reporters (cli, htmlextra)', 'CI integration', 'Secrets in CI'],
        steps: [
          {
            title: 'Newman local',
            body: 'npm install -g newman (or npx newman). newman run collection.json -e environment.json.',
            doThis: 'Run collection locally via Newman. Fix any failures Postman runner hid.',
            code: 'npm install newman newman-reporter-htmlextra --save-dev\nnpx newman run postman/collection.json -e postman/environment.json',
          },
          {
            title: 'HTML report',
            body: 'newman-reporter-htmlextra gives shareable reports — attach to CI artifacts.',
            doThis: 'Generate HTML report. Open and find a failed assertion in under 30 seconds.',
            code: 'npx newman run postman/collection.json -r htmlextra --reporter-htmlextra-export reports/api-report.html',
          },
          {
            title: 'GitHub Actions',
            body: 'Run Newman on pull_request. Upload report on failure.',
            doThis: 'Add .github/workflows/api-tests.yml. Green on main.',
            code: 'name: API Tests\non: [push, pull_request]\njobs:\n  newman:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm ci\n      - run: npx newman run postman/collection.json -e postman/environment.json -r cli,htmlextra\n      - uses: actions/upload-artifact@v4\n        if: failure()\n        with:\n          name: newman-report\n          path: newman/',
          },
          {
            title: 'Secrets for real APIs',
            body: 'GitHub Secrets for API_KEY. Never hardcode in collection — use {{apiKey}} from env.',
            doThis: 'Document secret setup in README even if lab API needs no key.',
          },
        ],
        checklist: ['Newman green locally', 'CI workflow green', 'Report artifact on failure'],
        practice: { title: 'Break and fix CI', brief: 'Intentional test failure on branch. Confirm CI fails and uploads report.' },
        resources: [
          r('doc', 'Newman CLI', 'https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/', 'EN'),
          r('doc', 'GitHub Actions — Encrypted Secrets', 'https://docs.github.com/en/actions/security-guides/encrypted-secrets', 'EN'),
        ],
      }),

      ch({
        id: 'api-code',
        phase: 'C · Automation & CI',
        level: 'intermediate',
        title: 'Code-based API automation',
        minutes: 70,
        durationLabel: 'Week 4–6',
        overview:
          'Postman scales to a point; code scales further. Automate with Python requests, JavaScript fetch/axios, or Playwright APIRequestContext — pick one stack.',
        learn: ['requests / fetch patterns', 'pytest or Jest structure', 'Setup and teardown', 'Assertions on JSON'],
        steps: [
          {
            title: 'Pick your stack',
            body: 'Python: requests + pytest. JS: fetch + Jest/Vitest. Playwright: request fixture for hybrid UI+API teams.',
            doThis: 'Install stack. One test: GET users/1, assert status 200 and email contains @.',
            code: '# Python + pytest + requests\nimport requests\n\ndef test_get_user():\n    r = requests.get("https://jsonplaceholder.typicode.com/users/1")\n    assert r.status_code == 200\n    assert "@" in r.json()["email"]',
          },
          {
            title: 'CRUD test module',
            body: 'test_create_post, test_get_post, test_update_post, test_delete_post — isolated, order-independent.',
            doThis: 'Automate full CRUD for /posts. Use unique title per run.',
          },
          {
            title: 'Fixtures for base URL and session',
            body: 'conftest.py or beforeAll sets base_url and auth headers once.',
            doThis: 'Extract BASE_URL from env var. Document in README.',
          },
          {
            title: 'When Postman vs code',
            body: 'Postman: exploration, manual QA, quick sharing. Code: CI-native, version control, complex logic, hybrid suites.',
            doThis: 'Write TOOLING.md: when your team uses Postman vs code (2 paragraphs).',
          },
        ],
        checklist: ['5+ code tests green', 'CRUD automated', 'BASE_URL from env'],
        practice: { title: 'Hybrid awareness', brief: 'Read Playwright API testing doc. Sketch one UI test that seeds via API.' },
        resources: [
          r('doc', 'Playwright — API Testing', 'https://playwright.dev/docs/api-testing', 'EN'),
          r('doc', 'Python requests', 'https://requests.readthedocs.io/en/latest/', 'EN'),
          r('doc', 'pytest', 'https://docs.pytest.org/en/stable/', 'EN'),
        ],
      }),

      ch({
        id: 'api-openapi',
        phase: 'D · Contracts',
        level: 'intermediate',
        title: 'OpenAPI, schemas & contract testing',
        minutes: 65,
        durationLabel: 'Week 6–7',
        overview:
          'OpenAPI (Swagger) describes API contracts. Validate responses against schemas — catch drift before production.',
        learn: ['OpenAPI structure', 'JSON Schema validation', 'Contract vs E2E', 'Consumer-driven contracts intro'],
        steps: [
          {
            title: 'Read an OpenAPI spec',
            body: 'paths, components/schemas, responses. Petstore is the hello world.',
            doThis: 'Open swagger.io petstore spec. Map 3 endpoints to tests you already wrote.',
          },
          {
            title: 'JSON Schema validation',
            body: 'Assert response matches schema — required fields, types, enums. jsonschema library (Python) or ajv (JS).',
            doThis: 'Validate GET /users/1 response against a hand-written JSON Schema.',
            code: 'import jsonschema\nschema = {"type": "object", "required": ["id", "email"], "properties": {"id": {"type": "number"}, "email": {"type": "string"}}}\njsonschema.validate(instance=response.json(), schema=schema)',
          },
          {
            title: 'Contract testing concept',
            body: 'Consumer defines expected shape. Provider verifies. Pact and similar tools — know the idea for interviews.',
            doThis: 'Write CONTRACTS.md: what your tests guarantee about API shape.',
          },
          {
            title: 'OpenAPI diff awareness',
            body: 'Breaking changes: removed fields, type changes, new required fields. CI can diff specs on PR.',
            doThis: 'Read about openapi-diff or oasdiff. Note 3 breaking change examples.',
          },
        ],
        checklist: ['Schema validation on 2 endpoints', 'CONTRACTS.md written', 'I can explain contract vs E2E'],
        practice: { title: 'Schema break drill', brief: 'Remove required field from schema temporarily. Confirm test fails. Restore.' },
        resources: [
          r('doc', 'OpenAPI Specification', 'https://swagger.io/specification/', 'EN'),
          r('lab', 'Swagger Petstore', 'https://petstore.swagger.io/', 'EN'),
          r('doc', 'JSON Schema', 'https://json-schema.org/learn/getting-started-step-by-step', 'EN'),
        ],
      }),

      ch({
        id: 'api-security',
        phase: 'D · Contracts',
        level: 'advanced',
        title: 'OWASP API security smoke tests',
        minutes: 60,
        durationLabel: 'Week 7–8',
        overview:
          'API security is not optional. OWASP API Top 10 gives a checklist — broken auth, excessive data exposure, rate limits, injection.',
        learn: ['OWASP API Top 10 overview', 'AuthZ vs AuthN tests', 'IDOR probes', 'Security smoke in CI'],
        steps: [
          {
            title: 'OWASP API Top 10 skim',
            body: 'Broken Object Level Authorization (BOLA/IDOR), broken auth, excessive data exposure, lack of rate limiting.',
            doThis: 'List Top 10. Pick 5 relevant to REST APIs you test.',
          },
          {
            title: 'AuthZ probe',
            body: 'Call endpoint as User A with User B resource id. Expect 403, not 200 with wrong data.',
            doThis: 'If lab API supports auth, test wrong-role access. Else document probe pattern in SECURITY-SMOKE.md.',
          },
          {
            title: 'Sensitive data in responses',
            body: 'Passwords, tokens, internal IDs should not leak. Assert response excludes forbidden keys.',
            doThis: 'Add test: user response must not contain password or passwordHash field.',
          },
          {
            title: 'Security smoke in suite',
            body: '5–10 security smokes run every CI — not full pentest, but catch obvious regressions.',
            doThis: 'Add security/ folder with 3 smoke tests or Postman folder. Document scope.',
          },
        ],
        checklist: ['SECURITY-SMOKE.md with 5 checks', '3 security tests in suite', 'AuthZ pattern documented'],
        practice: { title: 'IDOR write-up', brief: 'Explain IDOR in 3 sentences with example URL pattern.' },
        resources: [
          r('doc', 'OWASP API Security Top 10', 'https://owasp.org/API-Security/editions/2023/en/0x00-header/', 'EN'),
          r('doc', 'OWASP REST Security Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html', 'EN'),
        ],
      }),

      ch({
        id: 'api-graphql',
        phase: 'E · Advanced',
        level: 'advanced',
        title: 'GraphQL testing basics',
        minutes: 45,
        durationLabel: 'Week 8',
        overview:
          'Many teams use GraphQL. Testing differs from REST — queries, mutations, errors array, and no over-fetching assertions.',
        learn: ['Query vs mutation', 'GraphQL errors format', 'Postman GraphQL', 'When REST vs GraphQL tests differ'],
        steps: [
          {
            title: 'First GraphQL query',
            body: 'POST to /graphql with { "query": "{ users { id name } }" }. Single endpoint, typed schema.',
            doThis: 'Use Postman GraphQL mode or curl against a public GraphQL API (e.g. SpaceX demo).',
          },
          {
            title: 'Assert data and errors',
            body: 'Response: { data: {...}, errors: [...] }. Assert both paths — partial errors are common.',
            doThis: 'Send invalid query. Assert errors array non-empty and data null or partial.',
          },
          {
            title: 'Strategy note',
            body: 'Same pyramid applies — test resolvers at unit level when possible, integration at GraphQL layer.',
            doThis: 'Add GraphQL section to STRATEGY.md (half page).',
          },
        ],
        checklist: ['One GraphQL query in Postman', 'One error case tested', 'STRATEGY.md updated'],
        practice: { title: 'Mutation test', brief: 'If API supports mutation, create and verify resource.' },
        resources: [
          r('doc', 'GraphQL — Official Learn', 'https://graphql.org/learn/', 'EN'),
          r('lab', 'SpaceX GraphQL API', 'https://spacex-production.up.railway.app/', 'EN'),
        ],
      }),

      ch({
        id: 'api-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Advanced',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready API portfolio',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Final gate: Postman + Newman CI + code tests + schema + security — demo-ready repo.',
        learn: ['API portfolio pass criteria'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'Verify on GitHub live.',
            doThis: 'Demo in under 5 minutes.',
            items: [
              'Postman collection 15+ requests exported in repo',
              'Newman green in GitHub Actions with HTML report artifact',
              'Code test suite 10+ tests (pytest or Jest)',
              'JSON Schema validation on 2+ endpoints',
              'SECURITY-SMOKE.md + 3 security tests',
              'STRATEGY.md explains API vs UI test split',
            ],
          },
        ],
        checklist: ['All 6 criteria met', 'INTERVIEW.md with API Q&A started'],
        practice: { title: 'Interview drill', brief: 'Answer: "How do you test APIs without UI?" from your repo.' },
        resources: [r('doc', 'Postman — API Testing Best Practices', 'https://learning.postman.com/docs/tests-and-scripts/test-scripts/api-testing-best-practices/', 'EN')],
      }),
    ],
  },

  {
    id: 'selenium',
    title: 'Selenium WebDriver',
    tagline: 'WebDriver → waits → POM → Grid awareness → CI → migrate-or-stay decision.',
    category: 'automation',
    accent: '#0B3D2E',
    cover: 'covers/selenium-cover.png',
    duration: '10–12 weeks (part-time)',
    levelSpan: 'Beginner → Job-ready',
    who: 'Engineers joining teams that run Selenium / WebDriver — or anyone who needs enterprise WebDriver fluency.',
    outcomes: [
      'Drive browsers with WebDriver using explicit waits and clean lifecycle',
      'Build Page Object Model suites with a standard test runner',
      'Explain Grid, CI integration, and when to stay on Selenium vs migrate',
    ],
    pace: {
      hoursPerDay: '1.5–2 hours/day (≈ 10–12 hrs/week)',
      recommended: '~10–12 weeks',
      accelerated: '~7–8 weeks at 3 hrs/day',
      slow: '~14–16 weeks if busy',
    },
    chapters: [
      ch({
        id: 'se-how',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this roadmap',
        minutes: 25,
        overview:
          'Selenium is still everywhere in enterprise. This path teaches WebDriver done right — not the flaky scripts that give Selenium a bad name. Java or Python bindings; pick one and commit.',
        learn: ['10–12 week pacing', 'Language choice', 'Job-ready Selenium portfolio'],
        steps: [
          {
            title: 'Pick a language binding',
            body: 'Java + TestNG/JUnit is common in enterprise. Python + pytest is faster to learn. Pick one for the whole path.',
            doThis: 'Choose Java or Python. Document in README. Install JDK 17+ or Python 3.11+.',
          },
          {
            title: 'Study pace',
            body: '1.5–2 hours daily. Selenium rewards patience with waits and POM — rushing creates flakes.',
            doThis: 'Create selenium-journey repo. Block calendar slots.',
            items: ['Recommended: ~10–12 weeks', 'Accelerated: ~7–8 weeks', 'Slow: ~14–16 weeks'],
          },
          {
            title: 'Practice site',
            body: 'the-internet.herokuapp.com and Sauce Demo work with any binding. Use one primary site.',
            doThis: 'Manual explore 5 pages on the-internet.herokuapp.com. Note dynamic elements.',
          },
        ],
        checklist: ['Language chosen', 'Repo created', 'JDK or Python installed'],
        practice: { title: 'Day zero', brief: 'README with language choice, goal, timeline, first commit.' },
        resources: [
          r('doc', 'Selenium Documentation', 'https://www.selenium.dev/documentation/', 'EN'),
          r('lab', 'The Internet (Herokuapp)', 'https://the-internet.herokuapp.com/', 'EN'),
        ],
      }),

      ch({
        id: 'se-basics',
        phase: 'A · WebDriver Core',
        level: 'beginner',
        title: 'WebDriver mental model & first script',
        minutes: 55,
        durationLabel: 'Week 1',
        overview:
          'Driver talks to browser via W3C WebDriver protocol. Sessions, findElement, click, sendKeys. Always quit driver in finally hook.',
        learn: ['Driver lifecycle', 'By locators', 'First navigation and assert'],
        steps: [
          {
            title: 'Hello WebDriver',
            body: 'Selenium Manager auto-downloads drivers (Selenium 4.6+). Start Chrome, open page, assert title, quit.',
            doThis: 'Script: open the-internet.herokuapp.com, assert title contains "Internet", quit in finally.',
            code: '# Python\nfrom selenium import webdriver\nfrom selenium.webdriver.common.by import By\n\ndriver = webdriver.Chrome()\ntry:\n    driver.get("https://the-internet.herokuapp.com/")\n    assert "Internet" in driver.title\nfinally:\n    driver.quit()',
          },
          {
            title: 'Locator strategies',
            body: 'By.ID, By.NAME, By.CSS_SELECTOR, By.XPATH (last resort). Prefer stable IDs and CSS.',
            doThis: 'Navigate to /login. Find username field by ID. Submit form.',
          },
          {
            title: 'Clean lifecycle',
            body: 'driver.quit() closes browser and session. driver.close() closes tab only. Use quit always.',
            doThis: 'Wrap driver in try/finally or pytest fixture with yield teardown.',
          },
        ],
        checklist: ['Hello script runs', 'Login form automated', 'driver.quit() always called'],
        practice: { title: 'Form submit', brief: 'the-internet.herokuapp.com/login — valid and invalid credentials.' },
        resources: [
          r('doc', 'Selenium — Getting Started', 'https://www.selenium.dev/documentation/webdriver/getting_started/', 'EN'),
          r('doc', 'Selenium Manager', 'https://www.selenium.dev/documentation/selenium_manager/', 'EN'),
        ],
      }),

      ch({
        id: 'se-waits',
        phase: 'A · WebDriver Core',
        level: 'beginner',
        title: 'Explicit waits — never Thread.sleep',
        minutes: 60,
        durationLabel: 'Week 1–2',
        overview:
          'Flaky Selenium is almost always wrong waits. WebDriverWait + ExpectedConditions beat sleep every time.',
        learn: ['Implicit vs explicit waits', 'ExpectedConditions', 'Custom wait conditions', 'FluentWait'],
        steps: [
          {
            title: 'Ban Thread.sleep',
            body: 'sleep(3) hides races. Under CI load, races become flakes. Zero tolerance.',
            doThis: 'Search codebase for sleep/Thread.sleep/time.sleep. Replace all.',
          },
          {
            title: 'Explicit wait pattern',
            body: 'WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "btn"))).click()',
            doThis: 'the-internet.herokuapp.com/dynamic_loading/ — wait for Hello World visible after Start button.',
            code: 'from selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\nwait = WebDriverWait(driver, 10)\nbtn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "#start button")))\nbtn.click()\nwait.until(EC.visibility_of_element_located((By.ID, "finish")))',
          },
          {
            title: 'Expected conditions catalog',
            body: 'visibility_of, element_to_be_clickable, text_to_be_present_in_element, invisibility_of_element_located.',
            doThis: 'Use 4 different EC types across 4 tests. Document favorites in WAITS.md.',
          },
          {
            title: 'Avoid implicit wait mixing',
            body: 'Do not mix implicit and explicit waits — unpredictable timeouts. Pick explicit only.',
            doThis: 'Ensure driver.implicitly_wait is NOT set (or set to 0).',
          },
        ],
        checklist: ['Zero sleep in suite', 'Dynamic loading test passes', 'WAITS.md started'],
        practice: { title: 'Ajax wait', brief: 'Wait for element after AJAX on dynamic_controls — checkbox enabled.' },
        resources: [
          r('doc', 'Selenium — Waiting Strategies', 'https://www.selenium.dev/documentation/webdriver/waits/', 'EN'),
        ],
      }),

      ch({
        id: 'se-locators',
        phase: 'B · Stability',
        level: 'intermediate',
        title: 'Locators & stability patterns',
        minutes: 55,
        durationLabel: 'Week 2–3',
        overview:
          'Stable locators and stable tests. Page Factory optional — clarity over magic. data-testid agreements with dev.',
        learn: ['Locator priority', 'Stale element handling', 'Iframe and window switches'],
        steps: [
          {
            title: 'Locator priority doc',
            body: 'ID → data-testid → CSS → XPath last. Document in SELECTORS.md.',
            doThis: 'Refactor 3 XPath locators to CSS or ID on the-internet pages.',
          },
          {
            title: 'StaleElementReferenceException',
            body: 'DOM refreshed after AJAX — re-find element instead of reusing reference.',
            doThis: 'Reproduce on dynamic content page. Fix by re-locating inside wait.',
          },
          {
            title: 'Frames and windows',
            body: 'driver.switch_to.frame() and switch_to.window(). Always switch back to default_content.',
            doThis: 'Automate iframe page and multi-window link. Assert in correct context.',
          },
          {
            title: 'Dropdowns and alerts',
            body: 'Select class for dropdowns. Alert accept/dismiss. File upload send_keys to input[type=file].',
            doThis: 'Cover dropdown, JavaScript alert, and file upload pages.',
          },
        ],
        checklist: ['SELECTORS.md committed', 'Iframe test passes', 'No stale element flakes in 5 runs'],
        practice: { title: 'Locator audit', brief: 'List every locator in suite. Flag brittle ones. Fix top 3.' },
        resources: [
          r('doc', 'Selenium — Locators', 'https://www.selenium.dev/documentation/webdriver/elements/locators/', 'EN'),
        ],
      }),

      ch({
        id: 'se-pom',
        phase: 'B · Stability',
        level: 'intermediate',
        title: 'Page Object Model',
        minutes: 65,
        durationLabel: 'Week 3–5',
        overview:
          'POM keeps Selenium suites maintainable. Encapsulate locators and intent methods — tests read like scenarios.',
        learn: ['Page class structure', 'BasePage patterns (minimal)', 'Test layer thin'],
        steps: [
          {
            title: 'LoginPage class',
            body: 'Private locators, public methods: open(), login(user, pass), getErrorMessage().',
            doThis: 'Extract login from script into pages/LoginPage. Test calls loginPage.login("tomsmith", "SuperSecretPassword!").',
            code: 'class LoginPage:\n    def __init__(self, driver):\n        self.driver = driver\n        self.username = (By.ID, "username")\n        self.password = (By.ID, "password")\n        self.submit = (By.CSS_SELECTOR, "button[type=\'submit\']")\n    def login(self, user, pwd):\n        self.driver.find_element(*self.username).send_keys(user)\n        self.driver.find_element(*self.password).send_keys(pwd)\n        self.driver.find_element(*self.submit).click()',
          },
          {
            title: 'Secure Area flow',
            body: 'LoginPage + SecureAreaPage. Assert flash message after login.',
            doThis: 'Two-page flow with POM. Two tests using same LoginPage.',
          },
          {
            title: 'Base driver fixture',
            body: 'pytest fixture or @BeforeEach starts driver, yields, quits. DRY without hiding failures.',
            doThis: 'conftest.py with driver fixture. All tests use it.',
          },
          {
            title: 'ARCHITECTURE.md',
            body: 'pages/, tests/, conftest.py, config — document for onboarding.',
            doThis: 'Write ARCHITECTURE.md with folder tree and naming rules.',
          },
        ],
        checklist: ['LoginPage + second page class', 'driver fixture', 'ARCHITECTURE.md'],
        practice: { title: 'Sauce Demo POM', brief: 'Optional: port login + inventory to Sauce Demo with POM.' },
        resources: [
          r('doc', 'Selenium — Page Object Model', 'https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/', 'EN'),
          r('lab', 'Sauce Demo', 'https://www.saucedemo.com/', 'EN'),
        ],
      }),

      ch({
        id: 'se-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Stability',
        level: 'intermediate',
        title: 'Checkpoint A — Stable POM suite',
        minutes: 30,
        durationLabel: 'Gate',
        overview: 'Prove WebDriver + waits + POM before runner and Grid chapters.',
        learn: ['POM checkpoint criteria'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Run suite 3 times — all green.',
            items: [
              '8+ tests using POM',
              'Zero Thread.sleep / time.sleep',
              'Explicit waits on all dynamic elements',
              'driver.quit() via fixture',
              'ARCHITECTURE.md and SELECTORS.md',
              'README with run instructions',
            ],
          },
        ],
        checklist: ['All 6 criteria met', '3 consecutive green runs'],
        resources: [r('doc', 'pytest — Getting Started', 'https://docs.pytest.org/en/stable/getting-started.html', 'EN')],
      }),

      ch({
        id: 'se-runner',
        phase: 'C · Test Infrastructure',
        level: 'intermediate',
        title: 'Test runners — pytest, TestNG, or JUnit',
        minutes: 55,
        durationLabel: 'Week 5–6',
        overview:
          'Raw scripts do not scale. Test runners give discovery, reporting, markers, and parallel hooks.',
        learn: ['Test discovery', 'Markers / groups', 'HTML reports', 'Parametrize data-driven tests'],
        steps: [
          {
            title: 'pytest or TestNG setup',
            body: 'pytest: tests/test_*.py, assert keywords. TestNG: @Test annotations, testng.xml suite.',
            doThis: 'Organize tests under tests/. Run full suite with one command.',
            code: '# pytest.ini\n[pytest]\nmarkers =\n    smoke: quick checks\n    regression: full suite',
          },
          {
            title: 'Markers / groups',
            body: 'Smoke vs regression — run smoke in CI fast path, full nightly.',
            doThis: 'Mark 3 tests @pytest.mark.smoke. Run pytest -m smoke.',
          },
          {
            title: 'Parametrize',
            body: 'One test function, multiple data rows — invalid users, boundary inputs.',
            doThis: 'Parametrize login with 3 invalid credential tuples.',
          },
          {
            title: 'HTML report',
            body: 'pytest-html or Allure or ExtentReports (Java). Attach to CI artifacts.',
            doThis: 'Generate HTML report locally. Include screenshot on failure if plugin supports.',
          },
        ],
        checklist: ['Single command runs suite', 'Smoke marker works', 'HTML report generated'],
        practice: { title: 'Data-driven login', brief: '5 credential rows, 5 outcomes (pass/fail messages).' },
        resources: [
          r('doc', 'pytest — Markers', 'https://docs.pytest.org/en/stable/how-to/mark.html', 'EN'),
          r('doc', 'TestNG Documentation', 'https://testng.org/doc/', 'EN'),
        ],
      }),

      ch({
        id: 'se-grid',
        phase: 'C · Test Infrastructure',
        level: 'intermediate',
        title: 'Selenium Grid awareness',
        minutes: 50,
        durationLabel: 'Week 6–7',
        overview:
          'Grid runs browsers on remote nodes — parallel cross-browser at scale. You may not run Grid locally, but enterprise interviews expect awareness.',
        learn: ['Hub and Node model', 'RemoteWebDriver', 'Docker Grid quickstart', 'Cloud grids (BrowserStack, Sauce Labs)'],
        steps: [
          {
            title: 'Grid architecture',
            body: 'Hub routes commands. Nodes run browsers. Client uses RemoteWebDriver pointing at hub URL.',
            doThis: 'Draw hub-node diagram in GRID-NOTES.md.',
          },
          {
            title: 'Docker Selenium Grid',
            body: 'selenium/standalone-chrome or docker-compose with hub + nodes — local Grid in minutes.',
            doThis: 'Run standalone-chrome container. Connect RemoteWebDriver to localhost:4444. Run one test.',
            code: 'docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-chrome:latest\n# Python RemoteWebDriver\nfrom selenium.webdriver import Remote\n driver = Remote(command_executor="http://localhost:4444", options=options)',
          },
          {
            title: 'Cloud providers',
            body: 'BrowserStack, Sauce Labs, LambdaTest — capabilities object sets browser/OS. Know for resume/interview.',
            doThis: 'Read one provider docs page. List capability keys for Chrome on Windows.',
          },
          {
            title: 'When Grid vs local',
            body: 'Local for dev. Grid/cloud for CI parallel cross-browser. Document strategy in README.',
            doThis: 'Write 1 paragraph: when your project would use Grid.',
          },
        ],
        checklist: ['GRID-NOTES.md with diagram', 'One RemoteWebDriver test OR documented cloud plan'],
        practice: { title: 'Parallel concept', brief: 'Explain how 4 nodes cut 40 tests from 40 min to ~10 min.' },
        resources: [
          r('doc', 'Selenium Grid', 'https://www.selenium.dev/documentation/grid/', 'EN'),
          r('doc', 'Docker Selenium', 'https://github.com/SeleniumHQ/docker-selenium', 'EN'),
        ],
      }),

      ch({
        id: 'se-ci',
        phase: 'D · Delivery',
        level: 'intermediate',
        title: 'Selenium in CI',
        minutes: 60,
        durationLabel: 'Week 7–8',
        overview:
          'Headless Chrome in GitHub Actions. Cache dependencies, upload screenshots on failure, smoke on PR, full suite nightly.',
        learn: ['Headless Chrome in CI', 'Artifact upload', 'Service containers', 'Retry strategy'],
        steps: [
          {
            title: 'GitHub Actions workflow',
            body: 'setup-java or setup-python, install browsers, run pytest/testng, upload reports.',
            doThis: 'Green workflow on push. Headless Chrome.',
            code: 'name: Selenium Tests\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n      - run: pip install -r requirements.txt\n      - run: pytest -m smoke --headless\n      - uses: actions/upload-artifact@v4\n        if: failure()\n        with:\n          name: selenium-screenshots\n          path: screenshots/',
          },
          {
            title: 'Screenshot on failure',
            body: 'Hook pytest runtest_makereport or TestNG listener to capture driver screenshot on fail.',
            doThis: 'Trigger failure in CI. Confirm screenshot artifact downloadable.',
          },
          {
            title: 'Smoke on PR, full nightly',
            body: 'PR: 5 min smoke. schedule: cron full regression. Standard enterprise pattern.',
            doThis: 'Add workflow_dispatch or cron job stub for nightly. Document in CI.md.',
          },
        ],
        checklist: ['CI green on smoke', 'Screenshot on failure', 'CI.md documents PR vs nightly'],
        practice: { title: 'Fix CI flake', brief: 'If CI fails but local passes, fix wait or headless viewport — document in FLAKES.md.' },
        resources: [
          r('doc', 'GitHub Actions — Workflow Syntax', 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions', 'EN'),
          r('doc', 'Selenium — Chrome Options Headless', 'https://www.selenium.dev/documentation/chrome-browser/chrome-options/', 'EN'),
        ],
      }),

      ch({
        id: 'se-migrate',
        phase: 'D · Delivery',
        level: 'advanced',
        title: 'Stay, coexist, or migrate',
        minutes: 55,
        durationLabel: 'Week 8–9',
        overview:
          'Enterprise reality: Selenium is not wrong. Decide with flake data, speed, hiring, and cost — not Twitter hype.',
        learn: ['Migration criteria', 'Hybrid coexistence', 'Playwright/Cypress comparison', 'Decision memo'],
        steps: [
          {
            title: 'Honest comparison',
            body: 'Selenium: language flexibility, Grid maturity, huge legacy. Playwright/Cypress: auto-wait, tracing, faster authoring. Tradeoffs, not winners.',
            doThis: 'Comparison table in MIGRATION.md: 6 dimensions (speed, flakes, hiring, CI cost, learning curve, legacy).',
          },
          {
            title: 'Migration criteria',
            body: 'Migrate when: flake rate unsustainable, CI time blocks team, hiring cannot find Selenium skill, no ROI on Grid maintenance.',
            doThis: 'Write criteria list — 5 triggers to migrate, 5 reasons to stay.',
          },
          {
            title: 'Hybrid pattern',
            body: 'New flows in Playwright, legacy Selenium until ROI proves rewrite. API layer shared.',
            doThis: 'Sketch hybrid architecture diagram for a fictional 500-test Selenium shop.',
          },
          {
            title: 'Pilot one flow',
            body: 'Port one stable flow to Playwright or Cypress. Compare CI time, flake rate, lines of code.',
            doThis: 'Port login + inventory OR document pilot plan if time-boxed.',
          },
        ],
        checklist: ['MIGRATION.md with table', 'Pilot done or planned', 'I can defend stay vs migrate in interview'],
        practice: { title: 'Decision memo', brief: 'One-page memo to CTO: recommend stay/hybrid/migrate with evidence.' },
        resources: [
          r('doc', 'Playwright — Selenium migration guide', 'https://playwright.dev/docs/selenium-grid', 'EN'),
          r('doc', 'Cypress — Comparison blog', 'https://www.cypress.io/blog', 'EN'),
        ],
      }),

      ch({
        id: 'se-standards',
        phase: 'E · Team Craft',
        level: 'advanced',
        title: 'Team standards & flake governance',
        minutes: 50,
        durationLabel: 'Week 9–10',
        overview:
          'Senior Selenium work is standards that outlive you: wait policy, POM rules, PR checklist, flake registry.',
        learn: ['SELENIUM-STANDARD.md', 'PR template', 'Flake ownership', 'Code review for tests'],
        steps: [
          {
            title: 'Selenium standard doc',
            body: 'No sleep, explicit waits only, POM required, locator priority, screenshot on fail, naming conventions.',
            doThis: 'Write SELENIUM-STANDARD.md. Apply in one cleanup PR.',
          },
          {
            title: 'PR checklist',
            body: 'New tests: POM, no sleep, isolated data, smoke marker if critical path.',
            doThis: 'Add pull_request_template.md.',
          },
          {
            title: 'Flake registry',
            body: 'FLAKES.md with date, test, cause, fix, owner. Monthly review.',
            doThis: 'Document one flake (real or simulated) with root cause analysis.',
          },
        ],
        checklist: ['SELENIUM-STANDARD.md', 'PR template', 'FLAKES.md with entry'],
        practice: { title: 'Standards PR', brief: 'Refactor one spec to meet standard. Self-review against checklist.' },
        resources: [
          r('doc', 'Selenium — Encouraged Practices', 'https://www.selenium.dev/documentation/test_practices/', 'EN'),
        ],
      }),

      ch({
        id: 'se-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Team Craft',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready Selenium portfolio',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Final gate: POM suite, CI, Grid awareness, migration judgment, standards.',
        learn: ['Selenium portfolio criteria'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Demo repo in under 5 minutes.',
            items: [
              'POM suite 12+ tests on practice site(s)',
              'pytest/TestNG markers (smoke + regression)',
              'GitHub Actions green with failure screenshots',
              'GRID-NOTES.md + RemoteWebDriver OR cloud plan',
              'MIGRATION.md with honest comparison',
              'SELENIUM-STANDARD.md + FLAKES.md',
            ],
          },
        ],
        checklist: ['All 6 criteria met', 'INTERVIEW.md with Selenium Q&A'],
        practice: { title: 'Interview rehearsal', brief: 'Explain explicit wait vs implicit. When migrate off Selenium. Demo CI.' },
        resources: [r('doc', 'Selenium Documentation', 'https://www.selenium.dev/documentation/', 'EN')],
      }),
    ],
  },

  {
    id: 'cicd',
    title: 'CI/CD Pipelines',
    tagline: 'GitHub Actions — PR checks, secrets, artifacts, environments, rollback.',
    category: 'automation',
    accent: '#14532D',
    cover: 'covers/cicd-cover.png',
    duration: '8–10 weeks (part-time)',
    levelSpan: 'Beginner → Job-ready',
    who: 'QA automation engineers, developers, and DevOps-curious testers who want pipelines that protect main.',
    outcomes: [
      'Design PR → main → deploy pipelines with appropriate gates',
      'Configure secrets, caches, artifacts, and environments safely',
      'Document rollback runbooks and required status checks',
    ],
    pace: {
      hoursPerDay: '1–1.5 hours/day (≈ 7–10 hrs/week)',
      recommended: '~8–10 weeks',
      accelerated: '~5–6 weeks at 2–3 hrs/day',
      slow: '~12 weeks if busy',
    },
    chapters: [
      ch({
        id: 'ci-how',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this roadmap',
        minutes: 25,
        overview:
          'CI/CD is how modern teams ship. This path uses GitHub Actions as the primary lab — concepts transfer to GitLab CI, Jenkins, CircleCI. Build a public pipeline portfolio repo.',
        learn: ['8–10 week pacing', 'CI vs CD vs continuous deployment', 'Portfolio definition'],
        steps: [
          {
            title: 'Study pace',
            body: '1–1.5 hours daily. Pipelines are learned by breaking and fixing — expect red builds.',
            doThis: 'Fork or create cicd-journey repo. Enable Actions if fork.',
            items: ['Recommended: ~8–10 weeks', 'Accelerated: ~5–6 weeks', 'Slow: ~12 weeks'],
          },
          {
            title: 'Lab repo',
            body: 'Use a small Node, Python, or static site repo — something with install, test, build steps.',
            doThis: 'Pick repo with at least npm test or pytest. README explains app purpose.',
          },
          {
            title: 'Checkpoints',
            body: 'Gate 1: PR workflow. Gate 2: secrets + artifacts + environments. Gate 3: rollback + production gates.',
            doThis: 'Read checkpoint chapters. Copy criteria to README.',
          },
        ],
        checklist: ['Repo with Actions enabled', 'Can push and see Actions tab'],
        practice: { title: 'Day zero', brief: 'README with pipeline goals and timeline.' },
        resources: [
          r('doc', 'GitHub Actions — Quickstart', 'https://docs.github.com/en/actions/quickstart', 'EN'),
          r('doc', 'Continuous Delivery', 'https://continuousdelivery.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ci-why',
        phase: 'A · Foundations',
        level: 'beginner',
        title: 'Why pipelines exist — CI vs CD',
        minutes: 45,
        durationLabel: 'Week 1',
        overview:
          'CI catches integration pain early. CD makes releases boring. Continuous deployment goes further — auto to prod when green. Know the vocabulary.',
        learn: ['CI vs CD vs continuous deployment', 'Trunk-based development', 'PR workflow mental model'],
        steps: [
          {
            title: 'Map your path to prod',
            body: 'Commit → build → test → review → deploy. Circle manual steps that should die.',
            doThis: 'Draw pipeline diagram in PIPELINE.md. Label manual vs automated.',
          },
          {
            title: 'Feedback loops',
            body: 'Fast PR checks (<10 min) get used. 45-minute suites get skipped or ignored.',
            doThis: 'Set target: smoke under 5 min, full under 20 min. Write in PIPELINE.md.',
          },
          {
            title: 'Trunk-based basics',
            body: 'Short-lived branches, merge to main often, feature flags for incomplete work. Long-lived branches rot.',
            doThis: 'Read trunkbaseddevelopment.com primer. Note 3 practices you will follow.',
          },
        ],
        checklist: ['PIPELINE.md diagram', 'Smoke vs full suite targets defined'],
        practice: { title: 'Manual audit', brief: 'List 5 manual release steps on any project you know. Which to automate first?' },
        resources: [
          r('doc', 'Trunk Based Development', 'https://trunkbaseddevelopment.com/', 'EN'),
          r('book', 'Continuous Delivery — Humble & Farley', 'https://continuousdelivery.com/book/', 'EN'),
        ],
      }),

      ch({
        id: 'ci-first-workflow',
        phase: 'A · Foundations',
        level: 'beginner',
        title: 'First GitHub Actions workflow',
        minutes: 55,
        durationLabel: 'Week 1–2',
        overview:
          'YAML workflow: on trigger, jobs, steps, runs-on. Install, test, fail loud on red.',
        learn: ['Workflow structure', 'Triggers', 'Jobs and steps', 'Action marketplace'],
        steps: [
          {
            title: 'Hello workflow',
            body: 'on: push, jobs.test, runs-on: ubuntu-latest, steps: checkout, setup, run tests.',
            doThis: 'Add .github/workflows/ci.yml. Push. See green check on commit.',
            code: 'name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - run: npm ci\n      - run: npm test',
          },
          {
            title: 'pull_request trigger',
            body: 'Same workflow on PR shows checks before merge. This is the daily loop.',
            doThis: 'Open PR with trivial change. Confirm check runs on PR.',
          },
          {
            title: 'Read workflow logs',
            body: 'Expand steps, find failure line, re-run failed jobs. Triage skill #1.',
            doThis: 'Break a test intentionally. Read log. Fix. Re-run.',
          },
          {
            title: 'Action versioning',
            body: 'Pin major version: actions/checkout@v4. Avoid @main for supply chain stability.',
            doThis: 'Audit workflow — all actions use version tags.',
          },
        ],
        checklist: ['CI green on main', 'PR trigger works', 'I can read failure logs'],
        practice: { title: 'Matrix awareness', brief: 'Read docs on strategy.matrix. Sketch Node 18 + 20 matrix — optional implement.' },
        resources: [
          r('doc', 'Workflow Syntax', 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions', 'EN'),
          r('doc', 'Events that trigger workflows', 'https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows', 'EN'),
        ],
      }),

      ch({
        id: 'ci-secrets',
        phase: 'B · Security & Config',
        level: 'intermediate',
        title: 'Secrets & environment variables',
        minutes: 50,
        durationLabel: 'Week 2–3',
        overview:
          'Secrets never in code or logs. GitHub Secrets, environments, and OIDC for cloud — the safe patterns.',
        learn: ['Repository secrets', 'Environment secrets', 'Masking in logs', 'OIDC awareness'],
        steps: [
          {
            title: 'Add a repository secret',
            body: 'Settings → Secrets → Actions. Reference as ${{ secrets.API_TOKEN }} in workflow.',
            doThis: 'Add DUMMY_TOKEN secret. Echo in step with env: — confirm it masks in logs.',
            code: 'env:\n  API_TOKEN: ${{ secrets.API_TOKEN }}\nrun: |\n  curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com/health',
          },
          {
            title: 'Never print secrets',
            body: 'Avoid echo $SECRET. GitHub masks known secrets — do not bypass with base64 tricks in real repos.',
            doThis: 'Add SECRETS.md: rules for rotating and scoping secrets.',
          },
          {
            title: 'Environment-specific secrets',
            body: 'staging vs production secrets in GitHub Environments — different values, protection rules.',
            doThis: 'Create staging environment with one secret. Reference environment in job.',
          },
          {
            title: 'OIDC (awareness)',
            body: 'GitHub OIDC lets workflows assume AWS/Azure roles without long-lived keys. Know for enterprise.',
            doThis: 'Read GitHub OIDC doc summary. Write 2 sentences in SECRETS.md.',
          },
        ],
        checklist: ['Secret used in workflow', 'SECRETS.md committed', 'Logs show masking'],
        practice: { title: 'Leak drill', brief: 'Search repo history for accidental keys — gitleaks or manual. Document clean bill.' },
        resources: [
          r('doc', 'Encrypted Secrets', 'https://docs.github.com/en/actions/security-guides/encrypted-secrets', 'EN'),
          r('doc', 'OpenID Connect', 'https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect', 'EN'),
        ],
      }),

      ch({
        id: 'ci-artifacts',
        phase: 'B · Security & Config',
        level: 'intermediate',
        title: 'Artifacts, reports & debugging CI',
        minutes: 55,
        durationLabel: 'Week 3',
        overview:
          'When CI fails, artifacts (test reports, screenshots, traces) tell the story. Upload on failure; retention policies matter.',
        learn: ['upload-artifact', 'Download artifacts', 'Retention days', 'Re-running jobs'],
        steps: [
          {
            title: 'Upload test report',
            body: 'actions/upload-artifact@v4 with if: failure() — HTML report, screenshots, logs.',
            doThis: 'Configure artifact upload on test failure. Download from Actions UI.',
            code: '- uses: actions/upload-artifact@v4\n  if: failure()\n  with:\n    name: test-report\n    path: reports/\n    retention-days: 14',
          },
          {
            title: 'Always upload on main failures',
            body: 'PR failures optional; main branch failures always retain artifacts for postmortem.',
            doThis: 'Different retention or always-upload policy for main — document in CI.md.',
          },
          {
            title: 'Debug locally with act (optional)',
            body: 'nektos/act runs Actions locally — imperfect but useful for fast iteration.',
            doThis: 'Try act once OR document "re-run failed jobs" as primary debug path.',
          },
          {
            title: 'CI.md runbook',
            body: 'How to read logs, download artifacts, re-run, who to ping.',
            doThis: 'Write CI.md debug section — 10 bullets.',
          },
        ],
        checklist: ['Artifacts on failure', 'CI.md debug section', 'Downloaded artifact successfully'],
        practice: { title: 'Failure postmortem', brief: 'Template in CI.md: incident, root cause, fix, prevention.' },
        resources: [
          r('doc', 'Storing workflow data as artifacts', 'https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts', 'EN'),
        ],
      }),

      ch({
        id: 'ci-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Security & Config',
        level: 'intermediate',
        title: 'Checkpoint A — CI fundamentals',
        minutes: 30,
        durationLabel: 'Gate',
        overview: 'PR workflow + secrets + artifacts working.',
        learn: ['CI fundamentals criteria'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify on GitHub.',
            items: [
              'Workflow runs on push and pull_request',
              'At least one secret used safely',
              'Artifact uploads on test failure',
              'PIPELINE.md and CI.md committed',
              'SECRETS.md with team rules',
              'Green main branch baseline',
            ],
          },
        ],
        checklist: ['All 6 criteria met'],
        resources: [r('doc', 'GitHub Actions — Understanding GitHub Actions', 'https://docs.github.com/en/actions/get-started/understand-github-actions', 'EN')],
      }),

      ch({
        id: 'ci-cache',
        phase: 'C · Speed & Scale',
        level: 'intermediate',
        title: 'Caching & pipeline speed',
        minutes: 50,
        durationLabel: 'Week 4–5',
        overview:
          'Slow pipelines get skipped. Cache npm/pip/maven dependencies. Measure before and after.',
        learn: ['actions/cache', 'Cache keys', 'Dependency review', 'Parallel jobs'],
        steps: [
          {
            title: 'Dependency cache',
            body: 'actions/cache with path and key from lockfile hash. Restore on cache hit.',
            doThis: 'Add cache step. Compare workflow duration before/after in README.',
            code: '- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-npm-${{ hashFiles(\'**/package-lock.json\') }}',
          },
          {
            title: 'Cache invalidation',
            body: 'Key includes lockfile hash — dependency change busts cache automatically.',
            doThis: 'Bump dependency. Confirm cache miss then new cache save.',
          },
          {
            title: 'Parallel jobs',
            body: 'lint, test, build as separate jobs — fail fast on lint before expensive test.',
            doThis: 'Split into lint + test jobs. lint runs first or in parallel.',
          },
          {
            title: 'Speed budget',
            body: 'Document target times. Alert when PR check exceeds 10 min.',
            doThis: 'Add timing note to CI.md from last 5 runs.',
          },
        ],
        checklist: ['Cache hit observed', 'Parallel or split jobs', 'Speed documented'],
        practice: { title: 'Before/after', brief: 'Screenshot Actions timing with and without cache.' },
        resources: [
          r('doc', 'Dependency caching', 'https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows', 'EN'),
        ],
      }),

      ch({
        id: 'ci-environments',
        phase: 'C · Speed & Scale',
        level: 'intermediate',
        title: 'Environments, deployments & approvals',
        minutes: 60,
        durationLabel: 'Week 5–6',
        overview:
          'GitHub Environments model staging and production. Protection rules, required reviewers, deployment branches.',
        learn: ['Environment config', 'Deployment jobs', 'Protection rules', 'Deployment history'],
        steps: [
          {
            title: 'Create environments',
            body: 'Settings → Environments → staging, production. Different secrets per env.',
            doThis: 'Create staging environment. Add STAGING_URL secret.',
          },
          {
            title: 'Deploy job',
            body: 'job deploy needs: test, environment: staging, runs deploy script or GitHub Pages action.',
            doThis: 'Add deploy-staging job on push to main after tests pass.',
            code: 'deploy-staging:\n  needs: test\n  runs-on: ubuntu-latest\n  environment: staging\n  steps:\n    - uses: actions/checkout@v4\n    - run: npm run build\n    - name: Deploy\n      run: echo "Deploy to staging" # replace with real deploy',
          },
          {
            title: 'Protection rules',
            body: 'Production: required reviewers, wait timer, branch restriction to main only.',
            doThis: 'Add production environment with required reviewer (yourself for lab).',
          },
          {
            title: 'Deployment URL',
            body: 'environment url shows in PR deployment history — links to staging site.',
            doThis: 'Set environment URL in config. Verify appears in Deployments tab.',
          },
        ],
        checklist: ['staging environment deploys', 'production has protection rule', 'Deployment visible in UI'],
        practice: { title: 'Preview deploy', brief: 'Optional: deploy PR preview with environment or third-party action.' },
        resources: [
          r('doc', 'Deploying to environments', 'https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment', 'EN'),
          r('doc', 'GitHub Pages Actions', 'https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site', 'EN'),
        ],
      }),

      ch({
        id: 'ci-gates',
        phase: 'D · Governance',
        level: 'advanced',
        title: 'Required checks & merge gates',
        minutes: 50,
        durationLabel: 'Week 6–7',
        overview:
          'Branch protection + required status checks prevent merging broken code. Balance safety vs team velocity.',
        learn: ['Branch protection rules', 'Required status checks', 'CODEOWNERS', 'Merge queues awareness'],
        steps: [
          {
            title: 'Branch protection on main',
            body: 'Require PR, require status checks, no direct push (for team repos). Solo: still practice config.',
            doThis: 'Enable require status checks before merge. List required check names.',
          },
          {
            title: 'Failure injection test',
            body: 'Break test on PR. Confirm merge button blocked. Fix. Confirm unblocked.',
            doThis: 'Document result in GATES.md with screenshot.',
          },
          {
            title: 'CODEOWNERS (awareness)',
            body: '.github/CODEOWNERS auto-requests review for paths — tests/ owned by QA.',
            doThis: 'Add CODEOWNERS assigning workflows to yourself. Note how it would scale.',
          },
          {
            title: 'When gates hurt',
            body: 'Too many required checks → rubber stamp. Pick smoke + lint + test as minimum.',
            doThis: 'Write gate policy: required vs optional checks in GATES.md.',
          },
        ],
        checklist: ['Branch protection enabled', 'Failed PR cannot merge', 'GATES.md policy'],
        practice: { title: 'Gate review', brief: 'Pretend tech lead: argue to remove one check. Defend or concede.' },
        resources: [
          r('doc', 'Managing protected branches', 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches', 'EN'),
        ],
      }),

      ch({
        id: 'ci-rollback',
        phase: 'D · Governance',
        level: 'advanced',
        title: 'Rollback, recovery & incident response',
        minutes: 55,
        durationLabel: 'Week 7–8',
        overview:
          'Ship knowing how to un-ship. Revert commits, redeploy previous artifact, feature flags — optimize mean time to recovery (MTTR).',
        learn: ['Revert vs fix forward', 'Deploy previous artifact', 'Runbook format', 'MTTR'],
        steps: [
          {
            title: 'Rollback runbook',
            body: 'Step-by-step: detect bad deploy, revert commit or redeploy tag, verify health, communicate.',
            doThis: 'Write ROLLBACK.md — target <15 min recovery for your lab app.',
          },
          {
            title: 'Revert commit deploy',
            body: 'git revert + push triggers pipeline redeploys last good state.',
            doThis: 'Simulate bad deploy (break production config). Revert. Confirm recovery.',
          },
          {
            title: 'Artifact promotion (awareness)',
            body: 'Build once, promote same artifact staging → prod. Avoid rebuild drift.',
            doThis: 'Sketch promotion flow in PIPELINE.md diagram.',
          },
          {
            title: 'Post-incident template',
            body: 'What broke, timeline, root cause, action items — blameless.',
            doThis: 'Add post-incident template to ROLLBACK.md from simulated drill.',
          },
        ],
        checklist: ['ROLLBACK.md complete', 'Recovery drill performed', 'MTTR noted'],
        practice: { title: 'Timed drill', brief: 'Time yourself: break staging → recover. Beat 15 min?' },
        resources: [
          r('doc', 'Google SRE — Incident Management', 'https://sre.google/sre-book/managing-incidents/', 'EN'),
        ],
      }),

      ch({
        id: 'ci-progressive',
        phase: 'E · Advanced Delivery',
        level: 'advanced',
        title: 'Progressive delivery & pipeline as product',
        minutes: 50,
        durationLabel: 'Week 8–9',
        overview:
          'Canaries, blue-green, feature flags — reduce blast radius. Treat pipeline as product with owners and roadmap.',
        learn: ['Canary vs blue-green', 'Feature flags intro', 'Pipeline metrics', 'DORA awareness'],
        steps: [
          {
            title: 'Progressive delivery vocab',
            body: 'Canary: route 5% traffic to new version. Blue-green: switch all at once with instant rollback.',
            doThis: 'Compare in PROGRESSIVE.md — when each fits.',
          },
          {
            title: 'Feature flags',
            body: 'Deploy code dark; enable via flag. Rollback = flip flag, not redeploy.',
            doThis: 'Read LaunchDarkly or Unleash intro. Document use case in PROGRESSIVE.md.',
          },
          {
            title: 'DORA metrics (awareness)',
            body: 'Deployment frequency, lead time, MTTR, change fail rate — how good teams measure delivery.',
            doThis: 'Rate your lab repo on each DORA metric qualitatively (low/medium/high).',
          },
          {
            title: 'Pipeline roadmap',
            body: 'Quarterly pipeline improvements: speed, security, developer experience.',
            doThis: 'Write 3-item pipeline roadmap in PIPELINE.md.',
          },
        ],
        checklist: ['PROGRESSIVE.md written', 'DORA self-assessment', 'Pipeline roadmap'],
        practice: { title: 'Interview answer', brief: 'Explain blue-green vs canary in 60 seconds.' },
        resources: [
          r('doc', 'DORA Metrics', 'https://dora.dev/quickcheck/', 'EN'),
          r('doc', 'Feature Flags — Martin Fowler', 'https://martinfowler.com/articles/feature-toggles.html', 'EN'),
        ],
      }),

      ch({
        id: 'ci-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Advanced Delivery',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready pipeline portfolio',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Full pipeline portfolio: CI, secrets, cache, environments, gates, rollback docs.',
        learn: ['Pipeline portfolio criteria'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Walk through repo as interviewer.',
            items: [
              'PR + main workflows with test + lint',
              'Secrets and environments configured safely',
              'Cache reducing run time (documented)',
              'Staging deploy job with environment protection',
              'Branch protection + required checks demonstrated',
              'ROLLBACK.md + GATES.md + PIPELINE.md complete',
            ],
          },
        ],
        checklist: ['All 6 criteria met', 'INTERVIEW.md with CI/CD Q&A'],
        practice: { title: 'Portfolio demo', brief: '5-min Loom: PR → checks → merge → deploy → show rollback doc.' },
        resources: [
          r('doc', 'GitHub Actions — Best practices', 'https://docs.github.com/en/actions/learn-github-actions/best-practices-for-github-actions', 'EN'),
        ],
      }),
    ],
  },
]
