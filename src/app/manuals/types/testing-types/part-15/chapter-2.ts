import type { ChapterRecord } from "../../../types";

/** Data Migration Testing */
export const chapter = {
  "id": "tt-data-migration-testing",
  "overlayNo": 58,
  "title": "Data Migration Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 15 · Environment, Migration & Disaster Recovery",
  "partName": "Part 15 · Environment, Migration & Disaster Recovery",
  "overviewText": "Data migration testing verifies that data is correctly, completely, and accurately transferred when moving between systems, schemas, or storage formats — checking that every migrated record retains its integrity, that no data is lost or duplicated, and that the migrated data behaves correctly in the new system, not just that the migration process completed without an error.",
  "why": "A migration script can run to completion, report success, and still have silently corrupted, dropped, or mismatched data — a completed migration process is not proof of a correct one. Because migrations are often one-way and hard to reverse cleanly once real usage has resumed on the new system, an undetected migration defect can be exceptionally costly and difficult to fix after the fact, making thorough testing before and during the migration especially critical.",
  "when": "Before any significant data migration — schema changes, platform migrations, database version upgrades, or moving to an entirely new system — tested first against a copy of real data in a safe environment, never attempted for the first time directly against production.",
  "practical": {
    "app": "HRMS Legacy System Migration",
    "scenario": "Employee records are migrated from a legacy HRMS to the new system, tested first against a full copy of real production data.",
    "pass": "The migration script is corrected to convert legacy placeholder values to proper nulls, a re-run of the test migration shows all 340 records now pass validation, and the real migration proceeds with confidence.",
    "fail": "340 employee records with a legacy 'N/A' placeholder in the phone number field are migrated as literal text 'N/A' instead of being correctly converted to a proper null value — breaking the new system's phone-number validation on those records."
  },
  "advantages": [
    "Directly verifies data correctness and completeness, not just that migration scripts ran without throwing errors",
    "Catches transformation edge cases (unusual characters, nulls, date formats) that simple row-count checks miss",
    "Testing against isolated test copies eliminates the risk of catastrophic corruption on live production databases",
    "A tested rollback plan provides a verified safety net if cutover anomalies occur"
  ],
  "limitations": [
    "Requires a representative sanitized copy of real production data to uncover dirty-data edge cases",
    "Field-by-field verification on billions of rows requires statistical sampling or automated checksum hashing",
    "Testing in lower environments cannot always simulate peak concurrent production traffic during real cutover",
    "Rollback testing adds substantial time and storage overhead to project timelines"
  ],
  "tools": [
    {
      "name": "DBeaver Data Comparison & Schema Audit",
      "sub": "Pre/Post Data Reconciliation & Checksum Engine",
      "url": "https://dbeaver.io",
      "seeChapter": 35,
      "desc": "Used to compare source and destination datasets (see Chapter 35), verifying record counts, data types, foreign key constraints, and checksum values before and after migration.",
      "adv": [
        "Universal database client supporting PostgreSQL, MySQL, Oracle, and MS SQL",
        "Automated table row count comparison and schema structure diffing"
      ],
      "lim": [
        "Requires building custom SQL reconciliation queries for complex transformed columns"
      ],
      "steps": [
        {
          "t": "Step 1 — Audit Pre-Migration Source Row Counts & Hashes",
          "p": "Execute count and MD5 checksum aggregate across legacy tables.",
          "c": "SELECT count(*), md5(string_agg(id || name || email, '')) FROM legacy_employees;\nResult: 14,250 records | Hash: 8f9b2d4e1..."
        },
        {
          "t": "Step 2 — Execute migration pipeline against staging database copy",
          "p": "Run ETL pipeline transforming legacy schemas into new PostgreSQL tables.",
          "c": "python3 scripts/migrate_employees.py --source=legacy_db --dest=staging_hrms_db"
        },
        {
          "t": "Step 3 — Run Post-Migration Data Reconciliation Script",
          "p": "Verify 100% record match, zero orphaned records, and valid null conversions.",
          "c": "SELECT count(*) FROM employees WHERE phone_number = 'N/A';\nResult: 0 records (Converted to NULL correctly) | Total Migrated: 14,250 -> 100% PASS"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated Checksum & Record Count Reconciliation\n\nVerify row counts, hash aggregates, schema constraints, and foreign key integrity before and after migration execution.\n\n```\npython3 scripts/reconcile_migration.py --source postgres://old --dest postgres://new\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
