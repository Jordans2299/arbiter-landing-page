import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroShowcase from "./HeroShowcase";

describe("hero product showcase", () => {
  it("switches between one static iPhone image and one static Mac image", () => {
    render(<HeroShowcase />);

    expect(screen.queryByText("Product preview")).not.toBeInTheDocument();
    expect(screen.queryByText("Arbiter for iOS")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "A private local AI conversation in Arbiter on iPhone" }))
      .toHaveAttribute("src", "/screenshots/web/hero-convo-dark-2x.png");
    expect(screen.queryByRole("img", { name: "A local AI conversation in Arbiter on macOS" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Mac" }));

    expect(screen.getByRole("button", { name: "Mac" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByText("Arbiter for macOS")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "A local AI conversation in Arbiter on macOS" }))
      .toHaveAttribute("src", "/screenshots/web/hero-mac-dark-2x.png");
    expect(screen.queryByRole("img", { name: "A private local AI conversation in Arbiter on iPhone" })).not.toBeInTheDocument();
  });
});
