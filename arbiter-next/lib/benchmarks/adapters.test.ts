import { describe, expect, it } from "vitest";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { adaptBenchmarkModel, adaptBenchmarkRun, toDate } from "./adapters";

const snapshot = (data: Record<string, unknown>, id = "doc") => ({ id, data: () => data }) as QueryDocumentSnapshot;

describe("Firestore benchmark adapters", () => {
  it("converts timestamps and normalizes missing aggregate fields", () => {
    const date = new Date("2026-08-01T12:00:00Z");
    const result = adaptBenchmarkModel(snapshot({ modelKey: "key", model: { displayName: "Model", format: "MLX" }, metrics: { score: { average: .5, count: 2 } }, updatedAt: { toDate: () => date } }));
    expect(result.updatedAt).toEqual(date);
    expect(result.metrics.score.average).toBe(.5);
    expect(result.categories.code.count).toBe(0);
  });
  it("adapts only the sanitized public run shape", () => {
    const run = adaptBenchmarkRun(snapshot({ modelKey: "key", score: .75, questions: { passed: 48, total: 64 }, device: { platform: "macOS", hardwareModel: "Mac15,7" }, categories: {}, performance: {}, appCheckVerified: true }, "run-1"));
    expect(run.id).toBe("run-1");
    expect(run.questions).toEqual({ passed: 48, total: 64 });
    expect(run.appCheckVerified).toBe(true);
    expect(run).not.toHaveProperty("clientUUID");
  });
  it("rejects invalid timestamps", () => expect(toDate({ toDate: () => new Date("invalid") })).toBeNull());
});
