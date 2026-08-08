# Arbiter Model Benchmarks

Arbiter's `arbiter-benchmark-v2` benchmark is an on-device diagnostic for
measuring installed MLX and GGUF models on specific Apple hardware. It runs one
excluded warm-up followed by 64 fixed questions: eight each for knowledge,
math, science reasoning, commonsense, context reasoning, truthfulness,
instruction following, and code reasoning.

The first six categories use fixed selections from the corresponding
tinyBenchmarks datasets. Instruction following uses eight IFEval prompts with
locally verifiable constraints. Code reasoning uses eight original Arbiter
multiple-choice checks because safely executing generated code is outside the
app's sandbox. The generated pack lives at
`Arbiter/Arbiter/Resources/Benchmarks/arbiter_benchmark_v1.json`; its reproducible
build script is `scripts/build_arbiter_benchmark_pack.py`.

Each result is saved locally as versioned JSON in the app's Application Support
`BenchmarkResults` directory. The record contains:

- Model name, repository/file, format, family, parameter size, and file size
- Hardware model, OS, CPU counts, physical memory, Metal GPU, power mode, and
  thermal state
- App/build and benchmark schema/suite versions
- Time to first token, prompt and generation throughput, duration, and process
  resident-memory measurements
- Per-test pass/fail scores and category totals

Prompts and generated responses are persisted only in the local result so users
can inspect past answers. The History screen can upload an unsubmitted result or
delete its local record. Chat content, settings, account details, the device
name, and a device identifier are not collected. Upload is optional and requires
a separate confirmation for each result; uploaded test rows omit the question,
expected answer, and generated response.

## Upload endpoint

The app target's `BENCHMARK_UPLOAD_ENDPOINT` points to the second-generation
Firebase HTTPS Function `submitBenchmark` in `us-central1`. The app sends a
`POST` request with the redacted result JSON, `Content-Type: application/json`,
`X-Arbiter-Benchmark-Schema: 3`, and a Firebase App Check token when the SDK can
issue one. A successful endpoint returns:

```json
{"submissionId":"server-generated-id"}
```

The client persists that server-generated ID and upload time in its local result.
The function uses the benchmark result UUID only as an idempotency key, so a
retry returns the original submission ID instead of creating a duplicate.

## Firebase architecture

The tracked Firebase configuration uses project `arbiter-app-4c253` and contains:

- `functions/index.js`: bounded HTTPS ingestion and Firestore transaction
- `functions/benchmark-validation.js`: strict schema, field, range, question-ID,
  category-total, and score validation
- `firestore.rules`: deny-all client access to benchmark collections
- `firebase.json` and `.firebaserc`: Functions, Firestore, and emulator config

Accepted documents are stored in the server-only `benchmarkSubmissions`
collection. `benchmarkSubmissionKeys` maps a one-way hash of the local result
UUID to its server-generated ID for idempotent retries. The Admin SDK adds
`receivedAt` and ingestion metadata; the server never trusts client timestamps
for receipt time. The function rejects bodies over 256 KiB, unknown fields,
unknown or duplicate question IDs, inconsistent aggregate scores, implausible
measurements, and any non-null question, expected answer, or model response.
It is capped at five instances and does not store IP addresses or user agents.

The landing page never reads `benchmarkSubmissions`. The second-generation
Firestore trigger `aggregateBenchmarkSubmission` materializes three public,
read-only views in the same default Firestore database:

- `publicBenchmarkModels`: quality and performance totals grouped by benchmark
  suite, model ID, repository, file, and format
- `publicBenchmarkModelDevices`: the same totals additionally grouped by Apple
  hardware model, platform, physical memory, and GPU name
- `publicBenchmarkRuns`: server-timestamped individual run summaries used only
  when a visitor opens a model's detailed results

