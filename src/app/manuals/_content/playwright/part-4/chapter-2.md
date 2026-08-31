---
id: "pw-4-api"
title: "18. API Testing with Playwright"
minutes: 50
partName: "Part 4 · Advanced Techniques"
level: "advanced"
---

request context (APIRequestContext) Playwright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms). import pytest from playwright.sync_api import sync_playwright with sync_playwright() as p: request_context = p

## Overview

request context (APIRequestContext)

Playwright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms).

Or via the pytest-playwright plugin's built-in request fixture:

extra_http_headers=...)

What it does: Creates an APIRequestContext — an isolated HTTP client session for making API calls.

Types/params:

calls, e.g. set once instead of repeating the full domain every call

this context, commonly used for auth tokens: {"Authorization": "Bearer

<token>"}

directly into Chapter 20)

Pointers: Like BrowserContext, an APIRequestContext is isolated — separate contexts don't share cookies/headers, letting you cleanly simulate different authenticated users in the same test file.

```
import pytest
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    request_context = p.request.new_context(base_url="https://api.example.com")

def test_api_example(request):
    response = request.get("/users/1")

playwright.request.new_context(base_url=...,
```

## GET/POST/PUT/DELETE calls — full detail

What it does: Sends an HTTP GET request — used to retrieve data without modifying anything on the server.

Types/params:

"limit": 10} becomes ?page=1&limit=10

response = request.get("/users", params={"page": 1, "limit": 10})

data = response.json()

Pointers: GET requests should be idempotent and side-effect-free by REST convention — a well-behaved API should let you call GET repeatedly with zero risk of changing data.

If a "GET" endpoint you're testing does change server state, that's worth flagging as a design smell, not something to just work around in your test.

What it does: Sends an HTTP POST request — used to create a new resource or trigger an action on the server.

Types/params:

```
request.post(url, data=..., json=..., headers=...)

request.get(url, params=..., headers=...)

assert len(data["users"]) <= 10
```

## Content-Type: application/json header for you

response = request.post("/users", data={ "name": "Test User",

"email": "testuser@example.com"

})

```
assert response.status == 201   # 201 Created is the conventional success status for
```

## POST new_user = response.json()

Pointers: A successful POST conventionally returns 201 Created (not 200 OK) along with the newly created resource's data (including its generated ID) — worth asserting on that ID since you'll typically need it for cleanup (Chapter 16) or for follow-up requests (e.g., GET that same user to verify persistence). POST is not

idempotent by default — calling it twice with the same data typically creates two separate resources, which matters when writing retry logic around it.

What it does: Sends an HTTP PUT request — used to replace an existing resource entirely with the data provided.

Types/params: Same shape as .post() — url, data/json, headers.

response = request.put(f"/users/{user_id}", json={ "name": "Updated Name",

"email": "updated@example.com"

})

Pointers: PUT is conventionally idempotent — sending the exact same PUT request multiple times should leave the resource in the same final state each time (unlike POST). PUT typically expects the full resource representation in the body — if you omit a field the resource currently has, a strictly RESTful API may null it out, since PUT means "replace," not "merge." This is the detail that most often trips people up moving from POST to PUT.

What it does: Sends an HTTP PATCH request — used to make a partial update to an existing resource (only the fields provided change; everything else stays as-is).

Types/params: Same shape as .post()/.put().

response = request.patch(f"/users/{user_id}", json={"email": "newemail@example.com"})

Pointers: Worth knowing alongside PUT even though it wasn't explicitly listed in your TOC, since real-world APIs frequently offer PATCH specifically to avoid PUT's "must send the whole object" requirement — and mixing the two up in tests is a common source of confusing failures (a PATCH-shaped body sent to a PUT endpoint wiping out fields you didn't intend to touch).

What it does: Sends an HTTP DELETE request — used to remove a resource from the server.

Types/params:

allows one)

response = request.delete(f"/users/{user_id}")

deletes

follow_up = request.get(f"/users/{user_id}")

Pointers: A successful DELETE commonly returns 204 No Content (success, but no

body to return) rather than 200 — check your specific API's convention rather than assuming. DELETE is conventionally idempotent too — deleting an already-deleted resource should ideally return a 404 (not found) rather than erroring in a confusing way, and that's worth testing as its own case, not just the "happy path" single delete.

```
assert response.status == 200

# Other fields like "name" remain untouched, unlike a PUT with the same partial body

assert response.status in (200, 204)   # 204 No Content is common for successful

request.patch(url, data=..., json=..., headers=...)
```

## Shared response object reference (response)

Every call above (.get(), .post(), .put(), .patch(), .delete()) returns an

APIResponse object with the same interface:

What it does: Exposes the numeric HTTP status code, and a boolean shortcut for "was it successful."

Types/params:

Pointers: .ok is a convenient quick check, but explicit status code assertions (assert

expected behavior rather than just "some success code."

What it does: Parses the response body as JSON and returns it as a Python dict/list.

Types/params: No parameters.

Pointers: Will raise an error if the response body isn't valid JSON (e.g., an HTML error page returned instead) — worth wrapping in a try/except or checking content_type first if you're testing error scenarios where the response shape might vary.

What it does: .text() returns the raw response body as a string; .headers exposes response headers as a dict.

Types/params: No parameters for .text(); .headers is a plain dict-like property.

Pointers: Use .text() for non-JSON responses (HTML, plain text errors); check

.headers when testing things like caching behavior, rate-limit headers, or content-type correctness.

```
response.status == 201) are usually better in tests since they pin down the exact

response.text() / response.headers

response.status / response.ok
```

## Combining UI + API tests

The powerful pattern: use the API to quickly set up state (create a user, seed data) instead of a slow UI flow, then test the UI layer on top of that pre-seeded state — and optionally clean up via API afterward too.

"jane@example.com"})

user_id = response.json()["id"]

# Cleanup via API — fast, doesn't depend on UI delete flow working correctly

Pointers: This pattern dramatically speeds up test suites where the thing you actually want to test is deep in the app (e.g., "does an admin see the user in a list") but getting there via pure UI would require a slow, flake-prone signup flow every single test run.

```
def test_new_user_appears_in_admin_list(page, request):

# Fast setup via API instead of clicking through a signup form
    response = request.post("/users", json={"name": "Jane Doe", "email":

# Now test the actual UI behavior
    page.goto("https://app.example.com/admin/users")
    expect(page.get_by_text("Jane Doe")).to_be_visible()

request.delete(f"/users/{user_id}")
```