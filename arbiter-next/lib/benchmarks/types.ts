import type { Timestamp } from "firebase/firestore";

export const CATEGORY_KEYS = [
  "knowledge",
  "math",
  "scienceReasoning",
  "commonsense",
  "contextReasoning",
  "truthfulness",
  "instructionFollowing",
  "code",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  knowledge: "Knowledge",
  math: "Math",
  scienceReasoning: "Science Reasoning",
  commonsense: "Commonsense",
  contextReasoning: "Context Reasoning",
  truthfulness: "Truthfulness",
  instructionFollowing: "Instruction Following",
  code: "Code",
};

export type AggregateMetric = {
  sum: number;
  count: number;
  average: number | null;
  minimum: number | null;
  maximum: number | null;
};

export type PerformanceMetricKey =
  | "averageTimeToFirstTokenSeconds"
  | "promptTokensPerSecond"
  | "generatedTokensPerSecond"
  | "totalDurationSeconds"
  | "residentMemoryBeforeBytes"
  | "peakResidentMemoryBytes"
  | "residentMemoryIncreaseBytes";

export type AggregateMetrics = Record<PerformanceMetricKey, AggregateMetric> & {
  score: AggregateMetric;
};

export type ModelMetadata = {
  id: string;
  displayName: string;
  repository: string;
  fileName: string;
  format: string;
  family: string | null;
  parameterSize: string | null;
  fileSizeBytes: number | null;
};

export type DeviceMetadata = {
  platform: "iOS" | "macOS" | string;
  hardwareModel: string;
  processorCount: number | null;
  activeProcessorCount: number | null;
  physicalMemoryBytes: number | null;
  gpuName: string | null;
};

export type AggregateCategory = AggregateMetric & { name: string };

export type BenchmarkModel = {
  schemaVersion: number;
  suiteVersion: string;
  modelKey: string;
  model: ModelMetadata;
  submissionCount: number;
  verifiedSubmissionCount: number;
  missingAppCheckSubmissionCount: number;
  standardPerformanceSubmissionCount: number;
  metrics: AggregateMetrics;
  standardPerformanceMetrics: Partial<Record<PerformanceMetricKey, AggregateMetric>>;
  categories: Record<CategoryKey, AggregateCategory>;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type BenchmarkModelDevice = BenchmarkModel & {
  modelDeviceKey: string;
  device: DeviceMetadata;
};

export type RunCategory = {
  name: string;
  passed: number;
  total: number;
  score: number;
};

export type BenchmarkRun = {
  id: string;
  schemaVersion: number;
  suiteVersion: string;
  modelKey: string;
  modelDeviceKey: string;
  model: ModelMetadata;
  device: DeviceMetadata & {
    osVersion: string | null;
    lowPowerModeEnabled: boolean | null;
    thermalState: string | null;
  };
  app: { version: string | null; build: string | null };
  temperature: number | null;
  score: number;
  questions: { passed: number; total: number };
  categories: Record<CategoryKey, RunCategory>;
  performance: Record<PerformanceMetricKey, number | null>;
  appCheckVerified: boolean;
  submittedAt: Date | null;
  publishedAt: Date | null;
};

export type FirestoreTimestampLike = Timestamp | Date | { toDate(): Date } | null | undefined;

export type BenchmarkSort =
  | "overall"
  | CategoryKey
  | "generationSpeed"
  | "firstTokenLatency"
  | "totalDuration"
  | "peakRam"
  | "submissions"
  | "name";

export type BenchmarkFilters = {
  search: string;
  modelKey: string;
  format: string;
  family: string;
  parameterSize: string;
  platform: string;
  hardwareModel: string;
  minimumSubmissions: number;
  comparisonDeviceKey: string;
};
