"use client";

export const TESTING_TYPES_SLUGS = new Set([
  "testing-by-level",
  "testing-types",
  "testing-types-by-level",
  "testing-guide-part1",
]);

export function isTestingTypesSlug(slug?: string | null) {
  return Boolean(slug && TESTING_TYPES_SLUGS.has(slug));
}

/** Pixel-faithful host for the Part 1 HTML guide. */
export function TestingTypesGuide() {
  return (
    <div className="min-h-screen bg-[#12151b]">
      <iframe
        src="/guides/testing-types.html"
        title="Testing Types — Part 1: By Level"
        className="block w-full border-0 bg-[#12151b]"
        style={{ minHeight: "100vh", height: "100vh" }}
        onLoad={(e) => {
          const frame = e.currentTarget;
          const doc = frame.contentDocument;
          if (!doc) return;
          const apply = () => {
            frame.style.height = `${Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight, window.innerHeight)}px`;
          };
          apply();
          const ro = new ResizeObserver(apply);
          ro.observe(doc.documentElement);
        }}
      />
    </div>
  );
}
