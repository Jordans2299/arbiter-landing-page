import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemedImage from "@/components/ThemedImage";

export const metadata: Metadata = {
  title: "Documentation – Arbiter",
  description:
    "User guide and documentation for Arbiter. Learn how to run local AI models, manage chats, connect to servers, and more.",
  openGraph: {
    title: "Documentation – Arbiter",
    type: "website",
  },
  alternates: {
    canonical: "https://www.askarbiter.ai/documentation",
  },
};

export default function DocumentationPage() {
  return (
    <>
      <Navbar />

      <header className="legal-header">
        <div className="container">
          <h1>Documentation</h1>
          <p className="legal-updated">
            User guide for Arbiter on iOS and macOS
          </p>
        </div>
      </header>

      <div className="docs-layout">
        {/* Sidebar Navigation */}
        <aside className="docs-sidebar">
          <h2>Sections</h2>
          <ol>
            <li><a href="#getting-started">Getting Started</a></li>
            <li><a href="#model-formats">Model Formats</a></li>
            <li><a href="#model-catalog">Model Catalog</a></li>
            <li><a href="#on-device-inference">On-Device Inference</a></li>
            <li><a href="#chat">Chat &amp; Conversations</a></li>
            <li><a href="#files-and-vision">Files &amp; Vision</a></li>
            <li><a href="#web-search">Web Search</a></li>
            <li><a href="#import-export">Importing &amp; Exporting</a></li>
            <li><a href="#local-network">Connecting to Servers</a></li>
            <li><a href="#mac-server">Running a Server</a></li>
            <li><a href="#apple-foundation">Apple Foundation Models</a></li>
            <li><a href="#roles-personalization">Roles &amp; Personalization</a></li>
            <li><a href="#siri-shortcuts">Siri &amp; Shortcuts</a></li>
            <li><a href="#context-management">Context Management</a></li>
            <li><a href="#platform-differences">iOS vs. macOS</a></li>
          </ol>
        </aside>

        {/* Main Content */}
        <main className="docs-content">

          {/* 1. Getting Started */}
          <section id="getting-started" className="docs-section">
            <h2>1. Getting Started</h2>
            <p>
              Arbiter is a local-first AI assistant. Once you install a model,
              core chat runs entirely on your device with no account, no cloud
              dependency, and no ongoing inference costs. Network features like
              web search, model downloads, and local-network server connections
              are explicit opt-ins.
            </p>

            <h3>First Launch</h3>
            <ol>
              <li>Open Arbiter and walk through the onboarding screens.</li>
              <li>
                Head to the <strong>Model Catalog</strong> and install a model.
                If you are not sure where to start, look for models tagged
                <strong> Recommended</strong>. These are sized to run well on
                most devices.
              </li>
              <li>
                Once the download finishes, the model loads automatically.
                Start a new chat and send a message.
              </li>
            </ol>

            <div className="docs-screenshot-row">
              <ThemedImage
                darkSrc="/screenshots/dark/welcome.PNG"
                lightSrc="/screenshots/light/welcome.PNG"
                alt="Arbiter welcome screen with onboarding steps"
                width={280}
                height={600}
                className="docs-screenshot"
              />
              <ThemedImage
                darkSrc="/screenshots/dark/choose_model.PNG"
                lightSrc="/screenshots/light/choose_model.PNG"
                alt="Choose a model during onboarding"
                width={280}
                height={600}
                className="docs-screenshot"
              />
            </div>

            <h3>Device Requirements</h3>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Minimum</th>
                  <th>Recommended</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>iOS</td>
                  <td>iOS 16, A14 Bionic, 6 GB RAM</td>
                  <td>iPhone 15 Pro or later</td>
                </tr>
                <tr>
                  <td>macOS</td>
                  <td>macOS 14, Apple Silicon (M1)</td>
                  <td>M1 Pro / M2 or later with 16+ GB RAM</td>
                </tr>
              </tbody>
            </table>
            <p>
              Models vary in size from under 1 GB to over 8 GB. Arbiter checks
              your device&rsquo;s available memory before loading and warns you
              if a model is likely to exceed what your hardware can handle.
            </p>
          </section>

          {/* 2. Understanding Model Formats */}
          <section id="model-formats" className="docs-section">
            <h2>2. Understanding Model Formats</h2>
            <p>
              Arbiter supports three model runtime paths. Each has different
              tradeoffs around compatibility, performance, and setup.
            </p>

            <h3>GGUF</h3>
            <p>
              GGUF is a quantized model format popularized by the{" "}
              <strong>llama.cpp</strong>{" "}ecosystem. GGUF models are single-file
              downloads that run on both iOS and macOS through Arbiter&rsquo;s
              built-in llama.cpp engine.
            </p>
            <ul>
              <li>
                <strong>Compatibility:</strong> Works on both iPhone and Mac.
              </li>
              <li>
                <strong>Performance:</strong> Efficient memory usage through
                quantization (most catalog entries are Q4 or Q8). Good balance
                of speed and quality on devices with limited RAM.
              </li>
              <li>
                <strong>Best for:</strong> Compact models on iPhone, general
                chat, coding, and reasoning tasks.
              </li>
            </ul>

            <h3>MLX</h3>
            <p>
              MLX is Apple&rsquo;s machine learning framework for Apple Silicon.
              MLX models are stored as a set of config, tokenizer, and weight
              files and run through <code>mlx-swift</code>. They also work on
              both iOS and macOS.
            </p>
            <ul>
              <li>
                <strong>Compatibility:</strong> Works on both iPhone and Mac.
                Requires Apple Silicon.
              </li>
              <li>
                <strong>Performance:</strong> Takes advantage of the unified
                memory architecture on Apple Silicon. Larger MLX models that
                would not fit comfortably on an iPhone can run well on a Mac
                with more RAM.
              </li>
              <li>
                <strong>Vision models:</strong>{" "}All vision-capable models in
                Arbiter&rsquo;s catalog use the MLX format through the MLXVLM
                runtime.
              </li>
              <li>
                <strong>Server support:</strong> The macOS model server feature
                requires an MLX model to be loaded.
              </li>
              <li>
                <strong>Best for:</strong> Larger models on Mac, vision tasks,
                and serving models to other devices.
              </li>
            </ul>

            <h3>Apple Foundation Model</h3>
            <p>
              Apple&rsquo;s on-device Foundation Model is available on devices
              running iOS 26 or macOS 26 with Apple Intelligence enabled. This
              is a system-level model provided by Apple, so no download or
              storage is required.
            </p>
            <ul>
              <li>
                <strong>Compatibility:</strong> Requires Apple Intelligence
                eligibility and iOS 26 / macOS 26.
              </li>
              <li>
                <strong>Performance:</strong>{" "}Runs natively through Apple&rsquo;s
                FoundationModels framework. Zero disk usage.
              </li>
              <li>
                <strong>Best for:</strong> Quick responses without downloading a
                model, or as a lightweight default alongside open-source models.
              </li>
            </ul>

            <div className="docs-callout">
              <strong>Which format should I pick?</strong> If you are on iPhone
              and want a fast, compact model, start with a recommended GGUF
              model. If you have a Mac with 16+ GB of RAM and want to explore
              larger or vision-capable models, try MLX. If your device supports
              Apple Intelligence, the Foundation Model is available with no
              downloads at all.
            </div>
          </section>

          {/* 3. Model Catalog & Downloads */}
          <section id="model-catalog" className="docs-section">
            <h2>3. Model Catalog &amp; Downloads</h2>
            <p>
              Arbiter ships with a curated catalog of 44+ models spanning
              multiple families: Gemma, Llama, DeepSeek, Qwen, Mistral,
              Phi, Granite, and others. The catalog includes 24 GGUF models,
              20 MLX models, 9 vision-capable models, and 10 reasoning models.
            </p>

            <h3>Browsing and Filtering</h3>
            <p>
              The model browser supports search, filtering, and sorting:
            </p>
            <ul>
              <li>
                <strong>Filters:</strong> Installed, MLX, GGUF, Recommended,
                Vision, Reasoning, and individual model families.
              </li>
              <li>
                <strong>Sorting:</strong> Recommended fit (default), installed
                first, file size, alphabetical, and popularity.
              </li>
            </ul>

            <div className="docs-screenshot-row">
              <ThemedImage
                darkSrc="/screenshots/dark/model_list.PNG"
                lightSrc="/screenshots/light/model_list.PNG"
                alt="Model catalog with filter chips and search"
                width={280}
                height={600}
                className="docs-screenshot"
              />
            </div>

            <h3>Downloading a Model</h3>
            <ol>
              <li>
                Tap a model in the catalog to see its details, including size,
                format, capabilities, and a link to its Hugging Face page.
              </li>
              <li>
                Tap <strong>Download</strong>. Progress is tracked in the UI.
                Large models (4 to 8 GB) may take several minutes depending on
                your connection.
              </li>
              <li>
                Once downloaded, the model is stored locally in the
                app&rsquo;s sandbox. GGUF models download as a single file.
                MLX models download config, tokenizer, and weight shards from
                Hugging Face.
              </li>
            </ol>

            <h3>Memory Fit Checks</h3>
            <p>
              Arbiter checks your device&rsquo;s available RAM against the
              model&rsquo;s requirements. If a model is likely to exceed your
              device&rsquo;s memory, you will see a warning before downloading.
              This is especially relevant on iPhones with 6 GB RAM where larger
              models may crash during inference.
            </p>

            <h3>Deleting Models</h3>
            <p>
              Installed models can be deleted from the catalog screen to free
              up storage. Deleting a model removes all associated files from
              the app sandbox.
            </p>
          </section>

          {/* 4. On-Device Inference */}
          <section id="on-device-inference" className="docs-section">
            <h2>4. On-Device Inference</h2>
            <p>
              When you send a message with a locally installed model selected,
              inference happens entirely on your device. No network call is
              made, and your prompt never leaves the device.
            </p>

            <h3>How It Works</h3>
            <ul>
              <li>
                GGUF models run through a local llama.cpp engine compiled for
                Apple platforms.
              </li>
              <li>
                MLX models run through <code>mlx-swift</code> and{" "}
                <code>mlx-swift-lm</code>, using Apple Silicon&rsquo;s unified
                GPU and Neural Engine.
              </li>
              <li>
                Responses stream token-by-token into the chat UI. You can tap{" "}
                <strong>Stop</strong> at any time to halt generation.
              </li>
            </ul>

            <h3>Performance Factors</h3>
            <p>
              Token generation speed depends on your hardware, the model size,
              quantization level, and current thermal state. A few guidelines:
            </p>
            <ul>
              <li>
                Smaller quantized models (1 to 3 GB) run smoothly on most
                modern iPhones.
              </li>
              <li>
                Larger models (4 to 8 GB) perform best on Mac or high-RAM
                iPhones (iPhone 15 Pro and later).
              </li>
              <li>
                Sustained generation on iPhone can trigger thermal throttling.
                Shorter conversations or smaller models help here.
              </li>
            </ul>

            <div className="docs-screenshot-row">
              <ThemedImage
                darkSrc="/screenshots/dark/convo.PNG"
                lightSrc="/screenshots/light/convo.PNG"
                alt="Active chat with a streaming model response"
                width={280}
                height={600}
                className="docs-screenshot"
              />
            </div>

            <h3>Troubleshooting: Model Issues</h3>
            <ul>
              <li>
                <strong>Model won&rsquo;t load or crashes:</strong>{" "}The model
                may be too large for your device. Try a smaller model. Models
                tagged &ldquo;Recommended&rdquo; in the catalog are sized for
                most devices. Close background apps to free up memory,
                especially on iPhone. If a download was interrupted, the model
                file may be corrupt. Delete and re-download it from the catalog.
              </li>
              <li>
                <strong>Slow generation:</strong> Larger models generate
                slower, especially on iPhone. Switch to a smaller or more
                quantized variant. Extended generation can heat up the device
                and reduce speed. Very long conversations also increase
                processing time per token, so start a new chat if things slow
                down significantly.
              </li>
            </ul>
          </section>

          {/* 5. Chat & Conversations */}
          <section id="chat" className="docs-section">
            <h2>5. Chat &amp; Conversations</h2>
            <p>
              All chat sessions are stored locally in Core Data. Arbiter
              automatically titles new conversations from your first message
              and reopens your most recent session on launch.
            </p>

            <h3>Chat Features</h3>
            <ul>
              <li>
                <strong>Streaming responses</strong> with stop-generation
                control.
              </li>
              <li>
                <strong>Retry</strong> the last assistant response to get a
                different answer.
              </li>
              <li>
                <strong>Edit</strong> a previous user message and regenerate
                from that point.
              </li>
              <li>
                <strong>Delete</strong> the most recent message pair.
              </li>
              <li>
                <strong>Markdown rendering</strong> for formatted output and
                code blocks with syntax highlighting.
              </li>
              <li>
                <strong>Rename, delete, and search</strong> chat sessions from
                the history sidebar.
              </li>
            </ul>

            <h3>Switching Models Mid-Conversation</h3>
            <p>
              You can switch the active model at any time. The new model picks
              up the existing conversation context. Keep in mind that different
              models have different context window sizes. Switching to a smaller
              model mid-conversation may trigger context management (see{" "}
              <a href="#context-management">Context Management</a>).
            </p>
          </section>

          {/* 6. Files & Vision */}
          <section id="files-and-vision" className="docs-section">
            <h2>6. Files &amp; Vision</h2>

            <h3>File Uploads</h3>
            <p>
              Arbiter supports uploading <strong>PDF</strong> and{" "}
              <strong>plain text</strong>{" "}files for summarization and analysis.
              Files are copied into the app&rsquo;s sandbox and processed
              locally.
            </p>
            <ul>
              <li>Maximum file size: 2 MB.</li>
              <li>
                PDF text is extracted via PDFKit. Plain text is read as UTF-8.
              </li>
              <li>
                For smaller local models, Arbiter can pre-summarize the file to
                reduce context usage. For MLX and remote models, file excerpts
                can be included directly.
              </li>
              <li>
                Previous file attachments can be represented by stored summaries
                in follow-up messages to conserve tokens.
              </li>
            </ul>

            <div className="docs-screenshot-row">
              <ThemedImage
                darkSrc="/screenshots/dark/file_summary.PNG"
                lightSrc="/screenshots/light/file_summary.png"
                alt="PDF file summarized in Arbiter chat"
                width={280}
                height={600}
                className="docs-screenshot"
              />
              <ThemedImage
                darkSrc="/screenshots/dark/image_chat.png"
                lightSrc="/screenshots/light/image_chat.PNG"
                alt="Vision model describing a photo"
                width={280}
                height={600}
                className="docs-screenshot"
              />
            </div>

            <h3>Vision &amp; Image Input</h3>
            <p>
              Vision-capable MLX models can process images alongside text
              prompts. Arbiter supports image input from the photo library
              and, on iOS, directly from the camera.
            </p>
            <ul>
              <li>
                Only MLX models tagged as vision-capable support image input.
                Text-only models are protected from receiving image data.
              </li>
              <li>
                Images are resized to 448&times;448 pixels and converted to
                JPEG before processing.
              </li>
              <li>
                Vision models in the catalog include Gemma 4, LFM 2.5 VL,
                Ministral, Qwen2 VL, Llama 3.2 Vision, and SmolVLM.
              </li>
            </ul>

            <div className="docs-callout">
              <strong>iOS tip:</strong> Use the camera flow to snap a photo of
              a document, whiteboard, receipt, or label and ask Arbiter about
              it directly.
            </div>
          </section>

          {/* 7. Web Search */}
          <section id="web-search" className="docs-section">
            <h2>7. Web Search</h2>
            <p>
              Web search is an optional feature that gives your local model
              access to current information from the internet. It is{" "}
              <strong>disabled by default</strong> and must be explicitly
              toggled on per-message.
            </p>

            <h3>How It Works</h3>
            <ol>
              <li>
                Enable the search toggle in the chat input bar before sending
                your message.
              </li>
              <li>
                Arbiter sends your query to{" "}
                <code>search.askarbiter.ai</code> and receives structured
                results.
              </li>
              <li>
                Results are formatted into a compact, token-aware summary and
                injected into the model&rsquo;s prompt alongside your question.
              </li>
              <li>
                The model generates a response grounded in both its training
                data and the live search results.
              </li>
            </ol>

            <div className="docs-screenshot-row">
              <ThemedImage
                darkSrc="/screenshots/dark/search.PNG"
                lightSrc="/screenshots/light/search.PNG"
                alt="Web search enabled with results in chat"
                width={280}
                height={600}
                className="docs-screenshot"
              />
            </div>

            <h3>Privacy Considerations</h3>
            <p>
              When search is enabled, your search query is sent to
              Arbiter&rsquo;s search endpoint. We do not log or store queries
              beyond what is needed to return results. Your full conversation
              history is <strong>not</strong> transmitted. Only the specific
              search query is sent.
            </p>

            <h3>When to Use Search</h3>
            <ul>
              <li>Current events, news, or recent information.</li>
              <li>Facts that may have changed since the model was trained.</li>
              <li>Product prices, release dates, weather, sports scores.</li>
            </ul>
            <p>
              For topics covered well by the model&rsquo;s training data
              (general knowledge, coding, math), search is usually unnecessary
              and adds latency.
            </p>

            <h3>Troubleshooting: Web Search</h3>
            <ul>
              <li>
                <strong>Search toggle:</strong> Search must be explicitly
                toggled on in the chat input bar for each message.
              </li>
              <li>
                <strong>Internet required:</strong> Search needs an active
                internet connection.
              </li>
              <li>
                <strong>Rate limits:</strong> If you see rate-limit errors,
                wait a moment and try again.
              </li>
            </ul>
          </section>

          {/* 8. Importing & Exporting Chats */}
          <section id="import-export" className="docs-section">
            <h2>8. Importing &amp; Exporting Chats</h2>
            <p>
              Arbiter supports JSON-based chat export and import for backups,
              migration between devices, or archival.
            </p>

            <h3>Exporting</h3>
            <ol>
              <li>Open the chat you want to export.</li>
              <li>
                Use the export option to generate a JSON file containing the
                full message history, metadata, attachments, and summaries.
              </li>
              <li>
                Save or share the file through the system share sheet.
              </li>
            </ol>

            <h3>Importing</h3>
            <ol>
              <li>
                Open Arbiter and use the import option from the chat history
                screen.
              </li>
              <li>
                Select a previously exported JSON file. Arbiter creates a new
                chat session from the imported data.
              </li>
            </ol>

            <div className="docs-callout">
              <strong>Note:</strong> Exported chats include message content,
              timestamps, model references, file summaries, and session
              metadata. Imported chats appear as new sessions in your history.
              Third-party chat formats are not supported.
            </div>
          </section>

          {/* 9. Connecting to Local Servers */}
          <section id="local-network" className="docs-section">
            <h2>9. Connecting to Local Servers</h2>
            <p>
              Arbiter can connect to any OpenAI-compatible API server running
              on your local network. This lets you run larger models on a
              nearby computer and chat from your iPhone or Mac without sending
              prompts to a cloud provider.
            </p>

            <h3>Supported Servers</h3>
            <ul>
              <li>
                <strong>Arbiter for macOS</strong> (see{" "}
                <a href="#mac-server">Running a Model Server</a>)
              </li>
              <li>
                <strong>LM Studio</strong> with the local server enabled in
                settings
              </li>
              <li>
                <strong>Ollama</strong>, which runs an OpenAI-compatible
                endpoint by default
              </li>
              <li>
                <strong>Any OpenAI-compatible server</strong> that exposes{" "}
                <code>/v1/models</code> and{" "}
                <code>/v1/chat/completions</code>
              </li>
            </ul>

            <h3>Setup</h3>
            <ol>
              <li>
                Make sure the server is running and accessible on the same
                Wi-Fi network as your device.
              </li>
              <li>
                In Arbiter, go to <strong>Settings &rarr; Remote Server</strong>.
              </li>
              <li>
                Enter the server&rsquo;s <strong>host</strong> (IP address or
                hostname) and <strong>port</strong>.
              </li>
              <li>
                Tap <strong>Test Connection</strong>. Arbiter queries{" "}
                <code>/v1/models</code> to discover available models.
              </li>
              <li>
                Select a remote model. It appears in the model picker as{" "}
                <code>remote:model-id</code>.
              </li>
            </ol>

            <div className="docs-screenshot-row">
              <ThemedImage
                darkSrc="/screenshots/dark/connect_server.PNG"
                lightSrc="/screenshots/light/connect_server.PNG"
                alt="Remote server configuration with Bonjour discovery"
                width={280}
                height={600}
                className="docs-screenshot"
              />
            </div>

            <h3>Bonjour Discovery (iOS &rarr; Mac)</h3>
            <p>
              When Arbiter for macOS is serving a model, it advertises itself
              on the local network via Bonjour (<code>_arbiter._tcp</code>).
              Arbiter for iOS can automatically discover nearby Mac servers
              without manual IP entry.
            </p>

            <h3>Privacy</h3>
            <p>
              Local-network connections stay on your network. Prompts are sent
              directly between devices and do not pass through Arbiter&rsquo;s
              servers or any external endpoint. The privacy of this path
              depends on your own network configuration.
            </p>

            <h3>Troubleshooting: Server Connections</h3>
            <ul>
              <li>
                <strong>Local Network permission:</strong> On iOS, Arbiter
                requires the Local Network permission to discover and connect
                to servers on your Wi-Fi. Go to{" "}
                <strong>Settings &rarr; Privacy &amp; Security &rarr; Local
                Network</strong> and make sure Arbiter is enabled. Without
                this permission, Bonjour discovery will not work, and manual
                connections may fail.
              </li>
              <li>
                <strong>Same network:</strong> Both devices must be on the same
                Wi-Fi network.
              </li>
              <li>
                <strong>Server running:</strong> Confirm the server (LM Studio,
                Ollama, Arbiter macOS) is actively running and not paused.
              </li>
              <li>
                <strong>Correct host and port:</strong>{" "}Double-check the IP
                address and port number. Use Arbiter&rsquo;s{" "}
                <strong>Test Connection</strong> to diagnose the issue. It
                reports specific errors for timeouts, refused connections,
                empty model lists, and HTTP failures.
              </li>
              <li>
                <strong>Firewall:</strong>{" "}Make sure your Mac&rsquo;s firewall
                allows incoming connections on the configured port.
              </li>
            </ul>
          </section>

          {/* 10. Running a Model Server (macOS) */}
          <section id="mac-server" className="docs-section">
            <h2>10. Running a Model Server (macOS)</h2>
            <p>
              Arbiter for macOS can expose a loaded MLX model as an
              OpenAI-compatible local API server. This turns your Mac into a
              private inference endpoint for your iPhone, other apps, IDE
              plugins, or any client that speaks the OpenAI chat completions
              format.
            </p>

            <h3>Starting the Server</h3>
            <ol>
              <li>Open Arbiter for macOS and load an MLX model.</li>
              <li>
                Navigate to the <strong>Serve Model</strong> section.
              </li>
              <li>
                Tap <strong>Start Server</strong>. The default port is 8080,
                but you can configure it.
              </li>
              <li>
                Arbiter displays both the <strong>localhost</strong> URL (for
                the Mac itself) and the <strong>local network</strong> URL
                (for other devices).
              </li>
            </ol>

            <div className="docs-screenshot-row docs-screenshot-row--wide">
              <ThemedImage
                darkSrc="/screenshots/dark/serve_model.png"
                lightSrc="/screenshots/light/serve_model.png"
                alt="macOS Serve Model interface with server running"
                width={700}
                height={440}
                className="docs-screenshot docs-screenshot--wide"
              />
            </div>

            <h3>API Endpoints</h3>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>Method</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>/v1/models</code></td>
                  <td>GET</td>
                  <td>Lists the currently loaded model.</td>
                </tr>
                <tr>
                  <td><code>/v1/chat/completions</code></td>
                  <td>POST</td>
                  <td>
                    Sends a chat completion request. Supports server-sent event
                    streaming.
                  </td>
                </tr>
              </tbody>
            </table>

            <h3>Connecting from iPhone</h3>
            <p>
              With the macOS server running, open Arbiter on your iPhone. If
              both devices are on the same Wi-Fi network, Arbiter for iOS can
              discover the Mac automatically via Bonjour. You can also enter
              the Mac&rsquo;s IP and port manually under{" "}
              <strong>Settings &rarr; Remote Server</strong>.
            </p>

            <h3>Using with Other Clients</h3>
            <p>
              The server includes CORS headers and follows the OpenAI chat
              completions format, so you can point other tools at it:
            </p>
            <pre className="docs-code">
{`# List available models
curl http://192.168.1.x:8080/v1/models

# Send a chat completion request
curl http://192.168.1.x:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "your-model-id",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": true
  }'`}
            </pre>

            <h3>Limitations</h3>
            <ul>
              <li>
                The server requires a loaded MLX model. GGUF models cannot be
                served.
              </li>
              <li>
                One generation at a time. If a request is in progress,
                additional requests wait until the current one finishes.
              </li>
              <li>
                No built-in authentication. The server is accessible to any
                device on your local network.
              </li>
            </ul>
          </section>

          {/* 11. Apple Foundation Models */}
          <section id="apple-foundation" className="docs-section">
            <h2>11. Apple Foundation Models</h2>
            <p>
              Starting with iOS 26 and macOS 26, Arbiter integrates
              Apple&rsquo;s on-device Foundation Models through the
              FoundationModels framework. These are system-level models
              provided by Apple Intelligence, with no download required.
            </p>

            <h3>Requirements</h3>
            <ul>
              <li>iOS 26 or macOS 26.</li>
              <li>
                Apple Intelligence must be available and enabled on your device.
              </li>
              <li>Device must meet Apple&rsquo;s eligibility requirements.</li>
            </ul>

            <h3>Usage</h3>
            <p>
              When available, Apple Foundation Model appears in the model
              picker alongside installed GGUF and MLX models. Select it like
              any other model. Responses stream into the same chat interface
              and integrate with Arbiter&rsquo;s personalization and role
              system.
            </p>

            <h3>Troubleshooting: Apple Foundation Model</h3>
            <ul>
              <li>
                Requires iOS 26 or macOS 26. Earlier OS versions do not support
                the FoundationModels framework.
              </li>
              <li>
                Apple Intelligence must be enabled in{" "}
                <strong>Settings &rarr; Apple Intelligence &amp; Siri</strong>.
              </li>
              <li>
                Not all devices support Apple Intelligence. Check Apple&rsquo;s
                compatibility list for your hardware.
              </li>
              <li>
                If the model is not ready or the device is ineligible, Arbiter
                shows a clear error and suggests switching to an installed local
                model.
              </li>
            </ul>
          </section>

          {/* 12. Roles & Personalization */}
          <section id="roles-personalization" className="docs-section">
            <h2>12. Roles &amp; Personalization</h2>

            <h3>Assistant Roles</h3>
            <p>
              Arbiter includes 10 built-in assistant roles, each with a
              role-specific system prompt tuned for different tasks:
            </p>
            <ul className="docs-role-list">
              <li>General Assistant</li>
              <li>Language Translator</li>
              <li>Meal Planner</li>
              <li>Fitness Coach</li>
              <li>Mindfulness Guide</li>
              <li>Study Buddy</li>
              <li>Career Advisor</li>
              <li>Travel Planner</li>
              <li>Coding Helper</li>
              <li>Shopping Assistant</li>
            </ul>
            <p>
              The Language Translator role includes a selectable target
              language (Spanish, French, Chinese, Japanese, Hindi). Starter
              prompts in the chat input update based on the selected role.
            </p>

            <h3>Personalization Settings</h3>
            <p>
              You can adjust how the assistant responds without writing a
              custom system prompt:
            </p>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Setting</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nickname</td>
                  <td>Custom name the assistant uses for you</td>
                </tr>
                <tr>
                  <td>Custom Instructions</td>
                  <td>Free-text instructions appended to the system prompt</td>
                </tr>
                <tr>
                  <td>Warmth</td>
                  <td>Direct, Balanced, Warm</td>
                </tr>
                <tr>
                  <td>Enthusiasm</td>
                  <td>Calm, Balanced, Energetic</td>
                </tr>
                <tr>
                  <td>Emoji Preference</td>
                  <td>None, Occasional, Frequent</td>
                </tr>
                <tr>
                  <td>Response Style</td>
                  <td>Concise, Balanced, Detailed</td>
                </tr>
              </tbody>
            </table>
            <p>
              Only non-default settings are included in the prompt to save
              tokens on smaller models.
            </p>
          </section>

          {/* 13. Siri & Shortcuts */}
          <section id="siri-shortcuts" className="docs-section">
            <h2>13. Siri &amp; Shortcuts</h2>
            <p>
              Arbiter registers an App Intent called{" "}
              <strong>Ask Arbiter</strong> that you can invoke through Siri or
              the Shortcuts app.
            </p>

            <h3>Using with Siri</h3>
            <p>
              Say <em>&ldquo;Hey Siri, Ask Arbiter&rdquo;</em> followed by
              your question. Siri routes the query to Arbiter, which generates
              a short spoken response using the currently selected model. The
              app does not need to be open.
            </p>

            <h3>Using with Shortcuts</h3>
            <p>
              Add the <strong>Ask Arbiter</strong>{" "}action to any Shortcut
              workflow. The action accepts a text input and returns the
              model&rsquo;s response as text, which you can pipe into other
              Shortcut actions.
            </p>

            <div className="docs-callout">
              <strong>Requirement:</strong> A local model must be loaded for
              the Siri intent to work (unless you are using the Apple
              Foundation Model). If no model is loaded, the shortcut prompts
              you to open Arbiter first.
            </div>
          </section>

          {/* 14. Context Management */}
          <section id="context-management" className="docs-section">
            <h2>14. Context Management</h2>
            <p>
              Different models have different context window sizes, which is
              the maximum number of tokens they can process in a single prompt.
              Arbiter manages this automatically so conversations stay usable
              as they grow.
            </p>

            <h3>How It Works</h3>
            <ul>
              <li>
                <strong>Full history:</strong> When the conversation is short
                enough, all messages are sent to the model.
              </li>
              <li>
                <strong>Approaching limit:</strong> Arbiter warns you when
                context usage is getting high.
              </li>
              <li>
                <strong>Hybrid mode:</strong> Older messages are summarized in
                the background. The model receives a summary of earlier context
                plus the most recent messages in full.
              </li>
              <li>
                <strong>Exceeded:</strong> If the prompt cannot safely fit even
                with summarization, Arbiter shows an error and suggests
                starting a new chat.
              </li>
            </ul>

            <h3>Context Budgets by Model Type</h3>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Model Type</th>
                  <th>Default Context</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GGUF (fallback)</td>
                  <td>~2,048 tokens</td>
                </tr>
                <tr>
                  <td>MLX</td>
                  <td>
                    Dynamic, read from the model&rsquo;s{" "}
                    <code>config.json</code>
                  </td>
                </tr>
                <tr>
                  <td>Apple Foundation</td>
                  <td>Framework-defined</td>
                </tr>
                <tr>
                  <td>Remote server</td>
                  <td>Larger assumed context</td>
                </tr>
              </tbody>
            </table>

            <div className="docs-callout">
              <strong>Tip:</strong> If you notice the model losing track of
              earlier parts of the conversation, it is likely in hybrid mode.
              Start a new chat for topics that need precise recall of earlier
              messages.
            </div>
          </section>

          {/* 15. iOS vs. macOS Differences */}
          <section id="platform-differences" className="docs-section">
            <h2>15. iOS vs. macOS Differences</h2>
            <p>
              Both apps share the same core: local model execution, chat,
              file uploads, web search, personalization, and roles. The main
              differences are driven by platform capabilities and form factor.
            </p>

            <table className="docs-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>iOS</th>
                  <th>macOS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GGUF models</td>
                  <td>Supported</td>
                  <td>Supported</td>
                </tr>
                <tr>
                  <td>MLX models</td>
                  <td>Supported</td>
                  <td>Supported</td>
                </tr>
                <tr>
                  <td>Apple Foundation Model</td>
                  <td>iOS 26+</td>
                  <td>macOS 26+</td>
                </tr>
                <tr>
                  <td>Camera input</td>
                  <td>Yes</td>
                  <td>No (photo library only)</td>
                </tr>
                <tr>
                  <td>Haptic feedback</td>
                  <td>Yes (configurable)</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Serve model as API</td>
                  <td>No</td>
                  <td>Yes (MLX models)</td>
                </tr>
                <tr>
                  <td>Bonjour discovery</td>
                  <td>Discovers Mac servers</td>
                  <td>Advertises as server</td>
                </tr>
                <tr>
                  <td>Connect to remote servers</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Practical model size</td>
                  <td>1 to 4 GB typical</td>
                  <td>4 to 8+ GB with more RAM</td>
                </tr>
                <tr>
                  <td>Siri / Shortcuts</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </section>

        </main>
      </div>

      <Footer />
    </>
  );
}
