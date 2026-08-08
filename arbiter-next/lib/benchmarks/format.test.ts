import { describe, expect, it } from "vitest";
import { formatBytes, formatHardwareModel, formatRate, formatScore, formatSeconds, isPreliminary } from "./format";

describe("benchmark formatting", () => {
  it("formats scores, rates, time, and process RAM", () => {
    expect(formatScore(81.234)).toBe("81.2%");
    expect(formatRate(14.25)).toBe("14.3 tok/s");
    expect(formatSeconds(125)).toBe("2m 5s");
    expect(formatBytes(2 * 1024 ** 3)).toBe("2.00 GB");
  });

  it("uses an em dash for missing metrics", () => {
    expect(formatScore(null)).toBe("—");
    expect(formatBytes(undefined)).toBe("—");
  });

  it("marks fewer than three runs preliminary", () => {
    expect(isPreliminary(2)).toBe(true);
    expect(isPreliminary(3)).toBe(false);
  });

  it("presents Apple hardware identifiers as consumer device names", () => {
    expect(formatHardwareModel("iPhone18,1")).toBe("iPhone 17 Pro");
    expect(formatHardwareModel("Mac15,7")).toBe("Mac15,7");
  });
});
