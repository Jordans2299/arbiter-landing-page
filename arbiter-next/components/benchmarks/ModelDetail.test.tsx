import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RunAccordion } from "./ModelDetail";
import type { BenchmarkRun } from "@/lib/benchmarks/types";

const run = { id: "one", modelKey: "m", modelDeviceKey: "d", schemaVersion: 3, suiteVersion: "arbiter-benchmark-v2", model: { id: "m", displayName: "Model", repository: "", fileName: "", format: "MLX", family: null, parameterSize: null, fileSizeBytes: null }, device: { platform: "iOS", hardwareModel: "iPhone18,1", processorCount: 6, activeProcessorCount: 6, physicalMemoryBytes: null, gpuName: null, osVersion: "26", lowPowerModeEnabled: false, thermalState: "nominal" }, app: { version: "1", build: "2" }, temperature: null, score: 75, questions: { passed: 48, total: 64 }, categories: Object.fromEntries(["knowledge", "math", "scienceReasoning", "commonsense", "contextReasoning", "truthfulness", "instructionFollowing", "code"].map((key) => [key, { name: key, passed: 6, total: 8, score: 75 }])), performance: { averageTimeToFirstTokenSeconds: 1, promptTokensPerSecond: 20, generatedTokensPerSecond: 10, totalDurationSeconds: 30, residentMemoryBeforeBytes: 1, peakResidentMemoryBytes: 2, residentMemoryIncreaseBytes: 1 }, appCheckVerified: true, submittedAt: new Date("2026-08-01"), publishedAt: null } as BenchmarkRun;

describe("individual run accordion", () => {
  it("exposes expansion state and calls the controller", () => {
    const onToggle = vi.fn(); const { rerender } = render(<RunAccordion run={run} expanded={false} onToggle={onToggle} />);
    const button = screen.getByRole("button"); expect(button).toHaveAttribute("aria-expanded", "false"); expect(screen.queryByText("Questions passed")).not.toBeInTheDocument();
    fireEvent.click(button); expect(onToggle).toHaveBeenCalledOnce();
    rerender(<RunAccordion run={run} expanded onToggle={onToggle} />); expect(button).toHaveAttribute("aria-expanded", "true"); expect(screen.getByText("Questions passed")).toBeInTheDocument();
    expect(screen.getAllByText("iPhone 17 Pro").length).toBeGreaterThan(0);
    expect(screen.queryByText("App version / build")).not.toBeInTheDocument();
    expect(screen.queryByText("Thermal state")).not.toBeInTheDocument();
  });
});
