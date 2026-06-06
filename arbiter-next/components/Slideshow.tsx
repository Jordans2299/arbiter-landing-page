"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Slide {
  src: string | null;
  alt: string;
  title: string;
  text: string;
}

const iosSlides: Slide[] = [
  {
    src: "/screenshots/s1.png",
    alt: "AI Chat Interface showing poetry conversation",
    title: "Learn Something New",
    text: "Ask Arbiter about any topic, from history to science, and get detailed explanations and insights.",
  },
  {
    src: "/screenshots/s2.png",
    alt: "Technical conversation with keyboard visible",
    title: "Creative AI Conversations",
    text: "Engage in creative writing, poetry, and artistic projects with AI models running locally on your device.",
  },
  {
    src: "/screenshots/s3.png",
    alt: "Screen showing all locally saved chats",
    title: "Save Chats Locally On Device",
    text: "All conversations are stored on your device, ensuring privacy and ownership. Search and export your chats anytime.",
  },
  {
    src: "/screenshots/s4.png",
    alt: "Code generation showing merge sort algorithm",
    title: "Code Generation & Learning",
    text: "Generate, review, and learn from code examples in multiple programming languages.",
  },
  {
    src: "/screenshots/s5.png",
    alt: "Settings screen with model selection",
    title: "Flexible Model Management",
    text: "Easily switch between AI models and adjust settings like temperature for different conversation styles.",
  },
  {
    src: "/screenshots/s6.png",
    alt: "Settings screen with model selection",
    title: "Choose From Wide Range of Models",
    text: "Select from various AI models tailored to different tasks and preferences.",
  },
];

const macosSlides: Slide[] = [
  {
    src: null,
    alt: "MLX model chat on Mac",
    title: "Powerful MLX Models on Mac",
    text: "Run larger language models optimized for Apple Silicon. Take advantage of your Mac's memory and GPU for faster, smarter responses.",
  },
  {
    src: null,
    alt: "Model server interface",
    title: "Serve Models to Your Devices",
    text: "Turn your Mac into a private AI server. Share loaded MLX models with your iPhone and other devices over your local network.",
  },
  {
    src: null,
    alt: "Model catalog on Mac",
    title: "Full Model Catalog",
    text: "Browse and install from 44+ GGUF and MLX models including Gemma, Llama, DeepSeek, Qwen, and Mistral families, all optimized for Apple Silicon.",
  },
  {
    src: null,
    alt: "OpenAI-compatible API server",
    title: "OpenAI-Compatible Local API",
    text: "Expose your loaded model as a local API endpoint. Connect any OpenAI-compatible client, IDE plugin, or tool to your private server.",
  },
];

export default function Slideshow() {
  const [platform, setPlatform] = useState<"ios" | "macos">("ios");
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = platform === "ios" ? iosSlides : macosSlides;

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
          <span className="coming-soon-badge">Coming Soon</span>
        </button>
      </div>
      <h3 style={{ color: "var(--accent)" }}>
        {platform === "ios" ? "See Arbiter on iPhone" : "See Arbiter on Mac"}
      </h3>
      <div
        className={`slideshow-container ${platform === "macos" ? "slideshow-container--macos" : ""}`}
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <div className="slideshow-wrapper">
          <div
            className="slides"
            style={{ transform: `translateX(${-current * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div className="slide" key={`${platform}-${i}`}>
                {s.src ? (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={platform === "ios" ? 230 : 500}
                    height={platform === "ios" ? 500 : 340}
                    style={
                      platform === "ios"
                        ? { width: "auto", height: "500px" }
                        : { width: "100%", height: "auto", maxHeight: "380px", objectFit: "contain" }
                    }
                  />
                ) : (
                  <div className="slide-placeholder">
                    <span>{s.alt}</span>
                  </div>
                )}
              </div>
            ))}
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
