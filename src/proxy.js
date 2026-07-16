import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const COOKIE_NAME = "scs_admin_token";

const REDIRECT_MAP = {
  "/admin/admin": "/admin/users",
  "/admin/project": "/admin/projects",
  "/admin/partner": "/admin/partners",
  "/admin/statistic": "/admin/statistics",
  "/admin/setting": "/admin/settings",
  "/api/project": "/api/projects",
  "/api/partner": "/api/partners",
  "/api/statistic": "/api/statistics",
  "/api/setting": "/api/settings",
};

function tryRedirect(pathname, request) {
  for (const [oldPrefix, newPrefix] of Object.entries(REDIRECT_MAP)) {
    if (pathname === oldPrefix || pathname.startsWith(oldPrefix + "/")) {
      const newPath = pathname.replace(oldPrefix, newPrefix);
      return NextResponse.redirect(new URL(newPath, request.url), 308);
    }
  }
  return null;
}

// KOREKSI: Gunakan fungsi proxy sesuai konvensi Next.js 16+
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const redirect = tryRedirect(pathname, request);
  if (redirect) return redirect;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (payload.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Tetap pertahankan penambahan /api/:path* pada matcher
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
