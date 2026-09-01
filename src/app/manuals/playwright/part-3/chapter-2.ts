import type { ChapterRecord } from "../../types";

/** 13. Test Organization */
export const chapter = {
  "id": "pw-3-org",
  "title": "13. Test Organization",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python import pytest @pytest.mark.smoke def test_login_works(): ...\n\n## Overview\n\nMarkers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python\n\n...\n\n...\n\nbash\n\nCustom markers need to be registered in pytest.ini (Chapter 15) or pytest will emit a warning about unknown markers.\n\nWhat it does: Attaches a tag to a test function, usable later to filter which tests run. Types/params:\n\nPointers: Use consistent, small marker vocabulary across the team (smoke, regression, critical) rather than ad-hoc one-off tags — otherwise -m filtering becomes unreliable. Parametrized tests Instead of writing near-identical test functions for different inputs, parametrize one test function to run multiple times with different data. python\n\n(\"\", \"validpass\", \"Username is required\"),\n\n(\"validuser\", \"\", \"Password is required\"),\n\n(\"validuser\", \"wrongpass\", \"Invalid credentials\"),\n\n])\n\nThis runs as three separate test cases in the report, each clearly showing which input combination passed/failed — far more maintainable than three nearly-identical copy-pasted test functions.\n\n## Overview (2)\n\nWhat it does: Runs the same test function once per set of provided argument values. Types/params:\n\nfunction will receive, e.g. \"username,password,expected_error\"\n\nPointers: Each parameter set shows up as a distinct test in reports (e.g., test_login_validation[validuser-wrongpass-Invalid credentials]), making failures easy to pinpoint to a specific data combination. Grouping/tagging tests (smoke, regression) Beyond individual markers, teams typically organize entire folders by test type or feature area:\n\ntests/\n\n├── smoke/\n\n│ └── test_critical_paths.py\n\n├── regression/\n\n│ └── test_edge_cases.py\n\n└── modules/\n\n├── test_leave_management.py\n\n└── test_attendance.py\n\nCombined with markers, this gives two independent ways to slice the suite — by folder (pytest tests/smoke/) or by tag (pytest -m smoke) — useful since a \"smoke\" test might live logically inside a feature folder but still need to run as part of a fast pre-deploy check.\n\n## Overview\n\n\n\n```\ndef test_login_validation(page, username, password, expected_error):\n\npage.get_by_label(\"Username\").fill(username)\n\npage.get_by_label(\"Password\").fill(password)\n\npage.get_by_role(\"button\", name=\"Log in\").click()\n\nexpect(page.get_by_text(expected_error)).to_be_visible()\n\npytest -m smoke        # run only smoke-tagged tests\n\npytest -m \"not regression\"   # run everything except regression tests\n\n@pytest.mark.regression\n\ndef test_edge_case_special_characters_in_username():\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
