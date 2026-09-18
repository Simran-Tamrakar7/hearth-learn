import type { ChapterRecord } from "../../../types";

/** 2.1 Recording a Test with the HTTP(S) Test Script Recorder */
export const chapter = {
  "id": "jm-2-1-recording-a-test-with-the-http-s-test-script-rec",
  "title": "2.1 Recording a Test with the HTTP(S) Test Script Recorder",
  "minutes": 28,
  "level": "beginner",
  "phase": "Part 2 · Building Your First Test",
  "partName": "Part 2 · Building Your First Test",
  "overviewText": "JMeter can generate a test plan by capturing every HTTP request your browser makes through a built-in proxy — similar in spirit to Playwright Codegen, but at the network layer, not the DOM. Recordings are noisy drafts: static assets, expired tokens, and hardcoded IDs must be cleaned before they are a real test.",
  "why": "A raw recording of 'submit one leave request' can produce 40+ samplers. Treating that dump as finished is how replay fails on the second run.",
  "when": "Scaffolding a multi-page HR dashboard flow you don't want to type by hand — then immediately filtering and correlating.",
  "practical": {
    "app": "HRM leave request in the browser",
    "scenario": "You start the recorder on port 8888 and browse login → leave apply.",
    "pass": "You install JMeter's CA for HTTPS, exclude .png/.css/.js, keep login/GET employee/POST leave, and plan Part 3/5 cleanup.",
    "fail": "You replay the raw recording with yesterday's session cookie and wonder why everything 401s."
  },
  "tools": [],
  "customSummary": "- HTTP(S) Test Script Recorder = built-in proxy that captures browser traffic into a test tree (like Playwright Codegen, but at the network layer, not the DOM layer).\n- Setup: add recorder element (default port 8888), route browser proxy through it, install JMeter's root CA cert for HTTPS.\n- Captures everything — including CSS, images, analytics — producing noisy raw output; use URL exclude patterns to pre-filter.\n- Treat recordings as a rough draft: manual cleanup, correlation (Part 5), and parameterization (Part 3) are almost always required afterward.",
  "contentMarkdown": "## Recorder as a proxy (not Codegen)\n\nJMeter offers a way to generate a test plan by literally browsing your application and having JMeter capture every HTTP request your browser makes — similar in spirit to Playwright's Codegen (`playwright codegen <url>`), which records your clicks and generates a script. In JMeter, this is done through the HTTP(S) Test Script Recorder, a built-in proxy server that sits between your browser and the target application, intercepting and logging every request that passes through.\n\n## Setup — port, browser proxy, HTTPS CA\n\nSetting it up involves a few pieces working together. First, you add an HTTP(S) Test Script Recorder element to your Test Plan (found under the \"Non-Test Elements\" section, since it's a design-time tool, not something that runs during a test). You configure a port (default 8888) for it to listen on. Then, you configure your actual browser to route its traffic through that proxy — setting the browser's (or system's) proxy settings to `localhost:8888`.\n\nFor HTTPS sites, you also need to install JMeter's self-signed root CA certificate into your browser's trusted certificate store (JMeter generates this cert automatically in its `bin` folder the first time you start the recorder), otherwise your browser will reject every HTTPS connection with a certificate warning — this step trips up a lot of beginners and is worth double-checking if recording produces zero captured requests.\n\n## Noise vs the three requests that matter\n\nOnce the proxy is running and your browser is routed through it, you simply use the application normally — log in, click through the HR dashboard, submit a leave request — and JMeter silently records every underlying HTTP request into a Thread Group in your test tree, complete with headers, cookies, and POST bodies. When you stop recording, you're left with a raw, literal transcript of everything your browser did, including a lot of noise: every CSS file, every image, every analytics beacon, every font request.\n\nThis is where recording differs meaningfully from Playwright Codegen in practical outcome: Codegen produces clean, semantic actions (`page.click('#submit')`) because it's listening to DOM events, not raw network traffic. JMeter's recorder captures the network layer wholesale, so a raw recording of \"submit one leave request\" might produce 40+ sampler nodes, of which maybe 3 (login POST, get-employee-data GET, submit-leave-request POST) actually matter for a performance test.\n\nCleaning this up — deleting static asset requests, keeping only the meaningful API calls — is a mandatory manual step after every recording session; you can pre-filter some of this noise using the recorder's built-in URL Patterns to Exclude field (e.g., excluding `.*\\.(png|jpg|css|js|woff2?)` patterns) so JMeter never captures them in the first place.\n\n## Draft, not a finished test\n\nRecording is genuinely useful for quickly scaffolding a realistic user flow through a complex multi-page application without hand-typing every endpoint, but it should be treated as a starting draft, not a finished test — you'll almost always need to manually add correlation (Part 5), parameterization (Part 3), and assertions (Part 4) afterward, since a raw recording just replays the exact same static requests your browser happened to send once, session tokens and all, which will fail the moment you replay it (expired token, hardcoded IDs that don't exist anymore, etc.).",
  "blocks": [
    {
      "id": "jm-2-1-md-0",
      "type": "overview",
      "heading": "Recorder as a proxy (not Codegen)",
      "content": "JMeter offers a way to generate a test plan by literally browsing your application and having JMeter capture every HTTP request your browser makes — similar in spirit to Playwright's Codegen (`playwright codegen <url>`), which records your clicks and generates a script. In JMeter, this is done through the HTTP(S) Test Script Recorder, a built-in proxy server that sits between your browser and the target application, intercepting and logging every request that passes through.",
      "order": 0
    },
    {
      "id": "jm-2-1-md-1",
      "type": "overview",
      "heading": "Setup — port, browser proxy, HTTPS CA",
      "content": "Setting it up involves a few pieces working together. First, you add an HTTP(S) Test Script Recorder element to your Test Plan (found under the \"Non-Test Elements\" section, since it's a design-time tool, not something that runs during a test). You configure a port (default 8888) for it to listen on. Then, you configure your actual browser to route its traffic through that proxy — setting the browser's (or system's) proxy settings to `localhost:8888`.\n\nFor HTTPS sites, you also need to install JMeter's self-signed root CA certificate into your browser's trusted certificate store (JMeter generates this cert automatically in its `bin` folder the first time you start the recorder), otherwise your browser will reject every HTTPS connection with a certificate warning — this step trips up a lot of beginners and is worth double-checking if recording produces zero captured requests.",
      "order": 1
    },
    {
      "id": "jm-2-1-md-2",
      "type": "overview",
      "heading": "Noise vs the three requests that matter",
      "content": "Once the proxy is running and your browser is routed through it, you simply use the application normally — log in, click through the HR dashboard, submit a leave request — and JMeter silently records every underlying HTTP request into a Thread Group in your test tree, complete with headers, cookies, and POST bodies. When you stop recording, you're left with a raw, literal transcript of everything your browser did, including a lot of noise: every CSS file, every image, every analytics beacon, every font request.\n\nThis is where recording differs meaningfully from Playwright Codegen in practical outcome: Codegen produces clean, semantic actions (`page.click('#submit')`) because it's listening to DOM events, not raw network traffic. JMeter's recorder captures the network layer wholesale, so a raw recording of \"submit one leave request\" might produce 40+ sampler nodes, of which maybe 3 (login POST, get-employee-data GET, submit-leave-request POST) actually matter for a performance test.\n\nCleaning this up — deleting static asset requests, keeping only the meaningful API calls — is a mandatory manual step after every recording session; you can pre-filter some of this noise using the recorder's built-in URL Patterns to Exclude field (e.g., excluding `.*\\.(png|jpg|css|js|woff2?)` patterns) so JMeter never captures them in the first place.",
      "order": 2
    },
    {
      "id": "jm-2-1-md-3",
      "type": "overview",
      "heading": "Draft, not a finished test",
      "content": "Recording is genuinely useful for quickly scaffolding a realistic user flow through a complex multi-page application without hand-typing every endpoint, but it should be treated as a starting draft, not a finished test — you'll almost always need to manually add correlation (Part 5), parameterization (Part 3), and assertions (Part 4) afterward, since a raw recording just replays the exact same static requests your browser happened to send once, session tokens and all, which will fail the moment you replay it (expired token, hardcoded IDs that don't exist anymore, etc.).",
      "order": 3
    }
  ],
  "advantages": [
    "2.1 Recording a Test with the HTTP(S) Test Script Recorder — A raw recording of 'submit one leave request' can produce 40+ samplers."
  ],
  "limitations": [
    "2.1 Recording a Test with the HTTP(S) Test Script Recorder is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
