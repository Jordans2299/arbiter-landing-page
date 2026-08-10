import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FluxAnalytics from "./FluxAnalytics";

const { configureMock, route, trackMock } = vi.hoisted(() => ({
  configureMock: vi.fn(),
  route: { pathname: "/" },
  trackMock: vi.fn(),
}));

vi.mock("flux-analytics-js", () => ({
  configure: configureMock,
  track: trackMock,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
}));

describe("FluxAnalytics", () => {
  beforeEach(() => {
    configureMock.mockClear();
    trackMock.mockClear();
    route.pathname = "/";
  });

  it("configures Flux and tracks the App Store click as activation", () => {
    render(
      <>
        <FluxAnalytics projectKey="development-key" />
        <a
          href="https://apps.apple.com/us/app/arbiter-offline-private-ai/id6747954532"
          onClick={(event) => event.preventDefault()}
        >
          <span>Download Arbiter</span>
        </a>
      </>,
    );

    expect(configureMock).toHaveBeenCalledWith("development-key", {
      endpoint: "https://analytics-api-production-56d7.up.railway.app/v1",
      appVersion: "1.0.0",
    });

    fireEvent.click(screen.getByText("Download Arbiter"));

    expect(trackMock).toHaveBeenCalledWith("first_value_completed");
  });

  it("tracks Twitter and X links", () => {
    render(
      <>
        <FluxAnalytics projectKey="development-key" />
        <a href="https://twitter.com/askarbiter" onClick={(event) => event.preventDefault()}>Twitter</a>
        <a href="https://x.com/askarbiter" onClick={(event) => event.preventDefault()}>X</a>
      </>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Twitter" }));
    fireEvent.click(screen.getByRole("link", { name: "X" }));

    expect(trackMock).toHaveBeenNthCalledWith(1, "twitter_clicked");
    expect(trackMock).toHaveBeenNthCalledWith(2, "twitter_clicked");
  });

  it.each([
    ["/benchmarks", "benchmarks_viewed"],
    ["/documentation", "documentation_viewed"],
    ["/blog", "blog_viewed"],
  ])("tracks a view of %s", (pathname, eventName) => {
    route.pathname = pathname;

    render(<FluxAnalytics projectKey="development-key" />);

    expect(trackMock).toHaveBeenCalledWith(eventName);
  });

  it("tracks a return visit after navigation to another route", () => {
    route.pathname = "/benchmarks";
    const { rerender } = render(<FluxAnalytics projectKey="development-key" />);

    route.pathname = "/";
    rerender(<FluxAnalytics projectKey="development-key" />);
    route.pathname = "/benchmarks";
    rerender(<FluxAnalytics projectKey="development-key" />);

    expect(trackMock).toHaveBeenCalledTimes(2);
    expect(trackMock).toHaveBeenNthCalledWith(1, "benchmarks_viewed");
    expect(trackMock).toHaveBeenNthCalledWith(2, "benchmarks_viewed");
  });
});
