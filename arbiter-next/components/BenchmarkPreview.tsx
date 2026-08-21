"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FadeSection from "./FadeSection";
import { subscribeToBenchmarkAggregates } from "@/lib/benchmarks/firestore";
import { formatScore } from "@/lib/benchmarks/format";
import type { BenchmarkModel } from "@/lib/benchmarks/types";
import { getBenchmarkDb } from "@/lib/firebase/benchmarks";

const PREVIEW_COUNT = 5;

export default function BenchmarkPreview() {
  const [models, setModels] = useState<BenchmarkModel[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    try {
      return subscribeToBenchmarkAggregates(getBenchmarkDb(), {
        onModels: setModels,
        onDevices: () => undefined,
        onError: () => setUnavailable(true),
      });
    } catch {
      setUnavailable(true);
    }
  }, []);

  const leaders = useMemo(() => [...(models ?? [])]
    .sort((left, right) => (right.metrics.score.average ?? -1) - (left.metrics.score.average ?? -1))
    .slice(0, PREVIEW_COUNT), [models]);

  return (
    <section className="home-benchmarks" id="benchmarks-preview">
      <div className="container benchmark-preview-layout">
        <FadeSection className="benchmark-preview-copy">
          <span className="section-label">Open benchmarks</span>
          <h2>See how local models compare.</h2>
          <p>Community results make it easier to choose the right model for your device.</p>
          <div className="benchmark-preview-facts" aria-label="Benchmark coverage">
            <span><strong>64</strong><small>questions</small></span>
            <span><strong>8</strong><small>skill areas</small></span>
            <span><i className="fas fa-users" /><small>community tested</small></span>
          </div>
          <Link className="benchmark-preview-link" href="/benchmarks">
            Explore all benchmarks <span aria-hidden="true">→</span>
          </Link>
        </FadeSection>

        <FadeSection as="div" className="benchmark-preview-board">
          <div className="benchmark-preview-board-header">
            <span>Model leaderboard</span>
            <small>Overall score</small>
          </div>

          {leaders.length > 0 ? (
            <ol className="benchmark-preview-list">
              {leaders.map((model, index) => {
                const score = model.metrics.score.average;
                return (
                  <li key={model.modelKey}>
                    <span className="benchmark-preview-rank">{String(index + 1).padStart(2, "0")}</span>
                    <Link href={`/benchmarks/${encodeURIComponent(model.modelKey)}`}>
                      <strong>{model.model.displayName}</strong>
                      <small>{[model.model.format, model.model.family, model.model.parameterSize].filter(Boolean).join(" · ")}</small>
                    </Link>
                    <span className="benchmark-preview-score">
                      <strong>{formatScore(score)}</strong>
                      <i aria-hidden="true"><span style={{ width: `${Math.max(0, Math.min(100, score ?? 0))}%` }} /></i>
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : models === null && !unavailable ? (
            <div className="benchmark-preview-loading" aria-label="Loading benchmark preview">
              {Array.from({ length: PREVIEW_COUNT }, (_, index) => <i key={index} />)}
            </div>
          ) : (
            <div className="benchmark-preview-empty">
              <i className="fas fa-chart-line" aria-hidden="true" />
              <strong>Explore the full leaderboard</strong>
              <p>Compare model scores, speed, latency, and memory use.</p>
            </div>
          )}

          <Link className="benchmark-preview-board-link" href="/benchmarks">
            View the full leaderboard <span aria-hidden="true">↗</span>
          </Link>
        </FadeSection>
      </div>
    </section>
  );
}
