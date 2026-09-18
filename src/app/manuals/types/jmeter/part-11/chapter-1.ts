import type { ChapterRecord } from "../../../types";

/** 11.1 Running JMeter from Command Line in Pipelines */
export const chapter = {
  "id": "jm-11-1-running-jmeter-from-command-line-in-pipelines",
  "title": "11.1 Running JMeter from Command Line in Pipelines",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "CLI is what makes CI possible. Runners need JDK + JMeter (often Docker). -J overrides properties so one .jmx serves PR smoke (10 threads) vs nightly (500) via ${__P(threads,50)}. Standard GitHub/Jenkins runners are too small for serious load — dedicated VMs or Part 9 agents.",
  "why": "A 500-thread test on a shared Actions runner is Part 0's bottleneck relocated. Properties are not CSV variables.",
  "when": "Adding a performance step next to Playwright; parameterizing thread count per pipeline.",
  "practical": {
    "app": "leave_request_load_test.jmx in CI",
    "scenario": "Smoke on PR, full load nightly, same file.",
    "pass": "You use ${__P(threads,50)} in the Thread Group and -Jthreads=10 vs 500; heavy runs SSH to load infra.",
    "fail": "You run 2,000 threads on the default GitHub-hosted runner."
  },
  "tools": [],
  "customSummary": "- CLI mode (Part 9) is what makes CI integration possible at all — same principle as running npx playwright test in a pipeline.\n- Requires Java + JMeter on the runner, often containerized (Docker image with JMeter pre-installed).\n- -J flags override JMeter Properties at runtime (distinct from request-data ${variables}), letting one .jmx file serve different scenarios (PR smoke test vs. nightly full load test) via ${__P(name,default)} references.\n- Standard CI runners are usually fine for lightweight smoke-level checks but under-resourced for genuine heavy load tests — use dedicated infrastructure or trigger distributed testing (Part 9) from the pipeline for real load.",
  "contentMarkdown": "## Pipelines are unattended CLI\n\nEverything established in Part 9's CLI mode discussion is what makes CI/CD integration possible at all — a tool that only worked through a graphical interface simply couldn't be automated inside a pipeline, since pipelines are, by definition, unattended, scripted processes with no human present to click buttons. Because JMeter's real execution path (`jmeter -n -t test_plan.jmx -l results.jtl -e -o /report`) is just a command with flags, it slots into a CI/CD pipeline exactly the same way any other command-line test runner would — conceptually identical to how you'd already run `npx playwright test` as a pipeline step, just testing a fundamentally different dimension of the system (performance under load, rather than functional correctness).\n\nThe practical setup requires a CI runner environment that has Java installed (recall Part 0 Chapter 2's JDK requirement) and either JMeter itself installed on the runner image, or JMeter downloaded/unpacked as a pipeline step before the test runs — many teams containerize this, using a Docker image with JMeter pre-installed, so the pipeline step is simply \"run this container with my `.jmx` file mounted in\" rather than managing JMeter installation as a separate concern on every runner.\n\n```bash\n# Example pipeline step\nmkdir -p results\njmeter -n -t leave_request_load_test.jmx \\\n  -l results/results.jtl \\\n  -e -o results/dashboard \\\n  -Jthreads=100 \\\n  -Jrampup=60 \\\n  -Jduration=300\n```\n\n## -J properties vs ${variables}\n\nThe `-J` flags deserve explanation, since they're specifically valuable in a CI context: they let you override JMeter Properties (distinct from the `${variable}` substitution syntax used throughout this manual for request data) at the command line, meaning your `.jmx` test plan can be built once with property references like `${__P(threads,50)}` (read a property named \"threads,\" defaulting to 50 if not supplied) in the Thread Group's thread count field, and different pipeline runs can pass different values — a lightweight smoke-level load test on every pull request (`-Jthreads=10`) versus a full nightly load test (`-Jthreads=500`) — without maintaining separate `.jmx` files for each scenario.\n\nThis pattern of parameterizing the test plan itself, rather than the request data (which Part 3's CSV Data Set Config already handles), is what makes a single test plan genuinely reusable across different pipeline contexts and environments (staging vs. production-like load environments, in particular) — directly extending the \"centralize configuration, don't hardcode\" theme that's run through HTTP Request Defaults (Part 3), User Defined Variables (Part 3), and now pipeline-level property overrides here.\n\n## Don't melt the runner\n\nA realistic constraint worth naming honestly: most standard CI runners (GitHub Actions default runners, typical Jenkins agents) are modestly resourced shared machines, not built for generating serious concurrent load — running a genuinely heavy load test (hundreds or thousands of threads) directly on a standard CI runner risks the exact \"the tool becomes its own bottleneck\" problem from Part 0 and Part 9, just relocated to underpowered CI infrastructure instead of a developer's laptop. For lightweight smoke-level performance checks on every commit, a standard runner is usually fine; for genuine full-scale load tests, teams typically either use a dedicated, appropriately-resourced runner/VM, or trigger the distributed controller-agent setup from Part 9 from within the pipeline (the pipeline step becomes \"SSH into pre-provisioned load-generation infrastructure and kick off the distributed test\" rather than running JMeter directly on the CI runner itself).",
  "blocks": [
    {
      "id": "jm-11-1-md-0",
      "type": "overview",
      "heading": "Pipelines are unattended CLI",
      "content": "Everything established in Part 9's CLI mode discussion is what makes CI/CD integration possible at all — a tool that only worked through a graphical interface simply couldn't be automated inside a pipeline, since pipelines are, by definition, unattended, scripted processes with no human present to click buttons. Because JMeter's real execution path (`jmeter -n -t test_plan.jmx -l results.jtl -e -o /report`) is just a command with flags, it slots into a CI/CD pipeline exactly the same way any other command-line test runner would — conceptually identical to how you'd already run `npx playwright test` as a pipeline step, just testing a fundamentally different dimension of the system (performance under load, rather than functional correctness).\n\nThe practical setup requires a CI runner environment that has Java installed (recall Part 0 Chapter 2's JDK requirement) and either JMeter itself installed on the runner image, or JMeter downloaded/unpacked as a pipeline step before the test runs — many teams containerize this, using a Docker image with JMeter pre-installed, so the pipeline step is simply \"run this container with my `.jmx` file mounted in\" rather than managing JMeter installation as a separate concern on every runner.\n\n```bash\n# Example pipeline step\nmkdir -p results\njmeter -n -t leave_request_load_test.jmx \\\n  -l results/results.jtl \\\n  -e -o results/dashboard \\\n  -Jthreads=100 \\\n  -Jrampup=60 \\\n  -Jduration=300\n```",
      "order": 0
    },
    {
      "id": "jm-11-1-md-1",
      "type": "overview",
      "heading": "-J properties vs ${variables}",
      "content": "The `-J` flags deserve explanation, since they're specifically valuable in a CI context: they let you override JMeter Properties (distinct from the `${variable}` substitution syntax used throughout this manual for request data) at the command line, meaning your `.jmx` test plan can be built once with property references like `${__P(threads,50)}` (read a property named \"threads,\" defaulting to 50 if not supplied) in the Thread Group's thread count field, and different pipeline runs can pass different values — a lightweight smoke-level load test on every pull request (`-Jthreads=10`) versus a full nightly load test (`-Jthreads=500`) — without maintaining separate `.jmx` files for each scenario.\n\nThis pattern of parameterizing the test plan itself, rather than the request data (which Part 3's CSV Data Set Config already handles), is what makes a single test plan genuinely reusable across different pipeline contexts and environments (staging vs. production-like load environments, in particular) — directly extending the \"centralize configuration, don't hardcode\" theme that's run through HTTP Request Defaults (Part 3), User Defined Variables (Part 3), and now pipeline-level property overrides here.",
      "order": 1
    },
    {
      "id": "jm-11-1-md-2",
      "type": "overview",
      "heading": "Don't melt the runner",
      "content": "A realistic constraint worth naming honestly: most standard CI runners (GitHub Actions default runners, typical Jenkins agents) are modestly resourced shared machines, not built for generating serious concurrent load — running a genuinely heavy load test (hundreds or thousands of threads) directly on a standard CI runner risks the exact \"the tool becomes its own bottleneck\" problem from Part 0 and Part 9, just relocated to underpowered CI infrastructure instead of a developer's laptop. For lightweight smoke-level performance checks on every commit, a standard runner is usually fine; for genuine full-scale load tests, teams typically either use a dedicated, appropriately-resourced runner/VM, or trigger the distributed controller-agent setup from Part 9 from within the pipeline (the pipeline step becomes \"SSH into pre-provisioned load-generation infrastructure and kick off the distributed test\" rather than running JMeter directly on the CI runner itself).",
      "order": 2
    }
  ],
  "advantages": [
    "11.1 Running JMeter from Command Line in Pipelines — A 500-thread test on a shared Actions runner is Part 0's bottleneck relocated."
  ],
  "limitations": [
    "11.1 Running JMeter from Command Line in Pipelines is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
