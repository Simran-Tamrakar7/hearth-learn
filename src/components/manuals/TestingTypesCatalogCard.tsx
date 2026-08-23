"use client";

import Link from "next/link";

const FONT =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";

export function TestingTypesCatalogCard() {
  return (
    <section>
      <link rel="stylesheet" href={FONT} />
      <Link
        href="/manuals/testing-types"
        className="block overflow-hidden rounded-[14px] no-underline transition-transform hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(180deg, #171b23, #171b23 60%, #15181f)",
          border: "1px solid #272e39",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="px-7 py-8 sm:px-8">
          <div
            className="mb-4 flex items-center gap-2.5 uppercase"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12.5,
              letterSpacing: "0.14em",
              color: "#e8a33d",
            }}
          >
            <span
              className="inline-block h-[7px] w-[7px] rounded-full"
              style={{ background: "#4fd68a", boxShadow: "0 0 0 3px rgba(79,214,138,0.15)" }}
            />
            Software Testing Reference · Part 1 of N
          </div>
          <h2
            className="m-0 mb-3 tracking-tight"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#fff",
            }}
          >
            Testing by Level
          </h2>
          <p className="m-0 mb-6 max-w-[60ch]" style={{ color: "#8a93a6", fontSize: 16.5, lineHeight: 1.6 }}>
            The four levels that carry an application from a single function to a signed-off release — why each one
            matters, the free tools teams use, how to run them, and where each tool falls short.
          </p>
          <div
            className="flex border-t border-b"
            style={{ borderColor: "#272e39", fontFamily: "JetBrains Mono, monospace", fontSize: 12.5 }}
          >
            {[
              ["04", "Chapters"],
              ["10", "Tools covered"],
              ["By Level", "Category"],
              ["Free", "Tool tier"],
            ].map(([n, l], i) => (
              <div
                key={l}
                className="flex-1 py-3.5"
                style={{ borderRight: i < 3 ? "1px solid #272e39" : undefined }}
              >
                <span className="mb-0.5 block font-semibold" style={{ color: "#e7e9ee", fontSize: 17 }}>
                  {n}
                </span>
                <span className="uppercase" style={{ color: "#5c6577", letterSpacing: "0.06em" }}>
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
