"use client";

import { useState } from "react";
import FadeSection from "./FadeSection";

const faqs = [
  {
    question: "Is my data private?",
    answer:
      "Yes. Everything is processed and stored on your device. Your chats and files never leave your phone unless you explicitly choose to share them. We do not store, log, or sell your data. Your information stays 100% under your control.",
  },
  {
    question: "Do I need an internet connection to use the app?",
    answer:
      "No. Once installed, the app works entirely offline. You can use it on airplanes, in remote areas, or without Wi-Fi, while still getting fast and responsive answers.",
  },
  {
    question: "How does offline AI work?",
    answer:
      "The app uses optimized large language models (LLMs) that run locally on your device's processor. These models are pre-downloaded and don't require server access, which means your requests are processed instantly without sending them to the cloud.",
  },
  {
    question: "What devices are supported?",
    answer:
      "Currently, the app supports modern iPhones and iPads running iOS 16 or later, with best performance on devices equipped with Apple Silicon chips (A14 Bionic or newer). Most models will require a device with more than 4 GB of RAM.",
  },
  {
    question: "What AI models are available?",
    answer:
      "You can choose from a range of open-source LLMs. The app supports switching models at any time so you can balance speed, accuracy, and device performance.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="faq" id="faq">
      <div className="container">
        <FadeSection as="span" className="section-label">
          Common questions
        </FadeSection>
        <FadeSection as="h2" className="section-title">
          FAQ
        </FadeSection>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FadeSection
              key={i}
              className={`faq-item ${openIndex === i ? "open" : ""}`}
            >
              <h3 className="faq-question" onClick={() => toggleFaq(i)}>
                {faq.question}
                <span className="faq-chevron">&#8964;</span>
              </h3>
              <p className="faq-answer">{faq.answer}</p>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
