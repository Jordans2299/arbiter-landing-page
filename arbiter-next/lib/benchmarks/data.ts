import type {
  BenchmarkFilters,
  BenchmarkModel,
  BenchmarkModelDevice,
  BenchmarkSort,
  PerformanceMetricKey,
} from "./types";
import { formatHardwareModel } from "./format";

export function performanceMetric(
  aggregate: Pick<BenchmarkModel, "metrics" | "standardPerformanceMetrics"> | undefined,
  key: PerformanceMetricKey,
) {
  if (!aggregate) return { average: null, count: 0, standard: false };
  const standard = aggregate.standardPerformanceMetrics[key];
  if (standard && standard.count > 0) return { average: standard.average, count: standard.count, standard: true };
  const fallback = aggregate.metrics[key];
  return { average: fallback?.average ?? null, count: fallback?.count ?? 0, standard: false };
}

export function modelPerformanceMetric(
  model: BenchmarkModel,
  devices: BenchmarkModelDevice[],
  comparisonDeviceKey: string,
  key: PerformanceMetricKey,
) {
  const aggregate = comparisonDeviceKey
    ? matchingDevice(model.modelKey, devices, comparisonDeviceKey)
    : model;
  return performanceMetric(aggregate, key);
}

export function deviceLabel(device: BenchmarkModelDevice): string {
  const memory = device.device.physicalMemoryBytes
    ? `${Math.round(device.device.physicalMemoryBytes / 1024 ** 3)} GB`
    : null;
  return [device.device.platform, formatHardwareModel(device.device.hardwareModel), memory, device.device.gpuName]
    .filter(Boolean).join(" · ");
}

export function matchingDevice(
  modelKey: string,
  devices: BenchmarkModelDevice[],
  comparisonDeviceKey: string,
) {
  if (!comparisonDeviceKey) return undefined;
  const profile = devices.find((device) => device.modelDeviceKey === comparisonDeviceKey);
  if (!profile) return undefined;
  return devices.find((device) =>
    device.modelKey === modelKey &&
    device.device.platform === profile.device.platform &&
    device.device.hardwareModel === profile.device.hardwareModel &&
    device.device.processorCount === profile.device.processorCount &&
    device.device.activeProcessorCount === profile.device.activeProcessorCount &&
    device.device.physicalMemoryBytes === profile.device.physicalMemoryBytes &&
    device.device.gpuName === profile.device.gpuName
  );
}

export function filterAndSortModels(
  models: BenchmarkModel[],
  devices: BenchmarkModelDevice[],
  filters: BenchmarkFilters,
  sort: BenchmarkSort,
): BenchmarkModel[] {
  const search = filters.search.trim().toLocaleLowerCase();
  const filtered = models.filter((model) => {
    const modelDevices = devices.filter((device) => device.modelKey === model.modelKey);
    const deviceMatch = modelDevices.some((device) =>
      (!filters.platform || device.device.platform === filters.platform) &&
      (!filters.hardwareModel || device.device.hardwareModel === filters.hardwareModel));
    return (!search || [model.model.displayName, model.model.repository, model.model.fileName]
      .some((value) => value.toLocaleLowerCase().includes(search))) &&
      (!filters.modelKey || model.modelKey === filters.modelKey) &&
      (!filters.format || model.model.format === filters.format) &&
      (!filters.family || model.model.family === filters.family) &&
      (!filters.parameterSize || model.model.parameterSize === filters.parameterSize) &&
      (!filters.platform && !filters.hardwareModel || deviceMatch) &&
      model.submissionCount >= filters.minimumSubmissions;
  });

  const value = (model: BenchmarkModel) => {
    if (sort === "overall") return model.metrics.score.average;
    if (sort in model.categories) return model.categories[sort as keyof typeof model.categories].average;
    if (sort === "submissions") return model.submissionCount;
    const metricMap: Partial<Record<BenchmarkSort, PerformanceMetricKey>> = {
      generationSpeed: "generatedTokensPerSecond",
      firstTokenLatency: "averageTimeToFirstTokenSeconds",
      totalDuration: "totalDurationSeconds",
      peakRam: "peakResidentMemoryBytes",
    };
    return modelPerformanceMetric(model, devices, filters.comparisonDeviceKey, metricMap[sort]!).average;
  };

  return [...filtered].sort((a, b) => {
    if (sort === "name") return a.model.displayName.localeCompare(b.model.displayName);
    const aValue = value(a);
    const bValue = value(b);
    if (aValue == null) return 1;
    if (bValue == null) return -1;
    const ascending = sort === "firstTokenLatency" || sort === "totalDuration" || sort === "peakRam";
    return ascending ? aValue - bValue : bValue - aValue;
  });
}
