#!/usr/bin/env python3
"""Split scripts/sql-qa-source.md into scripts/sql-qa-manual-data/pNN.json."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "sql-qa-source.md"
OUT = ROOT / "sql-qa-manual-data"

PARTS: list[tuple[int, str, list[str]]] = [
    (
        0,
        "Orientation",
        [
            "0.1 Background: How an App Is Built (UI → API → Database), What a Relational Database Is, SQL vs NoSQL",
            "0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL)",
            "0.3 What Testers Use SQL For",
            "0.4 Read-Only vs Write Access, Environments (Dev/QA/Staging/Prod), Working Safely in Shared DBs",
            "0.5 DB Users, Roles & Permissions",
            "0.6 Sample Database & How to Follow Along",
            "0.7 What This Manual Does Not Cover (Scope & Where to Go Next)",
        ],
    ),
    (
        1,
        "Database & Query Basics",
        [
            "1.1 Databases, Tables, Rows, Columns, Schemas",
            "1.2 Data Types",
            "1.3 SELECT, FROM, WHERE Basics",
            "1.4 Comparison & Logical Operators",
        ],
    ),
    (
        2,
        "Filtering & Sorting",
        [
            "2.1 WHERE Clause Deep Dive",
            "2.2 ORDER BY, LIMIT/TOP, DISTINCT",
            "2.3 NULL Handling",
            "2.4 Functions & Expressions (CASE, COALESCE, NULLIF, string/date functions, ROUND/CAST, GROUP_CONCAT/STRING_AGG)",
            "2.5 Text Matching Gotchas",
        ],
    ),
    (
        3,
        "Aggregation",
        [
            "3.1 COUNT, SUM, AVG, MIN, MAX",
            "3.2 GROUP BY and HAVING",
        ],
    ),
    (
        4,
        "Joins",
        [
            "4.1 INNER, LEFT, RIGHT, FULL Joins",
            "4.2 Self Joins",
            "4.3 Practical QA Scenario: Validating Foreign Key Relationships",
        ],
    ),
    (
        5,
        "Subqueries, CTEs & Set Operations",
        [
            "5.1 Subqueries in WHERE/SELECT/FROM",
            "5.2 Common Table Expressions",
            "5.3 When to Use a Subquery vs a Join",
            "5.4 Set Operators (UNION, UNION ALL, INTERSECT, EXCEPT)",
            "5.5 Window Functions (ROW_NUMBER, RANK, LAG/LEAD, SUM() OVER)",
        ],
    ),
    (
        6,
        "Data Validation Techniques for QA",
        [
            "6.1 Verifying Data Migration/ETL Correctness",
            "6.2 Comparing Expected vs Actual Data Sets",
            "6.3 Finding Duplicates, Orphaned Records, Mismatched Counts",
            "6.4 Testing Schema Migration Scripts",
            "6.5 Schema Drift Checks Across Environments",
            "6.6 Before/After Snapshot (Regression) Validation",
        ],
    ),
    (
        7,
        "DML, DDL & Test Data",
        [
            "7.1 INSERT, UPDATE, DELETE",
            "7.2 Safely Seeding/Cleaning Test Data",
            "7.3 Transactions (COMMIT, ROLLBACK)",
            "7.4 DDL Awareness (CREATE, ALTER, DROP, TRUNCATE vs DELETE)",
            "7.5 Bulk Test Data Generation",
            "7.6 Masking/Anonymizing PII",
            "7.7 ACID, Isolation Levels & Concurrency",
        ],
    ),
    (
        8,
        "Constraints & Schema Awareness",
        [
            "8.1 Primary Keys, Foreign Keys, Unique Constraints, Indexes",
            "8.2 Why Schema Knowledge Helps You Write Better Test Cases",
            "8.3 Views, Triggers & Stored Procedures",
            "8.4 Common Schema Patterns (soft deletes, audit columns, status/enum columns, lookup tables)",
            "8.5 Query Performance Basics (EXPLAIN, slow queries, when to escalate)",
            "8.6 Exploring an Unfamiliar Database",
        ],
    ),
    (
        9,
        "SQL in API/Backend Testing",
        [
            "9.1 Verifying API Responses Against DB State",
            "9.2 Using SQL Alongside Postman/pytest/Cypress",
            "9.3 Cross-Checking Business Logic",
            "9.4 SQL with Playwright & CI Pipelines",
            "9.5 Pagination, Sorting & Filter Validation",
            "9.6 Dashboard & Report Validation",
            "9.7 SQL Injection Basics for Testers",
        ],
    ),
    (
        10,
        "Practical QA Query Patterns",
        [
            "10.1 Finding Bugs via Data Anomalies",
            "10.2 Building Reusable Sanity Check Queries",
            "10.3 Query Templates for Attendance, Payroll, Appointments",
            "10.4 Leave Module Templates",
            "10.5 Approval Workflow & Status Transition Checks",
        ],
    ),
    (
        11,
        "Tools & Workflow",
        [
            "11.1 Running Queries via DB Clients",
            "11.2 Read Replicas / Safe Environments",
            "11.3 Exporting Query Results for Bug Reports",
        ],
    ),
    (
        12,
        "Practice & Wrap-up",
        [
            "12.1 Sample HRMS Practice Database (schema + seed data)",
            "12.2 Exercises per Part (with answers)",
            "12.3 Mini-Project: A Full Sanity-Check Suite for One Module",
        ],
    ),
    (
        13,
        "Appendices",
        [
            "A. Cheat Sheet of Common Queries",
            "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server)",
            "C. Glossary of Terms",
            "D. Common SQL Errors & How to Fix Them",
            "E. Sample Database Schema Reference (ER Overview)",
            "F. SQL Interview Questions for QA Roles",
        ],
    ),
]

SQL_START = re.compile(
    r"^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|WITH|START TRANSACTION|BEGIN TRANSACTION|"
    r"BEGIN;|CALL |EXPLAIN|SHOW |USE |DROP |SET |GRANT |REVOKE |TRUNCATE|REPLACE INTO|"
    r"MERGE |COMMIT|ROLLBACK|SAVEPOINT|DELIMITER|DECLARE |IF EXISTS|mysqldump|"
    r"docker run|-- MySQL|-- PostgreSQL|-- SQL Server|-- 1\.|-- Step )\b",
    re.I,
)
SQL_CONT = re.compile(
    r"^(\s+|AND |OR |FROM |WHERE |JOIN |LEFT |RIGHT |INNER |FULL |CROSS |GROUP |ORDER |"
    r"HAVING |LIMIT |VALUES |SET |ON |UNION |EXCEPT |INTERSECT |OFFSET |FETCH |"
    r"PARTITION |WINDOW |ROWS |RANGE |-- |/\*|\)|,|;|\(|ELSE |WHEN |THEN |END |"
    r"PRIMARY |FOREIGN |UNIQUE |CONSTRAINT |DEFAULT |NOT NULL|REFERENCES |"
    r"ENGINE=|CHARSET=|COLLATE)",
    re.I,
)
CODE_LABEL = {"sql": "sql", "javascript": "ts", "python": "py", "bash": "bash", "yaml": "yaml", "groovy": "groovy"}
PROSE_START = (
    "The ", "A ", "An ", "When ", "If ", "This ", "Every ", "Almost ", "Notice ",
    "Also ", "Then ", "That ", "These ", "Those ", "There ", "Here ", "For ",
    "After ", "Before ", "Because ", "So ", "But ", "And ", "Or ", "In ",
    "On ", "At ", "To ", "As ", "It ", "You ", "We ", "They ", "Your ",
    "Most ", "Real ", "Use ", "Read ", "Keep ", "Never ", "Always ",
    "Don't ", "Do ", "Note ", "See ", "Look ", "Run ", "Ask ", "Get ",
)
HEADER_ALLOW = {
    "Task", "Layer", "Family", "Type", "Operator", "Environment", "Role",
    "Concept", "Database", "Constraint", "Action", "Approach", "Technique",
    "Goal", "Source", "Position", "Object", "Need", "Change", "Topic",
    "Letter", "Anomaly", "Level", "Situation", "Statement type", "Value type",
    "Column definition", "Error message (MySQL)", "Stored value", "Expression",
    "Dialect", "You want to know...", "You need...", "Lives for", "In the DDL",
    "Target column", "id", "A", "TRUE", "FALSE", "SQL", "Value", "MySQL",
    "PostgreSQL", "SQL Server", "Aspect", "Relational (SQL)",
    "NoSQL (typical document store)", "Table", "What it holds", "FULL name",
    "Purpose", "Examples", "Tester relevance", "Meaning", "Notes",
    "Typical range (signed)", "Common use", "Tool examples",
    "What it can prove", "What it can't prove", "Structure", "Relationships",
    "Consistency", "Query language", "Best for",
}
SKIP_HEADING = re.compile(r"^(SELECT |INSERT |UPDATE |DELETE |CREATE |WITH |FROM |WHERE |-- |# |\| |```)")


def esc_cell(s: str) -> str:
    return s.replace("|", "\\|").replace("\n", " ").strip()


def gfm(rows: list[list[str]]) -> str:
    headers = [esc_cell(c) for c in rows[0]]
    n = len(headers)
    out = ["| " + " | ".join(headers) + " |", "|" + "|".join(["---"] * n) + "|"]
    for row in rows[1:]:
        cells = [esc_cell(c) for c in (row + [""] * n)[:n]]
        out.append("| " + " | ".join(cells) + " |")
    return "\n".join(out)


def looks_headerish(s: str) -> bool:
    s = s.strip()
    if s in HEADER_ALLOW:
        return True
    if not s or len(s) > 80:
        return False
    if s.startswith(PROSE_START):
        return False
    if s.endswith(".") and len(s) > 45:
        return False
    if SKIP_HEADING.match(s):
        return False
    if any(ch in s for ch in "↓↑+"):
        return False
    if s.startswith("[") and "]" in s[:6]:
        return False
    return True


def rows_from(block: list[str], ncols: int) -> list[list[str]] | None:
    if len(block) < ncols * 2:
        return None
    body = block
    if len(body) % ncols:
        extra = len(body) % ncols
        tail = body[-extra:]
        if all(len(x) > 70 or x.endswith(".") for x in tail):
            body = body[:-extra]
        else:
            return None
    if len(body) % ncols or len(body) < ncols * 2:
        return None
    return [body[r * ncols : (r + 1) * ncols] for r in range(len(body) // ncols)]


def score_table(rows: list[list[str]]) -> int | None:
    headers = rows[0]
    if not all(looks_headerish(h) or len(h) < 36 for h in headers):
        return None
    if any(h.startswith(PROSE_START) and h not in HEADER_ALLOW for h in headers):
        return None
    cells = [c for row in rows for c in row]
    if sum(1 for c in cells if len(c) < 110) / len(cells) < 0.85:
        return None
    if sum(1 for c in cells if c.endswith(".") and len(c) > 70) / len(cells) > 0.25:
        return None
    score = len(headers) * 12 + len(rows)
    if headers[0] in HEADER_ALLOW:
        score += 40
    if "MySQL" in headers and "PostgreSQL" in headers:
        score += 80
    return score


def try_table(block: list[str]) -> str | None:
    if len(block) < 4:
        return None
    if block[0].strip() == "Relational (SQL)" and block[1].strip().startswith("NoSQL"):
        rest = block[2:]
        if len(rest) >= 3 and len(rest) % 3 == 0:
            rows = [["Aspect", "Relational (SQL)", "NoSQL (typical document store)"]]
            for r in range(0, len(rest), 3):
                rows.append(rest[r : r + 3])
            return gfm(rows)
    candidates: list[tuple[int, list[list[str]]]] = []
    for ncols in range(6, 1, -1):
        rows = rows_from(block, ncols)
        if not rows:
            continue
        sc = score_table(rows)
        if sc is None:
            continue
        candidates.append((sc, rows))
    if not candidates:
        return None
    candidates.sort(key=lambda x: x[0], reverse=True)
    return gfm(candidates[0][1])


def is_ascii_row(line: str) -> bool:
    s = line.strip()
    return s.startswith("+") and "---" in s or (s.startswith("|") and "---" not in s and s.count("|") >= 2 and "+" in line)


def fence_ascii_and_code(text: str) -> str:
    lines = text.split("\n")
    out: list[str] = []
    i = 0
    n = len(lines)
    in_fence = False
    while i < n:
        line = lines[i]
        stripped = line.strip()
        if stripped.startswith("```"):
            in_fence = not in_fence
            out.append(line)
            i += 1
            continue
        if in_fence:
            out.append(line)
            i += 1
            continue
        lab = CODE_LABEL.get(stripped.lower())
        if lab and i + 1 < n and (SQL_START.match(lines[i + 1].strip()) or lines[i + 1].startswith(("import ", "def ", "from ", "const ", "test(", "# "))):
            lang = lab
            i += 1
            buf = []
            while i < n and lines[i].strip() != "" and not lines[i].startswith(("A UI ", "Notice ", "The same", "If this ", "Note that")):
                # stop at a prose sentence that isn't code
                nxt = lines[i]
                if (
                    not SQL_START.match(nxt.strip())
                    and not SQL_CONT.match(nxt)
                    and not nxt.startswith((" ", "\t", "import ", "def ", "from ", "const ", "let ", "await ", "expect", "test(", "assert ", "# ", "//", "}", "{", ")", "]", "end", "with ", "class "))
                    and nxt[:1].isupper()
                    and nxt.endswith(".")
                    and len(nxt) > 60
                ):
                    break
                buf.append(nxt)
                i += 1
            out.append(f"```{lang}\n" + "\n".join(buf) + "\n```")
            continue
        if stripped.startswith("+") and "---" in stripped:
            buf = [line]
            i += 1
            while i < n and (lines[i].strip().startswith(("+", "|")) or (lines[i].strip() and "|" in lines[i] and not lines[i].strip().endswith("."))):
                buf.append(lines[i])
                i += 1
            out.append("```\n" + "\n".join(buf) + "\n```")
            continue
        if SQL_START.match(stripped) and not stripped.endswith("?") and not stripped.startswith("SELECT says"):
            buf = [line]
            i += 1
            while i < n:
                nxt = lines[i]
                if nxt.strip() == "":
                    break
                if SQL_START.match(nxt.strip()) or SQL_CONT.match(nxt) or nxt.strip().startswith(("(`", "`", ")", ";", ",")) or nxt.rstrip().endswith((",", ";", "(")):
                    buf.append(nxt)
                    i += 1
                    continue
                if nxt.startswith("    ") or nxt.startswith("\t"):
                    buf.append(nxt)
                    i += 1
                    continue
                break
            out.append("```sql\n" + "\n".join(buf) + "\n```")
            continue
        if re.match(
            r"^(import |from |const |let |export |test\(|async |function |def |class |@pytest|"
            r"jobs:|services:|steps:|# \.|npx |newman )",
            stripped,
        ):
            lang = "py" if stripped.startswith(("def ", "from ", "@pytest", "import pytest", "import requests", "import pandas")) else "ts"
            if stripped.startswith(("jobs:", "services:", "steps:", "# .")):
                lang = "yaml"
            buf = [line]
            i += 1
            while i < n and lines[i].strip() != "":
                nxt = lines[i]
                if nxt[:1].isupper() and nxt.endswith(".") and len(nxt) > 80 and not nxt.startswith((" ", "\t", "await ", "expect", "assert ")):
                    break
                buf.append(nxt)
                i += 1
            out.append(f"```{lang}\n" + "\n".join(buf) + "\n```")
            continue
        out.append(line)
        i += 1
    return "\n".join(out)


def gather_until_blank(lines: list[str], start: int) -> tuple[list[str], int]:
    j = start
    block = []
    while j < len(lines) and lines[j].strip() != "":
        block.append(lines[j].rstrip())
        j += 1
    return block, j


def is_ascii_art_line(line: str) -> bool:
    s = line.strip()
    return ("+--" in s) or (s.startswith("|") and "+" in s and "---" not in s[:4])


def convert_tables(text: str) -> str:
    lines = text.split("\n")
    out: list[str] = []
    i = 0
    n = len(lines)
    while i < n:
        if lines[i].strip() == "":
            out.append(lines[i])
            i += 1
            continue
        block, j = gather_until_blank(lines, i)

        ascii_idx = next((k for k, ln in enumerate(block) if is_ascii_art_line(ln)), None)
        if ascii_idx is not None:
            lead = ascii_idx
            if lead > 0 and not block[lead - 1].endswith((".", ":", ";")) and len(block[lead - 1]) < 80:
                lead -= 1
            for ln in block[:lead]:
                out.append(ln)
            if lead:
                out.append("")
            out.append("```\n" + "\n".join(block[lead:]) + "\n```")
            i = j
            continue

        arrow_idx = next(
            (k for k, ln in enumerate(block) if "↓" in ln or "↑" in ln or ln.strip().startswith("[UI]")),
            None,
        )
        if arrow_idx is not None:
            lead = arrow_idx
            if lead > 0 and block[lead - 1].endswith(":"):
                lead -= 1
            for ln in block[:lead]:
                out.append(ln)
            if lead:
                out.append("")
            rest = block[lead:]
            if rest and rest[0].endswith(":") and "↓" not in rest[0] and "↑" not in rest[0]:
                out.append(rest[0])
                out.append("")
                out.append("```\n" + "\n".join(rest[1:]) + "\n```")
            else:
                out.append("```\n" + "\n".join(rest) + "\n```")
            i = j
            continue

        table = None
        consumed = 0
        for start_at in range(0, min(8, len(block))):
            if start_at:
                prev = block[start_at - 1]
                ok = prev.endswith((".", ":")) and len(prev) > 50
                ok = ok or block[start_at].strip() in HEADER_ALLOW
                if not ok:
                    continue
            t = try_table(block[start_at:])
            if t:
                table = t
                consumed = start_at
                break
        if table:
            for ln in block[:consumed]:
                out.append(ln)
            if consumed:
                out.append("")
            out.append(table)
            i = j
            continue
        out.append(lines[i])
        i += 1
    return "\n".join(out)


def add_headings(text: str) -> str:
    lines = text.split("\n")
    out: list[str] = []
    in_fence = False
    for idx, line in enumerate(lines):
        if line.startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence or line.startswith("|") or line.startswith("#"):
            out.append(line)
            continue
        nxt = ""
        k = idx + 1
        while k < len(lines) and lines[k].strip() == "":
            k += 1
        if k < len(lines):
            nxt = lines[k]
        s = line.strip()
        if (
            s
            and 12 <= len(s) <= 90
            and not s.endswith((".", ";", ","))
            and not s.startswith(("```", "|", "-", "*", "1.", "2.", "-- ", "SELECT", "INSERT"))
            and not s[:1].isdigit()
            and nxt
            and len(nxt) > 70
            and not nxt.startswith(("|", "```"))
            and not SQL_START.match(s)
        ):
            out.append(f"## {s}")
        else:
            out.append(line)
    return "\n".join(out)


def to_markdown(raw: str) -> str:
    t = raw.strip()
    t = convert_tables(t)
    t = fence_ascii_and_code(t)
    t = add_headings(t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    if not re.search(r"^## ", t, re.M):
        t = "## Overview\n\n" + t
    return t.strip() + "\n"


def first_paragraphs(md: str, n: int = 2) -> str:
    body = re.sub(r"```[\s\S]*?```", " ", md)
    body = re.sub(r"^## .+$", "", body, flags=re.M)
    body = re.sub(r"^\|.+$", "", body, flags=re.M)
    parts = re.split(r"\n\s*\n", body)
    chunks = []
    for p in parts:
        p = re.sub(r"\s+", " ", p).strip()
        if len(p) > 40:
            chunks.append(p)
        if len(chunks) >= n:
            break
    text = " ".join(chunks) if chunks else re.sub(r"\s+", " ", body)[:500]
    return text[:700].strip()


def summary_to_bullets(raw: str) -> str:
    lines = []
    for ln in raw.strip().split("\n"):
        s = ln.strip()
        if not s:
            continue
        if s.startswith(("0.", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12.", "A.", "B.", "C.", "D.", "E.", "F.", "Appendix")):
            continue
        if not s.startswith("- "):
            s = "- " + s
        lines.append(s)
    return "\n".join(lines) if lines else "- See the full chapter."


def chapter_fields(title: str, overview: str, part_name: str) -> dict:
    short = title.split(" ", 1)[-1] if title[:1].isdigit() or title[:1] in "ABCDEF" else title
    first = overview.split(". ")[0].strip().rstrip(".")
    why = (
        f"{title} is how a tester proves stored state, not just the screen. "
        f"{first}."
    )
    when = (
        f"Open this chapter when you are on the {part_name} path and need {short} "
        f"against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen."
    )
    practical = {
        "app": "Bizlevate HRMS / hrms_practice",
        "scenario": f"A leave, payroll, attendance, or appointment check depends on {short}.",
        "pass": f"You apply {short} on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
        "fail": f"You copy a blog query, skip {short}, or treat a UI success toast as proof the row is correct.",
    }
    return {"why": why, "when": when, "practical": practical}


def split_chapters(body: str, keys: list[str]) -> dict[str, str]:
    """keys like '0.1' or 'A'."""
    if keys[0] in "ABCDEF" and len(keys[0]) == 1:
        pat = re.compile(r"^Appendix ([A-F]):\s+", re.M)
        matches = list(pat.finditer(body))
        out = {}
        for i, m in enumerate(matches):
            letter = m.group(1)
            end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
            rest = body[m.end() : end]
            rest = re.sub(r"^[^\n]*\n", "", rest, count=1).strip()
            out[letter] = rest
        return out
    pat = re.compile(r"^(" + "|".join(re.escape(k) for k in keys) + r")\s+", re.M)
    matches = list(pat.finditer(body))
    out = {}
    for i, m in enumerate(matches):
        key = m.group(1)
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        # include rest of heading line then body
        chunk = body[m.start() : end]
        # drop the "0.1 Title" first line
        chunk = re.sub(r"^[^\n]+\n", "", chunk, count=1).strip()
        out[key] = chunk
    return out


def extract_sections(src: str) -> dict[tuple[int, str], str]:
    """(partNo, 'exp'|'sum') -> body."""
    marker = re.compile(
        r"^(PART\s+(\d+)[^\n]*|APPENDICES)[^\n]*\((Expanded|Summarized) Version\)\s*$",
        re.M,
    )
    hits = list(marker.finditer(src))
    out: dict[tuple[int, str], str] = {}
    for i, m in enumerate(hits):
        kind = "exp" if m.group(3) == "Expanded" else "sum"
        if m.group(1).startswith("APPENDICES"):
            part_no = 13
        else:
            part_no = int(m.group(2))
        end = hits[i + 1].start() if i + 1 < len(hits) else len(src)
        out[(part_no, kind)] = src[m.end() : end].strip()
    return out


def main() -> None:
    raw = SRC.read_text(encoding="utf-8")
    start = raw.find("PART 0 — ORIENTATION (Expanded Version)")
    if start < 0:
        raise SystemExit("expanded part 0 not found")
    sections = extract_sections(raw[start:])
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for part_no, name, titles in PARTS:
        exp = sections.get((part_no, "exp"), "")
        sm = sections.get((part_no, "sum"), "")
        if part_no == 13:
            keys = [t[0] for t in titles]
            exp_map = split_chapters(exp, keys)
            sum_map = split_chapters(sm, keys) if sm else {}
        else:
            keys = [t.split(" ", 1)[0] for t in titles]
            exp_map = split_chapters(exp, keys)
            sum_map = split_chapters(sm, keys) if sm else {}
        chapters = []
        for title in titles:
            key = title[0] if part_no == 13 else title.split(" ", 1)[0]
            body = exp_map.get(key, "")
            if not body:
                raise SystemExit(f"missing expanded body for {title} (key {key})")
            md = to_markdown(body)
            overview = first_paragraphs(md)
            if len(overview) < 40:
                overview = (title + " — testers use this on the sample HRMS schema to verify stored state.") * 1
                overview = overview[:200]
            fields = chapter_fields(title, overview, name)
            summ = summary_to_bullets(sum_map.get(key, ""))
            minutes = min(40, max(20, 16 + len(md) // 1200))
            chapters.append(
                {
                    "title": title,
                    "minutes": minutes,
                    "overviewText": overview,
                    "why": fields["why"],
                    "when": fields["when"],
                    "practical": fields["practical"],
                    "customSummary": summ,
                    "contentMarkdown": md,
                }
            )
            total += 1
        payload = {"partNo": part_no, "name": name, "chapters": chapters}
        path = OUT / f"p{part_no:02d}.json"
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {path.name} ({len(chapters)} chapters, {path.stat().st_size} bytes)")
    print(f"total {total}")


if __name__ == "__main__":
    main()
