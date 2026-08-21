"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deviceLabel, performanceMetric } from "@/lib/benchmarks/data";
import { formatBytes, formatDate, formatHardwareModel, formatRate, formatScore, formatSeconds, isPreliminary } from "@/lib/benchmarks/format";
import { benchmarkErrorMessage, loadBenchmarkModelDetails } from "@/lib/benchmarks/firestore";
import { findManifestModel, huggingFaceURL, loadModelManifest } from "@/lib/benchmarks/manifest";
import { CATEGORY_KEYS, CATEGORY_LABELS, type BenchmarkModel, type BenchmarkModelDevice, type BenchmarkRun } from "@/lib/benchmarks/types";
import { getBenchmarkDb } from "@/lib/firebase/benchmarks";
import StatusPanel from "./StatusPanel";

type DetailData = { model: BenchmarkModel | null; devices: BenchmarkModelDevice[]; runs: BenchmarkRun[] };

export default function ModelDetail({ modelKey }: { modelKey: string }) {
  const [data, setData] = useState<DetailData | null>(null);
  const [error, setError] = useState<ReturnType<typeof benchmarkErrorMessage> | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [expandedRun, setExpandedRun] = useState<string | null>(null);
  const [modelLink, setModelLink] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setData(null); setError(null); setExpandedRun(null);
    try {
      loadBenchmarkModelDetails(getBenchmarkDb(), modelKey)
        .then((result) => { if (active) setData(result); })
        .catch((nextError) => { if (active) setError(benchmarkErrorMessage(nextError)); });
    } catch (nextError) { setError(benchmarkErrorMessage(nextError)); }
    return () => { active = false; };
  }, [modelKey, retryKey]);

  useEffect(() => {
    let active = true;
    setModelLink(null);
    if (!data?.model) return () => { active = false; };
    loadModelManifest()
      .then((manifest) => {
        if (active) setModelLink(huggingFaceURL(findManifestModel(data.model!.model, manifest)));
      })
      .catch(() => { if (active) setModelLink(null); });
    return () => { active = false; };
  }, [data?.model]);

  if (error) return <StatusPanel title="Could not load this model" message={error.message} onRetry={() => setRetryKey((value) => value + 1)} />;
  if (!data) return <StatusPanel title="Loading model details" message="Fetching the latest sanitized runs for this model…" />;
  if (!data.model) return <StatusPanel title="Model not found" message="This benchmark aggregate may have been removed or the link may be invalid." />;
  const { model, devices, runs } = data;
  const publishedModelLink = modelLink ?? huggingFaceURL({ hfRepo: model.model.repository || null });

  return <>
    <div className="detail-back"><Link href="/benchmarks">← Back to all benchmarks</Link></div>
    <section className="model-detail-hero">
      <div className="model-detail-intro"><span className="eyebrow">Model benchmark</span><h1>{model.model.displayName}</h1>
        <p className="published-model">{model.model.repository || model.model.fileName}</p>
        <dl className="model-facts"><Item term="Format" value={model.model.format} /><Item term="Family" value={model.model.family || "N/A"} /><Item term="Parameters" value={model.model.parameterSize || "N/A"} /><Item term="File size" value={formatBytes(model.model.fileSizeBytes)} /><Item term="Suite" value={model.suiteVersion} /></dl>
        <div className="model-actions">
          {publishedModelLink && <a className="benchmark-button secondary" href={publishedModelLink} target="_blank" rel="noreferrer">View on Hugging Face ↗</a>}
          <a className="benchmark-button" href="https://apps.apple.com/us/app/arbiter-offline-private-ai/id6747954532" target="_blank" rel="noreferrer">Try in Arbiter ↗</a>
        </div>
      </div>
      <div className="detail-score"><span>Average Arbiter score</span><strong>{formatScore(model.metrics.score.average)}</strong><small>{model.submissionCount} submitted run{model.submissionCount === 1 ? "" : "s"}</small></div>
    </section>
    {isPreliminary(model.submissionCount) && <div className="preliminary-banner"><strong>Preliminary result.</strong> Fewer than three submitted runs contribute to this model aggregate.</div>}
    <section className="detail-comparison-grid">
      <article className="benchmark-chart-card"><span className="eyebrow">Scores</span><h2>Capability breakdown</h2><div className="capability-list">{CATEGORY_KEYS.map((key) => <div key={key}><span>{CATEGORY_LABELS[key]}</span><div className="capability-track"><i style={{ width: `${Math.max(0, Math.min(100, model.categories[key].average ?? 0))}%` }} /></div><strong>{formatScore(model.categories[key].average)}</strong></div>)}</div></article>
      <article className="benchmark-chart-card device-performance-panel" aria-labelledby="device-summary-heading"><span className="eyebrow">Device performance</span><h2 id="device-summary-heading">Measured configurations</h2>
        {devices.length ? <div className="device-card-grid">{devices.map((device) => <article key={device.modelDeviceKey} className="device-card"><h3>{deviceLabel(device)}</h3><div className="device-metrics"><Metric label="Generation speed" value={formatRate(performanceMetric(device, "generatedTokensPerSecond").average)} metric={performanceMetric(device, "generatedTokensPerSecond")} /><Metric label="Prompt processing" value={formatRate(performanceMetric(device, "promptTokensPerSecond").average)} metric={performanceMetric(device, "promptTokensPerSecond")} /><Metric label="First-token latency" value={formatSeconds(performanceMetric(device, "averageTimeToFirstTokenSeconds").average)} metric={performanceMetric(device, "averageTimeToFirstTokenSeconds")} /><Metric label="Total duration" value={formatSeconds(performanceMetric(device, "totalDurationSeconds").average)} metric={performanceMetric(device, "totalDurationSeconds")} /><Metric label="Peak process RAM" value={formatBytes(performanceMetric(device, "peakResidentMemoryBytes").average)} metric={performanceMetric(device, "peakResidentMemoryBytes")} /></div></article>)}</div> : <div className="benchmark-inline-empty"><p>No device performance has been published yet.</p></div>}
      </article>
    </section>
    <section className="benchmark-section" aria-labelledby="recent-runs-heading"><div className="benchmark-section-heading"><div><span className="eyebrow">Individual results</span><h2 id="recent-runs-heading">Recent submitted runs</h2></div><p>Latest {Math.min(25, runs.length)} results</p></div>
      {runs.length ? <div className="run-list">{runs.map((run) => <RunAccordion key={run.id} run={run} expanded={expandedRun === run.id} onToggle={() => setExpandedRun((current) => current === run.id ? null : run.id)} />)}</div> : <div className="benchmark-inline-empty"><h3>No recent runs</h3><p>The aggregate exists, but no public individual run is currently available.</p></div>}
    </section>
    <Methodology />
  </>;
}

