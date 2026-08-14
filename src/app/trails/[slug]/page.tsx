"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RedirectTrailsSlugToManuals() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug) {
      router.replace(`/manuals/${slug}`);
    } else {
      router.replace("/manuals");
    }
  }, [router, slug]);

  return null;
}
