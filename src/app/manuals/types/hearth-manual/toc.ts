/* Hearth repository manual TOC — ordering only. Content in part-N/chapter-M.ts */

export const HEARTH_MANUAL_TOC_VERSION = 2;

export type HearthManualTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const HEARTH_MANUAL_TOC: HearthManualTocPart[] = [
  {
    "partNo": 1,
    "name": "Overview",
    "items": [
      {
        "title": "1.1 What Hearth Is"
      },
      {
        "title": "1.2 Architecture"
      },
      {
        "title": "1.3 Tech Stack"
      }
    ]
  },
  {
    "partNo": 2,
    "name": "Getting Started",
    "items": [
      {
        "title": "2.1 Prerequisites & Local Setup"
      },
      {
        "title": "2.2 Environment Variables"
      },
      {
        "title": "2.3 Running the Project"
      },
      {
        "title": "2.4 Local Data"
      }
    ]
  },
  {
    "partNo": 3,
    "name": "Codebase Map",
    "items": [
      {
        "title": "3.1 Folder-Level Map"
      },
      {
        "title": "3.2 File-Level Reference (Key Files)"
      },
      {
        "title": "3.3 Dead Code & TODOs"
      },
      {
        "title": "3.4 Start Here Lookup Table"
      }
    ]
  },
  {
    "partNo": 4,
    "name": "Features",
    "items": [
      {
        "title": "4.1 Manuals"
      },
      {
        "title": "4.2 Dashboard"
      },
      {
        "title": "4.3 Prisma Trails & Progress"
      },
      {
        "title": "4.4 Streaks & Badges"
      },
      {
        "title": "4.5 Library"
      },
      {
        "title": "4.6 Toolkits"
      },
      {
        "title": "4.7 Life Lab"
      },
      {
        "title": "4.8 Break Room"
      },
      {
        "title": "4.9 Notes & Tags"
      },
      {
        "title": "4.10 AI Coach & CV"
      },
      {
        "title": "4.11 Showcase Wall"
      },
      {
        "title": "4.12 Auth & Profile"
      },
      {
        "title": "4.13 Settings & Admin"
      },
      {
        "title": "4.14 Certificates"
      }
    ]
  },
  {
    "partNo": 5,
    "name": "Data Model",
    "items": [
      {
        "title": "5.1 Entities"
      },
      {
        "title": "5.2 Relationships"
      }
    ]
  },
  {
    "partNo": 6,
    "name": "API Reference",
    "items": [
      {
        "title": "6.1 Route Index"
      },
      {
        "title": "6.2 Route Details (Patterns)"
      }
    ]
  },
  {
    "partNo": 7,
    "name": "User FAQ",
    "items": [
      {
        "title": "7.1 Account & Access"
      },
      {
        "title": "7.2 Manuals & Progress"
      },
      {
        "title": "7.3 Streaks & Habit Tracking"
      }
    ]
  },
  {
    "partNo": 8,
    "name": "Contributing",
    "items": [
      {
        "title": "8.1 Conventions"
      },
      {
        "title": "8.2 Adding Manuals & Content Types"
      },
      {
        "title": "8.3 PR Checklist"
      }
    ]
  },
  {
    "partNo": 9,
    "name": "Meta",
    "items": [
      {
        "title": "9.1 What This Process Is"
      },
      {
        "title": "9.2 When to Run It"
      },
      {
        "title": "9.3 What the Prompt Must Specify"
      },
      {
        "title": "9.4 The Reusable Prompt Template (Original Thread)"
      },
      {
        "title": "9.5 Maintenance Notes"
      }
    ]
  }
];
