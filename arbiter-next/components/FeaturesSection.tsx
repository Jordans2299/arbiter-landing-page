import FadeSection from "./FadeSection";

const features = [
  {
    icon: "fas fa-microchip",
    title: "Fully On-Device AI",
    description:
      "Powered by MLX and GGUF frameworks, Arbiter runs open-source models directly on your iPhone's Apple Silicon. No API calls, no server round-trips. Works on airplane mode and in areas with no signal.",
  },
  {
    icon: "fas fa-globe",
    title: "Live Web Search",
    description:
      "Combine on-device inference with live web results. Arbiter pulls up-to-date information from the web and reasons over it locally, so your searches stay private while your answers stay current.",
  },
  {
    icon: "fas fa-sliders-h",
    title: "Flexible Model Management",
    description:
      "Download and switch between quantized open-source models: Gemma, LLaMA, Mistral, and more. Balance speed vs. intelligence, manage storage, and tune performance to your device. You own the models.",
  },
  {
    icon: "fas fa-file-alt",
    title: "File Upload & Context",
    description:
      "Drop in PDFs, notes, or documents and ask questions about them. Arbiter summarizes and reasons over your files entirely on-device. Your private knowledge assistant, zero cloud required.",
  },
  {
    icon: "fas fa-microphone",
    title: "Siri & iOS Integration",
    description:
      "Trigger Arbiter hands-free via Siri Shortcuts using App Intents. Ask questions by voice and get spoken or text responses, all private and built into your iOS workflow.",
  },
  {
    icon: "fas fa-image",
    title: "Image Understanding",
    description:
      "Upload photos directly into your conversations. Arbiter can describe, analyze, and answer questions about your images, processing everything on your device with no data sent to the cloud.",
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
