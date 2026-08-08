import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  CATEGORY_KEYS,
  type AggregateMetric,
  type AggregateMetrics,
  type BenchmarkModel,
  type BenchmarkModelDevice,
  type BenchmarkRun,
  type CategoryKey,
  type DeviceMetadata,
  type FirestoreTimestampLike,
  type ModelMetadata,
  type PerformanceMetricKey,
} from "./types";

const PERFORMANCE_KEYS: PerformanceMetricKey[] = [
  "averageTimeToFirstTokenSeconds",
  "promptTokensPerSecond",
  "generatedTokensPerSecond",
  "totalDurationSeconds",
  "residentMemoryBeforeBytes",
  "peakResidentMemoryBytes",
  "residentMemoryIncreaseBytes",
];

const number = (value: unknown, fallback = 0) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;
const nullableNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : null;
const text = (value: unknown, fallback = "") => typeof value === "string" ? value : fallback;
const nullableText = (value: unknown) => typeof value === "string" && value.length ? value : null;
const object = (value: unknown): DocumentData => value && typeof value === "object" ? value as DocumentData : {};

export function toDate(value: FirestoreTimestampLike): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    const date = value.toDate();
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function adaptMetric(value: unknown): AggregateMetric {
  const data = object(value);
  return {
    sum: number(data.sum),
    count: Math.max(0, number(data.count)),
    average: nullableNumber(data.average),
    minimum: nullableNumber(data.minimum),
    maximum: nullableNumber(data.maximum),
  };
}

function adaptMetrics(value: unknown): AggregateMetrics {
  const data = object(value);
  return Object.fromEntries(
    ["score", ...PERFORMANCE_KEYS].map((key) => [key, adaptMetric(data[key])]),
  ) as AggregateMetrics;
}

function adaptModel(value: unknown): ModelMetadata {
  const data = object(value);
  return {
    id: text(data.id),
    displayName: text(data.displayName, text(data.id, "Unknown model")),
    repository: text(data.repository),
    fileName: text(data.fileName),
    format: text(data.format, "Unknown"),
    family: nullableText(data.family),
    parameterSize: nullableText(data.parameterSize),
    fileSizeBytes: nullableNumber(data.fileSizeBytes),
  };
}

function adaptDevice(value: unknown): DeviceMetadata {
  const data = object(value);
  return {
    platform: text(data.platform, "Unknown"),
    hardwareModel: text(data.hardwareModel, "Unknown hardware"),
    processorCount: nullableNumber(data.processorCount),
    activeProcessorCount: nullableNumber(data.activeProcessorCount),
    physicalMemoryBytes: nullableNumber(data.physicalMemoryBytes),
    gpuName: nullableText(data.gpuName),
  };
}

function adaptAggregate(data: DocumentData): BenchmarkModel {
  const categories = object(data.categories);
  const standard = object(data.standardPerformanceMetrics);
  return {
    schemaVersion: number(data.schemaVersion),
    suiteVersion: text(data.suiteVersion),
    modelKey: text(data.modelKey),
    model: adaptModel(data.model),
    submissionCount: Math.max(0, number(data.submissionCount)),
    verifiedSubmissionCount: Math.max(0, number(data.verifiedSubmissionCount)),
    missingAppCheckSubmissionCount: Math.max(0, number(data.missingAppCheckSubmissionCount)),
    standardPerformanceSubmissionCount: Math.max(0, number(data.standardPerformanceSubmissionCount)),
    metrics: adaptMetrics(data.metrics),
    standardPerformanceMetrics: Object.fromEntries(
      PERFORMANCE_KEYS.map((key) => [key, adaptMetric(standard[key])]),
    ),
    categories: Object.fromEntries(CATEGORY_KEYS.map((key) => {
      const category = object(categories[key]);
      return [key, { name: text(category.name, key), ...adaptMetric(category) }];
    })) as BenchmarkModel["categories"],
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export function adaptBenchmarkModel(snapshot: QueryDocumentSnapshot<DocumentData>): BenchmarkModel {
  return adaptAggregate(snapshot.data());
}

export function adaptBenchmarkModelDevice(snapshot: QueryDocumentSnapshot<DocumentData>): BenchmarkModelDevice {
  const data = snapshot.data();
  return {
    ...adaptAggregate(data),
    modelDeviceKey: text(data.modelDeviceKey, snapshot.id),
    device: adaptDevice(data.device),
  };
}

export function adaptBenchmarkRun(snapshot: QueryDocumentSnapshot<DocumentData>): BenchmarkRun {
  const data = snapshot.data();
  const deviceData = object(data.device);
  const app = object(data.app);
  const questions = object(data.questions);
  const categories = object(data.categories);
  const performance = object(data.performance);
  return {
    id: snapshot.id,
    schemaVersion: number(data.schemaVersion),
    suiteVersion: text(data.suiteVersion),
    modelKey: text(data.modelKey),
    modelDeviceKey: text(data.modelDeviceKey),
    model: adaptModel(data.model),
    device: {
      ...adaptDevice(deviceData),
      osVersion: nullableText(deviceData.osVersion),
      lowPowerModeEnabled: typeof deviceData.lowPowerModeEnabled === "boolean" ? deviceData.lowPowerModeEnabled : null,
      thermalState: nullableText(deviceData.thermalState),
    },
    app: { version: nullableText(app.version), build: nullableText(app.build) },
    temperature: nullableNumber(data.temperature),
    score: number(data.score),
    questions: { passed: number(questions.passed), total: number(questions.total, 64) },
    categories: Object.fromEntries(CATEGORY_KEYS.map((key) => {
      const category = object(categories[key]);
      return [key, {
        name: text(category.name, key),
        passed: number(category.passed),
        total: number(category.total, 8),
        score: number(category.score),
      }];
    })) as Record<CategoryKey, BenchmarkRun["categories"][CategoryKey]>,
    performance: Object.fromEntries(PERFORMANCE_KEYS.map((key) => [key, nullableNumber(performance[key])])) as BenchmarkRun["performance"],
    appCheckVerified: data.appCheckVerified === true,
    submittedAt: toDate(data.submittedAt),
    publishedAt: toDate(data.publishedAt),
  };
}
