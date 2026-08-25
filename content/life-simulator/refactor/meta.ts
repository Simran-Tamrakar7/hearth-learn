export const meta = {
  id: "refactor",
  title: "Code Architecture Refactor",
  description: "Compare a messy snippet with a cleaner pattern.",
  icon: "code",
};

export const refactorExamples: Record<string, { legacy: string; clean: string; benefit: string }> = {
  "Page Object Model": {
    legacy: `// Messy Legacy Test: Hardcoded selectors everywhere\ntest('login', async ({ page }) => {\n  await page.goto('https://app.com/login');\n  await page.fill('#usr-12', 'admin');\n  await page.fill('#pwd-99', 'secret');\n  await page.click('button.btn-primary-33');\n});`,
    clean: `// Clean POM Architecture\nexport class LoginPage {\n  constructor(private page: Page) {}\n  async login(user: string, pass: string) {\n    await this.page.goto('/login');\n    await this.page.getByLabel('Username').fill(user);\n    await this.page.getByLabel('Password').fill(pass);\n    await this.page.getByRole('button', { name: 'Sign in' }).click();\n  }\n}`,
    benefit: "90% reduction in selector maintenance cost when UI elements change.",
  },
  "Circuit Breaker Pattern": {
    legacy: `// Legacy API Call: Infinite retry loop blocking thread\nasync function getData() {\n  while(true) {\n    try { return await fetch('/api/data'); }\n    catch(e) { /* wait 1s */ }\n  }\n}`,
    clean: `// Clean Circuit Breaker Pattern\nconst breaker = new CircuitBreaker(fetchData, {\n  timeout: 3000,\n  errorThresholdPercentage: 50,\n  resetTimeout: 10000\n});\nbreaker.fallback(() => getCachedData());`,
    benefit: "Prevents cascading failures and protects database connection pools under load.",
  },
  "Dependency Injection": {
    legacy: `// Tight Coupling\nclass UserService {\n  private db = new PostgresDatabase('localhost:5432');\n}`,
    clean: `// Loose Coupling via DI\nclass UserService {\n  constructor(private db: DatabaseProvider) {}\n}`,
    benefit: "Enables instant unit testing with mock databases without touching production network.",
  },
};
