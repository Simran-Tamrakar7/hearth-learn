export const meta = {
  id: "crisis",
  title: "P0 Outage War Room",
  description: "Pick a response to a production incident and read the postmortem.",
  icon: "shield",
};

export const crisisScenarios = [
  {
    id: "c1",
    title: "Production Postgres DB Connection Lock on Black Friday",
    desc: "Primary database connection pool exhausted at 4,000 req/sec peak. Read queries blocking write transactions.",
    options: [
      "Failover to read replica immediately and enable query caching in Redis.",
      "Restart primary database server to drop all active socket connections.",
      "Roll back recent migration script and disable new user registrations.",
    ],
    bestIndex: 0,
    postMortem: "Read replica failover restored write availability in 42 seconds. Redis query caching dropped DB load by 68%.",
  },
  {
    id: "c2",
    title: "Critical Zero-Day JWT Auth Bypass Exploit Discovered",
    desc: "Security researcher reported an unauthenticated JWT signature verification flaw via algorithm 'none'.",
    options: [
      "Rotate JWT signing keys, enforce HS256 algorithm validation, and revoke active sessions.",
      "Block client IP addresses sending suspicious requests via Cloudflare WAF.",
      "Send email blast to all registered users requesting password resets.",
    ],
    bestIndex: 0,
    postMortem: "Enforcing HS256 algorithm validation patched the vulnerability across all microservices instantly.",
  },
  {
    id: "c3",
    title: "AWS US-East-1 S3 Outage Blocking Image Uploads",
    desc: "Primary cloud storage bucket returning HTTP 503 Service Unavailable errors for user image assets.",
    options: [
      "Switch image storage route to fallback EU region multi-bucket CDN with automatic retry.",
      "Disable image upload functionality until AWS resolves regional outage.",
      "Increase HTTP client timeout from 5 seconds to 60 seconds.",
    ],
    bestIndex: 0,
    postMortem: "Multi-region CDN failover routed uploads seamlessly, avoiding user downtime.",
  },
];
