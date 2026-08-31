---
id: "tt-installation-testing"
overlayNo: 39
title: "Installation Testing"
minutes: 15
partName: "Part 10 · Device, Platform & Security"
level: "beginner"
overviewText: "Installation testing verifies that an application installs, updates, and uninstalls correctly across the environments and methods real users will actually use — checking the install process itself, not the application's functionality once it's already running."
why: "An application that works perfectly once installed is still a failure if users can't actually get it installed in the first place, or if an update corrupts their existing data, or if an uninstall leaves broken remnants behind. Installation is a real user's very first experience with the product — a bad first impression here can lose a user before they ever see any of the application's actual features."
when: "Before every release that includes a packaged installer, app store submission, or update mechanism — checked specifically against a clean environment (not the developer's already-configured machine) and against the realistic upgrade path from the previous version."
practical: {"app":"HRMS Desktop Client Update","scenario":"The HRMS desktop client is tested updating from version 2.3 to 2.4 on a machine with existing saved data and settings.","pass":"The update correctly migrates the existing settings file to the new version's format, and the user's saved preferences persist across the update exactly as expected.","fail":"After updating, the user's saved report filters and dashboard layout preferences are reset to default — the update process overwrote the local settings file instead of migrating it."}
advantages: ["Catches a user's literal first impression of the product, before any feature is even reached","Update-path testing specifically protects existing users' data during version upgrades","Clean-environment testing surfaces missing dependencies invisible on dev machines","Relatively quick to test manually compared to the cost of a broken install reaching real users"]
limitations: ["Manual and environment-specific — requires genuinely clean systems/VMs to avoid false positives","Doesn't scale easily across every possible OS version and hardware configuration combination","Update-path testing requires maintaining prior release builds and realistic migration fixtures","App-store review and rollout mechanisms introduce platform behaviors outside team control"]
tools: [{"name":"Manual Clean-State Matrix","sub":"Clean Virtual Machine & Sandbox State Verification","url":"https://hearth-learn.vercel.app/manuals/testing-types","seeChapter":5,"desc":"Installation testing is inherently manual (see Chapter 5), environment-specific, and best done on genuinely clean systems or fresh device images, since a developer's own machine already has dependencies and prior state that would mask real installation problems.","adv":["Zero software overhead — validates real user installer dialogs and permissions","Exercises real disk permissions, firewall prompts, and registry write locks","Audits data persistence during real in-place binary upgrades"],"lim":["Requires provisioning disposable VMs (e.g. VirtualBox, Windows Sandbox, Docker)"],"steps":[{"t":"Step 1 — Spin up clean, unprovisioned VM/Sandbox environment","p":"Use Windows Sandbox or fresh macOS user account with no pre-installed runtimes.","c":"Windows Sandbox: launch clean instance with default OS image"},{"t":"Step 2 — Execute clean install test","p":"Verify installer wizard steps, desktop shortcut generation, and startup launch.","c":"Run HRMS-Setup-2.4.0.exe -> Verify installation completes without missing DLL errors"},{"t":"Step 3 — Execute upgrade path test with existing user profile","p":"Install v2.3 first, customize user preferences, then run v2.4 installer over it.","c":"1. Install v2.3.0 -> Save filter \"Q3 Engineering Leave\"\n2. Run v2.4.0 updater\n3. Launch app -> Verify filter \"Q3 Engineering Leave\" is preserved intact"},{"t":"Step 4 — Execute clean uninstall verification","p":"Uninstall application and check that file system and registry are cleaned safely.","c":"Uninstall HRMS -> Verify %APPDATA%/HRMS cleans binaries while prompting to retain user data files"}]}]
---

## Clean Sandbox Install & Upgrade Path Verification

Verify installation packages in isolated environments auditing registry keys, file permissions, and legacy data migration.

```
powershell.exe -ExecutionPolicy Bypass -File scripts/verify-installer.ps1
```
