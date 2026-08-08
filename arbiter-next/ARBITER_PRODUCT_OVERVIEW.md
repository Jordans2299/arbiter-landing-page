# Arbiter Product Overview

Last updated from the current codebase and development chat on June 29, 2026.

## Executive Summary

Arbiter is a privacy-first AI assistant for Apple devices. Its core promise is simple: useful AI without requiring an account, cloud chat history, or paid hosted inference. Users can run compact open-source models directly on their iPhone or Mac, connect to larger local-network models running on a computer, or use Apple's Foundation Model on eligible Apple Intelligence devices.

The product is designed for people who want modern AI assistance while keeping control over where their data goes. Chats are stored locally on device, model files are downloaded and managed by the app, and cloud/network features are explicit choices rather than the default privacy model.

Arbiter currently exists as two related apps:

- **Arbiter for iOS:** A mobile, private AI chat app focused on on-device use, camera/photo input for vision models, file summarization, web search when enabled, Siri/Shortcuts support, and local chat history.
- **Arbiter for macOS:** A desktop companion and full chat app that can run local models, connect to remote OpenAI-compatible servers, and serve installed local MLX models over the user's local network through an OpenAI-compatible API.

## Value Proposition

Arbiter gives users a practical middle ground between cloud AI convenience and full local control.

Most AI assistants require accounts, send prompts to external servers, and lock advanced features behind subscriptions or usage pricing. Arbiter's value is that it makes local AI approachable: the app provides a model catalog, download management, chat UI, role presets, file/photo inputs, and model settings around open-source models that run on the user's own hardware.

Core value pillars:

- **Privacy by default:** Conversations are stored locally. Prompts do not leave the device unless the user enables web search, connects to a local-network server, or uses another explicit network-backed capability.
- **No account requirement:** The app is built around local state, local storage, and local inference rather than user accounts.
- **Cost control:** Users can avoid ongoing cloud inference fees by running small models on-device or larger models on their own Mac/PC.
- **Model choice:** Arbiter supports multiple model families and formats, including GGUF, MLX, Apple Foundation Model, and OpenAI-compatible remote servers.
- **Offline usefulness:** Core chat can work without internet after a model is installed.
- **Local power scaling:** Users can run models directly on iPhone or Mac, then scale up by connecting to LM Studio, Ollama-style OpenAI-compatible servers, or Arbiter's macOS model server on the same Wi-Fi network.
- **Everyday utility:** Arbiter supports brainstorming, coding help, proofreading, translation, study help, travel planning, meal planning, image understanding, file summarization, and current-information lookup when search is enabled.

## Current Feature Inventory

### Recent Changes Reflected in This Version

The current codebase includes a stronger local-network workflow than the previous documentation described:

- Remote Server settings now distinguish **Arbiter Server** connections from **Third-Party Server** connections.
- Nearby Arbiter server discovery now uses Bonjour TXT metadata for direct host/port resolution, with a timed search window and visible diagnostics.
- Remote connections can query and change a server's active model through `/v1/active_model`.
- The macOS Serve Model screen now lets users choose from installed MLX models before starting the server.
- The macOS server can list installed MLX models and lazy-load the requested installed model for serving.
- Remote connection and server screens include copyable diagnostics/debug logs.
- Model recommendation logic now uses both `minMemory` and `maxMemory`, avoids tight-fit models during onboarding recommendations, and adjusts phone-size scoring for 8 GB devices.
- The app version in the project has moved to `0.2.02` / `0.2.02-local`, and the local build icon target now uses `AppIconLocal`.

### Private Local Chat

Arbiter provides a persistent chat interface backed by local Core Data storage. Chat sessions can be created, renamed, deleted, exported, and imported. The app automatically titles new chats from the first user message and reopens the current or most recent session when launched.

Chat features include:

- Streaming assistant responses.
- Stop generation control.
- Retry and edit flows for user messages.
- Delete recent user/assistant message pairs.
- Markdown rendering for assistant output.
- Chat history with local session management.
- JSON export and import for chat backups or migration.
- Local persistence of messages, attachments, summaries, selected model, and settings.

### On-Device Model Execution

Arbiter can run local models directly on Apple devices. Both supported local runtime paths are available across iOS and macOS; the practical limits are device memory, thermals, model size, and model modality rather than the operating system alone.

- **GGUF models** through a llama.cpp-style local engine.
- **MLX models** through `mlx-swift`, `mlx-swift-lm`, and `MLXVLM`.

The local model catalog currently contains **44 models**:

- **24 GGUF models**
- **20 MLX models**
- **9 vision-capable models**
- **10 reasoning-tagged models**

Supported model families in the bundled manifest include:

- Apple Foundation Model
- Gemma
- Llama
- DeepSeek
- Qwen
- Mistral / Ministral
- Phi
- Granite
- Liquid AI / LFM
- SmolLM / SmolVLM

The catalog includes lightweight phone-friendly models, larger desktop-friendly models, coding models, reasoning models, and multimodal vision-language models. Both GGUF and MLX entries can be used on iOS or macOS when the selected device has enough resources.

### Model Catalog and Download Management

The model browser lets users explore, filter, sort, install, and delete models.

Current catalog features include:

- Searchable model list.
- Filters for installed, MLX, GGUF, recommended, Llama, vision, and reasoning models.
- Sorting by recommended fit, installed first, size, alphabetical order, and popularity.
- Device-aware recommendations based on RAM fit, model size, and manifest memory ranges.
- Onboarding recommendations avoid incompatible and tight-memory models.
- Some recommended manifest entries now include `maxMemory` so smaller models are not over-recommended on devices that can comfortably run stronger options.
- Hugging Face links for model pages.
- Download progress tracking.
- Installed model detection at launch.
- Device memory fit checks with warnings for models likely to crash on the current device.
- Storage warnings for multi-gigabyte models.
- Local cleanup for deleted models.
- Recovery for already-installed MLX models that are no longer in the current manifest.

