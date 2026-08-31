---
id: "tt-installation-testing"
title: "Installation Testing"
minutes: 15
partName: "Part 10 · Device, Platform & Security"
level: "beginner"
---

Installation testing verifies that an application installs, updates, and uninstalls correctly across the environments and methods real users will actually use — checking the install process itself, not the application's functionality once it's already running.

## Clean Sandbox Install & Upgrade Path Verification

Verify installation packages in isolated environments auditing registry keys, file permissions, and legacy data migration.

```
powershell.exe -ExecutionPolicy Bypass -File scripts/verify-installer.ps1
```