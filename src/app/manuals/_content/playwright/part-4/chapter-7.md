---
id: "pw-4-cross"
title: "23. Cross-browser & Cross-device Testing"
minutes: 40
partName: "Part 4 · Advanced Techniques"
level: "advanced"
---

Running on Chromium, Firefox, WebKit pytest --browser chromium pytest --browser firefox pytest --browser webkit Or parametrized directly in code/config to run against all three in one CI pipeline run. --browser (pytest-playwright CLI flag) What it does: Selects which browser engine the test session launches.

## Running on Chromium, Firefox, WebKit

Or parametrized directly in code/config to run against all three in one CI pipeline run.

--browser (pytest-playwright CLI flag)

What it does: Selects which browser engine the test session launches.

Types/params: "chromium" (default), "firefox", "webkit".

Pointers: Running the full suite three times (once per browser) in CI catches engine-specific bugs before real users do — a common setup is a CI matrix job that runs the same suite once per browser value in parallel.

```
pytest --browser chromium
pytest --browser firefox
pytest --browser webkit
```

## Mobile emulation (device descriptors, viewport, geolocation)

iphone = p.devices["iPhone 13"] context = browser.new_context(**iphone) page = context.new_page()

## page.goto("https://app.example.com")

context = browser.new_context(

viewport={"width": 390, "height": 844},
 geolocation={"latitude": 27.7172, "longitude": 85.3240},
 permissions=["geolocation"],

)

playwright.devices["<device name>"]

What it does: A dictionary of preset settings (viewport, user-agent, touch support, device pixel ratio) for a named real device.

Types/params: String key matching a supported device name, e.g. "iPhone 13",

"Pixel 5", "iPad Pro 11".

Pointers: Unpack it directly into new_context(**device_dict) — no need to set each property manually. Full list of supported devices is in Playwright's own source/docs since it's updated over time.

permissions=...)

What it does: Sets custom device-like properties without using a full preset.

Types/params:

Pointers: Forgetting permissions=["geolocation"] is a common gotcha — setting geolocation alone does nothing if the page's geolocation request isn't permitted.

```
# Custom viewport and geolocation, without a full device descriptor

browser.new_context(viewport=..., geolocation=...,
```