MLX downloads use a Hugging Face repository tree scan to download the required config, tokenizer, and weight files into Application Support under `MLXModels`, then load from that local directory. GGUF models are resolved through the app's model disk utilities.

### Local Model Benchmarking

Arbiter includes a 64-question on-device diagnostic for installed MLX and GGUF
models. It records answer accuracy, category scores, generation speed, time to
first token, duration, and process memory alongside the model and Apple hardware
configuration. Completed results are saved locally, can be revisited through
Benchmark History, and expose the individual questions and model answers by
capability.

Uploading is optional and separately confirmed for each result. The app removes
all prompts, expected answers, and generated responses before sending model,
device, score, speed, and memory measurements to a validated Firebase HTTPS
Function. The function writes the individual upload into server-only Firestore
collections; public clients cannot read or write the raw dataset. A separate
Firestore trigger maintains public read-only model averages, model/device
averages, and sanitized individual-run summaries for the Arbiter landing page.
App Check support is included for the production enforcement rollout. See
`BENCHMARKS.md` for methodology and the shared landing-page data contract, and
`DEVELOPER.md` for Firebase operations.

### Public Benchmark Dashboard

The Arbiter landing page exposes benchmark results as a separate top-level tab.
Its initial view is a searchable, filterable, sortable model leaderboard backed
by real-time listeners to the public aggregate collections. It shows average
overall and capability scores, run counts, generation speed, first-token
latency, duration, and peak process RAM. Quality comparisons can span devices;
performance comparisons use model/device aggregates and should require or
clearly display a device filter.

The dashboard supports model and device filters, minimum-run filtering, and
sorting by overall or category score, generation speed, first-token latency,
duration, process memory, submission count, and model name. Useful
visualizations include a device-filtered quality-versus-speed scatter plot, an
eight-category capability heatmap, and device-filtered performance bars.

Selecting a model opens a detail view or expandable section that queries its
most recent sanitized individual runs. Each row is timestamped with the server
receipt time and can show model/version information, Apple hardware and OS,
power and thermal conditions, overall and category scores, generation speed,
latency, duration, and process RAM. The public record contains no client UUID,
device identifier, account, chat, prompt, expected answer, generated response,
or per-question content.

Dashboard language calls these community-submitted Arbiter diagnostic results.
Run counts are not unique-user or unique-device counts because Arbiter
deliberately collects no persistent identity. Models with limited submissions
should be labeled preliminary. The dashboard must not imply that the score is
an official result for one of the source benchmark projects, and it must not
label CPU/GPU utilization or total unified memory because those values are not
currently measured.

### Apple Foundation Model Support

Arbiter includes Apple Foundation Model support for eligible devices and OS versions.

Current behavior:

- Available when the platform can import FoundationModels and the device reports Apple's system language model as available.
- Requires iOS 26 or macOS 26 in the current code path.
- Uses Apple Intelligence availability checks.
- Shows clear fallback errors when the device is not eligible, Apple Intelligence is disabled, the model is not ready, or the OS is unsupported.
- Integrates with Arbiter's personalization and assistant-role system prompt.
- Streams responses into the same chat UI.

This provides a zero-download first-party model option for eligible Apple Intelligence users while preserving the app's broader open-model flexibility.

### Remote Local-Network Models

Arbiter can connect to OpenAI-compatible local servers on the user's network. This is useful when an iPhone cannot comfortably run a larger model but a nearby Mac or PC can.

Remote server support includes:

- A connection source selector for Arbiter Server versus Third-Party Server workflows.
- Manual host and port configuration.
- HTTP and HTTPS protocol selection for manual third-party server connections.
- Default port handling for Arbiter Server (`8080`) and third-party OpenAI-compatible servers (`1234`).
- Setup instructions tailored to Arbiter-to-Arbiter connections versus apps such as LM Studio or Ollama-style servers.
- `GET /v1/models` model discovery.
- `GET /v1/active_model` active model discovery when the server supports it.
- `POST /v1/active_model` active model switching when the server supports it.
- `POST /v1/chat/completions` streaming chat support.
- Remote model selection stored as `remote:<model-id>`.
- Remote model display names collapse repository-style IDs to the final path component for readability.
- Connection test flow with specific error handling for timeouts, refused connections, empty model lists, HTTP errors, and decoding failures.
- iOS and macOS discovery of nearby Arbiter computers through Bonjour/local network browsing.
- Manual fallback entry when automatic discovery is unavailable or permission-limited.
- Connection diagnostics that can be expanded, copied, and cleared from the settings screen.

The remote model path gives users a private network option: prompts can stay inside the home or office network while using models too large for the phone.

### macOS Model Server

The macOS app includes a "Serve Model" feature. When an MLX model is loaded, the Mac can expose it to other apps and devices on the local network through an OpenAI-compatible API.

Server features include:

- Start/stop server controls.
- Installed MLX model picker for choosing the model to serve.
- Automatic loading of the selected installed MLX model before serving.
- Configurable port, defaulting to 8080.
- Localhost and local-network base URLs.
- Bonjour service advertisement as `_arbiter._tcp` with TXT host/port metadata for easier client discovery.
- `GET /v1/models`, returning installed MLX models and the currently loaded model.
- `GET /v1/active_model`.
- `POST /v1/active_model`.
- `POST /v1/chat/completions`.
- Server-sent event streaming compatible with OpenAI-style chat completion clients.
- Connected client list.
- Active loaded model display.
- Copyable connection values and external API details.
- Copyable server diagnostics/debug logs.
- Clear error messaging for invalid ports, ports already in use, missing installed MLX models, and model-load failures.
- Busy-state handling so a single loaded model is not asked to generate multiple responses concurrently.

This turns Arbiter for macOS into both a local AI client and a small private model server for an iPhone, another app, or any OpenAI-compatible client on the same network.

### Vision and Image Input

Arbiter supports image input for MLX models marked as vision-capable.

