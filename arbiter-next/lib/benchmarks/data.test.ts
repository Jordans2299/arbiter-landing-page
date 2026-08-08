import { describe, expect, it } from "vitest";
import { filterAndSortModels, performanceMetric } from "./data";
import type { BenchmarkFilters, BenchmarkModel, BenchmarkModelDevice } from "./types";

const metric = (average: number | null, count = average == null ? 0 : 1) => ({ sum: average ?? 0, count, average, minimum: average, maximum: average });
const model = (modelKey: string, name: string, score: number, submissions: number): BenchmarkModel => ({
  schemaVersion: 3, suiteVersion: "arbiter-benchmark-v2", modelKey,
  model: { id: modelKey, displayName: name, repository: "repo", fileName: "file", format: "MLX", family: "Qwen", parameterSize: "3B", fileSizeBytes: null },
  submissionCount: submissions, verifiedSubmissionCount: 0, missingAppCheckSubmissionCount: 0, standardPerformanceSubmissionCount: 0,
  metrics: { score: metric(score), averageTimeToFirstTokenSeconds: metric(null), promptTokensPerSecond: metric(null), generatedTokensPerSecond: metric(null), totalDurationSeconds: metric(null), residentMemoryBeforeBytes: metric(null), peakResidentMemoryBytes: metric(null), residentMemoryIncreaseBytes: metric(null) },
  standardPerformanceMetrics: {},
  categories: Object.fromEntries(["knowledge", "math", "scienceReasoning", "commonsense", "contextReasoning", "truthfulness", "instructionFollowing", "code"].map((key) => [key, { name: key, ...metric(score) }])) as BenchmarkModel["categories"],
  createdAt: null, updatedAt: null,
});
const device = (base: BenchmarkModel, speed: number): BenchmarkModelDevice => ({ ...base, modelDeviceKey: `${base.modelKey}-device`, device: { platform: "iOS", hardwareModel: "iPhone17,1", processorCount: 6, activeProcessorCount: 6, physicalMemoryBytes: 8 * 1024 ** 3, gpuName: "Apple GPU" }, metrics: { ...base.metrics, generatedTokensPerSecond: metric(speed, 4) }, standardPerformanceMetrics: { generatedTokensPerSecond: metric(speed + 2, 2) } });
const filters: BenchmarkFilters = { search: "", modelKey: "", format: "", family: "", parameterSize: "", platform: "", hardwareModel: "", minimumSubmissions: 0, comparisonDeviceKey: "a-device" };

describe("benchmark filtering and sorting", () => {
  const a = model("a", "Alpha", .8, 5); const b = model("b", "Beta", .7, 2); const devices = [device(a, 10), device(b, 20)];
  it("filters by search and minimum submissions", () => {
    expect(filterAndSortModels([a, b], devices, { ...filters, search: "alp", minimumSubmissions: 3 }, "overall").map((item) => item.modelKey)).toEqual(["a"]);
  });
  it("sorts quality descending and latency-style metrics ascending", () => {
    expect(filterAndSortModels([b, a], devices, filters, "overall")[0].modelKey).toBe("a");
    expect(filterAndSortModels([a, b], devices, filters, "generationSpeed")[0].modelKey).toBe("b");
  });
  it("prefers standard-condition performance metrics", () => {
    expect(performanceMetric(devices[0], "generatedTokensPerSecond")).toEqual({ average: 12, count: 2, standard: true });
  });
});
