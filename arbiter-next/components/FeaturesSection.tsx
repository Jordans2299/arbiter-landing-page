import FadeSection from "./FadeSection";
import ThemedImage from "./ThemedImage";
import Link from "next/link";

type FeatureStory = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  learnMore: { href: string; label: string };
  visual:
    | {
        kind: "phone" | "desktop";
        darkSrc: string;
        lightSrc: string | null;
        alt: string;
        width: number;
        height: number;
      }
    | {
        kind: "concept";
        variant: "siri" | "roles" | "export";
        icon: string;
        label: string;
      }
    | {
        kind: "server";
        label: string;
      };
};

const featureStories: FeatureStory[] = [
  {
    number: "01",
    eyebrow: "Real-time search",
    title: "Fresh answers when the world changes.",
    description:
      "Turn on search when you need current information. Arbiter finds useful sources and brings them into your local chat.",
    highlights: ["Current information", "Useful sources", "Search only when needed"],
    learnMore: { href: "/documentation#web-search", label: "Learn about web search" },
    visual: {
      kind: "phone",
      darkSrc: "/screenshots/web/feature-search-dark-2x.png",
      lightSrc: "/screenshots/web/feature-search-light-2x.png",
      alt: "Arbiter showing a web-search-grounded answer on iPhone",
      width: 528,
      height: 1148,
    },
  },
  {
    number: "02",
    eyebrow: "Upload documents",
    title: "Ask questions about your files.",
    description:
      "Add a PDF or text file, then ask for a summary, key details, or a simpler explanation.",
    highlights: ["PDFs and text", "Quick summaries", "Follow-up questions"],
    learnMore: { href: "/documentation#files-and-vision", label: "Learn about files and vision" },
    visual: {
      kind: "phone",
      darkSrc: "/screenshots/web/feature-file-dark-2x.png",
      lightSrc: "/screenshots/web/feature-file-light-2x.png",
      alt: "Arbiter summarizing an uploaded document on iPhone",
      width: 528,
      height: 1148,
    },
  },
  {
    number: "03",
    eyebrow: "Chat with images",
    title: "Show Arbiter what you mean.",
    description:
      "Send a photo or screenshot to a vision model and ask what it sees, all in the same private chat.",
    highlights: ["Photos and screenshots", "Visual questions", "Private by design"],
    learnMore: { href: "/documentation#files-and-vision", label: "Learn about image chat" },
    visual: {
      kind: "phone",
      darkSrc: "/screenshots/web/feature-image-dark-2x.png",
      lightSrc: "/screenshots/web/feature-image-light-2x.png",
      alt: "Arbiter answering a question about an image on iPhone",
      width: 528,
      height: 1148,
    },
  },
  {
    number: "04",
    eyebrow: "Export conversations",
    title: "Keep and move your chats.",
    description:
      "Export a conversation for backup, then import it later on another device.",
    highlights: ["Simple backups", "Easy transfers", "You keep the file"],
    learnMore: { href: "/documentation#import-export", label: "Learn about import and export" },
    visual: {
      kind: "concept",
      variant: "export",
      icon: "fas fa-file-export",
      label: "Export chat",
    },
  },
  {
    number: "05",
    eyebrow: "More power from your Mac",
    title: "Use a larger Mac model from your phone.",
    description:
      "Connect your iPhone to Arbiter on your Mac and chat with larger MLX models over your own Wi-Fi.",
    highlights: ["Bigger Mac models", "Chat from iPhone", "Stays on your network"],
    learnMore: { href: "/documentation#mac-server", label: "Learn how Mac serving works" },
    visual: {
      kind: "server",
      label: "An iPhone privately connected to a larger model running on a Mac",
    },
  },
  {
    number: "06",
    eyebrow: "Siri integration",
    title: "Ask with your voice.",
    description:
      "Use Siri Shortcuts to send a question hands-free and continue the conversation in Arbiter.",
    highlights: ["Siri Shortcuts", "Hands-free questions", "Continue in the app"],
    learnMore: { href: "/documentation#siri-shortcuts", label: "Learn about Siri and Shortcuts" },
    visual: {
      kind: "concept",
      variant: "siri",
      icon: "fas fa-microphone",
      label: "Siri + Arbiter",
    },
  },
  {
    number: "07",
    eyebrow: "Roles & translation",
    title: "Pick the right helper.",
    description:
      "Switch roles for translation, studying, writing, and more. Adjust the tone and detail to fit you.",
    highlights: ["10 built-in roles", "Natural translation", "Your preferred tone"],
    learnMore: { href: "/documentation#roles-personalization", label: "Explore roles and personalization" },
    visual: {
      kind: "concept",
      variant: "roles",
      icon: "fas fa-language",
      label: "Translator role",
    },
  },
];

