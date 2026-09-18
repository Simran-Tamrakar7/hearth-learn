import type { ChapterRecord } from "../../../types";

/** 9.1 Master-Slave (Controller-Agent) Setup */
export const chapter = {
  "id": "jm-9-1-master-slave-controller-agent-setup",
  "title": "9.1 Master-Slave (Controller-Agent) Setup",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 9 · Distributed Testing",
  "partName": "Part 9 · Distributed Testing",
  "overviewText": "One machine has a CPU/memory/socket ceiling. Distributed JMeter uses a controller that orchestrates and agents that generate traffic via jmeter-server (RMI). The test plan design does not change — only where load originates. Needs network, firewall, clock sync. Always CLI, never GUI.",
  "why": "Thousands of users on a laptop measures the laptop. Controller-agent is how you spread generation without redesigning samplers.",
  "when": "Target concurrency exceeds one box, or CI cannot host the load generators.",
  "practical": {
    "app": "Three VMs in the same VPC as staging HRM",
    "scenario": "Need 3,000 threads without melting the controller laptop.",
    "pass": "You run jmeter-server on agents, set remote_hosts, start from CLI; agents can reach the target; clocks are synced.",
    "fail": "You add agents but run the test in GUI, or agents cannot route to the HRM host."
  },
  "tools": [],
  "customSummary": "- Single machine has a hard ceiling on virtual users it can simulate (CPU, memory, network, socket limits) — distributed testing spreads load generation across multiple machines.\n- Controller/master orchestrates and aggregates results; agents/slaves (\"controller-agent\" in newer docs) generate actual traffic on instruction.\n- Test plan design itself doesn't change — only where the load originates from.\n- Setup: jmeter-server on each agent (listens via RMI), controller specifies agent IPs via remote_hosts in jmeter.properties or at runtime.\n- Requires real infrastructure planning: network reachability, firewall rules, clock sync across machines.\n- Always run via CLI/non-GUI mode — never combined with GUI mode in real practice.",
  "contentMarkdown": "## Why one machine is not enough\n\nEvery load test discussed so far has implicitly assumed a single machine generating all the traffic — but a single machine has a hard ceiling on how many virtual users it can realistically simulate, limited by its own CPU, memory, network bandwidth, and even OS-level constraints like the number of open file descriptors/sockets it can maintain simultaneously. If your target load genuinely requires thousands of concurrent virtual users, one machine running JMeter may itself become the bottleneck — the exact \"the tool is measuring its own limits, not the server's\" problem flagged repeatedly since Part 0 — long before your actual target system shows any strain. Distributed testing solves this by spreading load generation across multiple machines working together.\n\n## Controller and agents\n\nJMeter's architecture for this is commonly (if now somewhat dated in terminology) called master-slave, though current Apache documentation increasingly uses controller-agent language for the same concept — one machine (the controller/master) orchestrates the test and collects results, while one or more other machines (agents/slaves) actually generate the traffic on the controller's instruction, all hitting the same target system simultaneously. From the controller's perspective, you build and configure your test plan exactly as covered throughout this entire manual — Thread Groups, samplers, assertions, all of it — the distributed setup changes where the load actually originates from, not how you design the test itself.\n\n## jmeter-server and remote_hosts\n\nSetting this up involves running JMeter in a special server mode on each agent machine (via the `jmeter-server` script included in JMeter's `bin` folder), which starts a listening RMI (Remote Method Invocation) service that the controller connects to. On the controller side, you specify the IP addresses/hostnames of your agent machines (either in JMeter's `jmeter.properties` file under `remote_hosts`, or passed at runtime), and when you start the test from the controller, it pushes the test plan out to every configured agent, each of which then runs its own portion of the specified thread count and streams results back to the controller for aggregation.\n\n```\n# Example jmeter.properties config on controller:\nremote_hosts=192.168.1.101,192.168.1.102,192.168.1.103\n\n# On each agent machine, start server mode:\n./jmeter-server\n```\n\n## Infrastructure realities\n\nA few practical realities matter here. Network topology: all agent machines need to be able to reach the target system (obviously) and the controller needs to be able to reach the agents on the RMI ports — this often means running agents in the same cloud region/VPC as intended, or opening specific firewall rules, which is more infrastructure work than anything covered in earlier parts of this manual. Clock synchronization across machines matters for result accuracy, since timestamps from different agents need to align meaningfully when aggregated. And critically, this entire setup is still typically run via CLI/non-GUI mode (the subject of Chapter 2) rather than through the graphical interface — distributed testing and GUI-mode testing are essentially never combined in real practice, since the entire point of distributed testing is generating serious load, and Part 0's \"never run real load through the GUI\" rule applies with even more force once you're coordinating multiple machines.",
  "blocks": [
    {
      "id": "jm-9-1-md-0",
      "type": "overview",
      "heading": "Why one machine is not enough",
      "content": "Every load test discussed so far has implicitly assumed a single machine generating all the traffic — but a single machine has a hard ceiling on how many virtual users it can realistically simulate, limited by its own CPU, memory, network bandwidth, and even OS-level constraints like the number of open file descriptors/sockets it can maintain simultaneously. If your target load genuinely requires thousands of concurrent virtual users, one machine running JMeter may itself become the bottleneck — the exact \"the tool is measuring its own limits, not the server's\" problem flagged repeatedly since Part 0 — long before your actual target system shows any strain. Distributed testing solves this by spreading load generation across multiple machines working together.",
      "order": 0
    },
    {
      "id": "jm-9-1-md-1",
      "type": "overview",
      "heading": "Controller and agents",
      "content": "JMeter's architecture for this is commonly (if now somewhat dated in terminology) called master-slave, though current Apache documentation increasingly uses controller-agent language for the same concept — one machine (the controller/master) orchestrates the test and collects results, while one or more other machines (agents/slaves) actually generate the traffic on the controller's instruction, all hitting the same target system simultaneously. From the controller's perspective, you build and configure your test plan exactly as covered throughout this entire manual — Thread Groups, samplers, assertions, all of it — the distributed setup changes where the load actually originates from, not how you design the test itself.",
      "order": 1
    },
    {
      "id": "jm-9-1-md-2",
      "type": "overview",
      "heading": "jmeter-server and remote_hosts",
      "content": "Setting this up involves running JMeter in a special server mode on each agent machine (via the `jmeter-server` script included in JMeter's `bin` folder), which starts a listening RMI (Remote Method Invocation) service that the controller connects to. On the controller side, you specify the IP addresses/hostnames of your agent machines (either in JMeter's `jmeter.properties` file under `remote_hosts`, or passed at runtime), and when you start the test from the controller, it pushes the test plan out to every configured agent, each of which then runs its own portion of the specified thread count and streams results back to the controller for aggregation.\n\n```\n# Example jmeter.properties config on controller:\nremote_hosts=192.168.1.101,192.168.1.102,192.168.1.103\n\n# On each agent machine, start server mode:\n./jmeter-server\n```",
      "order": 2
    },
    {
      "id": "jm-9-1-md-3",
      "type": "overview",
      "heading": "Infrastructure realities",
      "content": "A few practical realities matter here. Network topology: all agent machines need to be able to reach the target system (obviously) and the controller needs to be able to reach the agents on the RMI ports — this often means running agents in the same cloud region/VPC as intended, or opening specific firewall rules, which is more infrastructure work than anything covered in earlier parts of this manual. Clock synchronization across machines matters for result accuracy, since timestamps from different agents need to align meaningfully when aggregated. And critically, this entire setup is still typically run via CLI/non-GUI mode (the subject of Chapter 2) rather than through the graphical interface — distributed testing and GUI-mode testing are essentially never combined in real practice, since the entire point of distributed testing is generating serious load, and Part 0's \"never run real load through the GUI\" rule applies with even more force once you're coordinating multiple machines.",
      "order": 3
    }
  ],
  "advantages": [
    "9.1 Master-Slave (Controller-Agent) Setup — Thousands of users on a laptop measures the laptop."
  ],
  "limitations": [
    "9.1 Master-Slave (Controller-Agent) Setup is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
