"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface Slide {
  darkSrc: string;
  lightSrc: string | null;
  alt: string;
  title: string;
  text: string;
}

const iosSlides: Slide[] = [
  {
    darkSrc: "/screenshots/dark/convo.PNG",
    lightSrc: "/screenshots/light/convo.PNG",
    alt: "Active chat conversation with a local AI model",
    title: "Private AI Conversations",
    text: "Chat with powerful language models running entirely on your device. No cloud, no accounts, no data leaves your phone.",
  },
  {
    darkSrc: "/screenshots/dark/model_list.PNG",
    lightSrc: "/screenshots/light/model_list.PNG",
    alt: "Model catalog with filters and search",
    title: "44 Models to Choose From",
    text: "Browse GGUF and MLX models from Gemma, Llama, DeepSeek, Qwen, and more. Filter by format, capability, and size.",
  },
  {
    darkSrc: "/screenshots/dark/search.PNG",
    lightSrc: "/screenshots/light/search.PNG",
    alt: "Web search grounded AI response",
    title: "Live Web Search",
    text: "Toggle web search per-message to ground responses in current information. Great for news, scores, and recent events.",
  },
  {
    darkSrc: "/screenshots/dark/image_chat.png",
    lightSrc: "/screenshots/light/image_chat.PNG",
    alt: "Vision model analyzing a photo",
    title: "Vision & Image Understanding",
    text: "Send photos to vision-capable MLX models. Describe images, read documents, or analyze visual content on-device.",
  },
  {
    darkSrc: "/screenshots/dark/connect_server.PNG",
    lightSrc: "/screenshots/light/connect_server.PNG",
    alt: "Connecting to a local model server",
    title: "Connect to Local Servers",
    text: "Link your iPhone to a Mac running Arbiter, LM Studio, or Ollama over your local network for access to larger models.",
  },
];

const macosSlides: Slide[] = [
  {
    darkSrc: "/screenshots/dark/normal_chat_macOS_dark.png",
    lightSrc: null,
    alt: "Local AI chat running in Arbiter for macOS",
    title: "Powerful MLX Models on Mac",
    text: "Run larger language models optimized for Apple Silicon. Take advantage of your Mac's memory and GPU for faster, smarter responses.",
  },
  {
    darkSrc: "/screenshots/dark/welcome_macOS_dark.png",
    lightSrc: null,
    alt: "Arbiter welcome screen on macOS",
    title: "Arbiter on Mac",
    text: "Use the same private AI workflow on macOS, with a wider desktop interface built for Apple Silicon.",
  },
  {
    darkSrc: "/screenshots/dark/choose_model_macOS_dark.png",
    lightSrc: null,
    alt: "Model catalog and model selection on macOS",
    title: "Full Model Catalog",
    text: "Browse and install from 44 GGUF and MLX models including Gemma, Llama, DeepSeek, Qwen, and Mistral families.",
  },
  {
    darkSrc: "/screenshots/dark/coding_macOS_dark.png",
    lightSrc: null,
    alt: "Coding assistant conversation in Arbiter for macOS",
    title: "Coding and Desk Work",
    text: "Use Arbiter for coding help, drafting, research, and longer desktop conversations without sending local chats to a cloud account.",
  },
  {
    darkSrc: "/screenshots/dark/image_chat_macOS_dark.png",
    lightSrc: null,
    alt: "Vision model analyzing an image in Arbiter for macOS",
    title: "Vision on Mac",
    text: "Ask vision-capable MLX models about images and screenshots from the same local-first chat interface.",
  },
  {
    darkSrc: "/screenshots/dark/serve_model_macOS_dark.png",
    lightSrc: null,
    alt: "macOS Serve Model interface",
    title: "OpenAI-Compatible Local API",
    text: "Turn your Mac into a private AI server. Serve installed MLX models to your iPhone or any OpenAI-compatible client on your local network.",
  },
];

