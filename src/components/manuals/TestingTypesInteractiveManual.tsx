"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Copy, Check, ChevronRight } from "lucide-react";
import { ToolItem } from "@/lib/manualsData";

interface PracticalExample {
  app: string;
  scenario: string;
  pass: string;
  fail: string;
}

export interface TestingChapterData {
  no: string;
  title: string;
  category: string;
  desc: string;
  why: string;
  when: string;
  practical: PracticalExample;
  advantages?: string[];
  limitations?: string[];
  tools: ToolItem[];
}

export const TESTING_TYPES_CHAPTERS: TestingChapterData[] = [
  {
    no: "01",
    title: "Unit Testing",
    category: "By Level",
    desc: "Unit testing is the practice of testing the smallest individual pieces of a software application in complete isolation from the rest of the system. A \"unit\" is typically a single function, method, or class. The goal is to verify that each unit of code does exactly what it is supposed to do — given a specific input, it produces the expected output. Unit tests are written and run by developers, usually at the same time they write the code itself. Because each unit is tested in isolation, any external dependencies like databases, APIs, or file systems are replaced with fake versions called mocks or stubs. This means the test is only checking the logic of that one piece of code, nothing else. Unit testing sits at the very bottom of the testing pyramid — it is the foundation on which all other testing types are built. In modern software development, unit tests are run automatically every time a developer pushes code, catching bugs within seconds of them being introduced.",
    why: "If unit testing is skipped, bugs that could have been caught in seconds during development instead travel all the way to integration testing, system testing, or worse — production. Finding a bug at the unit level takes minutes to fix. Finding the same bug in production takes hours of debugging across multiple systems, and may have already caused data corruption or customer-facing failures. Unit tests also serve as living documentation — they show exactly how each function is expected to behave, which is invaluable when a new developer joins the team or when code is refactored months later.",
    when: "Unit tests should be written at the same time as the code — not after. Every function or method added in a sprint should have corresponding unit tests in the same pull request. They run on every commit in the CI/CD pipeline and must pass before code is merged. They are the cheapest, fastest safety net in software development and should never be skipped regardless of deadline pressure.",
    advantages: [
      "Catches bugs within seconds of code being written — the fastest feedback loop in all of testing",
      "Tests run in milliseconds — hundreds of tests complete in under a second",
      "Forces developers to write modular, clean, single-responsibility functions",
      "Acts as living documentation — tests show exactly how every function is expected to behave",
      "Makes refactoring safe — change internal implementation confidently as long as tests pass",
      "All three tools integrate with CI/CD — tests run automatically on every code push",
    ],
    limitations: [
      "Only tests individual units — does not catch bugs that emerge when components interact",
      "Mocks give false confidence — the real database or API may behave very differently from the mock",
      "Poor unit tests (testing implementation instead of behaviour) break on every refactor",
      "High coverage percentage does not mean all bugs are caught — it only measures lines executed",
      "Cannot test UI, user flows, network calls, or any real-world integration",
    ],
    practical: {
      app: "HRMS — Tax deduction logic",
      scenario: "The finance team reports that employee net salaries look wrong after a recent code change. The unit tests for the tax calculation function immediately pinpoint the broken slab logic — the developer accidentally used < instead of <= in the boundary condition for the 10% slab, causing employees earning exactly Rs 500,000 to be taxed at 20% instead of 10%.",
      pass: "calculate_tax(500000) returns 5000.0 (1% slab applied correctly).",
      fail: "calculate_tax(500000) returns 100000.0 — boundary condition bug caught instantly by unit test before it reaches payroll.",
    },
    tools: [
      {
        name: "JUnit",
        sub: "Java",
        url: "https://junit.org",
        desc: "JUnit is the most widely used unit testing framework for Java applications. It was originally created by Kent Beck and Erich Gamma — two of the most influential figures in software engineering — and is now maintained as JUnit 5, also called JUnit Jupiter. JUnit provides annotations that tell the framework exactly which methods are tests, how to set up before each test, and how to clean up after. The @Test annotation marks a method as a test case. @BeforeEach runs setup code before every test. @AfterEach runs cleanup after every test. @BeforeAll and @AfterAll run once for the entire test class. JUnit integrates directly into build tools like Maven and Gradle, meaning your entire test suite runs automatically as part of the build process. It also integrates into IDEs like IntelliJ IDEA and Eclipse, giving developers a green and red pass/fail indicator right inside their editor without switching to a terminal. JUnit 5 introduced a modular architecture — JUnit Platform (the launcher), JUnit Jupiter (the new API), and JUnit Vintage (backwards compatibility with JUnit 4) — making it flexible enough for both legacy and modern Java projects.",
        adv: [
          "Deep IDE integration — pass/fail shows inline in IntelliJ and Eclipse",
          "Runs automatically as part of the Maven/Gradle build, no extra wiring",
          "Modular Platform/Jupiter/Vintage design supports legacy and modern code side by side",
          "Rich annotation model (@Nested, @ParameterizedTest) keeps large suites organized",
        ],
        lim: [
          "Java-only — no use outside the JVM ecosystem",
          "More boilerplate than PyTest or Jest for the same test",
          "No built-in mocking — Mockito or similar has to be added separately",
          "Parameterized data sources need extra annotations most teams have to look up each time",
        ],
        steps: [
          {
            t: "Step 1 — Add JUnit to your Maven project",
            p: "In pom.xml:",
            c: `<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>`,
          },
          {
            t: "Step 2 — Write the class you want to test",
            p: "Create Calculator.java:",
            c: `public class Calculator {\n    public int add(int a, int b) {\n        return a + b;\n    }\n\n    public int subtract(int a, int b) {\n        return a - b;\n    }\n\n    public double divide(int a, int b) {\n        if (b == 0) throw new ArithmeticException("Cannot divide by zero");\n        return (double) a / b;\n    }\n}`,
          },
          {
            t: "Step 3 — Create the test class",
            p: "Create CalculatorTest.java in src/test/java:",
            c: `import org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass CalculatorTest {\n\n    Calculator calculator;\n\n    @BeforeEach\n    void setUp() {\n        calculator = new Calculator();  // fresh instance before each test\n    }\n\n    @Test\n    void testAddTwoPositiveNumbers() {\n        int result = calculator.add(3, 5);\n        assertEquals(8, result);\n    }\n\n    @Test\n    void testSubtract() {\n        int result = calculator.subtract(10, 4);\n        assertEquals(6, result);\n    }\n\n    @Test\n    void testDivideNormal() {\n        double result = calculator.divide(10, 2);\n        assertEquals(5.0, result);\n    }\n\n    @Test\n    void testDivideByZeroThrowsException() {\n        ArithmeticException exception = assertThrows(\n            ArithmeticException.class,\n            () -> calculator.divide(10, 0)\n        );\n        assertEquals("Cannot divide by zero", exception.getMessage());\n    }\n\n    @Test\n    @DisplayName("Adding negative numbers should return correct negative sum")\n    void testAddNegativeNumbers() {\n        assertEquals(-8, calculator.add(-3, -5));\n    }\n}`,
          },
          {
            t: "Step 4 — Run tests via Maven",
            p: "mvn test",
            c: `mvn test\n\n[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0\n[INFO] BUILD SUCCESS`,
          },
          {
            t: "Step 5 — Run with parameterized inputs",
            p: "@ParameterizedTest runs one test body against multiple inputs:",
            c: `@ParameterizedTest\n@CsvSource({\n    "2, 3, 5",\n    "0, 0, 0",\n    "-1, 1, 0",\n    "100, 200, 300"\n})\nvoid testAddMultipleCases(int a, int b, int expected) {\n    assertEquals(expected, calculator.add(a, b));\n}`,
          },
          {
            t: "Step 6 — Group tests with @Nested",
            p: "@Nested creates clean hierarchical structure in reports:",
            c: `@Nested\n@DisplayName("Division tests")\nclass DivisionTests {\n\n    @Test\n    void dividePositiveNumbers() {\n        assertEquals(2.5, calculator.divide(5, 2));\n    }\n\n    @Test\n    void divideByZero() {\n        assertThrows(ArithmeticException.class, () -> calculator.divide(5, 0));\n    }\n}`,
          },
          {
            t: "Step 7 — View results in IntelliJ",
            p: "Right-click the test class → Run. The left panel shows a green tick for each passing test and a red cross for each failure, with the exact assertion that failed and the actual vs expected values.",
            c: `// IntelliJ inline test runner shows visual tree with millisecond execution times per test case.`,
          },
        ],
      },
      {
        name: "PyTest",
        sub: "Python",
        url: "https://pytest.org",
        desc: "PyTest is the most popular testing framework for Python. Unlike Python's built-in unittest module, PyTest requires almost no boilerplate — you write a plain function starting with test_ and PyTest finds and runs it automatically without any class inheritance or special imports. PyTest's real power comes from its fixture system — reusable setup and teardown blocks that can be shared across hundreds of tests with a single line. Its parameterization feature lets you run the same test with dozens of different inputs without duplicating code. PyTest also has one of the richest plugin ecosystems in any testing framework — pytest-cov for coverage, pytest-xdist for parallel execution, pytest-html for HTML reports, pytest-mock for mocking, and pytest-playwright for browser automation. When a test fails, PyTest produces some of the clearest, most readable failure messages in any testing framework — showing the exact values on both sides of a failed assertion, the full call stack, and the local variables at the point of failure. It is used not just for unit testing but for integration, API, and UI testing as well, making it the single framework that can cover an entire Python testing strategy.",
        adv: [
          "Almost zero boilerplate — a plain function is a valid test",
          "One of the richest plugin ecosystems (coverage, parallel runs, HTML reports, mocking, Playwright)",
          "Same framework can cover unit, API/integration, and UI tests",
          "Failure output shows both sides of a failed assertion clearly",
        ],
        lim: [
          "Python-only",
          "Heavy plugin use can make a suite fragile if plugin versions drift",
          "Fixture scoping (function/class/module/session) has a learning curve",
          "Loose structure means teams need their own conventions to stay consistent",
        ],
        steps: [
          {
            t: "Step 1 — Install PyTest",
            p: "Install pytest and pytest-cov via pip:",
            c: `pip install pytest pytest-cov\npytest --version`,
          },
          {
            t: "Step 2 — Write the function to test",
            p: "Create salary.py:",
            c: `def calculate_gross_salary(basic, allowances, overtime_hours, overtime_rate):\n    if basic < 0:\n        raise ValueError("Basic salary cannot be negative")\n    overtime_pay = overtime_hours * overtime_rate\n    return basic + allowances + overtime_pay\n\ndef calculate_tax(gross_salary):\n    if gross_salary <= 500000:\n        return gross_salary * 0.01\n    elif gross_salary <= 700000:\n        return gross_salary * 0.10\n    else:\n        return gross_salary * 0.20`,
          },
          {
            t: "Step 3 — Write the test file",
            p: "Create test_salary.py:",
            c: `import pytest\nfrom salary import calculate_gross_salary, calculate_tax\n\ndef test_gross_salary_with_overtime():\n    result = calculate_gross_salary(50000, 10000, 5, 500)\n    assert result == 62500\n\ndef test_gross_salary_no_overtime():\n    result = calculate_gross_salary(50000, 10000, 0, 500)\n    assert result == 60000\n\ndef test_negative_basic_raises_error():\n    with pytest.raises(ValueError, match="Basic salary cannot be negative"):\n        calculate_gross_salary(-1000, 5000, 0, 0)\n\ndef test_tax_lowest_slab():\n    assert calculate_tax(400000) == 4000.0\n\ndef test_tax_middle_slab():\n    assert calculate_tax(600000) == 60000.0\n\ndef test_tax_highest_slab():\n    assert calculate_tax(800000) == 160000.0`,
          },
          {
            t: "Step 4 — Run the tests",
            p: "pytest test_salary.py -v",
            c: `pytest test_salary.py -v\n\ntest_salary.py::test_gross_salary_with_overtime PASSED\ntest_salary.py::test_gross_salary_no_overtime PASSED\ntest_salary.py::test_negative_basic_raises_error PASSED\ntest_salary.py::test_tax_lowest_slab PASSED\ntest_salary.py::test_tax_middle_slab PASSED\ntest_salary.py::test_tax_highest_slab PASSED\n\n6 passed in 0.08s`,
          },
          {
            t: "Step 5 — Use fixtures for reusable setup",
            p: "@pytest.fixture creates shared setup data:",
            c: `@pytest.fixture\ndef employee_data():\n    return {\n        "basic": 50000,\n        "allowances": 10000,\n        "overtime_hours": 5,\n        "overtime_rate": 500\n    }\n\ndef test_gross_with_fixture(employee_data):\n    result = calculate_gross_salary(**employee_data)\n    assert result == 62500`,
          },
          {
            t: "Step 6 — Parameterize for multiple scenarios",
            p: "@pytest.mark.parametrize runs multiple test inputs:",
            c: `@pytest.mark.parametrize("gross, expected_tax", [\n    (400000, 4000.0),\n    (600000, 60000.0),\n    (800000, 160000.0),\n    (500000, 5000.0),\n])\ndef test_tax_slabs(gross, expected_tax):\n    assert calculate_tax(gross) == expected_tax`,
          },
          {
            t: "Step 7 — Run with coverage report",
            p: "pytest test_salary.py --cov=salary --cov-report=term-missing -v",
            c: `pytest test_salary.py --cov=salary --cov-report=term-missing -v\n\nName        Stmts   Miss  Cover   Missing\n-----------------------------------------\nsalary.py      10      0   100%`,
          },
        ],
      },
      {
        name: "Jest",
        sub: "JavaScript",
        url: "https://jestjs.io",
        desc: "Jest is the standard unit testing framework for JavaScript and TypeScript, created and maintained by Meta (Facebook). It was built with one guiding principle — zero configuration. You install it, point it at your files, and it works. Jest includes everything a JavaScript developer needs in a single package — a test runner, an assertion library, a mocking system, code coverage reporting, and snapshot testing — without needing to install and configure multiple separate libraries the way older JavaScript testing setups required. Jest runs tests in parallel by default using worker threads, making large test suites significantly faster. Its watch mode is a developer favourite — it monitors your files for changes and automatically re-runs only the affected tests, giving you instant feedback as you write code. Jest's mocking system is particularly powerful — you can mock entire modules, individual functions, timers, and even HTTP calls with a single line of code. Snapshot testing, one of Jest's most distinctive features, lets you capture the rendered output of a UI component and automatically compare it on every future run, catching unintended visual changes without writing explicit assertions. Jest works out of the box with React (create-react-app includes it by default), Node.js, TypeScript (with ts-jest), and most modern JavaScript frameworks.",
        adv: [
          "Zero-config — install and run, no separate assertion or mocking library needed",
          "Parallel test execution by default via worker threads",
          "Watch mode re-runs only affected tests for instant feedback",
          "Snapshot testing catches unintended UI changes without writing new assertions",
        ],
        lim: [
          "Snapshot tests get rubber-stamped if diffs aren't actually reviewed",
          "Config gets complex fast for ESM or monorepo setups",
          "Slower cold-start on very large suites than newer runners like Vitest",
          "Full TypeScript support needs the ts-jest wrapper, not native",
        ],
        steps: [
          {
            t: "Step 1 — Initialize a Node project and install Jest",
            p: "npm init -y && npm install --save-dev jest",
            c: `npm init -y\nnpm install --save-dev jest\n\n// Add to package.json scripts:\n{\n  "scripts": {\n    "test": "jest",\n    "test:coverage": "jest --coverage",\n    "test:watch": "jest --watch"\n  }\n}`,
          },
          {
            t: "Step 2 — Write the function to test",
            p: "Create leaveCalculator.js:",
            c: `function calculateRemainingLeave(totalDays, usedDays) {\n    if (usedDays > totalDays) {\n        throw new Error("Used days cannot exceed total allocated days");\n    }\n    return totalDays - usedDays;\n}\n\nfunction isLeaveEligible(joiningDate, requestDate) {\n    const joining = new Date(joiningDate);\n    const request = new Date(requestDate);\n    const diffMonths = (request - joining) / (1000 * 60 * 60 * 24 * 30);\n    return diffMonths >= 3;  // must have worked 3 months to be eligible\n}\n\nmodule.exports = { calculateRemainingLeave, isLeaveEligible };`,
          },
          {
            t: "Step 3 — Write the test file",
            p: "Create leaveCalculator.test.js:",
            c: `const { calculateRemainingLeave, isLeaveEligible } = require('./leaveCalculator');\n\ndescribe('calculateRemainingLeave', () => {\n\n    test('returns correct remaining days', () => {\n        expect(calculateRemainingLeave(20, 5)).toBe(15);\n    });\n\n    test('returns zero when all leave is used', () => {\n        expect(calculateRemainingLeave(20, 20)).toBe(0);\n    });\n\n    test('throws error when used days exceed total', () => {\n        expect(() => {\n            calculateRemainingLeave(10, 15);\n        }).toThrow("Used days cannot exceed total allocated days");\n    });\n});\n\ndescribe('isLeaveEligible', () => {\n\n    test('returns true after 3 months of joining', () => {\n        expect(isLeaveEligible('2025-01-01', '2025-04-15')).toBe(true);\n    });\n\n    test('returns false before 3 months of joining', () => {\n        expect(isLeaveEligible('2025-01-01', '2025-02-01')).toBe(false);\n    });\n});`,
          },
          {
            t: "Step 4 — Run the tests",
            p: "npm test",
            c: `PASS  leaveCalculator.test.js\n  calculateRemainingLeave\n    ✓ returns correct remaining days (2ms)\n    ✓ returns zero when all leave is used (1ms)\n    ✓ throws error when used days exceed total (1ms)\n  isLeaveEligible\n    ✓ returns true after 3 months of joining (1ms)\n    ✓ returns false before 3 months of joining (1ms)\n\nTest Suites: 1 passed, 1 total\nTests:       5 passed, 5 total`,
          },
          {
            t: "Step 5 — Mock a dependency",
            p: "Mock external API call inside a function:",
            c: `jest.mock('./api', () => ({\n    getEmployeeById: jest.fn().mockResolvedValue({\n        id: 1,\n        name: "Simran",\n        leaveBalance: 12\n    })\n}));\n\ntest('fetches employee leave balance', async () => {\n    const { getEmployeeById } = require('./api');\n    const employee = await getEmployeeById(1);\n    expect(employee.leaveBalance).toBe(12);\n    expect(getEmployeeById).toHaveBeenCalledWith(1);\n});`,
          },
          {
            t: "Step 6 — Run with coverage",
            p: "npm run test:coverage",
            c: `npm run test:coverage\n\nFile                  | % Stmts | % Branch | % Funcs | % Lines\n----------------------|---------|----------|---------|--------\nleaveCalculator.js    |     100 |      100 |     100 |    100`,
          },
          {
            t: "Step 7 — Run in watch mode during development",
            p: "npm run test:watch monitors files and re-runs tests on save.",
            c: `npm run test:watch\n\n# Jest watches your files and re-runs affected tests instantly.`,
          },
        ],
      },
    ],
  },
  {
    no: "02",
    title: "Integration Testing",
    category: "By Level",
    desc: "Integration testing verifies that multiple individual units or components work correctly when they are combined together. While unit testing checks each piece in isolation, integration testing checks the connections between pieces — does the login module correctly communicate with the user database? Does the leave request service correctly update the leave balance and trigger a manager notification? Does the API return the right data structure when the frontend calls it? Integration tests are run after unit tests pass and before full system testing begins. They expose a category of bugs that unit tests are structurally incapable of finding — bugs that live in the interfaces, contracts, and data flows between components. In a real HRMS system, a unit test confirms that the leave balance calculation function works correctly in isolation. Only an integration test confirms that when an employee submits a leave request through the actual API, the correct balance is deducted in the actual database and the manager actually receives the notification through the actual notification service.",
    why: "The most damaging bugs in real applications almost always live at integration points — API response shapes that do not match what the frontend expects, database queries that return unexpected null values, authentication tokens that expire mid-session, event listeners that drop messages under load. These bugs are completely invisible to unit tests because unit tests mock all external dependencies. Skipping integration testing means these interface bugs survive all the way to system testing or production, where finding and fixing them is dramatically more expensive and disruptive.",
    when: "Integration testing begins as soon as two or more components are ready to connect — typically mid-sprint when a feature's API and frontend are both available. It runs in CI/CD on every pull request targeting the main branch. A full integration suite must pass before any build is promoted to system testing or staging.",
    advantages: [
      "Catches interface bugs that unit tests are structurally unable to find",
      "Tests real data flow across modules — authentication, database reads/writes, notifications",
      "Postman collections are reusable across dev, staging, and production environments",
      "Faster than system testing — direct API calls without full browser rendering",
      "Automated with Newman or PyTest in CI/CD — runs on every pull request",
    ],
    limitations: [
      "All integrated components must be running — more infrastructure than unit tests",
      "Harder to isolate failure root cause — bug could be in any connected component",
      "Test data management is complex — requests create real records that need cleanup",
      "Slower than unit tests — network calls and service responses add time",
      "Undocumented APIs make integration tests hard to write without trial and error",
    ],
    practical: {
      app: "HRMS — Leave request to balance integration",
      scenario: "Full integration test flow:\n1. POST /auth/login → get token, assert status 200\n2. GET /leave/balance/5 → store annual leave balance (12 days)\n3. POST /leave/request with employee 5, annual leave, 3 days → assert 201, request ID returned\n4. GET /leave/balance/5 again → assert balance is now 9 days\n5. GET /notifications?recipient=manager_id → assert new notification exists for pending leave\n6. PATCH /leave/request/{id}/approve → manager approves\n7. GET /leave/balance/5 → balance remains 9 (already deducted at request time)",
      pass: "All 7 steps succeed, data flows correctly across all integrated services.",
      fail: "Step 4 shows balance still 12 — the leave request service is not integrated with the balance service. A bug unit tests would never find.",
    },
    tools: [
      {
        name: "Postman",
        sub: "API client",
        url: "https://postman.com",
        desc: "Postman is the world's most widely used API platform, originally created in 2012 by Abhinav Asthana as a Chrome extension and now a standalone desktop and web application used by over 25 million developers and testers. At its core, Postman is an HTTP client — it lets you construct and send any kind of HTTP request (GET, POST, PUT, PATCH, DELETE) to any API endpoint and inspect every detail of the response including status code, headers, body, cookies, and response time. For integration testing specifically, Postman's real power comes from its Collections feature — you group related API requests into a collection and run them in sequence, passing data between them using variables. For example, a login request extracts the authentication token from the response and stores it as a variable, and every subsequent request automatically uses that token in its Authorization header. Each request has a Tests tab where you write JavaScript assertions that automatically validate the response — checking status codes, response structure, data types, and business logic values. The Newman CLI tool lets you run entire Postman collections from the command line or CI/CD pipeline without opening the GUI, producing JUnit-compatible XML reports that integrate with Jenkins, GitHub Actions, or any other build system. Postman also supports environment files — you define base URLs and credentials for dev, staging, and production separately, and switch between them with one click without changing any request.",
        adv: [
          "GUI-based, so non-developers can build and run requests without code",
          "Collections + variables make chaining requests (e.g. login → use token) simple",
          "Newman CLI runs full collections in CI/CD with JUnit-style reports",
          "One-click environment switching between dev, staging, and production",
        ],
        lim: [
          "Test scripts are JavaScript-only inside the Tests tab — awkward for complex logic",
          "Large collections get hard to navigate and maintain over time",
          "Free tier has workspace and monthly request limits at scale",
          "Not built for direct database checks — HTTP only",
        ],
        steps: [
          {
            t: "Step 1 — Download and install Postman",
            p: "Go to postman.com/downloads and download the desktop app. Free tier supports unlimited collections.",
            c: `// Download desktop client from https://postman.com/downloads`,
          },
          {
            t: "Step 2 — Create a new Collection",
            p: "Click 'New' → 'Collection'. Name it HRMS Integration Tests.",
            c: `Collection Name: "HRMS Integration Tests"`,
          },
          {
            t: "Step 3 — Set up a Collection Variable for the base URL",
            p: "Click the collection name → Variables tab. Add variable base_url.",
            c: `Variable: base_url\nInitial value: https://staging.hrms-app.com/api`,
          },
          {
            t: "Step 4 — Add a login request",
            p: "POST {{base_url}}/auth/login with credentials and save JWT token.",
            c: `// In Tests tab:\npm.test("Login returns 200", function () {\n    pm.response.to.have.status(200);\n});\n\npm.test("Response contains auth token", function () {\n    const body = pm.response.json();\n    pm.expect(body).to.have.property("token");\n    pm.expect(body.token).to.be.a("string").and.not.empty;\n});\n\npm.test("Response contains user info", function () {\n    const body = pm.response.json();\n    pm.expect(body.user).to.have.property("id");\n    pm.expect(body.user.role).to.equal("HR_ADMIN");\n});\n\n// Pass token to all subsequent requests\npm.collectionVariables.set("auth_token", pm.response.json().token);\npm.collectionVariables.set("user_id", pm.response.json().user.id);`,
          },
          {
            t: "Step 5 — Add a chained request using the token",
            p: "GET {{base_url}}/employees with Authorization: Bearer {{auth_token}}.",
            c: `pm.test("Returns 200", () => pm.response.to.have.status(200));\n\npm.test("Returns array of employees", function () {\n    const body = pm.response.json();\n    pm.expect(body.data).to.be.an("array");\n    pm.expect(body.data.length).to.be.above(0);\n});\n\npm.test("Each employee has required fields", function () {\n    const employees = pm.response.json().data;\n    employees.forEach(emp => {\n        pm.expect(emp).to.have.property("id");\n        pm.expect(emp).to.have.property("name");\n        pm.expect(emp).to.have.property("department");\n    });\n});\n\n// Save first employee ID for next request\npm.collectionVariables.set("employee_id", pm.response.json().data[0].id);`,
          },
          {
            t: "Step 6 — Run the full collection",
            p: "Click collection name → 'Run collection'. The runner executes all requests in order and validates assertions.",
            c: `// Visual Runner executes requests in sequence with assertion summaries.`,
          },
          {
            t: "Step 7 — Run from terminal using Newman",
            p: "Automate runs in CI/CD pipeline and export HTML reports.",
            c: `npm install -g newman newman-reporter-htmlextra\nnewman run HRMS_Integration_Tests.json \\\n    -e staging_environment.json \\\n    --reporters cli,htmlextra \\\n    --reporter-htmlextra-export reports/integration_report.html`,
          },
        ],
      },
      {
        name: "PyTest",
        sub: "API integration",
        url: "https://pytest.org",
        desc: "PyTest is not just a unit testing framework — used with the requests library it becomes a powerful API integration testing tool. The advantage over Postman is that Python test code can include complex logic, data manipulation, database queries, and external validations that Postman's JavaScript test scripts cannot easily handle. PyTest fixtures handle authentication once and share the token across all tests in a session. Parameterization runs the same API test against multiple data sets. The pytest-html plugin generates professional HTML reports. For teams already using Python for their Playwright UI tests, using PyTest for API integration tests means one language, one framework, one CI/CD configuration for all testing layers.",
        adv: [
          "Full Python logic available in tests — DB queries, complex assertions",
          "Same framework and CI config as unit and UI tests, if already used elsewhere",
          "Session-scoped fixtures share an auth token across an entire suite",
          "pytest-html produces shareable, professional reports",
        ],
        lim: [
          "Requires Python fluency — not approachable for manual/business testers",
          "No GUI for quickly exploring an endpoint ad hoc, unlike Postman",
          "Test data cleanup has to be handled manually in code",
          "Less visual — harder to demo results to non-technical stakeholders",
        ],
        steps: [
          {
            t: "Step 1 — Install dependencies",
            p: "pip install pytest requests pytest-html",
            c: `pip install pytest requests pytest-html`,
          },
          {
            t: "Step 2 — Create conftest.py with auth fixture",
            p: "Define session-scoped auth fixture in conftest.py:",
            c: `import pytest\nimport requests\n\nBASE_URL = "https://staging.hrms-app.com/api"\n\n@pytest.fixture(scope="session")\ndef auth_token():\n    response = requests.post(f"{BASE_URL}/auth/login", json={\n        "email": "hr@company.com",\n        "password": "Admin@1234"\n    })\n    assert response.status_code == 200\n    return response.json()["token"]\n\n@pytest.fixture(scope="session")\ndef api_headers(auth_token):\n    return {\n        "Authorization": f"Bearer {auth_token}",\n        "Content-Type": "application/json"\n    }`,
          },
          {
            t: "Step 3 — Write integration tests",
            p: "Test employee listing and multi-step balance deduction:",
            c: `import requests\nimport pytest\n\nBASE_URL = "https://staging.hrms-app.com/api"\n\ndef test_get_employees_returns_list(api_headers):\n    response = requests.get(f"{BASE_URL}/employees", headers=api_headers)\n    assert response.status_code == 200\n    data = response.json()\n    assert isinstance(data["data"], list)\n    assert len(data["data"]) > 0\n\ndef test_employee_has_required_fields(api_headers):\n    response = requests.get(f"{BASE_URL}/employees", headers=api_headers)\n    employee = response.json()["data"][0]\n    assert "id" in employee\n    assert "name" in employee\n    assert "department" in employee\n    assert "email" in employee\n\ndef test_create_leave_request_updates_balance(api_headers):\n    # Get balance before\n    balance_before = requests.get(\n        f"{BASE_URL}/leave/balance/1", headers=api_headers\n    ).json()["annual_leave"]\n\n    # Submit leave request\n    response = requests.post(f"{BASE_URL}/leave/request", headers=api_headers, json={\n        "employee_id": 1,\n        "type": "annual",\n        "days": 2,\n        "reason": "Personal work"\n    })\n    assert response.status_code == 201\n    assert "request_id" in response.json()\n\n    # Get balance after\n    balance_after = requests.get(\n        f"{BASE_URL}/leave/balance/1", headers=api_headers\n    ).json()["annual_leave"]\n\n    # Integration assertion — balance must have decreased\n    assert balance_after == balance_before - 2`,
          },
          {
            t: "Step 4 — Run with HTML report",
            p: "pytest tests/integration/ -v --html=reports/integration.html",
            c: `pytest tests/integration/ -v --html=reports/integration.html`,
          },
          {
            t: "Step 5 — Parameterize for multiple employees",
            p: "Run same API check against employee ID matrix:",
            c: `@pytest.mark.parametrize("employee_id", [1, 2, 3, 5, 10])\ndef test_payslip_exists_for_active_employees(api_headers, employee_id):\n    response = requests.get(\n        f"{BASE_URL}/payslip/{employee_id}/latest",\n        headers=api_headers\n    )\n    assert response.status_code == 200\n    assert response.json()["net_salary"] > 0`,
          },
        ],
      },
      {
        name: "Selenium",
        sub: "Browser-backend flow",
        url: "https://selenium.dev",
        desc: "Selenium, for integration testing, is used to test the integration between the browser-rendered frontend and the backend services — it clicks real UI elements and verifies that the correct data flows through to the backend and back. While Selenium has largely been replaced by Playwright for new projects, it remains widely deployed in existing enterprise frameworks and is still a valid tool for integration-level UI testing. Its WebDriver protocol controls real browsers, and its WebDriverWait with expected_conditions handles dynamic page elements. Selenium Grid extends it to run integration tests in parallel across multiple browsers simultaneously.",
        adv: [
          "Mature, 20+ years in production — huge documentation and community",
          "WebDriver protocol works natively with every major browser",
          "Selenium Grid distributes tests across machines and browsers in parallel",
          "Validates the real frontend-to-backend path, not just the API contract",
        ],
        lim: [
          "No built-in auto-waiting — flakier than Playwright without careful WebDriverWait usage",
          "Slower to author tests than a pure API approach",
          "Heavier setup and maintenance overhead than Postman or PyTest",
          "Overkill when the integration in question doesn't touch the UI at all",
        ],
        steps: [
          {
            t: "Step 1 — Install Selenium",
            p: "pip install selenium webdriver-manager",
            c: `pip install selenium webdriver-manager`,
          },
          {
            t: "Step 2 — Set up the driver",
            p: "Initialize Chrome WebDriver with explicit wait:",
            c: `from selenium import webdriver\nfrom selenium.webdriver.chrome.service import Service\nfrom webdriver_manager.chrome import ChromeDriverManager\nfrom selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\ndriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))\nwait = WebDriverWait(driver, 10)`,
          },
          {
            t: "Step 3 — Write an integration test — login and verify dashboard loads",
            p: "Validate that login form integrates with user session:",
            c: `def test_login_integrates_with_session(driver):\n    driver.get("https://staging.hrms-app.com/login")\n\n    driver.find_element(By.ID, "email").send_keys("hr@company.com")\n    driver.find_element(By.ID, "password").send_keys("Admin@1234")\n    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()\n\n    # Wait for dashboard — confirms frontend-backend auth integration works\n    dashboard = wait.until(\n        EC.visibility_of_element_located((By.CSS_SELECTOR, ".dashboard-header"))\n    )\n    assert dashboard.is_displayed()\n    assert "dashboard" in driver.current_url`,
          },
          {
            t: "Step 4 — Test form submission integrates with database",
            p: "Submit leave request and verify backend persistence confirmation:",
            c: `def test_leave_form_submission_shows_confirmation(driver, auth_session):\n    driver.get("https://staging.hrms-app.com/leave/apply")\n\n    wait.until(EC.element_to_be_clickable((By.ID, "leave-type"))).click()\n    driver.find_element(By.CSS_SELECTOR, "option[value='annual']").click()\n    driver.find_element(By.ID, "from-date").send_keys("2025-09-15")\n    driver.find_element(By.ID, "to-date").send_keys("2025-09-17")\n    driver.find_element(By.ID, "reason").send_keys("Family event")\n    driver.find_element(By.CSS_SELECTOR, "button.submit-leave").click()\n\n    success = wait.until(\n        EC.visibility_of_element_located((By.CSS_SELECTOR, ".success-toast"))\n    )\n    assert "Leave request submitted" in success.text`,
          },
          {
            t: "Step 5 — Always close the driver after tests",
            p: "driver.quit()",
            c: `driver.quit()`,
          },
        ],
      },
    ],
  },
  {
    no: "03",
    title: "System Testing",
    category: "By Level",
    desc: "System testing is the testing of a complete, fully integrated application as a whole from the outside. At this level the entire system is tested end-to-end — the UI, the backend APIs, the database, the integrations, the business logic, the security, and the performance — everything together as it will run in production. System testing verifies that the complete assembled system meets every requirement defined in the specification. Unlike unit or integration testing which examine individual pieces and their connections, system testing treats the application as a black box and tests it exactly the way a real user would experience it — navigating through screens, performing operations, and checking results. This is where complete business workflows are tested: a new employee is onboarded, assigned to a department, begins logging attendance, applies for leave, and receives their monthly payslip — all as one connected flow. System testing is performed by a dedicated QA team, not the developers who wrote the code, in an environment that mirrors production as closely as possible.",
    why: "System testing is the last major technical quality gate before software reaches users. It validates that the application works not just in component-level pieces but as the unified product a real user will interact with. Bugs found here are more expensive to fix than in earlier levels but far less expensive than bugs found after go-live. System testing also provides the most business-relevant evidence of quality — it proves that the complete user journeys work correctly, which is what stakeholders actually care about. Without system testing, a team releases software that may work perfectly in all its individual parts but fail completely as an integrated whole.",
    when: "System testing begins after integration testing passes and the full application is deployed to a stable staging environment. Critical path system tests run on every release candidate. A full regression suite runs before every major release, after significant feature additions, and after any architectural change. System tests should never be the only testing layer — they work best as the top of a pyramid with solid unit and integration tests beneath them.",
    advantages: [
      "Tests the complete application exactly as users experience it — most realistic test level",
      "Validates end-to-end workflows that cross every module and service",
      "Catches bugs that only appear when the full system runs together",
      "Provides the most business-relevant pass/fail evidence for stakeholders and sign-off",
      "Playwright's trace viewer makes debugging system test failures significantly faster than traditional tools",
    ],
    limitations: [
      "Slowest test level — full browser automation takes seconds to minutes per scenario",
      "Most expensive to maintain — UI changes require corresponding test updates",
      "Difficult to isolate root cause when a system test fails across multiple layers",
      "Requires a complete, stable environment with realistic test data",
      "Cannot cover every possible user path — combinatorial explosion makes full coverage impossible",
    ],
    practical: {
      app: "HRMS Payroll System",
      scenario: "Complete system test scenario — full payroll cycle:\n1. Login as Payroll Admin → assert Dashboard visible\n2. Navigate to Payroll → Select August 2025 pay period\n3. Assert all 47 active employees appear in the payroll run list\n4. Click \"Process Payroll\" → assert confirmation dialog appears\n5. Confirm processing → assert status changes to \"Processing\"\n6. Wait for status to change to \"Processed\" (async job)\n7. Click on Employee #5 → assert gross salary, tax, deductions, and net salary are correct\n8. Click \"Generate Payslips\" → assert all payslips marked as generated\n9. Logout → login as Employee #5\n10. Navigate to Payslips → assert August 2025 payslip is visible with correct net amount",
      pass: "All 10 steps succeed, payroll flows end-to-end correctly.",
      fail: "Employee cannot see payslip after generation — cross-module visibility bug only detectable at system level.",
    },
    tools: [
      {
        name: "Playwright",
        sub: "Modern browser automation",
        url: "https://playwright.dev",
        desc: "Playwright is Microsoft's modern browser automation library and currently the best-in-class tool for system testing web applications. Released in 2020, it was built by engineers who previously created Puppeteer at Google, and it fixes the fundamental reliability problems that made Selenium-based system tests notoriously flaky. Playwright's defining feature is its auto-waiting system — every action automatically waits for the target element to be attached, visible, stable, enabled, and receiving events before proceeding, eliminating the vast majority of timing-related test failures. Its locator system searches the DOM fresh on every action rather than storing stale element references. Playwright supports Chromium, Firefox, and WebKit from a single API, meaning your system tests can run on all three major browser engines without changing a line of test code. Its network interception feature lets you mock API responses during system tests to test specific states without needing that state in the database. The Trace Viewer is its most powerful debugging tool — when a system test fails in CI, you download the trace file, open it with playwright show-trace, and see a step-by-step replay of exactly what happened including screenshots at every action, network calls made, and console errors. For Python, the pytest-playwright plugin integrates seamlessly with pytest, providing browser, context, and page fixtures automatically.",
        adv: [
          "Auto-waiting removes most timing-related flaky failures automatically",
          "One API drives Chromium, Firefox, and WebKit — no per-browser rewrites",
          "Trace Viewer replays a failed run step-by-step with screenshots and network calls",
          "Network interception mocks specific states without touching the real database",
        ],
        lim: [
          "Newer tool — smaller long-tail community and fewer legacy integrations than Selenium",
          "Teams migrating from Selenium have a real API and mental-model switch to make",
          "Best support is in modern language bindings; older stacks may not be first-class",
          "Trace files can get large on long test runs, adding storage overhead",
        ],
        steps: [
          {
            t: "Step 1 — Install Playwright",
            p: "pip install playwright pytest-playwright && playwright install",
            c: `pip install playwright pytest-playwright\nplaywright install`,
          },
          {
            t: "Step 2 — Set up the project structure",
            p: "Organize tests, pages, and fixtures:",
            c: `system_tests/\n├── tests/\n│   ├── test_employee_management.py\n│   ├── test_leave_workflow.py\n│   └── test_payroll.py\n├── pages/\n│   ├── login_page.py\n│   └── employee_page.py\n├── conftest.py\n└── pytest.ini`,
          },
          {
            t: "Step 3 — Configure conftest.py",
            p: "Define launch args and timeouts:",
            c: `import pytest\n\n@pytest.fixture(scope="session")\ndef browser_type_launch_args():\n    return {"headless": True, "slow_mo": 0}\n\n@pytest.fixture(scope="session")\ndef base_url():\n    return "https://staging.hrms-app.com"\n\n@pytest.fixture(scope="function", autouse=True)\ndef configure_timeouts(page):\n    page.set_default_timeout(30000)\n    page.set_default_navigation_timeout(60000)`,
          },
          {
            t: "Step 4 — Write a complete system test",
            p: "Simulate onboarding workflow end-to-end:",
            c: `from playwright.sync_api import Page, expect\n\ndef test_employee_onboarding_complete_flow(page: Page):\n    # Login\n    page.goto("https://staging.hrms-app.com/login")\n    page.get_by_label("Email").fill("hr@company.com")\n    page.get_by_label("Password").fill("Admin@1234")\n    page.get_by_role("button", name="Login").click()\n    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()\n\n    # Navigate to add employee\n    page.get_by_role("link", name="Employees").click()\n    page.get_by_role("button", name="Add Employee").click()\n\n    # Fill employee form\n    page.get_by_label("First Name").fill("Anita")\n    page.get_by_label("Last Name").fill("Sharma")\n    page.get_by_label("Email").fill("anita.sharma@company.com")\n    page.get_by_label("Department").select_option("Engineering")\n    page.get_by_label("Joining Date").fill("2025-09-01")\n    page.get_by_role("button", name="Save").click()\n\n    # Verify success\n    expect(page.get_by_text("Employee created successfully")).to_be_visible()\n\n    # Verify in list\n    page.get_by_role("link", name="Employee List").click()\n    expect(page.get_by_role("row", has_text="Anita Sharma")).to_be_visible()`,
          },
          {
            t: "Step 5 — Enable tracing for failure debugging",
            p: "Capture trace archives on every run:",
            c: `# conftest.py\n@pytest.fixture(scope="function")\ndef context(browser):\n    context = browser.new_context()\n    context.tracing.start(screenshots=True, snapshots=True, sources=True)\n    yield context\n    context.tracing.stop(path=f"traces/trace_{pytest.current_test}.zip")`,
          },
          {
            t: "Step 6 — Run the tests",
            p: "pytest tests/ -v --html=reports/system_test_report.html",
            c: `pytest tests/ -v --html=reports/system_test_report.html`,
          },
          {
            t: "Step 7 — View trace on failure",
            p: "playwright show-trace traces/trace_failed_test.zip",
            c: `playwright show-trace traces/trace_failed_test.zip`,
          },
        ],
      },
      {
        name: "Selenium",
        sub: "Veteran browser automation",
        url: "https://selenium.dev",
        desc: "Selenium is the veteran of browser-based system testing with over 20 years of production use. For teams with existing Selenium frameworks or Java/C# backends, Selenium remains a practical choice for system testing. Its WebDriver protocol is supported by every major browser natively. Selenium Grid lets you distribute system tests across many machines and browser combinations simultaneously — essential for large enterprise test suites that need to finish quickly. While newer frameworks like Playwright have surpassed it in developer experience, Selenium's maturity means extensive documentation, a massive community, and integration support in virtually every CI/CD and test management tool in existence.",
        adv: [
          "20+ years of maturity — the largest documentation base and community in the space",
          "Integrates with virtually every CI/CD and test management tool that exists",
          "Selenium Grid scales to large cross-browser, cross-machine test suites",
          "Strong fit for teams with existing Java or C# Selenium frameworks",
        ],
        lim: [
          "No auto-waiting — tests are more flaky by default without careful explicit waits",
          "Test authoring is more verbose and slower than Playwright",
          "Falling behind on developer experience — weaker debugging tools out of the box",
          "Higher long-term maintenance cost as the UI under test evolves",
        ],
        steps: [
          {
            t: "Step 1 — Install dependencies",
            p: "pip install selenium webdriver-manager pytest",
            c: `pip install selenium webdriver-manager pytest`,
          },
          {
            t: "Step 2 — Create a base test class",
            p: "Initialize headless driver fixture:",
            c: `import pytest\nfrom selenium import webdriver\nfrom selenium.webdriver.chrome.service import Service\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\nfrom webdriver_manager.chrome import ChromeDriverManager\n\n@pytest.fixture(scope="function")\ndef driver():\n    service = Service(ChromeDriverManager().install())\n    options = webdriver.ChromeOptions()\n    options.add_argument("--headless")\n    options.add_argument("--window-size=1280,720")\n    driver = webdriver.Chrome(service=service, options=options)\n    driver.implicitly_wait(10)\n    yield driver\n    driver.quit()`,
          },
          {
            t: "Step 3 — Write a system test",
            p: "Complete leave workflow test:",
            c: `from selenium.webdriver.common.by import By\n\ndef test_leave_application_workflow(driver):\n    # Login\n    driver.get("https://staging.hrms-app.com/login")\n    driver.find_element(By.ID, "email").send_keys("emp@company.com")\n    driver.find_element(By.ID, "password").send_keys("Emp@1234")\n    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()\n\n    wait = WebDriverWait(driver, 10)\n\n    # Navigate to leave\n    leave_link = wait.until(\n        EC.element_to_be_clickable((By.LINK_TEXT, "Apply Leave"))\n    )\n    leave_link.click()\n\n    # Fill leave form\n    driver.find_element(By.ID, "leave-type").send_keys("Annual Leave")\n    driver.find_element(By.ID, "from-date").send_keys("2025-09-15")\n    driver.find_element(By.ID, "to-date").send_keys("2025-09-17")\n    driver.find_element(By.ID, "reason").send_keys("Family function")\n    driver.find_element(By.CSS_SELECTOR, ".submit-btn").click()\n\n    # Verify submission\n    success = wait.until(\n        EC.visibility_of_element_located((By.CSS_SELECTOR, ".success-message"))\n    )\n    assert "Leave request submitted" in success.text\n    assert "Pending" in driver.find_element(By.CSS_SELECTOR, ".leave-status").text`,
          },
          {
            t: "Step 4 — Take screenshot on failure",
            p: "Save screenshot upon assertion failure:",
            c: `# In conftest.py\n@pytest.fixture(autouse=True)\ndef screenshot_on_failure(driver, request):\n    yield\n    if request.node.rep_call.failed:\n        driver.save_screenshot(f"screenshots/{request.node.name}.png")`,
          },
          {
            t: "Step 5 — Run tests in parallel with pytest-xdist",
            p: "Scale test executions across 4 worker processes:",
            c: `pip install pytest-xdist\npytest tests/ -n 4  # run on 4 parallel workers`,
          },
        ],
      },
    ],
  },
  {
    no: "04",
    title: "Acceptance Testing (UAT)",
    category: "By Level",
    desc: "User Acceptance Testing, universally called UAT, is the final testing level before software is released to real users or goes live in production. Unlike every preceding test level which is performed by technical teams, UAT is performed by the actual business stakeholders — the end users, the client representatives, the department heads, or the product owners. The fundamental purpose of UAT is not to find technical bugs but to confirm business fitness — that the software genuinely delivers the value it was commissioned to deliver, works the way the business actually operates, and solves the real problems users face in their daily work. UAT is built on real business scenarios, not technical test cases. A payroll manager testing whether the system handles Nepal's fiscal year 2081/82 tax slabs correctly is UAT. A department head verifying that the leave approval chain matches the company's four-level hierarchy is UAT. An HR director confirming that the appraisal cycle timelines match the performance review calendar is UAT. The software may have passed every unit, integration, and system test in the automation suite and still fail UAT — because the system was technically correct but did not match the reality of how the business operates.",
    why: "Requirements are written by humans, interpreted by developers, and reviewed by project managers — three levels of communication where meaning can drift significantly from the original business intent. UAT is where that drift is discovered and corrected before it becomes a production problem. Technical teams sometimes build exactly what the specification said but not what the business actually needed — because the specification itself was incomplete, ambiguous, or misunderstood. UAT catches these gaps when they are still fixable with configuration or code changes rather than costly post-production hotfixes. In regulated industries like banking, healthcare, or government, UAT sign-off is a legal and compliance requirement, not optional.",
    when: "UAT is mandatory before every production release without exception. In agile projects, a lightweight UAT review happens at the Sprint Review with product owners. Full formal UAT with sign-off happens before every major release to production. It is never skipped — if a go-live proceeds without UAT sign-off, the business must document that decision and accept the risk formally in writing.",
    advantages: [
      "Validates business requirements in real-world terms — not just technical specifications",
      "Performed by people who understand the actual business workflows and exceptions",
      "Catches requirement mismatches and specification gaps that technical testing misses entirely",
      "Builds genuine user confidence and buy-in before go-live",
      "Produces formal signed documentation for compliance, audit, and contractual purposes",
    ],
    limitations: [
      "Business users are not trained testers — they may miss edge cases or test inconsistently",
      "Time and schedule coordination with busy stakeholders is consistently challenging",
      "UAT environments need realistic data — hard to prepare without touching sensitive production data",
      "Feedback can be subjective or vague — requires a QA engineer to translate into actionable bug reports",
      "Running UAT on an unstable system wastes stakeholder time and damages confidence in the project",
    ],
    practical: {
      app: "HRMS — Leave policy compliance UAT",
      scenario: "UAT Tester: HR Director with 15 years of company HR experience.\nScenario tested: Over-limit leave request.\nThe HR Director tests applying 3 days of casual leave for an employee who has only 2 days remaining. She expects the system to reject this with a clear message showing the available balance. In UAT, the system approves the request without warning. All unit tests, integration tests, and system tests passed because test data always had sufficient leave balances — nobody tested the boundary condition with real business knowledge.",
      pass: "System now shows \"Insufficient casual leave balance. Available: 2 days, Requested: 3 days. Request rejected.\" HR Director signs UAT acceptance.",
      fail: "The system violates the company's HR policy by allowing negative leave balances. The HR Director marks this as a Blocker — the system cannot go live with this behaviour because it would cause payroll complications and policy non-compliance.",
    },
    tools: [
      {
        name: "Manual Testing",
        sub: "Primary UAT method",
        url: null,
        desc: "Manual testing in the context of UAT means real business users sitting with the application and testing it against their actual job responsibilities. There is no tool that replaces human business judgment in UAT — a payroll accountant knows immediately whether a tax calculation looks right in the context of their company, in a way no automated test can assess. The process is structured but not scripted line-by-line: UAT testers are given business scenarios, background context, and test data, and they work through the system the way they would on a normal working day. A UAT tester does not follow a step-by-step script saying \"click this button\" — they are told \"process the August payroll for department Engineering and confirm the output matches the pre-approved salary sheet.\" How they get there is their business expertise.",
        adv: [
          "Applies real business judgment automation structurally cannot replicate",
          "Scenarios are business-driven, surfacing exceptions a spec never anticipated",
          "Catches requirement drift and specification gaps before go-live",
          "Produces the formal, signed acceptance record required for sign-off",
        ],
        lim: [
          "Business users aren't trained testers — coverage can be inconsistent",
          "Scheduling time with busy stakeholders is a recurring bottleneck",
          "Feedback is often vague and needs a QA engineer to turn into an actionable bug",
          "Doesn't scale to frequent releases the way automated levels do",
        ],
        steps: [
          {
            t: "Step 1 — Define UAT entry criteria",
            p: "Confirm system tests pass, dedicated UAT environment is deployed, and realistic test data is loaded.",
            c: `Checklist:\n- System tests passed\n- Isolated UAT environment running\n- Realistic seed data loaded\n- Business users onboarded with role-based access`,
          },
          {
            t: "Step 2 — Write UAT scenarios in business language",
            p: "Write business tasks rather than technical test steps:",
            c: `UAT Scenario: Process Monthly Payroll — August 2025\n\nBusiness context:\nOur company has 47 employees across 5 departments.\nSalary sheet for August was approved by Finance Director on Aug 25.\n\nWhat to test:\n1. Log in as Payroll Manager\n2. Navigate to Payroll Processing\n3. Select August 2025 pay period\n4. Confirm all 47 active employees appear — note any missing\n5. Verify gross salaries match the approved salary sheet (compare 5 random employees)\n6. Process payroll and confirm the system accepts it\n7. Generate payslips and confirm they look correct and professional\n8. Mark as disbursed\n\nExpected outcome:\nAll employees processed correctly, payslips generated with correct tax breakdown,\ndisbursement status updated, employees can view their payslips.`,
          },
          {
            t: "Step 3 — Brief UAT testers",
            p: "Run a 30-minute orientation session on marking pass/fail, reporting bugs, and detailing observations.",
            c: `Briefing Agenda:\n1. Purpose of UAT cycle\n2. How to mark pass/fail\n3. How to capture clear bug observations with attachments`,
          },
          {
            t: "Step 4 — Execute UAT sessions",
            p: "Have business users execute scenarios with QA engineer observing and taking environment notes.",
            c: `// QA observes real business behaviour without biasing tester decisions.`,
          },
          {
            t: "Step 5 — Log all findings",
            p: "Classify findings into Blocker, Major, and Minor severity:",
            c: `- Blocker: System cannot go live (wrong calculation, data loss, crash)\n- Major: Significant business impact but workaround exists\n- Minor: Cosmetic or minor inconvenience`,
          },
          {
            t: "Step 6 — Fix, retest, and obtain formal sign-off",
            p: "Developers fix blockers, testers retest specific flows, and authorized stakeholders sign acceptance.",
            c: `Blocker fixes verified -> Stakeholder sign-off granted`,
          },
          {
            t: "Step 7 — Document UAT results",
            p: "Produce formal completion memo with scenario matrices, bug lists, and signature block.",
            c: `UAT Completion Report & Sign-off Memo generated for compliance and release archive.`,
          },
        ],
      },
      {
        name: "TestRail",
        sub: "Test case management",
        url: "https://testrail.com",
        desc: "TestRail is a web-based test case management tool made by Gurock (now part of Idera). For UAT specifically, TestRail lets you create test plans containing business scenarios, assign them to specific UAT testers, and collect structured pass/fail results with comments and attachments. Testers access TestRail through a browser, click each step, and mark it pass or fail — no technical knowledge required. Managers see real-time UAT progress dashboards showing how many scenarios are complete, how many passed, and how many have defects. TestRail's free plan supports small teams and is sufficient for most UAT projects. It integrates with Jira so bugs logged in TestRail automatically create Jira tickets.",
        adv: [
          "Structured scenario tracking that non-technical testers can execute unaided",
          "Real-time dashboards show UAT progress without chasing anyone for status",
          "Direct Jira integration turns a failed case into a bug ticket automatically",
          "Free tier is workable for a typical small UAT cycle",
        ],
        lim: [
          "Free tier caps users and projects — a constraint on larger UAT rounds",
          "Someone still has to author good business-language scenarios up front",
          "One more tool for already-busy stakeholders to get oriented in",
          "Limited value on its own without a bug tracker connected to it",
        ],
        steps: [
          {
            t: "Step 1 — Create a free TestRail account",
            p: "Sign up at testrail.com for free tier or hosted trial.",
            c: `// Access https://testrail.com`,
          },
          {
            t: "Step 2 — Create a Project",
            p: "Click 'Add Project' → Name it 'HRMS UAT — August 2025 Release'.",
            c: `Project: "HRMS UAT — August 2025 Release"`,
          },
          {
            t: "Step 3 — Create a Test Suite with UAT scenarios",
            p: "Add test cases written in plain business language with expected results.",
            c: `Suite: "Payroll Module UAT"\nSections: Salary verification, Tax calculation, Payslip disbursal`,
          },
          {
            t: "Step 4 — Create a Test Plan and assign to UAT testers",
            p: "Assign payroll scenarios to Payroll Manager and leave scenarios to HR Director.",
            c: `Test Plan: Assignees mapped per stakeholder role`,
          },
          {
            t: "Step 5 — Testers execute and record results",
            p: "Stakeholders log in and mark each case Pass, Fail, or Blocked with comments.",
            c: `Pass / Fail / Blocked status recording with screenshots.`,
          },
          {
            t: "Step 6 — Track progress and export report",
            p: "Monitor live completion dashboard and export PDF report for sign-off archives.",
            c: `Export UAT Sign-off PDF with live pass/fail percentage graphs.`,
          },
        ],
      },
      {
        name: "Jira",
        sub: "Bug & feedback tracking",
        url: "https://atlassian.com/software/jira",
        desc: "Jira is the most widely used issue tracking platform, made by Atlassian. During UAT, it serves as the bug and feedback repository — when a UAT tester finds a problem, a Jira ticket is created. The ticket captures: what was being tested, what was expected, what happened, and the severity. Developers pick up these tickets, fix the issues, and transition the ticket to 'Ready for Retest'. The UAT tester retests and closes the ticket or reopens it. Jira's free tier supports up to 10 users, making it accessible for small UAT teams. Its Kanban board gives a visual overview of all UAT findings and their current fix status.",
        adv: [
          "Industry-standard issue tracking most teams already know",
          "Kanban board gives a visual read on every open UAT finding at a glance",
          "Free tier covers up to 10 users, enough for most UAT teams",
          "Clear fix loop: open → fixed → ready for retest → closed",
        ],
        lim: [
          "Not a test case manager by itself — needs TestRail or similar alongside it",
          "10-user free cap can be limiting once stakeholders are added in",
          "Can get cluttered and noisy without disciplined ticket hygiene",
          "UAT-specific workflows and fields need to be configured, not default",
        ],
        steps: [
          {
            t: "Step 1 — Create a free Jira account",
            p: "Create project named 'HRMS UAT Bugs'.",
            c: `Project: "HRMS UAT Bugs" (Kanban)`,
          },
          {
            t: "Step 2 — Configure issue types",
            p: "Configure Bug, Task, and Feedback issue types with custom severity fields.",
            c: `Issue Types: Bug, Task, Feedback\nSeverities: Blocker, Major, Minor`,
          },
          {
            t: "Step 3 — UAT testers log bugs",
            p: "Structure detailed defect tickets:",
            c: `Summary: [UAT-Blocker] Leave request approves negative balance\nPriority: Blocker\nDescription: Expected reject toast on exceeding balance; actual: approved without validation\nAttachment: screenshot_negative_balance.png`,
          },
          {
            t: "Step 4 — Development team works the queue",
            p: "Developers fix defects and transition to 'Fixed — Ready for UAT Retest'.",
            c: `Status: In Progress -> Fixed — Ready for UAT Retest`,
          },
          {
            t: "Step 5 — UAT tester retests and closes",
            p: "Business tester validates fix on staging and closes ticket.",
            c: `Status: Closed (Verified by HR Director)`,
          },
          {
            t: "Step 6 — UAT sign-off",
            p: "Generate zero-blocker report and attach to formal sign-off document.",
            c: `Final Triage: 0 Blockers, 0 Majors open -> Ready for Production Release`,
          },
        ],
      },
    ],
  },
  {
    no: "05",
    title: "Manual Testing",
    category: "Execution Method",
    desc: "Manual testing is the practice of executing test cases by hand, without automation scripts — a person walks through the application clicking, typing, and observing exactly the way an end user would, then records whether the actual result matches the expected one.",
    why: "Not everything can or should be automated. A human notices when a layout looks visually off, when wording is confusing, when a workflow feels clunky, or when something behaves \"correctly\" on paper but wrong in spirit — none of which a scripted assertion catches. Manual testing is also where automation starts: before a flow is scripted, someone has to walk through it by hand to confirm what \"correct\" even looks like.",
    when: "Constantly, alongside automation rather than instead of it — for exploratory sessions, new features that don't have test scripts yet, one-off verification of a bug fix, and anything involving visual judgment or subjective UX quality. It's the default for early-stage features that change too fast for automation to be worth writing yet.",
    practical: {
      app: "HRMS — Multi-Step Employee Onboarding",
      scenario: "A new multi-step onboarding wizard is released. The automated tests verify all required inputs save to the database, but a manual tester immediately notices the modal cut off on smaller screens and ambiguous date formatting that confuses the HR team.",
      pass: "Tester verifies all form fields, layout responsiveness, and copy clarity across screen sizes before sign-off.",
      fail: "Unintuitive button placement causes form submission before review — caught by human observation.",
    },
    advantages: [
      "Catches visual, UX, and 'does this feel right' issues automation structurally can't judge",
      "No scripting investment needed — testing can start the moment a feature exists",
      "Flexible — a tester can deviate and explore the moment something looks suspicious",
      "Cheapest entry point for small teams or early-stage products",
    ],
    limitations: [
      "Slow and doesn't scale — the same regression suite takes minutes automated, hours by hand",
      "Inconsistent between testers and even between runs by the same tester",
      "Impractical to repeat frequently enough for continuous delivery",
      "Human error and fatigue lead to missed steps on long or repetitive test cases",
    ],
    tools: [
      {
        name: "Manual Testing",
        sub: "Methodology",
        url: null,
        desc: "There's no software here — the 'tool' is a structured way of working: a test case document (steps, expected result), the application itself, and a tester's judgment.",
        adv: [
          "Catches visual, UX, and 'does this feel right' issues automation structurally can't judge",
          "No scripting investment needed — testing can start the moment a feature exists",
          "Flexible — a tester can deviate and explore the moment something looks suspicious",
          "Cheapest entry point for small teams or early-stage products",
        ],
        lim: [
          "Slow and doesn't scale — the same regression suite takes minutes automated, hours by hand",
          "Inconsistent between testers and even between runs by the same tester",
          "Impractical to repeat frequently enough for continuous delivery",
          "Human error and fatigue lead to missed steps on long or repetitive test cases",
        ],
        steps: [
          {
            t: "Step 1 — Write the test case specification",
            p: "Document preconditions, numbered steps, test data, and expected results.",
            c: `Test Case ID: TC-MAN-01\nTitle: Verify Employee Onboarding Wizard Validation\nPreconditions: Logged in as HR Admin\nSteps:\n1. Navigate to /employees/new\n2. Leave 'Department' empty and click 'Next'\n3. Observe field validation\nExpected: 'Department is required' red error text appears below field`,
          },
          {
            t: "Step 2 — Set up test data and environment",
            p: "Ensure test environment has matching database state without dirty leftover records.",
            c: `Environment: Staging (v2.4.0-rc1)\nUser: hr_admin@hrms.internal / Role: HR_ADMIN\nSeed: Clean department table with 5 active departments`,
          },
          {
            t: "Step 3 — Execute steps exactly as written",
            p: "Follow each numbered action step without skipping or assuming state.",
            c: `1. Open Chrome DevTools (Console tab open for unhandled JS exceptions)\n2. Enter: First Name = "Aayush", Last Name = "Shrestha", Email = "aayush@hrms.internal"\n3. Leave 'Department' unselected and click 'Next Step'`,
          },
          {
            t: "Step 4 — Compare actual vs expected result",
            p: "Evaluate visual rendering, system response time, and exact wording.",
            c: `Expected: Red outline on Department dropdown with message "Department is required"\nActual: Red outline displayed, focus moved to dropdown, submission blocked`,
          },
          {
            t: "Step 5 — Record Pass/Fail with evidence",
            p: "Attach full-screen screenshot and console log if any discrepancy occurs.",
            c: `Result: PASS\nNotes: UI validation is instant, no console errors\nEvidence: screenshot_tc_man_01_pass.png`,
          },
          {
            t: "Step 6 — Log failures in bug tracker",
            p: "If actual != expected, file ticket with severity, priority, and exact reproduction steps.",
            c: `Bug ID: HRMS-1042\nSummary: Onboarding wizard modal overlaps navigation bar on 1366x768 resolution\nSeverity: Major / Priority: P2\nSteps to Reproduce: [1..4]`,
          },
          {
            t: "Step 7 — Re-execute after developer fix",
            p: "Verify fixed build on staging and close ticket after confirming no side regressions.",
            c: `Retest on Build 2.4.0-rc2: Modal stays within viewport, responsiveness confirmed.\nStatus: VERIFIED & CLOSED`,
          },
        ],
      },
    ],
  },
  {
    no: "06",
    title: "Automated Testing",
    category: "Execution Method",
    desc: "Automated testing is the practice of writing scripts that execute test steps and check results without a human clicking through them each time — the same suite can run in seconds, on every commit, forever, without getting tired or skipping a step.",
    why: "As an application grows, the number of things that could break grows with it. Manually re-checking everything before every release becomes physically impossible. Automated tests turn that impossible manual re-check into a suite that runs in minutes, catching regressions the moment they're introduced rather than days or weeks later.",
    when: "For anything that will be run more than a handful of times — regression suites, critical user paths, and anything gating a release. It's not a replacement for manual testing on new or fast-changing features, but the right investment for stable flows a team relies on not breaking.",
    practical: {
      app: "HRMS Regression Suite",
      scenario: "Before every release, a 40-scenario regression suite (login, employee CRUD, leave requests, payroll processing) runs automatically in CI. A developer's change to the date-picker component accidentally breaks the 'from date' field across every form that uses it.",
      pass: "All 40 scenarios green — the build is promoted to staging.",
      fail: "6 of 40 scenarios fail on the same from-date selector — CI blocks the merge before it ever reaches a human tester, and the pattern across failures immediately points at the shared component.",
    },
    advantages: [
      "Executes repetitive regression suites in seconds without human fatigue",
      "Continuous integration safety net catching breaking bugs on every pull request",
      "Enables true continuous deployment and faster release cadences",
      "Reusable test scripts scale seamlessly across environments and browsers",
    ],
    limitations: [
      "Higher upfront time and code investment to write and maintain test frameworks",
      "Blind to visual glitches, awkward workflows, and UX oddities unless specifically scripted",
      "Brittle against rapid UI changes if locators are not cleanly decoupled",
      "False sense of security if test assertions only check status codes rather than data integrity",
    ],
    tools: [
      {
        name: "Selenium",
        sub: "WebDriver",
        url: "https://selenium.dev",
        desc: "The longest-standing browser automation framework, with WebDriver support across every major browser and a massive existing ecosystem — see Chapter 3 for the full breakdown of its strengths and limitations at the system-test level; the same trade-offs apply here.",
        adv: [
          "Broadest browser and language support of any automation tool",
          "Selenium Grid parallelizes large regression suites across machines",
          "Deepest CI/CD and test-management tool integration in the industry",
          "Best fit for teams with existing Java/C#/Python Selenium investment",
        ],
        lim: [
          "No auto-waiting — flaky without disciplined explicit waits",
          "More verbose to write and maintain than Playwright or Cypress",
          "Slower feedback loop during local development than Cypress's live reload",
          "Debugging failures takes more manual digging without a built-in trace tool",
        ],
        steps: [
          {
            t: "Step 1 — Install Selenium and PyTest",
            p: "Install selenium bindings and webdriver-manager.",
            c: `pip install selenium webdriver-manager pytest`,
          },
          {
            t: "Step 2 — Set up headless Chrome driver",
            p: "Initialize ChromeOptions with headless flags and WebDriverWait.",
            c: `from selenium import webdriver\nfrom selenium.webdriver.chrome.service import Service\nfrom selenium.webdriver.chrome.options import Options\nfrom webdriver_manager.chrome import ChromeDriverManager\n\noptions = Options()\noptions.add_argument("--headless=new")\noptions.add_argument("--window-size=1920,1080")\ndriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)`,
          },
          {
            t: "Step 3 — Write regression test with explicit waits",
            p: "Automate user login and dashboard verification.",
            c: `from selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\ndef test_hrms_login_flow(driver):\n    driver.get("https://staging.hrms-app.com/login")\n    wait = WebDriverWait(driver, 10)\n    \n    wait.until(EC.visibility_of_element_located((By.NAME, "email"))).send_keys("admin@hrms.com")\n    driver.find_element(By.NAME, "password").send_keys("SecurePass123!")\n    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()\n    \n    header = wait.until(EC.visibility_of_element_located((By.TAG_NAME, "h1")))\n    assert "Dashboard" in header.text`,
          },
          {
            t: "Step 4 — Automate employee creation & assertion",
            p: "Fill employee form and assert presence in employee table.",
            c: `def test_create_employee(driver):\n    driver.get("https://staging.hrms-app.com/employees/new")\n    wait = WebDriverWait(driver, 10)\n    \n    wait.until(EC.visibility_of_element_located((By.NAME, "fullName"))).send_keys("Priya Sharma")\n    driver.find_element(By.NAME, "department").send_keys("Engineering")\n    driver.find_element(By.ID, "btn-save").click()\n    \n    toast = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "toast-success")))\n    assert "Employee created" in toast.text`,
          },
          {
            t: "Step 5 — Run headless suite in CI pipeline",
            p: "Execute parallelized test suite with pytest.",
            c: `pytest -v -n 4 --html=reports/regression-report.html`,
          },
        ],
      },
      {
        name: "Playwright",
        sub: "Modern Web Automation",
        url: "https://playwright.dev",
        desc: "Auto-waiting, multi-browser, single-API automation with the Trace Viewer for fast failure debugging — see Chapter 3 for full detail.",
        adv: [
          "Auto-waiting removes most flaky, timing-based failures",
          "One API for Chromium, Firefox, and WebKit",
          "Trace Viewer gives a step-by-step replay of any failed run",
          "Network interception mocks specific states without needing real backend data",
        ],
        lim: [
          "Smaller legacy tooling footprint than Selenium",
          "A real learning curve for teams migrating existing Selenium suites",
          "Modern-language-first — weaker fit for older tech stacks",
          "Traces add storage overhead on large CI runs",
        ],
        steps: [
          {
            t: "Step 1 — Install Playwright with browsers",
            p: "Initialize Playwright test suite.",
            c: `pip install pytest-playwright\nplaywright install --with-deps chromium firefox webkit`,
          },
          {
            t: "Step 2 — Write resilient test with auto-waiting locators",
            p: "Playwright automatically waits for elements to be actionable before clicking.",
            c: `from playwright.sync_api import Page, expect\n\ndef test_leave_application(page: Page):\n    page.goto("https://staging.hrms-app.com/login")\n    page.get_by_label("Email").fill("employee@hrms.com")\n    page.get_by_label("Password").fill("Password123!")\n    page.get_by_role("button", { name: "Sign In" }).click()\n    \n    # Navigate to Leave Module\n    page.get_by_role("link", { name: "Leaves" }).click()\n    page.get_by_role("button", { name: "Apply Leave" }).click()\n    \n    page.get_by_label("Leave Type").select_option("Sick Leave")\n    page.get_by_label("Days").fill("2")\n    page.get_by_role("button", { name: "Submit Request" }).click()\n    \n    expect(page.get_by_text("Leave request submitted successfully")).to_be_visible()`,
          },
          {
            t: "Step 3 — Run cross-browser tests simultaneously",
            p: "Execute against Chromium, Firefox, and WebKit in parallel.",
            c: `pytest --browser chromium --browser firefox --browser webkit`,
          },
          {
            t: "Step 4 — Record execution trace on test failure",
            p: "Capture screenshots, DOM snapshots, and network calls for debugging.",
            c: `pytest --tracing=retain-on-failure`,
          },
          {
            t: "Step 5 — Open interactive Trace Viewer",
            p: "Inspect exact time-travel replay of the failed test.",
            c: `playwright show-trace test-results/trace.zip`,
          },
        ],
      },
      {
        name: "Cypress",
        sub: "JavaScript / In-Browser",
        url: "https://cypress.io",
        desc: "A JavaScript-native testing tool that runs inside the browser itself rather than driving it remotely, which gives it unusually fast, reliable feedback and a live, time-traveling test runner UI that shows exactly what the app looked like at every step.",
        adv: [
          "Runs in-browser, giving very fast and reliable execution with automatic retry-ability",
          "Time-travel debugger shows a DOM snapshot at every command — excellent failure visibility",
          "Simple, readable API — a shallow learning curve for JavaScript developers",
          "Great local developer experience with live reload as tests are written",
        ],
        lim: [
          "JavaScript/TypeScript only — no first-class support for other languages",
          "Runs only in Chromium-family and Firefox browsers, no native WebKit/Safari support",
          "Each test is scoped to a single browser tab — can't easily test multi-tab or multi-origin flows without workarounds",
          "Less suited to true cross-browser regression coverage than Playwright",
        ],
        steps: [
          {
            t: "Step 1 — Install Cypress",
            p: "Install Cypress as a dev dependency in your JavaScript project.",
            c: `npm install cypress --save-dev`,
          },
          {
            t: "Step 2 — Open interactive Cypress test runner",
            p: "Scaffold folders and launch the Cypress desktop GUI.",
            c: `npx cypress open`,
          },
          {
            t: "Step 3 — Write your first E2E test spec",
            p: "Create cypress/e2e/payroll.cy.js with visit, get, click, and type commands.",
            c: `describe('HRMS Payroll Regression', () => {\n  beforeEach(() => {\n    cy.visit('/login');\n    cy.get('[data-test=email]').type('admin@hrms.com');\n    cy.get('[data-test=password]').type('SecurePass123!');\n    cy.get('[data-test=btn-login]').click();\n    cy.url().should('include', '/dashboard');\n  });\n\n  it('processes monthly payroll batch', () => {\n    cy.get('[data-test=nav-payroll]').click();\n    cy.get('[data-test=select-cycle]').select('August 2025');\n    cy.get('[data-test=btn-process]').click();\n    cy.get('.toast-success').should('be.visible').and('contain', 'Payroll completed for 47 employees');\n  });\n});`,
          },
          {
            t: "Step 4 — Leverage automatic retry-ability",
            p: "cy.get and .should() automatically retry until assertions pass or timeout.",
            c: `cy.get('.success-toast').should('be.visible');\ncy.get('[data-test=status-badge]').should('have.text', 'Approved');`,
          },
          {
            t: "Step 5 — Run headlessly in CI pipeline",
            p: "Execute tests in terminal with video and screenshot artifact generation.",
            c: `npx cypress run --browser chrome`,
          },
          {
            t: "Step 6 — Review time-travel debugger",
            p: "Click on any command in the test runner log to view the DOM snapshot at that exact microsecond.",
            c: `// Command Log hover exposes state before and after each DOM action\ncy.get('[data-test=from-date]').click(); // [SNAPSHOT: DOM before & after click]`,
          },
          {
            t: "Step 7 — Connect Cypress Cloud for analytics",
            p: "Record runs to detect flaky tests, parallelize execution, and view historical metrics.",
            c: `npx cypress run --record --key <your-cypress-cloud-project-key>`,
          },
        ],
      },
    ],
  },
  {
    no: "07",
    title: "Functional Testing",
    category: "Functional",
    desc: "Functional testing verifies that the application does what its requirements say it should do — given a specific input or action, does it produce the correct output or behavior, regardless of how the code is structured internally.",
    why: "Functional testing is the most direct check against \"does the software actually work.\" A login form technically rendering without crashing means nothing if it lets in the wrong password. Functional testing exists to answer the business question directly: for this input, is this the right output?",
    when: "Throughout development, on every feature as it's built, and continuously in regression. It's the backbone layer sitting between low-level unit tests and full end-to-end system tests — verifying business rules and workflows at the feature level.",
    practical: {
      app: "HRMS Leave Approval Rules",
      scenario: "A functional test verifies that a leave request exceeding the employee's remaining balance is rejected, while a request within balance is approved and correctly deducted.",
      pass: "Requesting 2 days with 5 remaining succeeds; requesting 6 days with 5 remaining is rejected with a clear balance message.",
      fail: "The system approves a 6-day request against a 5-day balance, letting the balance go negative — a business rule violation the functional test exists specifically to catch.",
    },
    advantages: [
      "Directly validates business logic and requirements from user perspective",
      "Ensures security gates (auth, permissions, validation) behave according to spec",
      "Bridges technical implementation and business acceptance criteria",
      "Can be automated across multiple layers (API, UI, component)",
    ],
    limitations: [
      "Does not check performance, load, security vulnerabilities, or infrastructure",
      "Requires clear and unambiguous requirements documentation to design test cases",
      "May miss internal edge cases if tests only focus on standard business paths",
      "Can become redundant if unit, integration, and UI functional tests test the exact same rule",
    ],
    tools: [
      {
        name: "Selenium",
        sub: "Feature Verification",
        url: "https://selenium.dev",
        desc: "Same tool, same core trade-offs, applied here to verify feature-level business rules through the UI rather than full end-to-end journeys.",
        adv: [
          "Broadest browser and language support of any automation tool",
          "Selenium Grid parallelizes large regression suites across machines",
          "Deepest CI/CD and test-management tool integration in the industry",
          "Best fit for teams with existing Java/C#/Python Selenium investment",
        ],
        lim: [
          "No auto-waiting — flaky without disciplined explicit waits",
          "More verbose to write and maintain than Playwright or Cypress",
          "Slower feedback loop during local development than Cypress's live reload",
          "Debugging failures takes more manual digging without a built-in trace tool",
        ],
        steps: [
          {
            t: "Step 1 — Define functional test specification",
            p: "Map business requirement rules to test methods.",
            c: `Requirement BR-401: Leave requests exceeding remaining balance must be rejected.`,
          },
          {
            t: "Step 2 — Implement business logic verification in Selenium",
            p: "Test boundary input (balance = 5, request = 6).",
            c: `def test_reject_over_balance_leave(driver):\n    driver.get("https://staging.hrms-app.com/leaves/apply")\n    driver.find_element(By.ID, "days-input").send_keys("6")\n    driver.find_element(By.ID, "submit-btn").click()\n    \n    error_msg = WebDriverWait(driver, 5).until(\n        EC.visibility_of_element_located((By.CLASS_NAME, "alert-error"))\n    )\n    assert "Requested days (6) exceeds available balance (5)" in error_msg.text`,
          },
          {
            t: "Step 3 — Test happy path boundary",
            p: "Verify valid submission (request = 2) succeeds and decrements displayed balance to 3.",
            c: `def test_approve_valid_leave(driver):\n    driver.get("https://staging.hrms-app.com/leaves/apply")\n    driver.find_element(By.ID, "days-input").send_keys("2")\n    driver.find_element(By.ID, "submit-btn").click()\n    \n    balance = WebDriverWait(driver, 5).until(\n        EC.visibility_of_element_located((By.ID, "remaining-balance"))\n    )\n    assert balance.text == "3"`,
          },
        ],
      },
      {
        name: "Cypress",
        sub: "Fast Feature Checks",
        url: "https://cypress.io",
        desc: "Its fast feedback loop and retry-ability make it a strong fit for feature-level functional checks that run constantly during development, not just at release time.",
        adv: [
          "Runs in-browser, giving very fast and reliable execution with automatic retry-ability",
          "Time-travel debugger shows a DOM snapshot at every command — excellent failure visibility",
          "Simple, readable API — a shallow learning curve for JavaScript developers",
          "Great local developer experience with live reload as tests are written",
        ],
        lim: [
          "JavaScript/TypeScript only — no first-class support for other languages",
          "Runs only in Chromium-family and Firefox browsers, no native WebKit/Safari support",
          "Each test is scoped to a single browser tab",
          "Less suited to true cross-browser regression coverage than Playwright",
        ],
        steps: [
          {
            t: "Step 1 — Create functional spec file",
            p: "Create cypress/e2e/leave-rules.cy.js.",
            c: `describe('Leave Policy Functional Tests', () => {\n  it('rejects leave when requested days exceed quota', () => {\n    cy.login('employee@hrms.com', 'Pass123!');\n    cy.visit('/leaves/new');\n    cy.get('[data-test=leave-days]').type('6');\n    cy.get('[data-test=btn-submit]').click();\n    cy.get('[data-test=validation-error]')\n      .should('be.visible')\n      .and('contain', 'Insufficient leave balance');\n  });\n});`,
          },
        ],
      },
      {
        name: "BugBug",
        sub: "No-Code / Low-Code Test Recorder",
        url: "https://bugbug.io",
        desc: "A no-code/low-code browser test recorder — testers click through the application once, BugBug records the actions as a reusable test, and it can be edited visually afterward without touching code. Built specifically to make functional testing accessible to QA testers who don't write code.",
        adv: [
          "No coding required — QA testers without dev skills can create real automated tests",
          "Recording is fast — a working test exists minutes after the manual walkthrough",
          "Visual editing makes maintaining tests approachable for non-engineers",
          "Built-in cloud scheduling and reporting without separate CI setup",
        ],
        lim: [
          "Less flexible than code-based tools for complex logic or conditional flows",
          "Free tier has limits on test runs and team size",
          "Recorded selectors can be brittle if the UI changes structurally",
          "Less control over test architecture than a hand-written Playwright/Cypress suite",
        ],
        steps: [
          {
            t: "Step 1 — Install BugBug extension & create account",
            p: "Install the free BugBug Chrome extension from Chrome Web Store.",
            c: `Chrome Extension: BugBug Test Recorder\nWebsite: https://bugbug.io (Free Tier: 50 cloud runs/month)`,
          },
          {
            t: "Step 2 — Record browser scenario visually",
            p: "Click 'Record' and perform the functional scenario in the browser normally.",
            c: `Action: Navigate to https://staging.hrms-app.com -> Click [Apply Leave] -> Type "2" into [Days] -> Click [Submit]`,
          },
          {
            t: "Step 3 — Inspect recorded step pipeline",
            p: "BugBug captures each click, input, and navigation as a clean human-readable step.",
            c: `Step 1: Go to URL https://staging.hrms-app.com/leaves\nStep 2: Click button "Apply Leave"\nStep 3: Type "2" in input #leave-days\nStep 4: Click button "Submit"`,
          },
          {
            t: "Step 4 — Add visual assertions",
            p: "Click on target element to create assertions like 'Text should contain' or 'Element visible'.",
            c: `Assertion: Element .toast-success text contains "Request Approved"`,
          },
          {
            t: "Step 5 — Save into functional test suite",
            p: "Group tests into logical suites: 'Leave Management', 'Employee Profiles', 'Payroll'.",
            c: `Suite: "HRMS Core Functional Suite" (12 recorded tests)`,
          },
          {
            t: "Step 6 — Run suite on-demand or cloud schedule",
            p: "Execute tests in BugBug cloud runner or trigger via webhook / GitHub Action.",
            c: `Trigger: Webhook POST on Staging Deploy -> BugBug Cloud executes 12 tests in parallel`,
          },
          {
            t: "Step 7 — Review visual step-by-step report",
            p: "View screenshot diffs and step timings to immediately identify failed rules.",
            c: `Report: 12 Passed, 0 Failed (Execution time: 42s)\nScreenshot evidence attached to each step`,
          },
        ],
      },
    ],
  },
  {
    no: "08",
    title: "Smoke Testing",
    category: "Functional",
    desc: "Smoke testing is a quick, shallow pass over the most critical functions of an application — login works, the homepage loads, core navigation responds — run immediately after a new build to answer one question: is this build stable enough to test further, or is it broken at the foundation?",
    why: "Running a full regression suite against a build that can't even log in wastes hours of testing effort on a build that was doomed from the start. Smoke testing is a cheap early filter — a handful of checks that take minutes, not hours, and catch catastrophic breakages before anyone invests real testing time.",
    when: "Immediately after every new build or deployment, before any deeper testing begins. It's typically the very first stage of CI/CD after a build succeeds — a fast gate that decides whether the pipeline proceeds to fuller test suites.",
    practical: {
      app: "HRMS Post-Deployment Check",
      scenario: "After every deploy to staging, a smoke suite checks: login succeeds, the dashboard loads, the employee list renders, and the payroll module opens.",
      pass: "All four checks pass in under 90 seconds — the pipeline proceeds to the full regression suite.",
      fail: "The dashboard fails to load due to a broken build artifact — the pipeline halts immediately, and the team is alerted before anyone wastes time running deeper tests against a build that was never going to work.",
    },
    advantages: [
      "Extremely fast — a broken build is caught in minutes, not after a full test cycle",
      "Cheap to write and maintain because the scope is deliberately narrow",
      "Prevents wasted effort running deeper suites against a fundamentally broken build",
      "Gives immediate, high-confidence signal right after every deployment",
    ],
    limitations: [
      "Shallow by design — it will not catch anything beyond the most critical paths",
      "A passing smoke test says nothing about edge cases or business logic correctness",
      "Needs discipline to keep small; scope creep turns it into a slow regression suite",
      "Still needs a human or a fuller suite behind it — smoke testing alone is never sufficient",
    ],
    tools: [
      {
        name: "Manual",
        sub: "Quick Checklist",
        url: null,
        desc: "For small teams or infrequent releases, a short manual checklist (log in, load the dashboard, open one core module) is often enough — speed and low setup cost matter more than automation here.",
        adv: [
          "Zero tool setup or maintenance required",
          "Can be performed immediately by any team member",
          "Takes less than 3 minutes for a 5-step checklist",
          "Immediately catches catastrophic white-screen or server crash issues",
        ],
        lim: [
          "Requires human availability after every deployment",
          "Cannot easily run in automated midnight CI/CD pipelines",
          "Subject to human oversight if done in a rush",
        ],
        steps: [
          {
            t: "Step 1 — Open deployment landing page",
            p: "Load https://staging.hrms-app.com and verify HTTP 200 and favicon / title render.",
            c: `Action: Open browser -> Navigate to URL -> Verify login page displays without console error`,
          },
          {
            t: "Step 2 — Execute sanity login",
            p: "Enter valid admin credentials and submit.",
            c: `User: smoke_admin@hrms.com / Pass: TestPass123! -> Click Login`,
          },
          {
            t: "Step 3 — Verify critical modules render",
            p: "Click through Dashboard, Employees, and Payroll tabs.",
            c: `Check: Dashboard widgets load -> Employee table displays records -> Payroll cycle selector opens`,
          },
          {
            t: "Step 4 — Decision gate",
            p: "If any step fails, abort testing and ping on-call developer. If all pass, green-light regression.",
            c: `Verdict: PASS (1 min 45s) -> Ready for QA Deep Testing`,
          },
        ],
      },
      {
        name: "Selenium",
        sub: "Automated Smoke Gate",
        url: "https://selenium.dev",
        desc: "For frequent builds, a small Selenium script automates the same handful of critical checks so smoke testing runs unattended on every deploy.",
        adv: [
          "Extremely fast — a broken build is caught in minutes, not after a full test cycle",
          "Cheap to write and maintain because the scope is deliberately narrow",
          "Prevents wasted effort running deeper suites against a fundamentally broken build",
          "Gives immediate, high-confidence signal right after every deployment",
        ],
        lim: [
          "Shallow by design — it will not catch anything beyond the most critical paths",
          "A passing smoke test says nothing about edge cases or business logic correctness",
          "Needs discipline to keep small; scope creep turns it into a slow regression suite",
          "Still needs a human or a fuller suite behind it — smoke testing alone is never sufficient",
        ],
        steps: [
          {
            t: "Step 1 — Identify critical smoke paths",
            p: "Limit scope to 5 critical endpoints: Login, Dashboard, Employee List, Leaves, Payroll.",
            c: `Critical Paths:\n1. GET /login -> Form visible\n2. POST /auth/login -> 200 OK + JWT\n3. GET /dashboard -> Metrics widget rendered\n4. GET /employees -> Table count > 0\n5. GET /payroll -> Active cycle visible`,
          },
          {
            t: "Step 2 — Write lightweight fast-failing Selenium script",
            p: "Set tight timeouts (e.g. 5 seconds) to fail fast on hung servers.",
            c: `from selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\nimport pytest\n\n@pytest.fixture\ndef driver():\n    options = webdriver.ChromeOptions()\n    options.add_argument("--headless=new")\n    driver = webdriver.Chrome(options=options)\n    driver.set_page_load_timeout(10)\n    yield driver\n    driver.quit()\n\ndef test_smoke_critical_pipeline(driver):\n    wait = WebDriverWait(driver, 5)\n    \n    # 1. Login\n    driver.get("https://staging.hrms-app.com/login")\n    driver.find_element(By.NAME, "email").send_keys("smoke_user@hrms.com")\n    driver.find_element(By.NAME, "password").send_keys("SmokePass123!")\n    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()\n    \n    # 2. Dashboard\n    wait.until(EC.visibility_of_element_located((By.ID, "dashboard-stats")))\n    \n    # 3. Employee list\n    driver.get("https://staging.hrms-app.com/employees")\n    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".employee-row")))\n    \n    # 4. Payroll\n    driver.get("https://staging.hrms-app.com/payroll")\n    wait.until(EC.visibility_of_element_located((By.ID, "payroll-period-select")))`,
          },
          {
            t: "Step 3 — Wire into CI/CD deployment pipeline",
            p: "Configure GitHub Actions / GitLab CI to run smoke tests immediately after deployment.",
            c: `smoke-test:\n  stage: post-deploy\n  script:\n    - pytest -m smoke --maxfail=1 --timeout=120\n  rules:\n    - if: $CI_COMMIT_BRANCH == "main"`,
          },
          {
            t: "Step 4 — Set fast fail & alert hook",
            p: "On failure, halt pipeline immediately and send Slack alert with logs.",
            c: `if pytest fails:\n  send_slack_alert("#build-failures", "🚨 Smoke test failed on Staging build! Aborting regression suite.")\n  exit 1`,
          },
          {
            t: "Step 5 — Maintain strict runtime budget",
            p: "Ensure total smoke suite execution time remains under 90 seconds.",
            c: `Benchmark: 4 tests executed in 38.4s -> PASS`,
          },
          {
            t: "Step 6 — Promote to full regression",
            p: "When smoke is green, automatically trigger deeper automated integration & regression suites.",
            c: `Status: SMOKE GREEN -> Triggering Full E2E & Regression Pipeline`,
          },
        ],
      },
    ],
  },
];


