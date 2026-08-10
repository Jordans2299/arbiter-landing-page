"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { configure, track } from "flux-analytics-js";

const endpoint = "https://analytics-api-production-56d7.up.railway.app/v1";
const appStorePath = "/us/app/arbiter-offline-private-ai/id6747954532";

const pageViewEvents: Record<string, string> = {
  "/benchmarks": "benchmarks_viewed",
  "/documentation": "documentation_viewed",
  "/blog": "blog_viewed",
};

function trackedLinkEvent(link: HTMLAnchorElement): string | null {
  const url = new URL(link.href, window.location.href);

  if (url.hostname === "apps.apple.com" && url.pathname === appStorePath) {
    return "first_value_completed";
  }

  if (
    url.hostname === "twitter.com" ||
    url.hostname === "www.twitter.com" ||
    url.hostname === "x.com" ||
    url.hostname === "www.x.com"
  ) {
    return "twitter_clicked";
  }

  return null;
}

export default function FluxAnalytics({ projectKey }: { projectKey: string }) {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    configure(projectKey, {
      endpoint,
      appVersion: "1.0.0",
    });

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const eventName = trackedLinkEvent(link);
      if (eventName) track(eventName);
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [projectKey]);

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const eventName = pageViewEvents[normalizedPath];

    if (lastTrackedPath.current === normalizedPath) return;

    lastTrackedPath.current = normalizedPath;
    if (eventName) track(eventName);
  }, [pathname]);

  return null;
}