Current vision features:

- Photo library image attachment.
- iOS camera capture flow with camera permission handling.
- macOS photo attachment for MLX models.
- Image previews before sending.
- JPEG conversion for model input.
- Vision models receive image data through the MLX/VLM path.
- Image resizing to 448x448 for vision processing.
- Text-only models are protected from image input paths that would crash.

Example vision-capable catalog entries include Gemma 4 E2B, LFM 2.5 VL, Ministral 3, Qwen2 VL, Llama 3.2 Vision, Gemma 4 12B, and SmolVLM.

### Document and File Uploads

Arbiter supports file uploads for PDF and plain text files.

Current file behavior:

- File picker accepts `.pdf` and `.txt`.
- Files are copied into the app sandbox for persistent access.
- Maximum imported file size is currently 2 MB.
- PDF text extraction uses PDFKit.
- Plain text files are read as UTF-8.
- Attached files are stored with filename, file type, and local file URL metadata.
- For smaller local non-MLX models, Arbiter can summarize the file first and then use the summary in follow-up context.
- For MLX and remote models, Arbiter can include a file excerpt directly in the prompt path.
- Previous file attachments can be represented by stored summaries to reduce repeated context usage.

This makes Arbiter useful for summarizing notes, short PDFs, text drafts, documents, and extracted source material while keeping local processing as the default.

### Optional Web Search

Arbiter includes a user-controlled web search toggle for current information.

Current search behavior:

- Search is disabled by default and explicitly toggled in the chat input bar.
- The app sends search requests to the hosted gateway at `https://search.askarbiter.ai`. The gateway keeps the provider credential server-side, uses the **Brave Search API** as the primary provider, and transparently falls back to hosted **SearXNG** when Brave is rate limited, down, timing out, returns nothing, or rejects the key.
- The fallback is skipped when the device is fully offline, since the secondary provider would fail the same way and only add latency.
- News-intent queries use Brave's dedicated news endpoint (and SearXNG's news category on fallback); query parameters such as freshness, safesearch, and language are mapped to each provider's own vocabulary.
- The app requests JSON search results and injects a compact, token-aware result summary into the model prompt.
- Results are sorted toward entries with useful snippets, and a short TTL cache avoids burning provider quota on repeated or similar queries.
- Search payloads are capped and formatted to reduce context pressure on small models.
- Prior assistant turns are trimmed for search-grounded prompts to avoid memory blowups on-device.
- Search errors distinguish offline, timeout, 404, gateway rate limit, server error, bad response, decoding failure, and no-results states. Provider credential failures stay server-side and trigger fallback rather than reaching the app.
- Recoverable search errors can offer an offline retry path.

Search is best described as an optional internet-backed feature layered on top of Arbiter's local-first experience.

### Context and Memory Management

Arbiter runs models with wildly different context limits (2K to 130K+ tokens) on devices with hard, unforgiving memory ceilings. On iPhone, exceeding that ceiling does not produce a graceful error. The operating system terminates the entire app (a "jetsam" kill). The context system therefore has two jobs that are often confused but are genuinely separate:

1. **Fit the conversation into the model's context window** (a token-count problem).
2. **Keep the process under the device's memory ceiling** (a bytes problem).

A budget that is correct for (1) can still get the app killed by (2). The system below addresses both, and the distinction drives most of the design.

#### Staged context window

`ContextWindowManager.assemble()` classifies every outgoing prompt into one of four stages by comparing estimated input tokens against the model's budget:

- **Full**: total tokens ≤ the soft threshold. Send the entire history unchanged.
- **Approaching**: above the soft threshold but ≤ the safe input budget. Still send everything, but surface a one-time UI warning and (in hybrid-eligible cases) begin preparing a summary.
- **Hybrid**: above the safe input budget. Drop the oldest turns, optionally prepend a conversation summary, and always preserve the current user turn. If the current turn alone is too large, it is truncated from the front (the tail usually holds the actual question; the head is often a pasted file excerpt).
- **Exceeded**: even the minimal required turn does not fit. Raise a user-facing error rather than sending a prompt guaranteed to fail.

`safeInputBudget = maxContextTokens − reservedResponseTokens`, and `softThreshold = safeInputBudget × softThresholdFraction`. The reserve guarantees room for the model's reply inside the same window; the soft fraction creates a buffer so trimming and background summarization begin *before* the hard limit.

#### Per-model-type budgets

The budget and its source differ by runtime. Selection happens in `ChatViewModel.currentContextConfig`:

| Model type | Max context | Response reserve | Soft fraction | Recent turns kept | Source of the number |
|---|---|---|---|---|---|
| **GGUF (llama.cpp)** | 2,048 | 512 | 0.65 | 6 | Hardcoded. SwiftLlama is configured with `maxTokenCount: 2048`, so the budget must match that hard cap. |
| **MLX (on-device)** | `max_position_embeddings` from `config.json`, then **capped by device memory** | 1,024 (clamped to ≤ ½ of max) | 0.65 | 8 | Read from the model's own config at load, then reduced by the memory math below. |
| **Apple Foundation** | 4,096 | 1,024 | 0.65 | 8 | Conservative fixed profile (Apple does not expose the window). |
| **Remote server** | 32,768 | 4,096 | 0.85 | 50 | Context is managed server-side, so the profile is generous and the soft fraction high. |
| **Fallbacks** | 4,096 (MLX) / 4,096 (Foundation) | 1,024 | 0.65 | 8 | Used when `config.json` can't be read or the model context is unknown. |

The MLX row is the interesting one. The model *advertises* a trained context length (gemma-4-e2b claims **131,072 tokens**), but no phone can hold a 131K-token KV cache in memory. Taken at face value, that number sets the soft warning threshold around 84K tokens, which is unreachable: the app is killed for memory long before the warning could ever fire. The memory cap below exists to bring that number back down to what the hardware can actually survive, so the *token* budget and the *memory* ceiling line up.