export function TestingTypesInteractiveManual() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToolTabs, setActiveToolTabs] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 1800);
  };

  const toggleSteps = (chapterIndex: number, toolIndex: number) => {
    const key = `${chapterIndex}-${toolIndex}`;
    setExpandedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalTools = TESTING_TYPES_CHAPTERS.reduce(
    (acc, ch) => acc + (ch.tools?.length || 0),
    0
  );

  const filteredChapters = TESTING_TYPES_CHAPTERS.filter((ch) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const matchesTitle = ch.title.toLowerCase().includes(q);
    const matchesDesc = ch.desc.toLowerCase().includes(q);
    const matchesWhy = ch.why.toLowerCase().includes(q);
    const matchesTools = ch.tools.some(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.sub.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
    );
    return matchesTitle || matchesDesc || matchesWhy || matchesTools;
  });

  return (
    <div
      className="min-h-screen text-[#e7eaf0] pb-24 selection:bg-[#e8a33d]/40 selection:text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 15% -10%, rgba(232, 163, 61, 0.08), transparent 65%), radial-gradient(900px 500px at 85% 30%, rgba(111, 168, 255, 0.05), transparent 60%), #0f1217",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Container */}
      <header className="max-w-[980px] mx-auto px-5 sm:px-8 pt-8 pb-6">
        {/* Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#262e3b]">
          <Link
            href="/manuals"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#262e3b] bg-[#171b23] text-[#8b95a8] hover:text-white hover:border-[#e8a33d] transition-all w-fit"
          >
            <ChevronLeft className="w-4 h-4 text-[#e8a33d]" />
            <span>Back to Manuals</span>
          </Link>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#5c667a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters, tools, or topics…"
              className="w-full pl-9 pr-4 py-2 bg-[#1c212a] border border-[#262e3b] rounded-xl text-xs text-[#e7eaf0] placeholder-[#5c667a] focus:outline-none focus:border-[#e8a33d] focus:ring-2 focus:ring-[#e8a33d]/20 transition-all font-sans"
            />
          </div>
        </div>

        {/* Eyebrow & Hero Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase text-[#e8a33d]">
            <span className="w-2 h-2 rounded-full bg-[#4fd68a] shadow-[0_0_0_4px_rgba(79,214,138,0.18)]" />
            <span>Software Testing Reference · Part 1: Testing by Level</span>
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Testing by Level
          </h1>

          <p className="text-sm sm:text-base text-[#8b95a8] max-w-3xl leading-relaxed">
            The four core testing levels carrying an application from a single function to a signed-off release — why each one matters, free industry tools, step-by-step implementation code, advantages &amp; limitations, and real-world scenarios.
          </p>
        </div>

        {/* Top Statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 border border-[#262e3b] rounded-xl bg-[#171b23] overflow-hidden font-mono text-xs shadow-md">
          <div className="p-3.5 sm:p-4 border-r border-b sm:border-b-0 border-[#262e3b]">
            <span className="block text-lg font-bold text-white mb-0.5">
              {String(TESTING_TYPES_CHAPTERS.length).padStart(2, "0")}
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Chapters
            </span>
          </div>

          <div className="p-3.5 sm:p-4 border-b sm:border-b-0 sm:border-r border-[#262e3b]">
            <span className="block text-lg font-bold text-white mb-0.5">
              {String(totalTools).padStart(2, "0")}
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Tools Covered
            </span>
          </div>

          <div className="p-3.5 sm:p-4 border-r border-[#262e3b]">
            <span className="block text-lg font-bold text-white mb-0.5">
              By Level
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Category
            </span>
          </div>

          <div className="p-3.5 sm:p-4">
            <span className="block text-lg font-bold text-[#4fd68a] mb-0.5">
              Free
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Tool Tier
            </span>
          </div>
        </div>

        {/* Quick Table of Contents Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-none">
          {TESTING_TYPES_CHAPTERS.map((ch) => (
            <a
              key={ch.no}
              href={`#chapter-${ch.no}`}
              className="whitespace-nowrap font-mono text-xs px-3 py-1.5 rounded-full bg-[#171b23] border border-[#262e3b] text-[#8b95a8] hover:text-white hover:border-[#e8a33d] hover:bg-[#e8a33d]/10 transition-all shrink-0"
            >
              {ch.no}. {ch.title}
            </a>
          ))}
        </div>
      </header>

      {/* Main Chapters Content */}
      <main className="max-w-[980px] mx-auto px-5 sm:px-8 space-y-12">
        {filteredChapters.map((ch, ci) => {
          const activeToolIndex = activeToolTabs[ci] || 0;
          const currentTool = ch.tools[activeToolIndex] || ch.tools[0];
          const stepsKey = `${ci}-${activeToolIndex}`;
          const isStepsOpen = Boolean(expandedSteps[stepsKey]);

          return (
            <section
              key={ch.no}
              id={`chapter-${ch.no}`}
              className="border border-[#262e3b] rounded-2xl bg-gradient-to-b from-[#171b23] via-[#171b23] to-[#13161c] shadow-2xl overflow-hidden scroll-mt-6"
            >
              {/* Chapter Header */}
              <div className="p-6 sm:p-8 border-b border-[#262e3b] space-y-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#12151b] bg-[#e8a33d] px-2.5 py-0.5 rounded-md">
                    CH {ch.no}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-[#8b95a8] border border-[#262e3b] px-2.5 py-0.5 rounded-md bg-black/20">
                    {ch.category}
                  </span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {ch.title}
                </h2>

                <p className="text-sm sm:text-[15px] text-[#8b95a8] leading-relaxed max-w-3xl">
                  {ch.desc}
                </p>
              </div>

              {/* Info Strip: Why it matters / When to use it */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#262e3b] divide-y md:divide-y-0 md:divide-x divide-[#262e3b] bg-black/10">
                <div className="p-6 sm:p-8 space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8a33d]" />
                    Why it matters
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                    {ch.why}
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8a33d]" />
                    When to use it in a project
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                    {ch.when}
                  </p>
                </div>
              </div>

              {/* Practical Example Block */}
              <div className="p-6 sm:p-8 border-b border-[#262e3b] bg-[#6fa8ff]/[0.03] space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#6fa8ff] flex items-center gap-2 font-bold">
                  <span className="w-1.5 h-1.5 rounded-sm bg-[#6fa8ff]" />
                  Practical Example
                </h3>

                <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                  <strong className="text-white font-semibold">{ch.practical.app}</strong> — {ch.practical.scenario}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl border border-[#262e3b] border-t-2 border-t-[#4fd68a] bg-black/30 space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#4fd68a]">
                      Pass Condition
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#e7eaf0] leading-relaxed">
                      {ch.practical.pass}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#262e3b] border-t-2 border-t-[#f0616d] bg-black/30 space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#f0616d]">
                      Fail Condition
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#e7eaf0] leading-relaxed">
                      {ch.practical.fail}
                    </p>
                  </div>
                </div>
              </div>

              {/* General Level Advantages & Limitations */}
              {ch.advantages && ch.limitations && (
                <div className="p-6 sm:p-8 border-b border-[#262e3b] bg-black/10 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8a33d]" />
                    {ch.title} — Advantages &amp; Limitations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#4fd68a] bg-black/25 p-4 space-y-2">
                      <span className="block font-mono text-xs uppercase tracking-wider font-bold text-[#4fd68a]">
                        ● Key Advantages
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#e7eaf0] pl-4 list-disc marker:text-[#4fd68a]/60">
                        {ch.advantages.map((adv, ai) => (
                          <li key={ai}>{adv}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#f0616d] bg-black/25 p-4 space-y-2">
                      <span className="block font-mono text-xs uppercase tracking-wider font-bold text-[#f0616d]">
                        ● Key Limitations
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#e7eaf0] pl-4 list-disc marker:text-[#f0616d]/60">
                        {ch.limitations.map((lim, li) => (
                          <li key={li}>{lim}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tool Switcher Section */}
              {ch.tools && ch.tools.length > 0 && (
                <div>
                  {/* Tool Tabs Bar matching screenshot */}
                  <div className="flex flex-wrap items-end gap-2 px-6 pt-4 pb-0 bg-[#12151b] border-b border-[#272e39]">
                    {ch.tools.map((tool, ti) => {
                      const isActive = ti === activeToolIndex;
                      return (
                        <button
                          key={tool.name + ti}
                          type="button"
                          onClick={() =>
                            setActiveToolTabs((prev) => ({
                              ...prev,
                              [ci]: ti,
                            }))
                          }
                          className={`font-mono text-xs sm:text-[13px] px-4 py-2 transition-all duration-150 relative cursor-pointer select-none flex items-center gap-2 ${
                            isActive
                              ? "bg-[#1c2129] text-white border-t border-x border-[#272e39] border-b border-b-[#1c2129] rounded-t-lg font-semibold z-10 -mb-[1px]"
                              : "bg-transparent text-[#8a93a6] border border-[#272e39] rounded-lg mb-1.5 hover:text-white hover:border-[#3b4554] hover:bg-white/[0.02]"
                          }`}
                        >
                          <span
                            className={`font-semibold text-[11px] font-mono ${
                              isActive ? "text-[#e8a33d]" : "text-[#5c6577]"
                            }`}
                          >
                            {String(ti + 1).padStart(2, "0")}
                          </span>
                          <span className={isActive ? "text-white font-semibold" : "text-[#8a93a6]"}>
                            {tool.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tool Body */}
                  <div className="p-6 sm:p-8 bg-[#1c2129] space-y-6">
                    {/* Tool Title & Docs Link */}
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h4 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white flex items-baseline gap-2">
                        <span>{currentTool.name}</span>
                        {currentTool.sub && (
                          <span className="text-sm font-normal text-[#5c667a]">
                            — {currentTool.sub}
                          </span>
                        )}
                      </h4>

                      {currentTool.url && (
                        <a
                          href={currentTool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[#6fa8ff] border-b border-dashed border-[#6fa8ff]/50 hover:border-solid hover:text-white transition-all inline-flex items-center gap-1"
                        >
                          <span>{currentTool.url.replace(/^https?:\/\//, "")}</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      )}
                    </div>

                    {/* Tool Description */}
                    <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed max-w-3xl">
                      {currentTool.desc}
                    </p>

                    {/* Advantages & Limitations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#4fd68a] bg-black/25 p-5 shadow-xs">
                        <div className="flex items-center gap-2 mb-3 text-[#4fd68a] font-mono text-xs uppercase tracking-wider font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4fd68a] inline-block" />
                          <span>Advantages</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-[13.5px] text-[#e7eaf0] leading-relaxed pl-4 list-disc marker:text-[#5c667a]">
                          {currentTool.adv.map((a, i) => (
                            <li key={i} className="pl-0.5">{a}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#f0616d] bg-black/25 p-5 shadow-xs">
                        <div className="flex items-center gap-2 mb-3 text-[#f0616d] font-mono text-xs uppercase tracking-wider font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f0616d] inline-block" />
                          <span>Limitations</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-[13.5px] text-[#e7eaf0] leading-relaxed pl-4 list-disc marker:text-[#5c667a]">
                          {currentTool.lim.map((l, i) => (
                            <li key={i} className="pl-0.5">{l}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step-by-Step Implementation Accordion */}
                    {currentTool.steps && currentTool.steps.length > 0 && (
                      <div className="rounded-xl border border-[#272e39] bg-black/20 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleSteps(ci, activeToolIndex)}
                          className="w-full px-5 py-3.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#e7eaf0] hover:bg-white/[0.03] transition-colors cursor-pointer select-none"
                        >
                          <span className="font-semibold tracking-widest">
                            How to use — step by step ({currentTool.steps.length} steps)
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-[#e8a33d] transition-transform duration-200 ${
                              isStepsOpen ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {isStepsOpen && (
                          <div className="px-5 pb-5 pt-2 border-t border-[#272e39] space-y-4">
                            {currentTool.steps.map((step, sIdx) => {
                              const copyKey = `${ci}-${activeToolIndex}-${sIdx}`;
                              return (
                                <div
                                  key={sIdx}
                                  className="pt-3.5 pb-2 border-b border-[#272e39]/60 last:border-b-0 space-y-2"
                                >
                                  <div className="flex items-baseline gap-2 text-sm font-semibold text-white">
                                    <span className="font-mono text-xs text-[#e8a33d] font-bold">
                                      {String(sIdx + 1).padStart(2, "0")}
                                    </span>
                                    <span>{step.t}</span>
                                  </div>

                                  {step.p && (
                                    <p className="text-xs sm:text-[13px] text-[#8b95a8] leading-relaxed">
                                      {step.p}
                                    </p>
                                  )}

                                  {step.c && (
                                    <div className="relative group/code mt-2">
                                      <button
                                        type="button"
                                        onClick={() => handleCopy(step.c!, copyKey)}
                                        className="absolute right-2.5 top-2.5 px-2 py-1 rounded bg-[#171b23] border border-[#272e39] text-[#8b95a8] hover:text-white hover:border-[#e8a33d] font-mono text-[10px] flex items-center gap-1 opacity-80 group-hover/code:opacity-100 transition-all cursor-pointer"
                                        title="Copy code"
                                      >
                                        {copiedKey === copyKey ? (
                                          <>
                                            <Check className="w-3 h-3 text-[#4fd68a]" />
                                            <span className="text-[#4fd68a]">Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                      <pre className="p-3.5 sm:p-4 rounded-lg bg-[#12151b] border border-[#272e39] overflow-x-auto text-xs font-mono text-[#caecd7] leading-relaxed">
                                        <code>{step.c}</code>
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="max-w-[980px] mx-auto px-5 sm:px-8 mt-16 pt-8 border-t border-[#262e3b] text-center font-mono text-xs text-[#5c667a] space-y-2">
        <p>Part 1: Testing by Level — Complete software testing reference with 4 chapters &amp; 10 tools.</p>
        <p className="text-[11px] text-[#5c667a]/80">Modular Architecture Ready — Part 2 &amp; future chapters can be appended seamlessly.</p>
      </footer>
    </div>
  );
}
