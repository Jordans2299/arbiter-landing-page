import FadeSection from "./FadeSection";

const features = [
  {
    icon: "fas fa-microchip",
    title: "On-Device AI",
    description:
      "Run open-source models directly on your iPhone or Mac using both GGUF and MLX frameworks on either platform. Chat offline, analyze images with vision models, and keep everything on your hardware. No API calls, no server round-trips.",
  },
  {
    icon: "fas fa-globe",
    title: "Live Web Search",
    description:
      "Combine on-device inference with live web results. Arbiter pulls up-to-date information from the web and reasons over it locally, so your searches stay private while your answers stay current.",
  },
  {
    icon: "fas fa-sliders-h",
    title: "44 Model Catalog",
    description:
      "Browse, download, and switch between 44 models from families like Gemma, Llama, DeepSeek, Qwen, Mistral, and Phi. Both GGUF and MLX formats run on iPhone and Mac, with 9 vision and 10 reasoning models available.",
  },
  {
    icon: "fas fa-file-alt",
    title: "Files & Smart Context",
    description:
      "Drop in PDFs or text files and ask questions about them. Arbiter manages context windows intelligently across models with different limits, summarizing older messages to keep conversations flowing.",
  },
  {
    icon: "fas fa-brain",
    title: "Apple Foundation Models",
    description:
      "On devices with Apple Intelligence, use Apple’s on-device Foundation Models with zero downloads. Available on iOS 26 and macOS 26, integrated directly into Arbiter’s chat experience.",
  },
  {
    icon: "fas fa-network-wired",
    title: "Local Network Models",
    description:
      "Connect your iPhone to a Mac, PC, or any device running LM Studio, Ollama, or Arbiter’s own server over local Wi-Fi. Run larger models on powerful hardware and chat from your phone.",
  },
  {
    icon: "fas fa-server",
    title: "Mac as Model Server",
    description:
      "Turn your Mac into a private AI server. Serve installed MLX models through an OpenAI-compatible API and share them with your iPhone or any compatible client on your network.",
  },
  {
    icon: "fas fa-microphone",
    title: "Siri & System Integration",
    description:
      "Trigger Arbiter hands-free via Siri Shortcuts using App Intents. Ask questions by voice and get spoken or text responses, all private and built into your Apple workflow.",
  },
  {
    icon: "fas fa-user-cog",
    title: "Roles & Personalization",
    description:
      "Choose from 10 built-in assistant roles like Coding Helper, Translator, Meal Planner, and Study Buddy. Fine-tune warmth, enthusiasm, emoji usage, and response detail to match your style.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features" id="features">
      <div className="container">
        <FadeSection as="span" className="section-label">
          What makes Arbiter different
        </FadeSection>
        <FadeSection as="h2" className="section-title">
          Key Features
        </FadeSection>
        <div className="features-grid">
          {features.map((f, i) => (
            <FadeSection key={i} className="feature">
              <div className="feature-icon">
                <i className={f.icon}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
