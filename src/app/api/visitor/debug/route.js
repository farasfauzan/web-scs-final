import { NextResponse } from "next/server";

const SENSITIVE_HEADERS = new Set([
  "cookie",
  "authorization",
  "x-api-key",
  "x-auth-token",
  "proxy-authorization",
  "set-cookie",
]);

export async function GET(request) {
  const rawHeaders = Object.fromEntries(request.headers.entries());

  // Filter out sensitive headers
  const safeHeaders = {};
  for (const [key, value] of Object.entries(rawHeaders)) {
    if (!SENSITIVE_HEADERS.has(key)) {
      safeHeaders[key] = value;
    }
  }

  // Replicate the exact IP detection logic from the track endpoint
  const forwarded = request.headers.get("x-forwarded-for");
  const detectedIp = request.headers.get("cf-connecting-ip")
    || forwarded?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "127.0.0.1";

  // Collect only the headers relevant for IP detection
  const ipHeaders = {
    "cf-connecting-ip": rawHeaders["cf-connecting-ip"] || "(not set)",
    "x-forwarded-for": rawHeaders["x-forwarded-for"] || "(not set)",
    "x-real-ip": rawHeaders["x-real-ip"] || "(not set)",
    "x-forwarded-proto": rawHeaders["x-forwarded-proto"] || "(not set)",
    "x-forwarded-host": rawHeaders["x-forwarded-host"] || "(not set)",
  };

  return NextResponse.json({
    detectedIp,
    ipHeaders,
    allHeaders: safeHeaders,
    userAgent: rawHeaders["user-agent"] || "(not set)",
    method: request.method,
    url: request.url,
  });
}
