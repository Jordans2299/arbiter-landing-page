"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { matchingDevice, performanceMetric } from "@/lib/benchmarks/data";
import { formatBytes, formatRate, formatScore, formatSeconds, isPreliminary } from "@/lib/benchmarks/format";
import type { BenchmarkModel, BenchmarkModelDevice } from "@/lib/benchmarks/types";

const PAGE_SIZES = [10, 25, 50] as const;

export default function Leaderboard({ models, devices, comparisonDeviceKey }: { models: BenchmarkModel[]; devices: BenchmarkModelDevice[]; comparisonDeviceKey: string }) {
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(models.length / pageSize));
  const runCount = models.reduce((sum, model) => sum + model.submissionCount, 0);

  useEffect(() => setCurrentPage(1), [models]);
  useEffect(() => setCurrentPage((page) => Math.min(page, pageCount)), [pageCount]);

  const pageModels = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return models.slice(start, start + pageSize);
  }, [models, currentPage, pageSize]);
  return (
    <section className="benchmark-section" aria-labelledby="leaderboard-heading">
      <div className="benchmark-section-heading leaderboard-heading">
        <h2 id="leaderboard-heading">Open model leaderboard</h2>
        <p>{models.length} model{models.length === 1 ? "" : "s"} · {runCount} run{runCount === 1 ? "" : "s"}</p>
      </div>
      <div className="benchmark-table-wrap">
        <table className="benchmark-table">
          <thead><tr><th>Model</th><th>Average score</th><th>Math</th><th>Code</th><th>Instruction following</th><th>Generation speed</th><th>First-token latency</th><th>Peak process RAM</th><th>Runs</th></tr></thead>
          <tbody>{pageModels.map((model) => {
            const device = matchingDevice(model.modelKey, devices, comparisonDeviceKey);
            const speed = performanceMetric(device, "generatedTokensPerSecond");
            const latency = performanceMetric(device, "averageTimeToFirstTokenSeconds");
            const ram = performanceMetric(device, "peakResidentMemoryBytes");
            return <tr key={model.modelKey}>
              <th scope="row"><Link href={`/benchmarks/${encodeURIComponent(model.modelKey)}`}>{model.model.displayName}</Link><span className="model-meta">{[model.model.format, model.model.family, model.model.parameterSize].filter(Boolean).join(" · ")}</span>{isPreliminary(model.submissionCount) && <span className="status-pill preliminary">Preliminary</span>}</th>
              <td data-label="Average score"><strong>{formatScore(model.metrics.score.average)}</strong></td>
              <td data-label="Math">{formatScore(model.categories.math.average)}</td>
              <td data-label="Code">{formatScore(model.categories.code.average)}</td>
              <td data-label="Instruction following">{formatScore(model.categories.instructionFollowing.average)}</td>
              <td data-label="Generation speed">{formatRate(speed.average)}</td>
              <td data-label="First-token latency">{formatSeconds(latency.average)}</td>
              <td data-label="Peak process RAM">{formatBytes(ram.average)}</td>
              <td data-label="Runs"><strong>{model.submissionCount.toLocaleString()}</strong></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      {!models.length ? <div className="benchmark-inline-empty"><h3>No matching models</h3><p>Try clearing a filter or lowering the minimum run count.</p></div> : <nav className="leaderboard-pagination" aria-label="Leaderboard pagination">
        <label>Rows<select aria-label="Rows per page" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setCurrentPage(1); }}>{PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
        <div><button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => page + 1)}>Next</button></div>
      </nav>}
    </section>
  );
}