Each numeric field stores a sum, contributing count, average, minimum, and
maximum. Nullable measurements have their own contributing counts and are never
treated as zero. Headline performance also has a `standardPerformanceMetrics`
group containing only nominal-thermal-state runs with Low Power Mode disabled.
The two aggregate collections include submission and verified-App-Check counts,
but omit client result IDs, client timestamps, OS versions, ingestion
identifiers, and per-question results. Individual public runs include the
model, device type and
specifications, OS and app versions, benchmark conditions, overall and category
scores, and performance metrics. They use the server receipt time and omit the
client UUID, client timestamp, attested app ID, test rows, prompts, expected
answers, and model responses.

Firestore events are delivered at least once. The private
`benchmarkAggregationReceipts` collection makes processing idempotent: the
trigger checks and creates a receipt in the same transaction that updates the
model and model-device totals. Existing submissions can be processed with the
documented one-time backfill command. Browser clients have public read access
only to these three public collections; all writes still require the Admin SDK.

## Landing-page data contract

The benchmark dashboard uses Firebase project `arbiter-app-4c253` and its
default Firestore database. A landing page hosted from another Firebase project
may initialize the benchmark configuration as a named second Firebase Web app;
it does not need to move hosting, analytics, or unrelated services. The Web
client must use the ordinary Firebase JavaScript SDK and must never contain an
Admin SDK credential or service-account key.

### Shared aggregate shape

Documents in `publicBenchmarkModels` and `publicBenchmarkModelDevices` contain:

- `schemaVersion`, currently `3`
- `suiteVersion`, currently `arbiter-benchmark-v2`
- `modelKey`, a stable server-generated grouping key
- `model`: `id`, `displayName`, `repository`, `fileName`, `format`, `family`,
  `parameterSize`, and `fileSizeBytes`
- `submissionCount`, `verifiedSubmissionCount`,
  `missingAppCheckSubmissionCount`, and
  `standardPerformanceSubmissionCount`
- `metrics`: statistics across every accepted run
- `standardPerformanceMetrics`: performance statistics from nominal thermal
  state with Low Power Mode disabled
- `categories`: statistics for all eight capability categories
- Firestore `createdAt` and `updatedAt` timestamps

`publicBenchmarkModelDevices` additionally contains `modelDeviceKey` and a
`device` object with `platform`, `hardwareModel`, `processorCount`,
`activeProcessorCount`, `physicalMemoryBytes`, and `gpuName`.

Every entry in `metrics` and `standardPerformanceMetrics` has this shape:

```ts
type AggregateMetric = {
  sum: number;
  count: number;
  average: number | null;
  minimum: number | null;
  maximum: number | null;
};
```

Available metric keys are `score`, `averageTimeToFirstTokenSeconds`,
`promptTokensPerSecond`, `generatedTokensPerSecond`, `totalDurationSeconds`,
`residentMemoryBeforeBytes`, `peakResidentMemoryBytes`, and
`residentMemoryIncreaseBytes`. `score` exists only in `metrics`; the standard
group is for performance measurements.

Category keys are `knowledge`, `math`, `scienceReasoning`, `commonsense`,
`contextReasoning`, `truthfulness`, `instructionFollowing`, and `code`. Each
category contains `name` plus the five `AggregateMetric` fields.

### Individual public run shape

`publicBenchmarkRuns/{submissionId}` is a sanitized record for a model detail
view. It contains:

- `schemaVersion`, `suiteVersion`, `modelKey`, and `modelDeviceKey`
- the same public `model` metadata as the aggregate documents
- `device`: platform, hardware model, OS, CPU counts, physical memory, GPU, Low
  Power Mode, and thermal state
- `app.version`, `app.build`, and benchmark `temperature`
- overall `score` and `questions.passed` / `questions.total`
- all eight category names, passed counts, totals, and scores
- `performance`: first-token time, prompt and generation throughput, duration,
  starting and peak resident memory, and resident-memory increase
- `appCheckVerified`
- Firestore `submittedAt` and `publishedAt` timestamps

The document ID is a random server submission ID. Individual public runs do not
contain the client UUID, client timestamp, device name, persistent device ID,
attested Firebase app ID, prompts, expected answers, model responses, or
per-question rows.

