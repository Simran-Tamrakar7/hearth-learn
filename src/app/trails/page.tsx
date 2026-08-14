"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectTrailsToManuals() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/manuals");
  }, [router]);

  return null;
}
