"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Use sendBeacon so tracking doesn't block page rendering
    const track = () => {
      try {
        navigator.sendBeacon("/api/visitor/track", JSON.stringify({}));
      } catch {
        // Fallback to fetch if sendBeacon is not available
        fetch("/api/visitor/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }).catch(() => {});
      }
    };

    // Only track on initial page load (not on client-side navigation)
    let shouldTrack = true;
    try {
      shouldTrack = !sessionStorage.getItem("visitor_tracked");
    } catch {
      // sessionStorage might be blocked (incognito, permissions)
    }

    if (shouldTrack) {
      track();
      try {
        sessionStorage.setItem("visitor_tracked", "1");
      } catch {
        // Silently ignore if sessionStorage is unavailable
      }
    }
  }, []);

  return null;
}
