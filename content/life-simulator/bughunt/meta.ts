export const meta = {
  id: "bughunt",
  title: "QA Bug-Hunting Sandbox",
  description: "Find planted bugs in a mock UI and collect Playwright assertions.",
  icon: "bug",
};

export const bugsList = [
  {
    id: "b1",
    title: "Unescaped SQL Parameter in Search Input",
    type: "Security Vulnerability",
    code: "SELECT * FROM users WHERE name = '" + "admin' OR '1'='1" + "'",
    fix: "await page.fill('#search', 'admin'); expect(page.locator('.user-card')).toHaveCount(1);",
  },
  {
    id: "b2",
    title: "Non-functional Disabled Checkout Button",
    type: "UI / UX Bug",
    code: "<button disabled onclick='submitOrder()'>Submit</button>",
    fix: "await expect(page.locator('#checkout-btn')).toBeDisabled();",
  },
  {
    id: "b3",
    title: "Missing Accessibility Role on Icon Button",
    type: "A11y Flaw",
    code: "<div onclick='closeModal()'><svg></svg></div>",
    fix: "await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();",
  },
  {
    id: "b4",
    title: "Z-Index Overlay Blocking Inputs",
    type: "Layout Flaw",
    code: "style='position: absolute; z-index: 9999; pointer-events: auto;'",
    fix: "await page.locator('#overlay').evaluate(el => el.style.pointerEvents = 'none');",
  },
  {
    id: "b5",
    title: "Unhandled Promise Rejection on Payment API",
    type: "Backend Async Bug",
    code: "fetch('/api/pay').then(res => res.json()); // Missing .catch()",
    fix: "await page.route('**/api/pay', route => route.fulfill({ status: 500 }));",
  },
  {
    id: "b6",
    title: "Race Condition on Rapid Double-Click Submit",
    type: "Concurrency Bug",
    code: "btn.addEventListener('click', sendOrder); // No debouncing",
    fix: "await Promise.all([page.waitForResponse('**/api/order'), page.click('#submit')]);",
  },
];