### Frontend behavior

The main dashboard should attach `onSnapshot` listeners only to
`publicBenchmarkModels` and `publicBenchmarkModelDevices`. These collections are
small materialized views, so model search, filters, and sorting may be performed
client-side. Detach both listeners when the dashboard unmounts.

Use `publicBenchmarkModels` for overall and capability scores. Use
`publicBenchmarkModelDevices` for speed, latency, duration, and memory charts;
performance across unlike devices must not be presented as a fair direct
comparison. Prefer `standardPerformanceMetrics` when its contributing count is
positive and visibly show the relevant submission count.

Query individual runs only after a visitor expands a model or opens its detail
page:

```ts
query(
  collection(benchmarkDb, "publicBenchmarkRuns"),
  where("modelKey", "==", selectedModelKey),
  orderBy("submittedAt", "desc"),
  limit(25)
)
```

The deployed composite index supports this query. Paginate or increase the
limit deliberately; do not subscribe to every individual run on initial page
load.

The initial table should support model search and filters for model, format,
family, parameter size, platform, hardware, and minimum submission count. Sort
options should include overall or category score descending, generation speed
descending, first-token time ascending, duration ascending, peak resident
memory ascending, submission count descending, and model name.

Recommended visualizations are a score-versus-generation-speed scatter plot
after a device is selected, a capability heatmap across the eight categories,
and device-filtered bars for speed, first-token latency, and peak process RAM.
The current benchmark does not measure CPU or GPU utilization. Processor counts
must not be labeled CPU usage, and resident memory must be labeled process RAM
rather than total model or unified memory.

The UI must describe these as community-submitted Arbiter diagnostic results,
not official MMLU, GSM8K, IFEval, or tinyBenchmarks leaderboard scores. A
submission count is a count of runs, not unique users or devices, because the
upload intentionally has no persistent identity. Low-sample results should be
marked preliminary.

App Check is initially in monitoring mode through the
`BENCHMARK_REQUIRE_APP_CHECK` Boolean parameter. Valid tokens are verified and
recorded as verified; missing tokens are accepted until every supported release
build and platform has been validated. Set the parameter to `true` before public
rollout. Direct Firestore access remains denied in both modes because only the
Cloud Function writes through the Admin SDK.

The repository's `firestore.rules` is a locked-down baseline for a new
database. Firebase replaces the entire active ruleset during deployment, so an
existing project must merge the benchmark collection blocks into its current
rules rather than deploy this file unchanged. Any existing broader wildcard
allow must exclude these collections because matching Firestore allows are
combined with OR semantics.

Deployment, App Check rollout, emulator use, budget alerts, and operational
verification are documented in `DEVELOPER.md`. A separate Firebase development
project is still recommended before benchmark traffic becomes significant so
test data and quotas cannot affect the production dataset.

The score is intentionally named and versioned as an Arbiter diagnostic;
it is not a comprehensive model-quality score. It must not be presented as an
MMLU, GSM8K, IFEval, or other third-party benchmark score. Changing prompts,
validators, generation settings, or timing semantics requires a new suite
version.

## Benchmark methodology

The benchmark reports the percentage of questions answered correctly plus
category breakdowns. Speed and memory do not affect that score. Its sources
are:

- IFEval for automatically verifiable instruction following (Apache 2.0)
- tinyMMLU for broad knowledge and reasoning
- tinyGSM8K for multi-step arithmetic
- tinyAI2 ARC for science reasoning
- tinyHellaSwag and tinyWinogrande for commonsense reasoning
- tinyTruthfulQA for resistance to common misconceptions

The tinyBenchmarks sets contain 100 deliberately selected examples per source
benchmark. Arbiter uses eight fixed questions from each set and generated-answer
accuracy to stay within an interactive runtime. Therefore its score is an
Arbiter diagnostic score, not the published tinyBenchmarks IRT estimate or an
official score for any source benchmark.

HumanEval is excluded from the mobile app until model-generated code can run in
a robust sandbox.
