"use client";

import { useEffect, useMemo, useState } from "react";
import { filterAndSortModels } from "@/lib/benchmarks/data";
import { benchmarkErrorMessage, subscribeToBenchmarkAggregates } from "@/lib/benchmarks/firestore";
import type { BenchmarkFilters, BenchmarkModel, BenchmarkModelDevice, BenchmarkSort } from "@/lib/benchmarks/types";
import { getBenchmarkDb } from "@/lib/firebase/benchmarks";
import Filters from "./Filters";
import Leaderboard from "./Leaderboard";
import StatusPanel from "./StatusPanel";
import Visualizations, { QualitySpeedChart } from "./Visualizations";

const INITIAL_FILTERS: BenchmarkFilters = { search: "", modelKey: "", format: "", family: "", parameterSize: "", platform: "", hardwareModel: "", minimumSubmissions: 0, comparisonDeviceKey: "" };

export default function BenchmarkDashboard() {
  const [models, setModels] = useState<BenchmarkModel[] | null>(null);
  const [devices, setDevices] = useState<BenchmarkModelDevice[] | null>(null);
  const [error, setError] = useState<ReturnType<typeof benchmarkErrorMessage> | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState<BenchmarkSort>("overall");

  useEffect(() => {
    setError(null); setModels(null); setDevices(null);
    try {
      return subscribeToBenchmarkAggregates(getBenchmarkDb(), {
        onModels: setModels,
        onDevices: setDevices,
        onError: (nextError) => setError(benchmarkErrorMessage(nextError)),
      });
    } catch (nextError) {
      setError(benchmarkErrorMessage(nextError));
    }
  }, [retryKey]);

  const automaticDeviceKey = useMemo(() => {
    if (filters.comparisonDeviceKey || !devices?.length) return filters.comparisonDeviceKey;
    const candidates = devices.filter((device) => !filters.platform || device.device.platform === filters.platform);
    const profiles = candidates.filter((device, index) => candidates.findIndex((candidate) =>
      candidate.device.platform === device.device.platform &&
      candidate.device.hardwareModel === device.device.hardwareModel &&
      candidate.device.processorCount === device.device.processorCount &&
      candidate.device.activeProcessorCount === device.device.activeProcessorCount &&
      candidate.device.physicalMemoryBytes === device.device.physicalMemoryBytes &&
      candidate.device.gpuName === device.device.gpuName
    ) === index);
    return profiles.length === 1 ? profiles[0].modelDeviceKey : "";
  }, [devices, filters.comparisonDeviceKey, filters.platform]);
  const effectiveFilters = useMemo(() => ({ ...filters, comparisonDeviceKey: automaticDeviceKey }), [filters, automaticDeviceKey]);
  const visibleModels = useMemo(() => filterAndSortModels(models ?? [], devices ?? [], effectiveFilters, sort), [models, devices, effectiveFilters, sort]);
  if (error) return <StatusPanel title={error.kind === "configuration" ? "Dashboard configuration needed" : error.kind === "permission" ? "Results temporarily unavailable" : "Connection interrupted"} message={error.message} onRetry={() => setRetryKey((value) => value + 1)} />;
  if (models === null || devices === null) return <StatusPanel title="Loading live results" message="Connecting to Arbiter’s public benchmark aggregates…" />;
  if (!models.length && !devices.length) return <StatusPanel title="No public results yet" message="Community benchmark runs will appear here after the first aggregate is published." onRetry={() => setRetryKey((value) => value + 1)} />;

  return <>
    <Filters filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} models={models} devices={devices} />
    <Leaderboard models={visibleModels} devices={devices} comparisonDeviceKey={automaticDeviceKey} />
    <QualitySpeedChart models={visibleModels} devices={devices} comparisonDeviceKey={automaticDeviceKey} />
    <Visualizations models={visibleModels} />
  </>;
}
