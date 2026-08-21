import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
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

afterEach(cleanup);

describe("leaderboard pagination", () => {
  it("shows measured model-level performance without an exact device selection", () => {
    const model = makeModel(1);
    model.metrics.generatedTokensPerSecond = metric(14.2);
    model.metrics.averageTimeToFirstTokenSeconds = metric(0.84);
    model.metrics.peakResidentMemoryBytes = metric(2 * 1024 ** 3);

    render(<Leaderboard models={[model]} devices={[]} comparisonDeviceKey="" />);

    expect(screen.getByText("14.2 tok/s")).toBeInTheDocument();
    expect(screen.getByText("0.84s")).toBeInTheDocument();
    expect(screen.getByText("2.00 GB")).toBeInTheDocument();
  });

  it("shows ten rows at a time and moves to the next page", () => {
    render(<Leaderboard models={Array.from({ length: 12 }, (_, index) => makeModel(index + 1))} devices={[]} comparisonDeviceKey="" />);
    expect(screen.queryByText(/Showing .* of/)).not.toBeInTheDocument();
    expect(screen.getAllByText("Model 10")).toHaveLength(2);
    expect(screen.queryByText("Model 11")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(screen.getAllByText("Model 11")).toHaveLength(2);
    expect(screen.getByText("#11")).toBeInTheDocument();
    expect(screen.queryByText("Model 10")).not.toBeInTheDocument();
  });

  it("keeps score details collapsed until a mobile model row is selected", () => {
    render(<Leaderboard models={[makeModel(1)]} devices={[]} comparisonDeviceKey="" />);
    const modelButton = screen.getByRole("button", { name: "#1Model 1MLX · Test · 4BOverall50%" });

    expect(modelButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("heading", { name: "Score breakdown" })).not.toBeInTheDocument();

    fireEvent.click(modelButton);

    expect(modelButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("heading", { name: "Score breakdown" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View full model results/ })).toHaveAttribute("href", "/benchmarks/model-1");
  });
});
