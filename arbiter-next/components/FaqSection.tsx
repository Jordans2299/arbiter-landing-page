"use client";

import { useState } from "react";
import FadeSection from "./FadeSection";

const faqs = [
  {
    question: "Is my data private?",
    answer:
      "Yes. Everything is processed and stored on your device. Your chats and files never leave your phone or Mac unless you explicitly choose to share them. This applies across iPhone and Mac — whether running models locally or serving them on your network, data never touches external servers.",
  },
  {
    question: "Do I need an internet connection to use the app?",
    answer:
      "No. Once a model is installed, the app works entirely offline. You can use it on airplanes, in remote areas, or without Wi-Fi, while still getting fast and responsive answers.",
  },
  {
    question: "How does offline AI work?",
    answer:
      "Arbiter uses optimized open-source models that run locally on your device’s Apple Silicon processor. Both GGUF and MLX model formats are supported on iPhone and Mac. Models are pre-downloaded and don’t require server access, so your requests are processed instantly without sending anything to the cloud.",
  },
  {
    question: "What devices are supported?",
    answer:
      "Arbiter runs on iPhones and iPads with iOS 16 or later, with best performance on devices with A14 Bionic or newer and at least 6 GB of RAM. The macOS app supports Apple Silicon Macs (M1 or later) and can run larger MLX models. macOS support is coming soon.",
  },
  {
    question: "What AI models are available?",
    answer:
      "Arbiter offers 44+ models across families including Gemma, Llama, DeepSeek, Qwen, Mistral, Phi, and Granite. The catalog includes 24 GGUF and 20 MLX models, all usable on both iPhone and Mac, plus 9 vision-capable models and 10 reasoning models. On supported devices, Apple’s Foundation Model is also available.",
  },
  {
    question: "What is Apple Foundation Model support?",
    answer:
      "Starting with iOS 26 and macOS 26, Arbiter integrates Apple’s on-device Foundation Models through Apple Intelligence. These models run natively on your device at no additional cost, providing another option alongside open-source models with zero downloads required.",
  },
  {
    question: "Can I use my Mac as a server for my iPhone?",
    answer:
      "Yes. The macOS app includes a Serve Model feature that creates an OpenAI-compatible local API server. Your iPhone can connect to your Mac over Wi-Fi using automatic Bonjour discovery, letting you run larger models on your Mac while chatting from your phone.",
  },
  {
    question: "Can I connect to other local AI servers?",
    answer:
      "Yes. Beyond Arbiter’s own Mac server, you can connect your iPhone to any local machine running LM Studio, Ollama, or any OpenAI-compatible API server on your local network. Configure the host and port and you’re connected.",
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
