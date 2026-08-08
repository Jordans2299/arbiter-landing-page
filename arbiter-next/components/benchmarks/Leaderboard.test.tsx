import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Leaderboard from "./Leaderboard";
import type { AggregateMetric, BenchmarkModel } from "@/lib/benchmarks/types";

const metric = (average: number | null): AggregateMetric => ({ sum: average ?? 0, count: average == null ? 0 : 1, average, minimum: average, maximum: average });
const makeModel = (index: number): BenchmarkModel => ({
  schemaVersion: 3,
  suiteVersion: "arbiter-benchmark-v2",
  modelKey: `model-${index}`,
  model: { id: `model-${index}`, displayName: `Model ${index}`, repository: "repo", fileName: "file", format: "MLX", family: "Test", parameterSize: "4B", fileSizeBytes: null },
  submissionCount: 1,
  verifiedSubmissionCount: 1,
  missingAppCheckSubmissionCount: 0,
  standardPerformanceSubmissionCount: 0,
  metrics: { score: metric(50), averageTimeToFirstTokenSeconds: metric(null), promptTokensPerSecond: metric(null), generatedTokensPerSecond: metric(null), totalDurationSeconds: metric(null), residentMemoryBeforeBytes: metric(null), peakResidentMemoryBytes: metric(null), residentMemoryIncreaseBytes: metric(null) },
  standardPerformanceMetrics: {},
  categories: Object.fromEntries(["knowledge", "math", "scienceReasoning", "commonsense", "contextReasoning", "truthfulness", "instructionFollowing", "code"].map((key) => [key, { name: key, ...metric(50) }])) as BenchmarkModel["categories"],
  createdAt: null,
  updatedAt: null,
});

describe("leaderboard pagination", () => {
  it("shows ten rows at a time and moves to the next page", () => {
    render(<Leaderboard models={Array.from({ length: 12 }, (_, index) => makeModel(index + 1))} devices={[]} comparisonDeviceKey="" />);
    expect(screen.queryByText(/Showing .* of/)).not.toBeInTheDocument();
    expect(screen.getByText("Model 10")).toBeInTheDocument();
    expect(screen.queryByText("Model 11")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("Model 11")).toBeInTheDocument();
    expect(screen.queryByText("Model 10")).not.toBeInTheDocument();
  });
});