const moreFeatures = [
  {
    title: "Apple Foundation Models",
    description: "Use Apple’s on-device model with no additional download on eligible devices.",
    icon: "fas fa-brain",
    href: "/documentation#apple-foundation",
  },
  {
    title: "Local network power",
    description: "Connect to Arbiter on Mac, LM Studio, Ollama, or another compatible local server.",
    icon: "fas fa-network-wired",
    href: "/documentation#local-network",
  },
  {
    title: "Works offline",
    description: "Keep chatting without Wi-Fi once your model is downloaded.",
    icon: "fas fa-plane",
    href: "/documentation#on-device-inference",
  },
  {
    title: "Smart model catalog",
    description: "Compare, filter, download, and manage 44 models across open model families.",
    icon: "fas fa-layer-group",
    href: "/documentation#model-catalog",
  },
];

function FeatureVisual({ visual }: { visual: FeatureStory["visual"] }) {
  if (visual.kind === "server") {
    return (
      <div className="feature-visual feature-visual--server" aria-label={visual.label}>
        <span className="feature-visual-glow" aria-hidden="true" />
        <div className="server-visual-mac" aria-hidden="true">
          <div className="server-visual-mac-screen">
            <div className="server-window-bar">
              <span className="server-window-dots"><i /><i /><i /></span>
              <strong>Model Server</strong>
              <span className="server-live-status"><i /> Online</span>
            </div>
            <div className="server-mac-app">
              <aside>
                <span className="active"><i className="fas fa-satellite-dish" /> Server</span>
                <span><i className="fas fa-layer-group" /> Models</span>
                <span><i className="fas fa-sliders-h" /> Settings</span>
              </aside>
              <div className="server-model-panel">
                <span className="server-model-label">Serving from this Mac</span>
                <strong>Mistral Small 24B</strong>
                <p><i className="fas fa-bolt" /> MLX · Apple silicon</p>
                <div className="server-address"><i className="fas fa-wifi" /><span><small>Private address</small>arbiter.local</span><em>Ready</em></div>
              </div>
            </div>
          </div>
          <span className="server-visual-mac-base" />
        </div>
        <div className="server-connection" aria-hidden="true">
          <span />
        </div>
        <div className="server-visual-phone" aria-hidden="true">
          <span className="server-visual-phone-island" />
          <div className="server-phone-screen">
            <div className="server-phone-header"><i className="fas fa-chevron-left" /><span><strong>Mistral Small 24B</strong><small><i /> via Mac</small></span><i className="fas fa-ellipsis-h" /></div>
            <div className="server-phone-chat">
              <p>Help me plan this project.</p>
              <strong>Absolutely. Let’s start with the goal and work backward.</strong>
            </div>
            <div className="server-phone-composer"><span>Ask anything</span><i className="fas fa-arrow-up" /></div>
          </div>
        </div>
        <div className="server-visual-caption" aria-hidden="true">
          <i className="fas fa-lock" /> Your prompt stays on your network
        </div>
      </div>
    );
  }

  if (visual.kind === "concept") {
    return (
      <div className={`feature-visual feature-visual--concept feature-visual--${visual.variant}`} aria-label={visual.label}>
        <span className="feature-visual-glow" aria-hidden="true" />
        <span className="feature-concept-orbit" aria-hidden="true" />
        <div className="feature-concept-panel">
          <div className="feature-concept-header">
            <span><i className={visual.icon} aria-hidden="true" /></span>
            <strong>{visual.label}</strong>
            <small>On device</small>
          </div>
          {visual.variant === "siri" ? <>
            <p className="feature-concept-prompt">“Ask Arbiter to explain this in simple terms.”</p>
            <div className="feature-waveform" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
            <span className="feature-concept-status"><i /> Listening securely</span>
          </> : visual.variant === "roles" ? <>
            <div className="feature-role-pills" aria-hidden="true"><span>General</span><span className="active">Translator</span><span>Study buddy</span></div>
            <div className="feature-translation-card">
              <span>English</span><p>Privacy should feel effortless.</p>
              <i className="fas fa-arrow-down" aria-hidden="true" />
              <span>Spanish</span><strong>La privacidad debería ser sencilla.</strong>
            </div>
          </> : <>
            <div className="feature-export-flow" aria-hidden="true">
              <div className="feature-export-chat">
                <i className="fas fa-comments" />
                <span>Project notes</span>
                <small>18 messages</small>
              </div>
              <i className="fas fa-arrow-right feature-export-arrow" />
              <div className="feature-export-file">
                <i className="fas fa-file-code" />
                <strong>arbiter-chat.json</strong>
                <small>Ready to import</small>
              </div>
            </div>
            <span className="feature-concept-status"><i /> Export complete</span>
          </>}
        </div>
      </div>
    );
  }

  return (
    <div className={`feature-visual feature-visual--${visual.kind}`}>
      <span className="feature-visual-glow" aria-hidden="true" />
      <div className={`feature-product-shot feature-product-shot--${visual.kind}`}>
        {visual.kind === "phone" && <span className="feature-phone-island" aria-hidden="true" />}
        {visual.kind === "desktop" && <span className="feature-desktop-camera" aria-hidden="true" />}
        <div className="feature-product-screen">
          <ThemedImage
            darkSrc={visual.darkSrc}
            lightSrc={visual.lightSrc}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            className="feature-product-image"
          />
        </div>
      </div>
      {visual.kind === "desktop" && <span className="feature-desktop-base" aria-hidden="true" />}
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="features" id="features">
      <div className="feature-planets" aria-hidden="true">
        <span className="feature-planet feature-planet--one" />
        <span className="feature-planet feature-planet--two" />
        <span className="feature-planet feature-planet--three" />
        <span className="feature-planet feature-planet--four" />
        <span className="feature-planet feature-planet--five" />
      </div>
      <div className="container">
        <FadeSection as="span" className="section-label">
          What makes Arbiter different
        </FadeSection>
        <FadeSection as="h2" className="section-title">
          Key features, in focus
        </FadeSection>
        <FadeSection as="p" className="features-intro">
          Search, work with files, use images, and reach larger Mac models without giving up control.
        </FadeSection>

        <div className="feature-stories">
          {featureStories.map((feature, index) => (
            <FadeSection
              as="article"
              className={`feature-story ${index % 2 === 1 ? "feature-story--reverse" : ""}`}
              key={feature.number}
            >
              <div className="feature-story-copy">
                <div className="feature-story-kicker">
                  <span>{feature.number}</span>
                  <p>{feature.eyebrow}</p>
                </div>
                <h3>{feature.title}</h3>
                <p className="feature-story-description">{feature.description}</p>
                <ul>
                  {feature.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <Link className="feature-learn-more" href={feature.learnMore.href}>{feature.learnMore.label}<span aria-hidden="true">→</span></Link>
              </div>
              <FeatureVisual visual={feature.visual} />
            </FadeSection>
          ))}
        </div>

        <FadeSection className="more-features">
          <div className="more-features-heading">
            <span>Also included</span>
            <h3>More ways to make local AI your own.</h3>
          </div>
          <div className="more-features-list">
            {moreFeatures.map((feature) => (
              <Link className="more-feature" href={feature.href} key={feature.title}>
                <span className="more-feature-icon"><i className={feature.icon} aria-hidden="true" /></span>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
                <span className="more-feature-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
