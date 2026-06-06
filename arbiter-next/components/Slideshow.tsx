"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const slideData = [
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

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideData.length);
    }, 5000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
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
  }, [startTimer, stopTimer]);

  function changeSlide(direction: number) {
    setCurrent((prev) => {
      let next = prev + direction;
      if (next >= slideData.length) next = 0;
      else if (next < 0) next = slideData.length - 1;
      return next;
    });
    startTimer();
  }

  function goToSlide(index: number) {
    setCurrent(index);
    startTimer();
  }

  const slide = slideData[current];

  return (
    <div className="slideshow-section">
      <h3 style={{ color: "var(--accent)" }}>See Arbiter in Action</h3>
      <div
        className="slideshow-container"
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <div className="slideshow-wrapper">
          <div
            className="slides"
            style={{ transform: `translateX(${-current * 100}%)` }}
          >
            {slideData.map((s, i) => (
              <div className="slide" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} />
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
          {slideData.map((_, i) => (
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
