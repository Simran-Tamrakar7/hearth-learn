---
id: "tt-data-migration-testing"
title: "Data Migration Testing"
minutes: 25
partName: "Part 15 · Environment, Migration & Disaster Recovery"
level: "intermediate"
---

Data migration testing verifies that data is correctly, completely, and accurately transferred when moving between systems, schemas, or storage formats — checking that every migrated record retains its integrity, that no data is lost or duplicated, and that the migrated data behaves correctly in the new system, not just that the migration process completed without an error.

## Automated Checksum & Record Count Reconciliation

Verify row counts, hash aggregates, schema constraints, and foreign key integrity before and after migration execution.

```
python3 scripts/reconcile_migration.py --source postgres://old --dest postgres://new
```