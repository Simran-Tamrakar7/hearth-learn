import { automationManuals } from './manuals/automation-a.js'
import { automationManualsB } from './manuals/automation-b.js'
import { playwrightPythonManual } from './manuals/playwright-python.js'
import { designManuals } from './manuals/design.js'
import { designExtraManuals } from './manuals/design-extra.js'
import { foundationManuals } from './manuals/foundations.js'
import { aiManuals, softSkillManuals } from './manuals/ai-soft.js'
import { softExtraManuals } from './manuals/soft-extra.js'
import { qualityManuals } from './manuals/quality.js'
import { qaExtraManuals } from './manuals/qa-extra.js'
import { careerManuals } from './manuals/career.js'
import { deliveryManuals } from './manuals/delivery.js'
import { opsExtraManuals } from './manuals/ops-extra.js'
import { extrasPackManuals } from './manuals/extras-pack.js'
import { practicalPackManuals } from './manuals/practical-pack.js'
import { testingLevelsManual } from './manuals/testing-levels.js'

export const pathwiseManuals = [
  ...automationManuals,
  playwrightPythonManual,
  ...automationManualsB,
  ...qualityManuals,
  ...qaExtraManuals,
  testingLevelsManual,
  ...deliveryManuals,
  ...designManuals,
  ...designExtraManuals,
  ...aiManuals,
  ...foundationManuals,
  ...opsExtraManuals,
  ...careerManuals,
  ...softSkillManuals,
  ...softExtraManuals,
  ...extrasPackManuals,
  ...practicalPackManuals,
]
