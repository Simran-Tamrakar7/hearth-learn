---
id: "pw-4-network"
title: "17. Network Interception & Mocking"
minutes: 50
partName: "Part 4 · Advanced Techniques"
level: "advanced"
---

page.route() basics page.route() intercepts network requests matching a URL pattern before they reach the server, letting you inspect, modify, block, or fully replace the response. def handle_route(route): route.continue_() # let it through unchanged page.route("**/*.png", handle_route) page.route(url_pattern, handler) What it does: Registers an interceptor for any request matching a URL pattern.

## Overview

the server, letting you inspect, modify, block, or fully replace the response.

```
page.route() basics

page.route() intercepts network requests matching a URL pattern before they reach

def handle_route(route):
    route.continue_()   # let it through unchanged
```

## page.route(url_pattern, handler)

What it does: Registers an interceptor for any request matching a URL pattern.

Types/params:

Pointers: Every matched request must be resolved by the handler (continue/fulfill/abort) or the request hangs indefinitely. Register routes before the navigation/action that triggers the request.

```
route.continue_(), route.fulfill(), or route.abort()
```

## Mocking API responses

This lets you test UI behavior for scenarios that are hard to trigger naturally — server errors, empty states, slow responses — without needing the actual backend to cooperate.

What it does: Responds to the intercepted request with custom data instead of letting it reach the real server.

Types/params:

```
def mock_users_api(route):
    route.fulfill(
        status=200,
        content_type="application/json",
        body='{"users": [{"id": 1, "name": "Test User"}]}'
    )

page.route("**/api/users", mock_users_api)
page.goto("https://app.example.com/users")

route.fulfill(status=..., content_type=..., body=...)
```

## 500 for error-state testing

Pointers: Use json= instead of manually building a body JSON string where possible

— less error-prone. Mocking error statuses (500, 403) is one of the highest-value uses here, since these are notoriously hard to trigger from a real backend on demand.

What it does: Lets the request proceed to the real server, optionally with modifications.

Types/params:

Pointers: Use this when you only want to observe or slightly tweak a request (e.g., inject a test header) rather than fully replace the response.

What it does: Blocks the request entirely, simulating a network failure.

Types/params:

"timedout", "connectionrefused"

Pointers: Useful for testing how the UI handles total network failure (not just an error response, but no response at all) — a distinct code path from a mocked 500.

```
route.abort(error_code=...)

route.continue_(...)
```

## Blocking resources (images, ads) for speed



```
def block_images(route):
    if route.request.resource_type == "image":
        route.abort()
    else:
        route.continue_()
```

## route.request.resource_type

What it does: Read-only property identifying the category of the intercepted request.

Types/params:

"xhr", "fetch", "font", "media"

Pointers: Blocking images/fonts/ad-tracker scripts on tests that don't need to visually verify them can meaningfully speed up a large suite — but don't block resources your test actually depends on rendering correctly (defeats visual regression testing in Chapter 19).