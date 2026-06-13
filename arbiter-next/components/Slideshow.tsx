"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

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
    darkSrc: "/screenshots/dark/welcome_macOS_dark.png",
    lightSrc: null,
    alt: "Arbiter welcome screen on macOS",
    title: "Arbiter on Mac",
    text: "Use the same private AI workflow on macOS, with a wider desktop interface built for Apple Silicon.",
  },
  {
    darkSrc: "/screenshots/dark/normal_chat_macOS_dark.png",
    lightSrc: null,
    alt: "Local AI chat running in Arbiter for macOS",
    title: "Powerful MLX Models on Mac",
    text: "Run larger language models optimized for Apple Silicon. Take advantage of your Mac's memory and GPU for faster, smarter responses.",
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

  function changeSlide(direction: number) {
    setCurrent((prev) => {
      let next = prev + direction;
      if (next >= slides.length) next = 0;
      else if (next < 0) next = slides.length - 1;
      return next;
    });
    startTimer();
  }

  function goToSlide(index: number) {
    setCurrent(index);
    startTimer();
  }

  const slide = slides[current];

  function getSrc(s: Slide): string | null {
    if (theme === "light" && s.lightSrc) return s.lightSrc;
    return s.darkSrc || null;
  }

  const isWide = platform === "macos";

  return (
    <div className="slideshow-section">
      <div className="platform-toggle">
        <button
          className={platform === "ios" ? "active" : ""}
          onClick={() => setPlatform("ios")}
        >
          <i className="fab fa-apple"></i> iPhone &amp; iPad
        </button>
        <button
          className={platform === "macos" ? "active" : ""}
          onClick={() => setPlatform("macos")}
        >
          <i className="fas fa-laptop"></i> Mac
        </button>
      </div>
      <h3 style={{ color: "var(--accent)" }}>
        {platform === "ios" ? "See Arbiter on iPhone" : "See Arbiter on Mac"}
      </h3>
      <div
        className={`slideshow-container ${isWide ? "slideshow-container--macos" : ""}`}
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <div className="slideshow-wrapper">
          <div
            className="slides"
            style={{ transform: `translateX(${-current * 100}%)` }}
          >
            {slides.map((s, i) => {
              const src = getSrc(s);
              return (
                <div className="slide" key={`${platform}-${theme}-${i}`}>
                  {src ? (
                    <Image
                      src={src}
                      alt={s.alt}
                      width={isWide ? 700 : 230}
                      height={isWide ? 455 : 500}
                      style={
                        isWide
                          ? { width: "100%", height: "auto", maxHeight: "430px", objectFit: "contain" }
                          : { width: "auto", height: "500px" }
                      }
                    />
                  ) : (
                    <div className="slide-placeholder">
                      <span>{s.alt}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button
            className="slideshow-controls prev"
            onClick={() => changeSlide(-1)}
          >
            &#8249;
          </button>
          <button
            className="slideshow-controls next"
            onClick={() => changeSlide(1)}
          >
            &#8250;
          </button>
        </div>
        <div className="slideshow-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
        <div className="slideshow-caption">
          <div className="caption-title">{slide.title}</div>
          <div className="caption-text">{slide.text}</div>
        </div>
      </div>
    </div>
  );
}