#### Token estimation (script-aware)

Token counts are estimated from text without invoking the tokenizer on the hot path (`ContextWindowManager.estimateTokens`). The estimate is weighted per Unicode scalar because a flat "characters ÷ 3.5" ratio only holds for Latin-script text:

```
tokens ≈ ceil( latinChars / 3.5  +  denseChars × 1  +  expansiveChars × 2 )
```

- **Latin and most scripts:** ~3.5 characters per token.
- **Dense (CJK ideographs, kana, Hangul):** ~1 token per character.
- **Expansive (Devanagari and other Indic scripts, Thai, Lao):** ~2 tokens per character.

**Why this matters:** the Language Translator role routinely fills the conversation with the target language. With the old flat ratio, a Chinese or Hindi chat under-counted real tokens by **3–7×**, so the budget math believed a conversation was small while the model saw it as large, and no warning fired before trouble. `assemble()` also accepts an optional exact `tokenCounter` closure for callers that want true tokenizer counts; the script-aware estimate is the default.

#### Memory-derived cap (the core math)

For MLX models, `memoryCappedContextTokens()` converts the device's RAM into a token ceiling. The model is asked how many bytes one context token actually costs, and the available memory is divided by that:

```
usableBytes      = deviceMemoryGB × 1e9 × 0.65
availableForKV   = usableBytes − modelWeightBytes − 500 MB headroom
bytesPerToken    = kvBytesPerToken + unchunkedPrefillBytesPerToken
contextCap       = availableForKV / bytesPerToken      (floored at 1,024 tokens)
```

The model is then given `min(trainedContextLength, contextCap)`.

**`kvBytesPerToken`** is computed from `config.json` geometry. The KV cache stores a key and a value vector per layer per token, in fp16:

```
kvBytesPerToken = numLayers × numKVHeads × headDim × 2 (K+V) × 2 bytes (fp16)
```

For gemma-4-e2b (35 layers, 1 KV head, head dim 256): `35 × 1 × 256 × 2 × 2 = 35,840 bytes/token`.

**Assumptions, and why each errs conservative:**

- **0.65 usable fraction**: iOS grants an app roughly 60–70% of physical RAM before jetsam; the rest is the OS, other processes, and slack. Taking the low end leaves margin.
- **500 MB activation headroom**: a flat reserve for per-layer activations, the framebuffer, and general app memory that isn't weights or KV cache.
- **fp16 KV across all layers**: gemma uses sliding-window attention on most layers, so its real KV footprint is smaller than this full-dense estimate. Over-counting here yields a *smaller, safer* context.
- **`deviceMemoryGB`** is physical RAM rounded up to the nearest 0.5 GB (`ProcessInfo.physicalMemory`), so an "8 GB" phone that reports ~7.7 GB is treated as 8.0.

#### The VLM prefill spike (why the cap needed a second term)

The KV cache is the *steady-state* cost, but it is not what was killing long translator chats. The MLX vision-language model path (`VLMModelFactory`) does not chunk prefill. When processing a prompt of length `S`, it evaluates the entire prompt in a single forward pass and materializes a `[1, S, vocab]` logits tensor plus comparable activation temporaries. For gemma-4's **262,144-token vocabulary**, that transient is roughly:

```
unchunkedPrefillBytesPerToken ≈ vocabSize × 8  ≈  262,144 × 8  ≈  2.1 MB per prompt token
```

This term applies **only to vision-loaded models** (the `VLMModelFactory` path); text-only models load through `LLMModelFactory`, which chunks prefill and does not exhibit this scaling. Because the KV cache and the prefill tensor occupy memory at the same instant, the two are summed into `bytesPerToken`.

**Worked example (gemma-4-e2b on a 12 GB iPhone, the actual crash device):**

```
usableBytes     = 12 × 1e9 × 0.65            = 7.80 GB
availableForKV  = 7.80 − 3.58 (weights) − 0.5 = 3.72 GB
bytesPerToken   = 35,840 (KV) + 2,097,152 (prefill) = 2,132,992
contextCap      = 3.72e9 / 2,132,992          ≈ 1,744 tokens
```

The crash reproduced deterministically at a **~2,400-token** prompt: the single-pass prefill needed well over 3 GB of transient memory against ~3.2 GB of free headroom, and the OS killed the app *during prefill, before the first token was generated*. With the prefill term included, the cap drops to ~1,700 tokens, so that conversation now enters **hybrid mode** (trim + summarize) instead of being sent whole and crashing. Without the prefill term (KV cost alone), the same device would have permitted ~104,000 tokens, which is why the earlier KV-only cap did not prevent the crash.

This is a mitigation, not the root fix: the underlying issue is that the upstream VLM `prepare()` ignores its prefill-chunk-size parameter. The cleaner fix (in progress) is to route text-only conversations through the chunked `LLMModelFactory` and only load the VLM container when an image is actually present.

#### Runtime memory back-pressure and instrumentation

Beyond the static budget, the MLX engine applies live guards:

- **GPU buffer-cache cap (20 MB), set once per process**: bounds MLX's reusable buffer pool so it cannot balloon across turns. It is applied a single time at first load and never reset, because resetting it to 0 on unload previously corrupted MLX state and crashed the next load.
- **`Memory.memoryLimit` back-pressure**: on each load, MLX's allocator limit is set to `currentActiveMemory + 0.8 × processAvailableMemory`. Past that limit, MLX allocations *wait* for queued GPU work to drain instead of overshooting. (This helps with incremental growth but cannot save a single oversized allocation, which is why the prefill cap above is still required.)
- **Cache flush around every generation**: `Memory.clearCache()` before and after each call so intermediate tensors from a prior turn don't pile onto the next prefill.
- **Per-turn memory logging** (`[ARBITER_MLX_MEM]`): process headroom and MLX active/cache/peak are logged before and after each generation, with peak reset per turn and breadcrumbs at prefill completion and every 25 decode tokens. When a memory kill happens, the last line printed pinpoints the phase (prefill vs. decode) and the spike size.

