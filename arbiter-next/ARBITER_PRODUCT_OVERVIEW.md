# Arbiter Product Overview

## Executive Summary

Arbiter is a privacy-first AI assistant for Apple devices. Its core promise is simple: useful AI without requiring an account, cloud chat history, or paid hosted inference. Users can run compact open-source models directly on their iPhone or Mac, connect to larger local-network models running on a computer, or use Apple's Foundation Model on eligible Apple Intelligence devices.

The product is designed for people who want modern AI assistance while keeping control over where their data goes. Chats are stored locally on device, model files are downloaded and managed by the app, and cloud/network features are explicit choices rather than the default privacy model.

Arbiter currently exists as two related apps:

- **Arbiter for iOS:** A mobile, private AI chat app focused on on-device use, camera/photo input for vision models, file summarization, web search when enabled, Siri/Shortcuts support, and local chat history.
- **Arbiter for macOS:** A desktop companion and full chat app that can run local models, connect to remote OpenAI-compatible servers, and serve a loaded local MLX model over the user's local network through an OpenAI-compatible API.

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
- Hugging Face links for model pages.
- Download progress tracking.
- Installed model detection at launch.
- Device memory fit checks with warnings for models likely to crash on the current device.
- Storage warnings for multi-gigabyte models.
- Local cleanup for deleted models.
- Recovery for already-installed MLX models that are no longer in the current manifest.

MLX downloads use a Hugging Face repository tree scan to download the required config, tokenizer, and weight files into Application Support under `MLXModels`, then load from that local directory. GGUF models are resolved through the app's model disk utilities.

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

- Manual host and port configuration.
- Default local server workflows for apps such as LM Studio or Ollama-style servers.
- `GET /v1/models` model discovery.
- `POST /v1/chat/completions` streaming chat support.
- Remote model selection stored as `remote:<model-id>`.
- Connection test flow with specific error handling for timeouts, refused connections, empty model lists, HTTP errors, and decoding failures.
- iOS discovery of nearby Arbiter computers through Bonjour/local network browsing.

The remote model path gives users a private network option: prompts can stay inside the home or office network while using models too large for the phone.

### macOS Model Server

The macOS app includes a "Serve Model" feature. When an MLX model is loaded, the Mac can expose it to other apps and devices on the local network through an OpenAI-compatible API.

Server features include:

- Start/stop server controls.
- Configurable port, defaulting to 8080.
- Localhost and local-network base URLs.
- Bonjour service advertisement as `_arbiter._tcp`.
- `GET /v1/models`.
- `POST /v1/chat/completions`.
- Server-sent event streaming compatible with OpenAI-style chat completion clients.
- CORS headers for browser/client compatibility.
- Connected client list.
- Active loaded model display.
- Copyable curl examples for listing models and sending chat requests.
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
- Search requests go to `https://search.askarbiter.ai`.
- The app requests JSON search results and injects a compact, token-aware result summary into the model prompt.
- Results are sorted toward entries with useful snippets.
- Search payloads are capped and formatted to reduce context pressure on small models.
- Prior assistant turns are trimmed for search-grounded prompts to avoid memory blowups on-device.
- Search errors distinguish offline, timeout, 404, rate limit, server error, bad response, decoding failure, and no-results states.
- Recoverable search errors can offer an offline retry path.

Search is best described as an optional internet-backed feature layered on top of Arbiter's local-first experience.

### Context Management and Reliability

Arbiter includes a staged context-window system to keep conversations usable across models with different context limits.

The context manager supports:

- Full-history mode for small conversations.
- Approaching-limit warning state.
- Hybrid mode that keeps a summary plus recent turns.
- Exceeded-limit errors when the prompt cannot safely fit.
- Model-specific context budgets:
  - GGUF fallback: 2048 token context with response reserve.
  - MLX dynamic context from `config.json` when available.
  - Apple Foundation fallback.
  - Remote server profile with larger assumed context.
- Background conversation summarization for older messages.
- Deferred summarization to avoid conflicting with active local generation.
- User-facing warnings when context is nearing limits.

