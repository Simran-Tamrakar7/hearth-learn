import type { ChapterRecord } from "../../../types";

/** 9.4 SQL with Playwright & CI Pipelines */
export const chapter = {
  "id": "sql-9-4-sql-with-playwright-ci-pipelines",
  "title": "9.4 SQL with Playwright & CI Pipelines",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · SQL in API/Backend Testing",
  "partName": "Part 9 · SQL in API/Backend Testing",
  "overviewText": "Playwright runs in Node, so any Node database driver works directly in test files, fixtures, and global setup/teardown — no task-bridging needed, unlike Cypress. A shared fixture keeps connection handling in one place: // fixtures.ts await page.goto('/leave/approvals'); await page.getByTestId('approve-1').click(); await page.getByTestId('confirm').click();",
  "why": "9.4 SQL with Playwright & CI Pipelines is how a tester proves stored state, not just the screen. Playwright runs in Node, so any Node database driver works directly in test files, fixtures, and global setup/teardown — no task-bridging needed, unlike Cypress.",
  "when": "Open this chapter when you are on the SQL in API/Backend Testing path and need SQL with Playwright & CI Pipelines against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on SQL with Playwright & CI Pipelines.",
    "pass": "You apply SQL with Playwright & CI Pipelines on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip SQL with Playwright & CI Pipelines, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Playwright runs in Node, so DB drivers work directly in fixtures/tests, no bridging needed.\n- Shared fixture pattern for connections; globalSetup/globalTeardown for suite-wide seeding and tag-based sweeping; use per-worker tags for parallel isolation (7.2).\n- Run the 10.2 sanity suite as its own CI stage, upstream of expensive e2e tests, so environment corruption fails fast with a clear signal rather than cascading into confusing UI failures.\n- Ephemeral per-run databases (Docker containers seeded from scripts) give the cleanest isolation — \"cleanup\" is just discarding the container — but don't suit large-volume/performance scenarios.\n- Attach query-derived evidence (e.g., duplicate rows found) to failing tests via testInfo.attach for a self-contained report.\n- Shared CI databases across concurrent jobs reproduce 7.7's lock-contention and lost-update symptoms as CI flakiness; fix with the same tagging/scoping/ephemeral-DB approaches.",
  "contentMarkdown": "## Wiring a database into Playwright\nPlaywright runs in Node, so any Node database driver works directly in test files, fixtures, and global setup/teardown — no task-bridging needed, unlike Cypress. A shared fixture keeps connection handling in one place:\n// fixtures.ts\n```ts\nimport { test as base } from '@playwright/test';\nimport mysql, { Connection } from 'mysql2/promise';\n```\n\n| export const test = base.extend<{ db: Connection }>({ | db: async ({}, use) => { | const conn = await mysql.createConnection(process.env.QA_DB_URL!); | await use(conn); |\n|---|---|---|---|\n| await conn.end(); | }, | }); | export { expect } from '@playwright/test'; |\n\n```ts\nimport { test, expect } from './fixtures';\n```\n\n```ts\ntest('approving leave updates the balance', async ({ page, db }) => {\n  const [[before]]: any = await db.query(\n    'SELECT balance FROM leave_balances WHERE employee_id=2 AND leave_type_id=1');\n```\n\n  await page.goto('/leave/approvals');\n  await page.getByTestId('approve-1').click();\n  await page.getByTestId('confirm').click();\n\n| const [[after]]: any = await db.query( | 'SELECT balance FROM leave_balances WHERE employee_id=2 AND leave_type_id=1'); |\n|---|---|\n| expect(Number(after.balance)).toBe(Number(before.balance) - 3); | }); |\n\n## Global setup and teardown for suite-wide seeding\nPlaywright's globalSetup/globalTeardown (configured in playwright.config.ts) run once for the whole test run, ideal for seeding reference data the whole suite depends on and sweeping tagged rows afterward:\n// global-setup.ts\n```ts\nimport mysql from 'mysql2/promise';\n```\n\n```ts\nexport default async function globalSetup() {\n  const db = await mysql.createConnection(process.env.QA_DB_URL!);\n  await db.execute(\"DELETE FROM leave_requests WHERE employee_id IN (SELECT employee_id FROM employees WHERE email LIKE 'qa\\\\_run\\\\_%')\");\n  await db.end();\n}\n```\n\n| // playwright.config.ts | export default defineConfig({ | globalSetup: require.resolve('./global-setup'), |\n|---|---|---|\n| globalTeardown: require.resolve('./global-teardown'), | // ... | }); |\n\nFor per-test isolation with parallel workers, use the tag-per-worker pattern from 7.2's fixture example rather than a single global tag, or parallel workers will race on cleanup.\n## Running the sanity suite as a pipeline stage\nThe sanity check library from 10.2 belongs in CI as its own stage, separate from feature tests, so a failure clearly reads as \"data integrity\" rather than \"a feature broke\":\n```yaml\n# .github/workflows/ci.yml (illustrative)\njobs:\n| sanity-checks: | runs-on: ubuntu-latest | steps: | - uses: actions/checkout@v4 | - run: pip install -r requirements.txt | - name: Run data sanity checks |\n|---|---|---|---|---|---|\n| run: pytest sanity -q --junitxml=sanity-results.xml | env: | QA_DB_URL: ${{ secrets.QA_DB_URL }} | - uses: actions/upload-artifact@v4 | if: always() | with: { name: sanity-results, path: sanity-results.xml } |\n```\n\n  e2e-tests:\n    needs: sanity-checks              # don't run expensive UI tests against known-broken data\n    runs-on: ubuntu-latest\n| steps: | - run: npx playwright test |\n|---|---|\n| env: | QA_DB_URL: ${{ secrets.QA_DB_URL }} |\n\nMaking e2e-tests depend on sanity-checks passing first means a corrupted environment fails fast with a clear signal, rather than producing dozens of confusing UI test failures downstream — a direct application of 10.2's \"guard checks\" idea at the pipeline level.\n## Ephemeral databases per CI run\nThe cleanest isolation (mentioned in 7.2) is a fresh, disposable database per run — typically a Docker container seeded from a known script:\n\n| services: | mysql: | image: mysql:8 | env: |\n|---|---|---|---|\n| MYSQL_ROOT_PASSWORD: root | MYSQL_DATABASE: hrms_ci | ports: ['3306:3306'] | options: >- |\n\n| steps: | - run: mysql -h 127.0.0.1 -uroot -proot hrms_ci < schema.sql |\n|---|---|\n| - run: mysql -h 127.0.0.1 -uroot -proot hrms_ci < seed.sql | - run: npx playwright test |\n\n```sql\nWith this approach, \"cleanup\" is simply the container being discarded at the end of the job — no tagging, no sweeper script, no shared-database coordination. The trade-off is that this only works for scenarios that don't need production-scale volume (7.5's bulk-data and performance tests still need a longer-lived, larger environment).\n```\n## Reporting DB-derived evidence in Playwright's HTML report\nAttach query results to a failing test so the report is self-contained for whoever picks up the ticket:\n```ts\ntest('no duplicate payroll rows after the release', async ({ db }, testInfo) => {\n  const [rows]: any = await db.query(\n    \"SELECT employee_id, pay_month, COUNT(*) c FROM payroll GROUP BY employee_id, pay_month HAVING COUNT(*)>1\");\n  if (rows.length > 0) {\n| await testInfo.attach('duplicate-payroll-rows.json', { | body: JSON.stringify(rows, null, 2), contentType: 'application/json', | }); |\n|---|---|---|\n| } | expect(rows).toHaveLength(0); | }); |\n```\n\n## Flakiness from shared CI databases\nIf multiple pipeline jobs run against one shared QA database concurrently, expect the same lock-contention and lost-update issues covered in 7.7 to appear as CI flakiness, not just in dedicated concurrency tests. Symptoms: a test that reads a count right after another job's uncommitted insert, or a lock-wait timeout on a row another job is mid-update on. The fixes are the same ones from 7.2 and 7.7: tag and scope your data, avoid asserting on global counts when other jobs run in parallel, and prefer the ephemeral-database approach for anything sensitive to exact row counts.\n",
  "blocks": [
    {
      "id": "sql-9-4-md-0",
      "type": "overview",
      "heading": "Wiring a database into Playwright",
      "content": "Playwright runs in Node, so any Node database driver works directly in test files, fixtures, and global setup/teardown — no task-bridging needed, unlike Cypress. A shared fixture keeps connection handling in one place:\n// fixtures.ts\n```ts\nimport { test as base } from '@playwright/test';\nimport mysql, { Connection } from 'mysql2/promise';\n```\n\n| export const test = base.extend<{ db: Connection }>({ | db: async ({}, use) => { | const conn = await mysql.createConnection(process.env.QA_DB_URL!); | await use(conn); |\n|---|---|---|---|\n| await conn.end(); | }, | }); | export { expect } from '@playwright/test'; |\n\n```ts\nimport { test, expect } from './fixtures';\n```\n\n```ts\ntest('approving leave updates the balance', async ({ page, db }) => {\n  const [[before]]: any = await db.query(\n    'SELECT balance FROM leave_balances WHERE employee_id=2 AND leave_type_id=1');\n```\n\n  await page.goto('/leave/approvals');\n  await page.getByTestId('approve-1').click();\n  await page.getByTestId('confirm').click();\n\n| const [[after]]: any = await db.query( | 'SELECT balance FROM leave_balances WHERE employee_id=2 AND leave_type_id=1'); |\n|---|---|\n| expect(Number(after.balance)).toBe(Number(before.balance) - 3); | }); |",
      "order": 0
    },
    {
      "id": "sql-9-4-md-1",
      "type": "overview",
      "heading": "Global setup and teardown for suite-wide seeding",
      "content": "Playwright's globalSetup/globalTeardown (configured in playwright.config.ts) run once for the whole test run, ideal for seeding reference data the whole suite depends on and sweeping tagged rows afterward:\n// global-setup.ts\n```ts\nimport mysql from 'mysql2/promise';\n```\n\n```ts\nexport default async function globalSetup() {\n  const db = await mysql.createConnection(process.env.QA_DB_URL!);\n  await db.execute(\"DELETE FROM leave_requests WHERE employee_id IN (SELECT employee_id FROM employees WHERE email LIKE 'qa\\\\_run\\\\_%')\");\n  await db.end();\n}\n```\n\n| // playwright.config.ts | export default defineConfig({ | globalSetup: require.resolve('./global-setup'), |\n|---|---|---|\n| globalTeardown: require.resolve('./global-teardown'), | // ... | }); |\n\nFor per-test isolation with parallel workers, use the tag-per-worker pattern from 7.2's fixture example rather than a single global tag, or parallel workers will race on cleanup.",
      "order": 1
    },
    {
      "id": "sql-9-4-md-2",
      "type": "overview",
      "heading": "Running the sanity suite as a pipeline stage",
      "content": "The sanity check library from 10.2 belongs in CI as its own stage, separate from feature tests, so a failure clearly reads as \"data integrity\" rather than \"a feature broke\":\n```yaml\n# .github/workflows/ci.yml (illustrative)\njobs:\n| sanity-checks: | runs-on: ubuntu-latest | steps: | - uses: actions/checkout@v4 | - run: pip install -r requirements.txt | - name: Run data sanity checks |\n|---|---|---|---|---|---|\n| run: pytest sanity -q --junitxml=sanity-results.xml | env: | QA_DB_URL: ${{ secrets.QA_DB_URL }} | - uses: actions/upload-artifact@v4 | if: always() | with: { name: sanity-results, path: sanity-results.xml } |\n```\n\n  e2e-tests:\n    needs: sanity-checks              # don't run expensive UI tests against known-broken data\n    runs-on: ubuntu-latest\n| steps: | - run: npx playwright test |\n|---|---|\n| env: | QA_DB_URL: ${{ secrets.QA_DB_URL }} |\n\nMaking e2e-tests depend on sanity-checks passing first means a corrupted environment fails fast with a clear signal, rather than producing dozens of confusing UI test failures downstream — a direct application of 10.2's \"guard checks\" idea at the pipeline level.",
      "order": 2
    },
    {
      "id": "sql-9-4-md-3",
      "type": "overview",
      "heading": "Ephemeral databases per CI run",
      "content": "The cleanest isolation (mentioned in 7.2) is a fresh, disposable database per run — typically a Docker container seeded from a known script:\n\n| services: | mysql: | image: mysql:8 | env: |\n|---|---|---|---|\n| MYSQL_ROOT_PASSWORD: root | MYSQL_DATABASE: hrms_ci | ports: ['3306:3306'] | options: >- |\n\n| steps: | - run: mysql -h 127.0.0.1 -uroot -proot hrms_ci < schema.sql |\n|---|---|\n| - run: mysql -h 127.0.0.1 -uroot -proot hrms_ci < seed.sql | - run: npx playwright test |\n\n```sql\nWith this approach, \"cleanup\" is simply the container being discarded at the end of the job — no tagging, no sweeper script, no shared-database coordination. The trade-off is that this only works for scenarios that don't need production-scale volume (7.5's bulk-data and performance tests still need a longer-lived, larger environment).\n```",
      "order": 3
    },
    {
      "id": "sql-9-4-md-4",
      "type": "overview",
      "heading": "Reporting DB-derived evidence in Playwright's HTML report",
      "content": "Attach query results to a failing test so the report is self-contained for whoever picks up the ticket:\n```ts\ntest('no duplicate payroll rows after the release', async ({ db }, testInfo) => {\n  const [rows]: any = await db.query(\n    \"SELECT employee_id, pay_month, COUNT(*) c FROM payroll GROUP BY employee_id, pay_month HAVING COUNT(*)>1\");\n  if (rows.length > 0) {\n| await testInfo.attach('duplicate-payroll-rows.json', { | body: JSON.stringify(rows, null, 2), contentType: 'application/json', | }); |\n|---|---|---|\n| } | expect(rows).toHaveLength(0); | }); |\n```",
      "order": 4
    },
    {
      "id": "sql-9-4-md-5",
      "type": "overview",
      "heading": "Flakiness from shared CI databases",
      "content": "If multiple pipeline jobs run against one shared QA database concurrently, expect the same lock-contention and lost-update issues covered in 7.7 to appear as CI flakiness, not just in dedicated concurrency tests. Symptoms: a test that reads a count right after another job's uncommitted insert, or a lock-wait timeout on a row another job is mid-update on. The fixes are the same ones from 7.2 and 7.7: tag and scope your data, avoid asserting on global counts when other jobs run in parallel, and prefer the ephemeral-database approach for anything sensitive to exact row counts.",
      "order": 5
    }
  ],
  "advantages": [
    "9.4 SQL with Playwright & CI Pipelines — 9."
  ],
  "limitations": [
    "9.4 SQL with Playwright & CI Pipelines is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
