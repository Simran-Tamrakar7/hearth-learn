export const meta = {
  id: "system-design-math",
  title: "System Design Latency & Scale Cheat Sheet",
  description: "Quick back-of-the-envelope calculations for system architecture interviews & planning.",
  icon: "cpu",
  category: "Architecture",
};

export const snippet = `// Latency Numbers Every Engineer Should Know:
- L1 Cache Reference: 0.5 ns
- Main Memory (RAM) Read: 100 ns
- NVMe SSD Read: 150 µs
- Round-Trip Data Center RTT: 500 µs
- Packet RTT US East to US West: 150 ms

// Scale Conversions:
- 1 Million DAU = ~12 Requests / Sec (Average)
- 10 Million DAU = ~120 Requests / Sec
- 100 Million DAU = ~1,200 Requests / Sec`;