The app also includes timeout handling, model-load states, local engine unload/reload behavior, remote streaming task cancellation, MLX memory cache clearing around generation, and file/search error flows.

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
- Discover nearby Arbiter Mac servers.
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
- Host a loaded MLX model as an OpenAI-compatible local API.
- Share that model with iPhone or other clients on the same Wi-Fi network.
- Show local and network API URLs.
- Provide copyable curl examples.
- Track connected clients.
- Configure server port.
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

## Privacy Posture

Arbiter's privacy model is local-first.

Local by default:

- Chats are stored on device.
- Installed models run on device.
- Files and images are copied into the app sandbox for local use.
- Personalization settings are stored locally.
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
- The macOS model server currently requires a loaded MLX model.
- The macOS server handles one generation at a time for the loaded model.
- Apple Foundation Model support depends on OS version, Apple Intelligence availability, and device eligibility.

## Upcoming Features and Roadmap Candidates

The repo does not include a formal roadmap document. The following are useful upcoming-feature candidates based on the current codebase, product direction, and partially established architecture.

### Near-Term Product Opportunities

- **Broader file understanding:** Expand beyond PDF and plain text into common office formats such as DOCX, Markdown, CSV, and possibly images with OCR.
- **Larger file workflows:** Replace the current small-file excerpt approach with chunking, background summarization, and retrieval so users can work with longer documents.
- **Richer local search/RAG:** Add local embeddings and semantic search over uploaded documents or chat history.
- **Better model recommendations:** Use device memory, installed models, role, and task type to recommend the best model automatically.
- **Model health checks:** Detect corrupt or partial downloads and offer repair/re-download actions.
- **More transparent privacy controls:** Add an in-app privacy dashboard explaining exactly when network access is used.
- **Search provider controls:** Let users disable search entirely, choose search providers, or configure a self-hosted search endpoint.
- **Vision improvements:** Add multi-image input, image history management, and clearer model compatibility labels.
- **Shortcuts expansion:** Add shortcuts for asking with a specific role, starting a new chat, summarizing a file, or querying a Mac server.
- **macOS server hardening:** Add optional API key support, request logs, model busy queueing, LAN access controls, and clearer connection diagnostics.

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
- **Server authentication:** Optional local API key and trusted-device controls.
- **Menu bar mode:** Keep the model server available without a full window.
- **OpenAI-compatible client polish:** Improve compatibility with more local tools, IDE plugins, and chat clients.
- **Local network onboarding:** QR code or one-tap pairing from iPhone to Mac.
- **Desktop document workflows:** Drag-and-drop larger documents and folders for local analysis.

### Model Roadmap Candidates

- Add newer compact phone-friendly models as they become available.
- Add more 4-bit MLX models optimized for Apple Silicon.
- Add more vision-language models that fit 6 GB and 8 GB devices.
- Add clearer labels for context length, speed, RAM requirements, modalities, and best-use cases.
- Add model benchmarks gathered from the user's own device.

## Suggested Product Messaging

### One-Line Pitch

Arbiter is a private local AI assistant for iPhone and Mac that runs open-source models on your device or connects to your own local-network models.

### Short Pitch

Arbiter brings useful AI to your Apple devices without forcing your conversations through a cloud account. Run lightweight models directly on iPhone, use larger local models on Mac, connect to LM Studio or other OpenAI-compatible local servers, upload files, analyze images with vision models, and enable web search only when you need current information.

### Long Pitch

Arbiter is built for users who want the power of modern AI with more control over privacy, cost, and model choice. Instead of relying on a hosted chatbot, Arbiter lets you download and run open-source models locally, choose the right model for your device, and keep conversations stored on your own hardware. On iPhone, Arbiter is a private assistant for chat, files, images, translation, coding, study, planning, and search-assisted questions. On Mac, Arbiter can run larger local models and serve a loaded MLX model over your local network through an OpenAI-compatible API, turning your Mac into a private AI backend for your phone and other tools.

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

Roadmap sections are labeled as candidates because the repository does not currently contain a formal public roadmap.
