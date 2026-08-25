/* ============================================================================
 * HEADING: SHARED — Root layout
 * Not a page. These pages all use this same file:
 *   EVERY page
 * Fonts + Providers. Nav is Navbar.tsx. Styles: globals.css
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Hearth — Personal Skill Trails & Daily Learning Habit",
  description:
    "A calm, self-paced learning cabin for acquiring technical & career skills with structured bite-sized trails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#FBF8F3] text-[#1C2A26] selection:bg-[#FDE68A] selection:text-[#1C2A26]" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
