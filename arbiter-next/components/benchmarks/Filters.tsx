import type { BenchmarkFilters, BenchmarkModel, BenchmarkModelDevice, BenchmarkSort } from "@/lib/benchmarks/types";
import { formatHardwareModel } from "@/lib/benchmarks/format";

const unique = (values: Array<string | null>) => [...new Set(values.filter((value): value is string => Boolean(value)))].sort();

export default function Filters({ filters, setFilters, sort, setSort, models, devices }: {
  filters: BenchmarkFilters;
  setFilters: (filters: BenchmarkFilters) => void;
  sort: BenchmarkSort;
  setSort: (sort: BenchmarkSort) => void;
  models: BenchmarkModel[];
  devices: BenchmarkModelDevice[];
}) {
  const update = (key: keyof BenchmarkFilters, value: string | number) => setFilters({ ...filters, [key]: value });
  const setPlatform = (platform: string) => setFilters({ ...filters, platform, hardwareModel: "", comparisonDeviceKey: "" });
  const modelDeviceProfiles = devices.filter((device, index) => devices.findIndex((candidate) =>
    candidate.device.platform === device.device.platform &&
    candidate.device.hardwareModel === device.device.hardwareModel &&
    candidate.device.processorCount === device.device.processorCount &&
    candidate.device.activeProcessorCount === device.device.activeProcessorCount &&
    candidate.device.physicalMemoryBytes === device.device.physicalMemoryBytes &&
    candidate.device.gpuName === device.device.gpuName
  ) === index);

  return <section className="benchmark-controls" aria-label="Leaderboard filters">
    <div className="platform-tabs" role="group" aria-label="Apple platform">
      <button type="button" aria-pressed={!filters.platform} onClick={() => setPlatform("")}>All open models</button>
      <button type="button" aria-pressed={filters.platform === "iOS"} onClick={() => setPlatform("iOS")}>iOS</button>
      <button type="button" aria-pressed={filters.platform === "macOS"} onClick={() => setPlatform("macOS")}>macOS</button>
    </div>

    <div className="leaderboard-toolbar">
      <label className="toolbar-search"><span className="sr-only">Search models</span><input value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Search open-source models…" /></label>
      <label><span className="sr-only">Model format</span><select value={filters.format} onChange={(event) => update("format", event.target.value)}><option value="">All formats</option>{unique(models.map((model) => model.model.format)).map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span className="sr-only">Specific model</span><select value={filters.modelKey} onChange={(event) => update("modelKey", event.target.value)}><option value="">All models</option>{models.map((model) => <option key={model.modelKey} value={model.modelKey}>{model.model.displayName}</option>)}</select></label>
      <label><span className="sr-only">Sort leaderboard</span><select value={sort} onChange={(event) => setSort(event.target.value as BenchmarkSort)}>
        <option value="overall">Top score</option><option value="generationSpeed">Fastest generation</option><option value="firstTokenLatency">Lowest first-token latency</option><option value="totalDuration">Shortest duration</option><option value="peakRam">Lowest process RAM</option><option value="submissions">Most runs</option><option value="name">Name A–Z</option><option value="knowledge">Best knowledge</option><option value="math">Best math</option><option value="scienceReasoning">Best science reasoning</option><option value="commonsense">Best commonsense</option><option value="contextReasoning">Best context reasoning</option><option value="truthfulness">Best truthfulness</option><option value="instructionFollowing">Best instruction following</option><option value="code">Best code</option>
      </select></label>
    </div>

    <details className="more-filters">
      <summary>More filters</summary>
      <div className="more-filter-grid">
        <label>Family<select value={filters.family} onChange={(event) => update("family", event.target.value)}><option value="">All families</option>{unique(models.map((model) => model.model.family)).map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Parameter size<select value={filters.parameterSize} onChange={(event) => update("parameterSize", event.target.value)}><option value="">All sizes</option>{unique(models.map((model) => model.model.parameterSize)).map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Apple hardware<select value={filters.hardwareModel} onChange={(event) => update("hardwareModel", event.target.value)}><option value="">All hardware</option>{unique(devices.filter((device) => !filters.platform || device.device.platform === filters.platform).map((device) => device.device.hardwareModel)).map((value) => <option key={value} value={value}>{formatHardwareModel(value)}</option>)}</select></label>
        <label>Minimum runs<input type="number" min="0" inputMode="numeric" value={filters.minimumSubmissions} onChange={(event) => update("minimumSubmissions", Math.max(0, Number(event.target.value) || 0))} /></label>
        <label>Exact performance device<select value={filters.comparisonDeviceKey} onChange={(event) => update("comparisonDeviceKey", event.target.value)}><option value="">Auto when hardware matches</option>{modelDeviceProfiles.filter((device) => !filters.platform || device.device.platform === filters.platform).map((device) => <option key={device.modelDeviceKey} value={device.modelDeviceKey}>{device.device.platform} · {formatHardwareModel(device.device.hardwareModel)}{device.device.physicalMemoryBytes ? ` · ${Math.round(device.device.physicalMemoryBytes / 1024 ** 3)} GB` : ""}</option>)}</select></label>
        <button type="button" className="clear-filter-button" onClick={() => setFilters({ search: "", modelKey: "", format: "", family: "", parameterSize: "", platform: "", hardwareModel: "", minimumSubmissions: 0, comparisonDeviceKey: "" })}>Clear all</button>
      </div>
    </details>
  </section>;
}