export default function Slideshow() {
  const [platform, setPlatform] = useState<"ios" | "macos">("ios");
  const [current, setCurrent] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isExpanded, setIsExpanded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = platform === "ios" ? iosSlides : macosSlides;

  // Watch theme changes
  useEffect(() => {
    function readTheme() {
      const attr = document.documentElement.getAttribute("data-theme");
      setTheme(attr === "light" ? "light" : "dark");
    }
    readTheme();
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % (platform === "ios" ? iosSlides.length : macosSlides.length));
    }, 5000);
  }, [platform]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    setCurrent(0);
    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [platform, startTimer, stopTimer]);

  function goToSlide(index: number) {
    setCurrent(index);
    startTimer();
  }

  const changeSlide = useCallback((direction: number) => {
    setCurrent((prev) => {
      const count = platform === "ios" ? iosSlides.length : macosSlides.length;
      return (prev + direction + count) % count;
    });
  }, [platform]);

  const slide = slides[current];

  function getSrc(s: Slide): string | null {
    if (theme === "light" && s.lightSrc) return s.lightSrc;
    return s.darkSrc || null;
  }

  const isWide = platform === "macos";

  useEffect(() => {
    if (!isExpanded) return;

    stopTimer();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsExpanded(false);
      if (event.key === "ArrowLeft") changeSlide(-1);
      if (event.key === "ArrowRight") changeSlide(1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      startTimer();
    };
  }, [isExpanded, changeSlide, startTimer, stopTimer]);

  const activeSrc = getSrc(slide);

  return (
    <div className="slideshow-section">
      <div className="slideshow-platform-bar">
        <div className="platform-toggle" aria-label="Choose device preview">
          <button
            className={platform === "ios" ? "active" : ""}
            onClick={() => setPlatform("ios")}
            aria-pressed={platform === "ios"}
            aria-label="Show iPhone and iPad previews"
          >
            <i className="fab fa-apple" aria-hidden="true"></i> iPhone &amp; iPad
          </button>
          <button
            className={platform === "macos" ? "active" : ""}
            onClick={() => setPlatform("macos")}
            aria-pressed={platform === "macos"}
            aria-label="Show Mac previews"
          >
            <i className="fas fa-laptop" aria-hidden="true"></i> Mac
          </button>
        </div>
      </div>
      <div className="slideshow-depth" aria-hidden="true">
        <span></span>
        <span></span>
      </div>
      <div
        className={`slideshow-container ${isWide ? "slideshow-container--macos" : ""}`}
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <button
          type="button"
          className="slideshow-wrapper"
          onClick={() => setIsExpanded(true)}
          aria-label={`Open ${slide.alt} at full size`}
        >
          <div className="slides">
            <div className="slide" key={`${platform}-${theme}-${current}`}>
              {activeSrc ? (
                <div className={`device-preview ${isWide ? "device-preview--macos" : "device-preview--ios"}`}>
                  <div className={isWide ? "macbook-frame" : "iphone-frame"}>
                    {!isWide && <span className="iphone-island" aria-hidden="true" />}
                    {isWide && <span className="macbook-camera" aria-hidden="true" />}
                    <div className={isWide ? "macbook-screen" : "iphone-screen"}>
                      <Image
                        src={activeSrc}
                        alt={slide.alt}
                        width={isWide ? 3024 : 1206}
                        height={isWide ? 1964 : 2622}
                        priority={current === 0}
                        unoptimized
                        className={`slide-image ${isWide ? "slide-image--macos" : "slide-image--ios"}`}
                        draggable={false}
                      />
                    </div>
                  </div>
                  {isWide && <span className="macbook-base" aria-hidden="true" />}
                </div>
              ) : (
                <div className="slide-placeholder">
                  <span>{slide.alt}</span>
                </div>
              )}
            </div>
          </div>
          <span className="slide-expand-hint">
            <i className="fas fa-expand-alt" aria-hidden="true"></i>
            Click to view full size
          </span>
        </button>
        <div className="slideshow-dots">
          {slides.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => goToSlide(i)}
              aria-label={`Show preview ${i + 1} of ${slides.length}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
        <div className="slideshow-caption">
          <div>
            <div className="caption-title">{slide.title}</div>
            <div className="caption-text">{slide.text}</div>
          </div>
          <span className="slide-count">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
      {isExpanded && createPortal(
        <div
          className="screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${slide.title} screenshot viewer`}
        >
          <button
            type="button"
            className="screenshot-lightbox-backdrop"
            onClick={() => setIsExpanded(false)}
            aria-label="Close screenshot viewer"
          />
          <div className={`screenshot-lightbox-panel ${isWide ? "is-macos" : "is-ios"}`}>
            <div className="screenshot-lightbox-header">
              <div>
                <span>{isWide ? "Arbiter for Mac" : "Arbiter for iPhone & iPad"}</span>
                <strong>{slide.title}</strong>
              </div>
              <div className="screenshot-lightbox-meta">
                <span>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => setIsExpanded(false)} aria-label="Close screenshot viewer">×</button>
              </div>
            </div>
            <div className="screenshot-lightbox-stage">
              <button type="button" className="lightbox-arrow previous" onClick={() => changeSlide(-1)} aria-label="Show previous screenshot">‹</button>
              <div className="screenshot-lightbox-image">
                <Image
                  src={getSrc(slide) || slide.darkSrc}
                  alt={slide.alt}
                  fill
                  sizes="94vw"
                  unoptimized
                  className="lightbox-image"
                  priority
                />
              </div>
              <button type="button" className="lightbox-arrow next" onClick={() => changeSlide(1)} aria-label="Show next screenshot">›</button>
            </div>
            <div className="screenshot-lightbox-footer">
              <p>{slide.text}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
