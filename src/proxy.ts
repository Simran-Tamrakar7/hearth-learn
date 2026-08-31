import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PREFIXES = ["/login", "/signup", "/forgot-password", "/reset-password", "/api/auth"];

function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const secret = process.env.NEXTAUTH_SECRET || "hearth-secret-key-2026-super-secure";
  const token = await getToken({ req: request, secret });

  if (isPublic(pathname)) {
    if (token && (pathname === "/login" || pathname === "/signup") && !request.nextUrl.searchParams.get("pending")) {
      if (pathname === "/login" && request.nextUrl.searchParams.get("reset")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (token.status && token.status !== "ACTIVE") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set(token.status === "REJECTED" ? "rejected" : "pending", "1");
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard?unauthorized=1", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
