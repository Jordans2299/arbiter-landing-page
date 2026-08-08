import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

describe("Navbar resources menu", () => {
  it("groups Docs, Benchmarks, and Blog under Resources", () => {
    render(<Navbar />);
    const resources = screen.getByRole("button", { name: /Resources/ });

    expect(resources).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menuitem", { name: /Docs/ })).not.toBeInTheDocument();

    fireEvent.click(resources);

    expect(resources).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menuitem", { name: /Docs/ })).toHaveAttribute("href", "/documentation");
    expect(screen.getByRole("menuitem", { name: /Benchmarks/ })).toHaveAttribute("href", "/benchmarks");
    expect(screen.getByRole("menuitem", { name: /Blog/ })).toHaveAttribute("href", "/blog");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(resources).toHaveAttribute("aria-expanded", "false");
  });
});
