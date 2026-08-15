import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Try ZenQuotes API first
    const res = await fetch("https://zenquotes.io/api/today", {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].q) {
        return NextResponse.json({
          quote: data[0].q,
          author: data[0].a || "Unknown",
          source: "ZenQuotes Live API",
        });
      }
    }
  } catch (err) {
    console.error("ZenQuotes fetch error:", err);
  }

  try {
    // Fallback 1: DummyJSON Quotes API
    const res2 = await fetch("https://dummyjson.com/quotes/random", {
      cache: "no-store",
    });

    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.quote) {
        return NextResponse.json({
          quote: data2.quote,
          author: data2.author || "Unknown",
          source: "DummyJSON Live API",
        });
      }
    }
  } catch (err2) {
    console.error("DummyJSON fetch error:", err2);
  }

  return NextResponse.json({
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    source: "Hearth Wisdom",
  });
}
