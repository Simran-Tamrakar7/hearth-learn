/** Chapter body for /manuals/selenium. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "selenium",
  "title": "Selenium WebDriver",
  "tagline": "WebDriver → waits → POM → Grid awareness → CI → migrate-or-stay decision.",
  "category": "automation",
  "accent": "#0B3D2E",
  "cover": "covers/selenium-cover.png",
  "duration": "10–12 weeks (part-time)",
  "levelSpan": "Beginner → Job-ready",
  "who": "Engineers joining teams that run Selenium / WebDriver — or anyone who needs enterprise WebDriver fluency.",
  "outcomes": [
    "Drive browsers with WebDriver using explicit waits and clean lifecycle",
    "Build Page Object Model suites with a standard test runner",
    "Explain Grid, CI integration, and when to stay on Selenium vs migrate"
  ],
  "pace": {
    "hoursPerDay": "1.5–2 hours/day (≈ 10–12 hrs/week)",
    "recommended": "~10–12 weeks",
    "accelerated": "~7–8 weeks at 3 hrs/day",
    "slow": "~14–16 weeks if busy"
  },
  "chapters": [
    {
      "id": "se-how",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this roadmap",
      "minutes": 25,
      "overview": "Selenium is still everywhere in enterprise. This path teaches WebDriver done right — not the flaky scripts that give Selenium a bad name. Java or Python bindings; pick one and commit.",
      "learn": [
        "10–12 week pacing",
        "Language choice",
        "Job-ready Selenium portfolio"
      ],
      "steps": [
        {
          "title": "Pick a language binding",
          "body": "Java + TestNG/JUnit is common in enterprise. Python + pytest is faster to learn. Pick one for the whole path.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Choose Java or Python. Document in README. Install JDK 17+ or Python 3.11+.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Study pace",
          "body": "1.5–2 hours daily. Selenium rewards patience with waits and POM — rushing creates flakes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create selenium-journey repo. Block calendar slots.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: ~10–12 weeks",
            "Accelerated: ~7–8 weeks",
            "Slow: ~14–16 weeks"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice site",
          "body": "the-internet.herokuapp.com and Sauce Demo work with any binding. Use one primary site.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Manual explore 5 pages on the-internet.herokuapp.com. Note dynamic elements.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Language chosen",
        "Repo created",
        "JDK or Python installed"
      ],
      "practice": {
        "title": "Day zero",
        "brief": "README with language choice, goal, timeline, first commit."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium Documentation",
          "url": "https://www.selenium.dev/documentation/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "The Internet (Herokuapp)",
          "url": "https://the-internet.herokuapp.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Selenium is still everywhere in enterprise. This path teaches WebDriver done right — not the flaky scripts that give Selenium a bad name. Java or Python bindings; pick one and commit.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-basics",
      "phase": "A · WebDriver Core",
      "level": "beginner",
      "title": "WebDriver mental model & first script",
      "minutes": 55,
      "durationLabel": "Week 1",
      "overview": "Driver talks to browser via W3C WebDriver protocol. Sessions, findElement, click, sendKeys. Always quit driver in finally hook.",
      "learn": [
        "Driver lifecycle",
        "By locators",
        "First navigation and assert"
      ],
      "steps": [
        {
          "title": "Hello WebDriver",
          "body": "Selenium Manager auto-downloads drivers (Selenium 4.6+). Start Chrome, open page, assert title, quit.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Script: open the-internet.herokuapp.com, assert title contains \"Internet\", quit in finally.",
          "tip": null,
          "code": "# Python\nfrom selenium import webdriver\nfrom selenium.webdriver.common.by import By\n\ndriver = webdriver.Chrome()\ntry:\n    driver.get(\"https://the-internet.herokuapp.com/\")\n    assert \"Internet\" in driver.title\nfinally:\n    driver.quit()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Locator strategies",
          "body": "By.ID, By.NAME, By.CSS_SELECTOR, By.XPATH (last resort). Prefer stable IDs and CSS.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Navigate to /login. Find username field by ID. Submit form.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Clean lifecycle",
          "body": "driver.quit() closes browser and session. driver.close() closes tab only. Use quit always.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Wrap driver in try/finally or pytest fixture with yield teardown.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Hello script runs",
        "Login form automated",
        "driver.quit() always called"
      ],
      "practice": {
        "title": "Form submit",
        "brief": "the-internet.herokuapp.com/login — valid and invalid credentials."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium — Getting Started",
          "url": "https://www.selenium.dev/documentation/webdriver/getting_started/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Selenium Manager",
          "url": "https://www.selenium.dev/documentation/selenium_manager/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Driver talks to browser via W3C WebDriver protocol. Sessions, findElement, click, sendKeys. Always quit driver in finally hook.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-waits",
      "phase": "A · WebDriver Core",
      "level": "beginner",
      "title": "Explicit waits — never Thread.sleep",
      "minutes": 60,
      "durationLabel": "Week 1–2",
      "overview": "Flaky Selenium is almost always wrong waits. WebDriverWait + ExpectedConditions beat sleep every time.",
      "learn": [
        "Implicit vs explicit waits",
        "ExpectedConditions",
        "Custom wait conditions",
        "FluentWait"
      ],
      "steps": [
        {
          "title": "Ban Thread.sleep",
          "body": "sleep(3) hides races. Under CI load, races become flakes. Zero tolerance.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Search codebase for sleep/Thread.sleep/time.sleep. Replace all.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Explicit wait pattern",
          "body": "WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, \"btn\"))).click()",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "the-internet.herokuapp.com/dynamic_loading/ — wait for Hello World visible after Start button.",
          "tip": null,
          "code": "from selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\nwait = WebDriverWait(driver, 10)\nbtn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, \"#start button\")))\nbtn.click()\nwait.until(EC.visibility_of_element_located((By.ID, \"finish\")))",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Expected conditions catalog",
          "body": "visibility_of, element_to_be_clickable, text_to_be_present_in_element, invisibility_of_element_located.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Use 4 different EC types across 4 tests. Document favorites in WAITS.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Avoid implicit wait mixing",
          "body": "Do not mix implicit and explicit waits — unpredictable timeouts. Pick explicit only.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ensure driver.implicitly_wait is NOT set (or set to 0).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Zero sleep in suite",
        "Dynamic loading test passes",
        "WAITS.md started"
      ],
      "practice": {
        "title": "Ajax wait",
        "brief": "Wait for element after AJAX on dynamic_controls — checkbox enabled."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium — Waiting Strategies",
          "url": "https://www.selenium.dev/documentation/webdriver/waits/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Flaky Selenium is almost always wrong waits. WebDriverWait + ExpectedConditions beat sleep every time.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-locators",
      "phase": "B · Stability",
      "level": "intermediate",
      "title": "Locators & stability patterns",
      "minutes": 55,
      "durationLabel": "Week 2–3",
      "overview": "Stable locators and stable tests. Page Factory optional — clarity over magic. data-testid agreements with dev.",
      "learn": [
        "Locator priority",
        "Stale element handling",
        "Iframe and window switches"
      ],
      "steps": [
        {
          "title": "Locator priority doc",
          "body": "ID → data-testid → CSS → XPath last. Document in SELECTORS.md.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Refactor 3 XPath locators to CSS or ID on the-internet pages.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "StaleElementReferenceException",
          "body": "DOM refreshed after AJAX — re-find element instead of reusing reference.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Reproduce on dynamic content page. Fix by re-locating inside wait.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Frames and windows",
          "body": "driver.switch_to.frame() and switch_to.window(). Always switch back to default_content.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Automate iframe page and multi-window link. Assert in correct context.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Dropdowns and alerts",
          "body": "Select class for dropdowns. Alert accept/dismiss. File upload send_keys to input[type=file].",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Cover dropdown, JavaScript alert, and file upload pages.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SELECTORS.md committed",
        "Iframe test passes",
        "No stale element flakes in 5 runs"
      ],
      "practice": {
        "title": "Locator audit",
        "brief": "List every locator in suite. Flag brittle ones. Fix top 3."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium — Locators",
          "url": "https://www.selenium.dev/documentation/webdriver/elements/locators/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Stable locators and stable tests. Page Factory optional — clarity over magic. data-testid agreements with dev.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-pom",
      "phase": "B · Stability",
      "level": "intermediate",
      "title": "Page Object Model",
      "minutes": 65,
      "durationLabel": "Week 3–5",
      "overview": "POM keeps Selenium suites maintainable. Encapsulate locators and intent methods — tests read like scenarios.",
      "learn": [
        "Page class structure",
        "BasePage patterns (minimal)",
        "Test layer thin"
      ],
      "steps": [
        {
          "title": "LoginPage class",
          "body": "Private locators, public methods: open(), login(user, pass), getErrorMessage().",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Extract login from script into pages/LoginPage. Test calls loginPage.login(\"tomsmith\", \"SuperSecretPassword!\").",
          "tip": null,
          "code": "class LoginPage:\n    def __init__(self, driver):\n        self.driver = driver\n        self.username = (By.ID, \"username\")\n        self.password = (By.ID, \"password\")\n        self.submit = (By.CSS_SELECTOR, \"button[type='submit']\")\n    def login(self, user, pwd):\n        self.driver.find_element(*self.username).send_keys(user)\n        self.driver.find_element(*self.password).send_keys(pwd)\n        self.driver.find_element(*self.submit).click()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Secure Area flow",
          "body": "LoginPage + SecureAreaPage. Assert flash message after login.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Two-page flow with POM. Two tests using same LoginPage.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Base driver fixture",
          "body": "pytest fixture or @BeforeEach starts driver, yields, quits. DRY without hiding failures.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "conftest.py with driver fixture. All tests use it.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "ARCHITECTURE.md",
          "body": "pages/, tests/, conftest.py, config — document for onboarding.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write ARCHITECTURE.md with folder tree and naming rules.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "LoginPage + second page class",
        "driver fixture",
        "ARCHITECTURE.md"
      ],
      "practice": {
        "title": "Sauce Demo POM",
        "brief": "Optional: port login + inventory to Sauce Demo with POM."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium — Page Object Model",
          "url": "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "Sauce Demo",
          "url": "https://www.saucedemo.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "POM keeps Selenium suites maintainable. Encapsulate locators and intent methods — tests read like scenarios.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Stability",
      "level": "intermediate",
      "title": "Checkpoint A — Stable POM suite",
      "minutes": 30,
      "durationLabel": "Gate",
      "overview": "Prove WebDriver + waits + POM before runner and Grid chapters.",
      "learn": [
        "POM checkpoint criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run suite 3 times — all green.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "8+ tests using POM",
            "Zero Thread.sleep / time.sleep",
            "Explicit waits on all dynamic elements",
            "driver.quit() via fixture",
            "ARCHITECTURE.md and SELECTORS.md",
            "README with run instructions"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 criteria met",
        "3 consecutive green runs"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "pytest — Getting Started",
          "url": "https://docs.pytest.org/en/stable/getting-started.html",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Prove WebDriver + waits + POM before runner and Grid chapters.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-runner",
      "phase": "C · Test Infrastructure",
      "level": "intermediate",
      "title": "Test runners — pytest, TestNG, or JUnit",
      "minutes": 55,
      "durationLabel": "Week 5–6",
      "overview": "Raw scripts do not scale. Test runners give discovery, reporting, markers, and parallel hooks.",
      "learn": [
        "Test discovery",
        "Markers / groups",
        "HTML reports",
        "Parametrize data-driven tests"
      ],
      "steps": [
        {
          "title": "pytest or TestNG setup",
          "body": "pytest: tests/test_*.py, assert keywords. TestNG: @Test annotations, testng.xml suite.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Organize tests under tests/. Run full suite with one command.",
          "tip": null,
          "code": "# pytest.ini\n[pytest]\nmarkers =\n    smoke: quick checks\n    regression: full suite",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Markers / groups",
          "body": "Smoke vs regression — run smoke in CI fast path, full nightly.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Mark 3 tests @pytest.mark.smoke. Run pytest -m smoke.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Parametrize",
          "body": "One test function, multiple data rows — invalid users, boundary inputs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Parametrize login with 3 invalid credential tuples.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "HTML report",
          "body": "pytest-html or Allure or ExtentReports (Java). Attach to CI artifacts.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Generate HTML report locally. Include screenshot on failure if plugin supports.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Single command runs suite",
        "Smoke marker works",
        "HTML report generated"
      ],
      "practice": {
        "title": "Data-driven login",
        "brief": "5 credential rows, 5 outcomes (pass/fail messages)."
      },
      "resources": [
        {
          "type": "doc",
          "name": "pytest — Markers",
          "url": "https://docs.pytest.org/en/stable/how-to/mark.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "TestNG Documentation",
          "url": "https://testng.org/doc/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Raw scripts do not scale. Test runners give discovery, reporting, markers, and parallel hooks.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-grid",
      "phase": "C · Test Infrastructure",
      "level": "intermediate",
      "title": "Selenium Grid awareness",
      "minutes": 50,
      "durationLabel": "Week 6–7",
      "overview": "Grid runs browsers on remote nodes — parallel cross-browser at scale. You may not run Grid locally, but enterprise interviews expect awareness.",
      "learn": [
        "Hub and Node model",
        "RemoteWebDriver",
        "Docker Grid quickstart",
        "Cloud grids (BrowserStack, Sauce Labs)"
      ],
      "steps": [
        {
          "title": "Grid architecture",
          "body": "Hub routes commands. Nodes run browsers. Client uses RemoteWebDriver pointing at hub URL.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Draw hub-node diagram in GRID-NOTES.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Docker Selenium Grid",
          "body": "selenium/standalone-chrome or docker-compose with hub + nodes — local Grid in minutes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run standalone-chrome container. Connect RemoteWebDriver to localhost:4444. Run one test.",
          "tip": null,
          "code": "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=\"2g\" selenium/standalone-chrome:latest\n# Python RemoteWebDriver\nfrom selenium.webdriver import Remote\n driver = Remote(command_executor=\"http://localhost:4444\", options=options)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Cloud providers",
          "body": "BrowserStack, Sauce Labs, LambdaTest — capabilities object sets browser/OS. Know for resume/interview.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read one provider docs page. List capability keys for Chrome on Windows.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When Grid vs local",
          "body": "Local for dev. Grid/cloud for CI parallel cross-browser. Document strategy in README.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 1 paragraph: when your project would use Grid.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "GRID-NOTES.md with diagram",
        "One RemoteWebDriver test OR documented cloud plan"
      ],
      "practice": {
        "title": "Parallel concept",
        "brief": "Explain how 4 nodes cut 40 tests from 40 min to ~10 min."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium Grid",
          "url": "https://www.selenium.dev/documentation/grid/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Docker Selenium",
          "url": "https://github.com/SeleniumHQ/docker-selenium",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Grid runs browsers on remote nodes — parallel cross-browser at scale. You may not run Grid locally, but enterprise interviews expect awareness.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-ci",
      "phase": "D · Delivery",
      "level": "intermediate",
      "title": "Selenium in CI",
      "minutes": 60,
      "durationLabel": "Week 7–8",
      "overview": "Headless Chrome in GitHub Actions. Cache dependencies, upload screenshots on failure, smoke on PR, full suite nightly.",
      "learn": [
        "Headless Chrome in CI",
        "Artifact upload",
        "Service containers",
        "Retry strategy"
      ],
      "steps": [
        {
          "title": "GitHub Actions workflow",
          "body": "setup-java or setup-python, install browsers, run pytest/testng, upload reports.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Green workflow on push. Headless Chrome.",
          "tip": null,
          "code": "name: Selenium Tests\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n      - run: pip install -r requirements.txt\n      - run: pytest -m smoke --headless\n      - uses: actions/upload-artifact@v4\n        if: failure()\n        with:\n          name: selenium-screenshots\n          path: screenshots/",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Screenshot on failure",
          "body": "Hook pytest runtest_makereport or TestNG listener to capture driver screenshot on fail.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Trigger failure in CI. Confirm screenshot artifact downloadable.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Smoke on PR, full nightly",
          "body": "PR: 5 min smoke. schedule: cron full regression. Standard enterprise pattern.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add workflow_dispatch or cron job stub for nightly. Document in CI.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "CI green on smoke",
        "Screenshot on failure",
        "CI.md documents PR vs nightly"
      ],
      "practice": {
        "title": "Fix CI flake",
        "brief": "If CI fails but local passes, fix wait or headless viewport — document in FLAKES.md."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Actions — Workflow Syntax",
          "url": "https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Selenium — Chrome Options Headless",
          "url": "https://www.selenium.dev/documentation/chrome-browser/chrome-options/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Headless Chrome in GitHub Actions. Cache dependencies, upload screenshots on failure, smoke on PR, full suite nightly.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-migrate",
      "phase": "D · Delivery",
      "level": "advanced",
      "title": "Stay, coexist, or migrate",
      "minutes": 55,
      "durationLabel": "Week 8–9",
      "overview": "Enterprise reality: Selenium is not wrong. Decide with flake data, speed, hiring, and cost — not Twitter hype.",
      "learn": [
        "Migration criteria",
        "Hybrid coexistence",
        "Playwright/Cypress comparison",
        "Decision memo"
      ],
      "steps": [
        {
          "title": "Honest comparison",
          "body": "Selenium: language flexibility, Grid maturity, huge legacy. Playwright/Cypress: auto-wait, tracing, faster authoring. Tradeoffs, not winners.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Comparison table in MIGRATION.md: 6 dimensions (speed, flakes, hiring, CI cost, learning curve, legacy).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Migration criteria",
          "body": "Migrate when: flake rate unsustainable, CI time blocks team, hiring cannot find Selenium skill, no ROI on Grid maintenance.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write criteria list — 5 triggers to migrate, 5 reasons to stay.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Hybrid pattern",
          "body": "New flows in Playwright, legacy Selenium until ROI proves rewrite. API layer shared.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch hybrid architecture diagram for a fictional 500-test Selenium shop.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Pilot one flow",
          "body": "Port one stable flow to Playwright or Cypress. Compare CI time, flake rate, lines of code.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Port login + inventory OR document pilot plan if time-boxed.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "MIGRATION.md with table",
        "Pilot done or planned",
        "I can defend stay vs migrate in interview"
      ],
      "practice": {
        "title": "Decision memo",
        "brief": "One-page memo to CTO: recommend stay/hybrid/migrate with evidence."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright — Selenium migration guide",
          "url": "https://playwright.dev/docs/selenium-grid",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Cypress — Comparison blog",
          "url": "https://www.cypress.io/blog",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Enterprise reality: Selenium is not wrong. Decide with flake data, speed, hiring, and cost — not Twitter hype.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-standards",
      "phase": "E · Team Craft",
      "level": "advanced",
      "title": "Team standards & flake governance",
      "minutes": 50,
      "durationLabel": "Week 9–10",
      "overview": "Senior Selenium work is standards that outlive you: wait policy, POM rules, PR checklist, flake registry.",
      "learn": [
        "SELENIUM-STANDARD.md",
        "PR template",
        "Flake ownership",
        "Code review for tests"
      ],
      "steps": [
        {
          "title": "Selenium standard doc",
          "body": "No sleep, explicit waits only, POM required, locator priority, screenshot on fail, naming conventions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write SELENIUM-STANDARD.md. Apply in one cleanup PR.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "PR checklist",
          "body": "New tests: POM, no sleep, isolated data, smoke marker if critical path.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add pull_request_template.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Flake registry",
          "body": "FLAKES.md with date, test, cause, fix, owner. Monthly review.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document one flake (real or simulated) with root cause analysis.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SELENIUM-STANDARD.md",
        "PR template",
        "FLAKES.md with entry"
      ],
      "practice": {
        "title": "Standards PR",
        "brief": "Refactor one spec to meet standard. Self-review against checklist."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium — Encouraged Practices",
          "url": "https://www.selenium.dev/documentation/test_practices/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Senior Selenium work is standards that outlive you: wait policy, POM rules, PR checklist, flake registry.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "se-checkpoint-b",
      "kind": "checkpoint",
      "phase": "E · Team Craft",
      "level": "advanced",
      "title": "Checkpoint B — Job-ready Selenium portfolio",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Final gate: POM suite, CI, Grid awareness, migration judgment, standards.",
      "learn": [
        "Selenium portfolio criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Demo repo in under 5 minutes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "POM suite 12+ tests on practice site(s)",
            "pytest/TestNG markers (smoke + regression)",
            "GitHub Actions green with failure screenshots",
            "GRID-NOTES.md + RemoteWebDriver OR cloud plan",
            "MIGRATION.md with honest comparison",
            "SELENIUM-STANDARD.md + FLAKES.md"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 criteria met",
        "INTERVIEW.md with Selenium Q&A"
      ],
      "practice": {
        "title": "Interview rehearsal",
        "brief": "Explain explicit wait vs implicit. When migrate off Selenium. Demo CI."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Selenium Documentation",
          "url": "https://www.selenium.dev/documentation/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Final gate: POM suite, CI, Grid awareness, migration judgment, standards.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    }
  ]
};
