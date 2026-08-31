---
id: "tt-database-testing"
title: "Database Testing"
minutes: 25
partName: "Part 9 · Modern Engineering & Integrations"
level: "intermediate"
---

Database testing verifies the data layer directly — schema structure, constraints, data integrity, stored procedures, and the correctness of the raw data itself — independent of any application layer sitting on top of it, checking the database exactly as it actually stores and enforces data.

## Direct SQL Constraint & Migration Integrity Audit

Audit schema tables directly with SQL queries probing foreign keys, unique constraints, and ACID rollbacks.

```
psql -h localhost -U postgres -d hrms_staging -f scripts/db-audit.sql
```