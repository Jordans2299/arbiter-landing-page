import { matchingDevice, performanceMetric } from "@/lib/benchmarks/data";
import { formatBytes, formatRate, formatScore } from "@/lib/benchmarks/format";
import { CATEGORY_KEYS, CATEGORY_LABELS, type BenchmarkModel, type BenchmarkModelDevice } from "@/lib/benchmarks/types";

function heatColor(score: number | null) {
  if (score == null) return "transparent";
  const lightness = 22 + Math.max(0, Math.min(100, score)) / 100 * 28;
  return `hsl(261 72% ${lightness}%)`;
}

export default function Visualizations({ models }: { models: BenchmarkModel[] }) {
  return (
    <div className="benchmark-visuals">
      <section className="benchmark-chart-card heatmap-card" aria-labelledby="heatmap-heading">
        <div className="benchmark-section-heading compact"><div><span className="eyebrow">Capability map</span><h2 id="heatmap-heading">Where models are strongest</h2></div></div>
        <div className="heatmap-scroll"><table className="heatmap-table"><colgroup><col className="heatmap-model-column" />{CATEGORY_KEYS.map((key) => <col className="heatmap-score-column" key={key} />)}</colgroup><thead><tr><th>Model</th>{CATEGORY_KEYS.map((key) => <th key={key}><span>{CATEGORY_LABELS[key]}</span></th>)}</tr></thead><tbody>{models.map((model) => <tr key={model.modelKey}><th scope="row">{model.model.displayName}</th>{CATEGORY_KEYS.map((key) => { const score = model.categories[key].average; return <td key={key} style={{ background: heatColor(score) }}><span>{formatScore(score)}</span></td>; })}</tr>)}</tbody></table></div>
      </section>

    </div>
  );
}

export function QualitySpeedChart({ models, devices, comparisonDeviceKey }: { models: BenchmarkModel[]; devices: BenchmarkModelDevice[]; comparisonDeviceKey: string }) {
  const comparable = models
    .map((model) => ({ model, device: matchingDevice(model.modelKey, devices, comparisonDeviceKey) }))
    .filter((entry) => !comparisonDeviceKey || entry.device);
  return <section className="benchmark-chart-card quality-speed-card" aria-labelledby="scatter-heading">
    <div className="benchmark-section-heading compact"><div><span className="eyebrow">Quality × speed</span><h2 id="scatter-heading">Score versus generation speed</h2></div></div>
    <ScatterPlot entries={comparable} comparisonDeviceSelected={Boolean(comparisonDeviceKey)} />
  </section>;
}

function ScatterPlot({ entries, comparisonDeviceSelected }: { entries: Array<{ model: BenchmarkModel; device: BenchmarkModelDevice | undefined }>; comparisonDeviceSelected: boolean }) {
  const points = entries.map(({ model, device }) => ({
    model,
    speed: comparisonDeviceSelected ? performanceMetric(device, "generatedTokensPerSecond").average : model.metrics.generatedTokensPerSecond.average,
    score: model.metrics.score.average,
    ram: comparisonDeviceSelected ? performanceMetric(device, "peakResidentMemoryBytes").average : model.metrics.peakResidentMemoryBytes.average,
  })).filter((point) => point.speed != null && point.score != null);
  if (!points.length) return <div className="chart-prompt"><p>No generation-speed data is available for this selection.</p></div>;
  const maxX = Math.max(...points.map((point) => point.speed!), 1);
  const minY = Math.min(...points.map((point) => point.score!), 0);
  const maxY = Math.max(...points.map((point) => point.score!), 100);
  const formats = [...new Set(points.map((point) => point.model.model.format))];
  const colors = ["#a78bfa", "#34d399", "#fb7185", "#60a5fa", "#fbbf24"];
  return <>
    <svg className="scatter-chart" viewBox="0 0 900 360" role="img" aria-labelledby="scatter-title scatter-desc">
      <title id="scatter-title">Average Arbiter score versus generated tokens per second</title><desc id="scatter-desc">One point per model{comparisonDeviceSelected ? " for the selected device profile" : " across all available benchmark devices"}. Point size reflects peak process RAM when available.</desc>
      <line x1="70" y1="20" x2="70" y2="310" /><line x1="70" y1="310" x2="880" y2="310" />
      {[0, .25, .5, .75, 1].map((fraction) => <g key={fraction}><line className="gridline" x1="70" y1={310 - fraction * 280} x2="880" y2={310 - fraction * 280} /><text x="60" y={315 - fraction * 280} textAnchor="end">{Math.round(minY + (maxY - minY) * fraction)}%</text></g>)}
      {points.map((point) => { const x = 70 + (point.speed! / maxX) * 790; const y = 310 - ((point.score! - minY) / Math.max(maxY - minY, .01)) * 280; const radius = point.ram ? Math.max(6, Math.min(16, 5 + point.ram / 1024 ** 3)) : 8; return <g key={point.model.modelKey}><circle cx={x} cy={y} r={radius} fill={colors[formats.indexOf(point.model.model.format) % colors.length]}><title>{point.model.model.displayName}: {formatScore(point.score)}, {formatRate(point.speed)}, peak process RAM {formatBytes(point.ram)}</title></circle></g>; })}
      <text className="axis-label" x="475" y="352" textAnchor="middle">Average generated tokens per second</text><text className="axis-label" transform="translate(17 170) rotate(-90)" textAnchor="middle">Average Arbiter score</text>
    </svg>
    <div className="chart-legend" aria-label="Formats">{formats.map((format, index) => <span key={format}><i style={{ background: colors[index % colors.length] }} />{format}</span>)}</div>
    <table className="sr-only"><caption>Quality versus speed chart data</caption><thead><tr><th>Model</th><th>Score</th><th>Generation speed</th><th>Peak process RAM</th></tr></thead><tbody>{points.map((point) => <tr key={point.model.modelKey}><td>{point.model.model.displayName}</td><td>{formatScore(point.score)}</td><td>{formatRate(point.speed)}</td><td>{formatBytes(point.ram)}</td></tr>)}</tbody></table>
  </>;
}