function Item({ term, value }: { term: string; value: string }) { return <div><dt>{term}</dt><dd>{value}</dd></div>; }
function Metric({ label, value, metric }: { label: string; value: string; metric: ReturnType<typeof performanceMetric> }) { return <div><span>{label}</span><strong>{value}</strong><small>{metric.count} {metric.standard ? "standard-condition" : "all-condition"} run{metric.count === 1 ? "" : "s"}</small></div>; }

export function RunAccordion({ run, expanded, onToggle }: { run: BenchmarkRun; expanded: boolean; onToggle: () => void }) {
  const panelId = `run-${run.id}`;
  return <article className={`run-accordion ${expanded ? "open" : ""}`}>
    <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={onToggle}><span><strong>{formatDate(run.submittedAt)}</strong><small>{run.device.platform} · {formatHardwareModel(run.device.hardwareModel)}</small></span><span className="run-score">{formatScore(run.score)}</span><span aria-hidden="true" className="accordion-mark">+</span></button>
    {expanded && <div id={panelId} className="run-panel">
      <div className="run-overview"><div><span>Questions passed</span><strong>{run.questions.passed} of {run.questions.total}</strong></div><div><span>App Check upload</span><strong>{run.appCheckVerified ? "Verified" : "Not verified"}</strong></div><div><span>Suite</span><strong>{run.suiteVersion}</strong></div></div>
      <h3>Capability results</h3><div className="run-category-grid">{CATEGORY_KEYS.map((key) => <div key={key}><span>{CATEGORY_LABELS[key]}</span><strong>{formatScore(run.categories[key].score)}</strong><small>{run.categories[key].passed} of {run.categories[key].total} passed</small></div>)}</div>
      <div className="run-detail-columns"><div><h3>Apple hardware</h3><dl className="detail-list"><Item term="Platform" value={run.device.platform} /><Item term="Hardware model" value={formatHardwareModel(run.device.hardwareModel)} /><Item term="OS version" value={run.device.osVersion || "N/A"} /><Item term="Physical memory" value={formatBytes(run.device.physicalMemoryBytes)} /><Item term="Processor count" value={run.device.processorCount?.toString() ?? "N/A"} /><Item term="Active processor count" value={run.device.activeProcessorCount?.toString() ?? "N/A"} /><Item term="GPU name" value={run.device.gpuName || "N/A"} /><Item term="Low Power Mode" value={run.device.lowPowerModeEnabled == null ? "N/A" : run.device.lowPowerModeEnabled ? "Enabled" : "Disabled"} /></dl></div>
      <div><h3>Run details</h3><dl className="detail-list"><Item term="Generation speed" value={formatRate(run.performance.generatedTokensPerSecond)} /><Item term="Prompt-processing speed" value={formatRate(run.performance.promptTokensPerSecond)} /><Item term="First-token latency" value={formatSeconds(run.performance.averageTimeToFirstTokenSeconds)} /><Item term="Total duration" value={formatSeconds(run.performance.totalDurationSeconds)} /><Item term="Starting process RAM" value={formatBytes(run.performance.residentMemoryBeforeBytes)} /><Item term="Peak process RAM" value={formatBytes(run.performance.peakResidentMemoryBytes)} /><Item term="Increased process RAM" value={formatBytes(run.performance.residentMemoryIncreaseBytes)} /></dl></div></div>
    </div>}
  </article>;
}

export function Methodology() { return <section className="methodology-card compact-methodology"><span className="eyebrow">About these results</span><p>These community-submitted results come from Arbiter’s 64-question benchmark for open-source models on iOS and macOS. Score reflects correct answers; speed, latency, and process RAM should also factor into choosing a model. Results with fewer than three runs are preliminary.</p></section>; }