#### Reasoning-mode interaction

Reasoning ("thinking") models change the budget in two ways. Output token allowance is raised to **4,096** when thinking is enabled on a reasoning-tagged model, because the chain-of-thought trace alone can exhaust the default 2,048 reply reserve before the model reaches its answer. And for search-grounded prompts, thinking is force-disabled regardless of the user toggle. Extracting an answer from injected snippets gains nothing from reasoning, and small models otherwise loop "verifying" the snippets until they run out of budget.

#### Background summarization and reliability

When a conversation enters hybrid mode without an existing summary, Arbiter queues a background summarization of the older messages and persists the result on the session, so future turns can carry a compact summary instead of full history. Summarization is **deferred until the active generation completes**. Local engines run one task at a time, so summarizing mid-response would conflict. The summary path uses the Foundation Model when selected, otherwise the loaded local engine.

The app also includes timeout handling, model-load states, local engine unload/reload behavior, remote streaming task cancellation, and file/search error flows. MLX load failures clear stale loaded-model IDs and all context-window metadata (context length, KV geometry, vocabulary) so the UI and server never treat a failed load as usable.

### On-Device Memory and Retrieval (Embeddings)

Arbiter now runs a local embedding model and a retrieval layer on top of it. This powers three related capabilities that all stay on the device: smarter file context, richer web search grounding, and a persistent memory that lets the assistant recall facts about the user across separate chats. Everything in this section is computed and stored locally. No content and no embeddings leave the device.

#### Embedding engine

A small text embedding model, `sentence-transformers/all-MiniLM-L6-v2` (roughly 22 MB, 384 dimensions), is loaded on the device through the MLX embedders path. It downloads from Hugging Face on first use and is cached permanently afterward. The engine is an actor that loads lazily the first time any feature needs it, so it adds no cost until embeddings are actually required. Vectors are L2 normalized, so cosine similarity reduces to a dot product, and a single shared instance serves file retrieval, search retrieval, and memory.

#### File retrieval (document RAG)

Uploaded PDF and text files are split into overlapping chunks by a document store and ranked against the user's question by a vector retriever when embeddings are available, or a keyword retriever as a fallback. A retrieval service selects how much of a file to include based on the available token budget.

Chunked text and chunk embeddings are persisted to disk (under Application Support), keyed by the file's URL and modification date. Because both caches survive the in-memory singletons, reopening a chat, switching to another chat and back, or relaunching the app reuses the stored chunks and vectors instead of re-reading the file and re-running the embedding model. The chat-to-file association is unchanged (it lives in Core Data on each message), so the caches are derived data shared across chats while each chat still only sees the files actually attached to its own messages. Including the modification date in the cache key means editing a file transparently invalidates its stale entry and triggers a fresh chunk-and-embed.

For files from earlier in a conversation, Arbiter builds a compact file registry of the most relevant excerpts and pins it so it survives context trimming, the same way a conversation summary is preserved. Two safeguards keep this from bloating the prompt:

- **Relevance gating.** A previously uploaded file is only re-injected when its best matching chunk clears a similarity floor. An unrelated file (for example a tax document left over from earlier) is no longer forced into an off-topic question.
- **Search exclusion.** When a live web search runs on the current turn, the file registry is skipped entirely. The search results are the grounding source for that turn, and stacking a file registry on top was a measurable cause of prefill memory spikes and out-of-memory terminations on small MLX models.

#### Web search retrieval (search RAG)

Web search results are chunked and stored so the assistant can keep a larger pool of search knowledge in memory and reuse it across follow-up questions without a new network call. The search store accumulates chunks from each search performed in a session.

Two refinements keep grounding accurate and the prompt small:

- **Fresh-result scoping.** The grounding injected right after a search is ranked against only that search's freshly fetched chunks, not the entire accumulated store. This prevents a new query from surfacing stale chunks from an earlier, unrelated search (for example a "breaking news today" query pulling leftover "today's date" results).
- **Focused source set.** Retrieval keeps a handful of strong chunks capped to a small number of distinct sources, with a character ceiling. This reads better in the response and keeps the prefill compact.

#### Persistent on-device memory

Arbiter can learn durable facts about the user from conversations and recall them later. Memory is stored in Core Data as a dedicated entity with the fact text, its embedding, a type (fact, preference, or episode), the originating chat, timestamps, and an access count.

Facts are captured continuously in the background:

- **Real-time extraction after each exchange.** When an assistant response completes, Arbiter extracts durable facts from the user's message. A lightweight heuristic pass always runs (pure string matching on first-person statements such as "I am", "I prefer", "I work", "my name is") and needs no model call, so it works even on devices without Apple Intelligence. On eligible devices a Foundation Model pass runs as well for facts stated less explicitly. The model pass is skipped on questions, which carry no self-disclosure.
- **Daily background pass.** Once every 24 hours, a scheduler re-reads recent sessions and runs the Foundation Model over the user's turns to catch anything the per-exchange pass missed.

Every captured fact passes through two cleanups before it can be stored:

- **Atomization.** A fact is shortened to its primary clause and capped in length. A run-on such as "I am a senior software engineer with experience on iOS apps and I am applying to startups, review my resume" is stored as "I am a senior software engineer". Short, atomic facts embed far more cleanly and retrieve far more reliably than long ones, where the key attribute is diluted among elaborations.
- **Grounding.** A fact is rejected unless its asserted value (its head noun) actually appears in the user's own words. This is the decisive guard against the model confabulating an attribute out of a bare question, for example inventing "User is a nurse" from "What is my occupation". Checking the head noun specifically means an echoed query word (like "occupation") cannot fake grounding.

Retrieval is deliberately conservative, because the embedding model's raw similarity scores compress into a narrow band on short personal statements. Several gates work together:

- **Self-reference gate.** Stored facts are only injected when the current question is actually about the user (for example "what is my job", "how old am I"). General questions like a news lookup or a document summary do not pull in personal facts, which stops the assistant from steering unrelated answers toward the user's profile.
- **Calibrated similarity threshold.** Within self-referential turns, facts are ranked by cosine similarity and injected only above a fixed threshold chosen empirically (by reproducing the embedding model and calibrating against the app's own scores) to separate genuine matches from the unrelated personal-identity questions that otherwise cluster nearby. An earlier keyword-overlap gate was removed because it blocked valid matches that used different words for the same concept, such as "job" versus "engineer".
- **Junk filter and backfill.** Negations and assistant self-descriptions that may have slipped into the store are filtered out at retrieval time, and memories saved before the embedding model was available are backfilled with embeddings on first retrieval.

When facts are injected, they are placed in the system prompt under a label that instructs the model to use them only when directly relevant and not to mention them otherwise. Duplicate facts are suppressed at save time by both a lexical word-overlap check and a semantic check that rejects a new fact when it is too similar to anything already stored or accepted earlier in the same batch.

Memory is fully under user control:

- A "Learn from my conversations" toggle in Personalization turns the whole system on or off. It is off by default.
- The Personalization screen shows how many memories are stored and explains, in plain language, that past chats are being used to inform the assistant.
- A "Clear All Memories" action removes everything that has been learned.

#### Personalization grounding

Two smaller grounding changes accompany the memory work. The nickname instruction was reworded so the assistant uses the user's name occasionally and naturally rather than opening every message with it. And because local models have no clock and web search is unreliable for it (date website snippets rarely contain the actual date), the current date is now injected directly into the system prompt so date and time questions are answered correctly.

The design principle behind these changes is a split. Behavioral style settings such as tone, warmth, emoji, and response length stay in the system prompt because they must apply to every reply. Personal facts move into the embedding-backed memory so they surface only when a question is genuinely about the user.

### Assistant Roles and Smart Suggestions

Arbiter includes built-in assistant styles, each with a role-specific system prompt and short label.

Current roles:

- General Assistant
- Language Translator
- Meal Planner
- Fitness Coach
- Mindfulness Guide
- Study Buddy
- Career Advisor
- Travel Planner
- Coding Helper
- Shopping Assistant

The Language Translator role includes a selectable target language. Supported languages currently include Spanish, French, Chinese, Japanese, and Hindi.

Starter prompts are loaded from bundled `example_prompts.json`, with a Firebase-backed prompt fetch attempted first and local prompts used as fallback. Prompts are filtered by selected role.

### Personalization

Arbiter lets users shape how the assistant responds without writing a full custom system prompt.

Personalization settings include:

- Nickname.
- Custom instructions.
- Warmth: Direct, Balanced, Warm.
- Enthusiasm: Calm, Balanced, Energetic.
- Emoji preference: None, Occasional, Frequent.
- Response style: Concise, Balanced, Detailed.

The personalization layer builds a compact prompt block and appends it to the selected role prompt. It intentionally includes only non-default settings to save tokens.

### Siri and Shortcuts

Arbiter includes an App Intent named **Ask Arbiter**.

Current behavior:

- The user can ask Arbiter a question hands-free through Siri/Shortcuts.
- The shortcut returns a spoken dialog response.
- The app does not need to open when the intent runs.
- Responses are kept short for voice use.
- The Foundation Model path is used when selected and available.
- If no local model is loaded for non-Foundation use, the shortcut tells the user to open Arbiter first.

The settings screen also includes a Siri tip prompting users to say "Hey Siri, Ask Arbiter..."

### General App Features

Additional product features include:

- Onboarding flow.
- Dark, light, and system appearance settings.
- iOS haptic feedback toggle.
- Reopen reminder notifications after inactivity.
- App Store review and share links.
- Support/tip flow using StoreKit products at $2, $5, $10, and $20 product tiers.
- Device specs display including OS version, CPU cores, RAM, disk space, and GPU name.
- Markdown UI support and code highlighting dependencies.

## The Two Apps

### Arbiter for iOS

The iOS app is the primary mobile experience. It is optimized for private AI assistance on the phone.

Key iOS strengths:

- Run compact GGUF and MLX models on-device.
- Download and manage models from a curated catalog.
- Use camera or photo library images with MLX vision models.
- Upload PDF or text files for summarization.
- Enable web search when current information is required.
- Connect to larger local-network models running on a Mac or PC.
- Discover nearby Arbiter Mac servers through Bonjour, or connect manually with host/port.
- Use Siri/Shortcuts for hands-free questions.
- Haptic feedback and mobile-specific input controls.
- Local chat history, import, and export.

The iOS app is ideal for:

- Private personal assistant use.
- Offline brainstorming and writing.
- Coding questions and study help.
- Travel, translation, and everyday planning.
- Summarizing short files on the go.
- Asking visual questions about photos.
- Using a nearby computer as a private inference server.

Device guidance from the App Store description recommends iPhone 13 Pro or later, or devices with at least 6 GB RAM, for smooth on-device model performance.

### Arbiter for macOS

The macOS app is both a desktop AI assistant and a local model host.

Key macOS strengths:

- Run larger local models that are better suited to Mac memory and thermals, including MLX models and compatible GGUF models.
- Use the same chat, model, file, search, personalization, and role systems as iOS.
- Host an installed MLX model as an OpenAI-compatible local API.
- Share that model with iPhone or other clients on the same Wi-Fi network.
- Select which installed MLX model the server should expose.
- Show local and network API URLs.
- Provide copyable connection details and API information.
- Track connected clients.
- Configure server port.
- Inspect copyable server diagnostics and connection logs.
- Use desktop-specific settings navigation and window layout.

The macOS app is ideal for:

- Users with Apple Silicon Macs who want stronger local models.
- Serving private AI to an iPhone without sending prompts to a cloud provider.
- Local development against an OpenAI-compatible endpoint.
- Testing local models on desktop before using them in mobile workflows.

## Technical Stack

### Platform and UI

- Swift
- SwiftUI
- Xcode project targeting Apple platforms
- iOS and macOS conditional compilation
- Core Data for local persistence
- UserDefaults for settings and lightweight state
- PDFKit for PDF text extraction
- PhotosUI and AVFoundation for photo library and camera input
- StoreKit for tip purchases
- AppIntents for Siri/Shortcuts
- Network framework for the macOS local server and Bonjour service
- URLSession for search, model downloads, remote server calls, and Hugging Face metadata

### AI and Model Runtime

- `swift-llama-cpp` for GGUF/local llama.cpp-style model execution.
- `mlx-swift` for Apple Silicon MLX runtime support.
- `mlx-swift-lm` for MLX language model loading and generation.
- `MLXVLM` for vision-language model support.
- Hugging Face Swift tooling and tokenizers.
- Apple FoundationModels framework when available.
- OpenAI-compatible HTTP/SSE streaming for remote model servers.

### Key Swift Package Dependencies

Resolved dependencies include:

- `mlx-swift`
- `mlx-swift-lm`
- `swift-llama-cpp`
- `swift-huggingface`
- `swift-transformers`
- `swift-markdown-ui`
- `Highlightr`
- `EventSource`
- `NetworkImage`
- Apple Swift packages such as Swift Collections, Swift Crypto, Swift NIO, Swift Numerics, Swift System, and Swift Syntax.

### Persistence and Local Data

Core Data stores chat sessions and messages. Messages can include:

- Role.
- Text.
- Date.
- File metadata.
- File summaries.
- Model used.
- Image data.

Settings such as selected model, selected role, personalization, theme, haptics, downloaded model IDs, remote server configuration, server port, onboarding status, and prompt preferences are stored in UserDefaults.

### Networking

Arbiter uses network access only for explicit or support features:

- Downloading model files from Hugging Face.
- Fetching Hugging Face model metadata and download counts.
- Fetching optional remote starter prompts.
- Optional web search through `search.askarbiter.ai`.
- Connecting to user-configured local-network model servers.
- Advertising and connecting to Arbiter Mac servers on the local network.
- StoreKit product lookup and purchases.

Core local chat with installed models does not require a cloud account.

### Test Coverage

The current test suite covers the core local model and chat support paths, including:

- Model settings, assistant roles, role Codable/equality behavior, dynamic translator prompts, and translator language defaults.
- Prompt example decoding.
- Model manager lookups, reasoning flags, MLX/GGUF format inference, family inference, model size parsing, and manifest backward compatibility.
- Remote server config URL normalization, IPv6 host formatting, remote model keys, and remote display names.
- MLX engine initial state, no-model generation behavior, unload behavior, loading state tracking, and vision-path metadata.
- Model disk path handling and MLX download storage helpers.
- Context-window staging, token budgeting, summarization inclusion, and oversized-turn behavior.
- Script-aware token estimation (Latin/CJK/Indic weighting) and the device-memory context cap, including the VLM unchunked-prefill term and `config.json` geometry parsing.
- Chat view model initialization, message persistence, editing, cancellation, deletion, context warnings, file text extraction, and generated chat names.
- Memory extraction: clause atomization of run-on facts, head-noun grounding that rejects fabricated values, request-restatement filtering, and end-to-end fact parsing against a source message.
- Core Data persistence and app state session behavior.

The app builds cleanly for the iPhone 17 Simulator. The memory-extraction logic (atomization, grounding, fact parsing) is additionally verified by compiling the real source directly and asserting against the cases that originally surfaced the bugs.

## Privacy Posture

Arbiter's privacy model is local-first.

Local by default:

- Chats are stored on device.
- Installed models run on device.
- Files and images are copied into the app sandbox for local use.
- Personalization settings are stored locally.
- Learned memories, their embeddings, and the embedding model all stay on device, and memory can be toggled off or cleared entirely by the user.
- No account is required for the core assistant experience.

Network use is explicit or feature-specific:

- Model downloads require Hugging Face/network access.
- Web search sends the user's search query to Arbiter's search endpoint.
- Remote server mode sends prompts to the configured server on the local network.
- macOS server mode receives prompts from clients that connect to the Mac.
- StoreKit tip purchases use Apple's purchase infrastructure.

Recommended privacy language:

> Arbiter is private by default. Your conversations are stored on your device, and local model chats do not require an account or cloud AI server. If you enable web search, download models, or connect to a local-network model server, Arbiter uses the network only for that selected feature.

## Competitive Positioning

Arbiter is positioned against three categories:

1. **Cloud AI assistants:** Arbiter is more private, account-free, and cost-controlled, but local model quality depends on device hardware and selected model size.
2. **Raw local model tools:** Arbiter is more approachable for everyday users because it wraps model downloads, chat history, prompts, search, files, photos, and settings into a native app.
3. **Developer-only local servers:** Arbiter can still operate as a local server on macOS, but also provides a polished end-user chat experience on iPhone and Mac.

The main differentiator is the blend of consumer simplicity and local AI flexibility.

## Target Users

Arbiter is a strong fit for:

- Privacy-conscious AI users.
- Developers who want local coding help.
- Students and professionals who want offline study, writing, and summarization.
- Users who dislike subscription or token-metered AI costs.
- Apple Silicon Mac owners who want to run larger local models.
- iPhone users who want a private assistant that can connect to their own Mac.
- Tinkerers experimenting with open-source models.
- Users who need AI in low-connectivity environments after installing models.

## Current Limitations

Important product limitations to communicate clearly:

- On-device model quality and speed depend heavily on device RAM, chip, thermals, and model size.
- Some larger models may fail or crash on low-memory devices.
- File upload support is currently focused on PDF and plain text.
- File imports are currently limited to 2 MB.
- Image input requires an MLX vision-capable model.
- Web search is not offline and uses Arbiter's search endpoint.
- Remote model privacy depends on the user's configured local server and network.
- The macOS model server currently serves installed MLX models. GGUF models can still run in local chat but are not served over the Mac API yet.
- The macOS server handles one generation at a time for the loaded model.
- Bonjour discovery can depend on local network permission, Wi-Fi configuration, and whether host/port TXT metadata is available; manual host/port entry remains the fallback.
- Apple Foundation Model support depends on OS version, Apple Intelligence availability, and device eligibility.

## Upcoming Features and Roadmap Candidates

The repo does not include a formal roadmap document. The following are useful upcoming-feature candidates based on the current codebase, product direction, and partially established architecture.

### Near-Term Product Opportunities

- **Broader file understanding:** Expand beyond PDF and plain text into common office formats such as DOCX, Markdown, CSV, and possibly images with OCR.
- **Larger file workflows:** Replace the current small-file excerpt approach with chunking, background summarization, and retrieval so users can work with longer documents.
- **Richer local search/RAG:** Local embeddings and semantic search over uploaded documents, web search results, and a persistent user memory are now implemented (see "On-Device Memory and Retrieval"). Remaining opportunities include topic-scoped follow-up retrieval and a user-visible memory editor.
- **Better model recommendations:** Use device memory, installed models, role, and task type to recommend the best model automatically.
- **Model health checks:** Detect corrupt or partial downloads and offer repair/re-download actions.
- **More transparent privacy controls:** Add an in-app privacy dashboard explaining exactly when network access is used.
- **Search provider controls:** Let users disable search entirely, choose search providers, or configure a self-hosted search endpoint.
- **Vision improvements:** Add multi-image input, image history management, and clearer model compatibility labels.
- **Shortcuts expansion:** Add shortcuts for asking with a specific role, starting a new chat, summarizing a file, or querying a Mac server.
- **macOS server hardening:** Add trusted-device pairing, request limits, LAN access controls, and clearer connection diagnostics.

### iOS Roadmap Candidates

- **Share sheet extension:** Send text, URLs, PDFs, or images from other apps into Arbiter for summarization or analysis.
- **Widgets / Live Activities:** Quick prompt launcher, last answer, or model/server status.
- **Voice mode:** Conversational speech input/output around the existing App Intent and chat engine.
- **Background model download management:** Better user-facing resume, pause, and notification flows for large downloads.
- **On-device document library:** Store imported files as reusable knowledge sources instead of one-off attachments.
- **Camera-first workflows:** Scan a page, whiteboard, receipt, or screenshot and ask Arbiter about it.
- **Per-role default models:** Automatically select lighter models for quick chat and stronger models for coding, reasoning, or vision.

### macOS Roadmap Candidates

- **Multi-model serving:** Serve more than one loaded or installed model from the Mac.
- **Request queueing:** Queue local-network requests instead of rejecting when busy.
- **Trusted-device pairing:** Add QR-code or one-tap pairing.
- **Menu bar mode:** Keep the model server available without a full window.
- **OpenAI-compatible client polish:** Improve compatibility with more local tools, IDE plugins, and chat clients.
- **Local network onboarding:** QR code or one-tap pairing from iPhone to Mac.
- **Desktop document workflows:** Drag-and-drop larger documents and folders for local analysis.

### Model Roadmap Candidates

- Add newer compact phone-friendly models as they become available.
- Add more 4-bit MLX models optimized for Apple Silicon.
- Add more vision-language models that fit 6 GB and 8 GB devices.
- Add clearer labels for context length, speed, RAM requirements, modalities, and best-use cases.
- Add confidence intervals, outlier policy, and minimum-sample publication rules
  as the public benchmark dataset grows.

## Suggested Product Messaging

### One-Line Pitch

Arbiter is a private local AI assistant for iPhone and Mac that runs open-source models on your device or connects to your own local-network models.

### Short Pitch

Arbiter brings useful AI to your Apple devices without forcing your conversations through a cloud account. Run lightweight models directly on iPhone, use larger local models on Mac, connect to LM Studio or other OpenAI-compatible local servers, upload files, analyze images with vision models, and enable web search only when you need current information.

### Long Pitch

Arbiter is built for users who want the power of modern AI with more control over privacy, cost, and model choice. Instead of relying on a hosted chatbot, Arbiter lets you download and run open-source models locally, choose the right model for your device, and keep conversations stored on your own hardware. On iPhone, Arbiter is a private assistant for chat, files, images, translation, coding, study, planning, and search-assisted questions. On Mac, Arbiter can run larger local models and serve installed MLX models over your local network through an OpenAI-compatible API, turning your Mac into a private AI backend for your phone and other tools.

## Practical Use Cases

- Brainstorm ideas offline.
- Draft, rewrite, and proofread text.
- Summarize PDFs and text files.
- Ask questions about images or screenshots with vision models.
- Get coding help from compact local coding models.
- Use reasoning models for step-by-step problem solving.
- Translate phrases and learn basic language concepts.
- Plan meals, workouts, trips, study sessions, and career tasks.
- Use web search for current events or recent facts when needed.
- Connect an iPhone to a larger model running on a nearby Mac.
- Use the Mac app as a private OpenAI-compatible local API server.

## Source Notes

This document was prepared from:

- The provided App Store description.
- `README.md`.
- `Arbiter/Arbiter/models_manifest.json`.
- Swift source files for chat, model management, MLX loading, model downloads, remote servers, macOS hosting, search, settings, personalization, shortcuts, StoreKit tips, and chat import/export.
- The current worktree changes around remote server diagnostics, Bonjour TXT discovery, active-model switching, installed MLX serving, recommendation tuning, and updated Swift tests.
- Later worktree changes moving Brave-first search with SearXNG fallback into a hosted gateway, persisting document chunks and embeddings to disk across chats and launches, and hardening on-device memory extraction with clause atomization and head-noun grounding plus a recalibrated retrieval threshold.

Roadmap sections are labeled as candidates because the repository does not currently contain a formal public roadmap.
