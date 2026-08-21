"use client";

import { useState } from "react";
import ThemedImage from "./ThemedImage";

type Platform = "ios" | "macos";

const previews = {
  ios: {
    label: "iPhone & iPad",
    darkSrc: "/screenshots/web/hero-convo-dark-2x.png",
    lightSrc: "/screenshots/web/hero-convo-light-2x.png",
    alt: "A private local AI conversation in Arbiter on iPhone",
    width: 640,
    height: 1391,
  },
  macos: {
    label: "Mac",
    darkSrc: "/screenshots/web/hero-mac-dark-2x.png",
    lightSrc: null,
    alt: "A local AI conversation in Arbiter on macOS",
    width: 1800,
    height: 1169,
  },
} as const;

export default function HeroShowcase() {
  const [platform, setPlatform] = useState<Platform>("ios");
  const preview = previews[platform];

  return (
    <div className={`hero-product-showcase hero-product-showcase--${platform}`}>
      <div className="hero-platform-bar">
        <div className="hero-platform-toggle" role="group" aria-label="Choose product preview">
          {(Object.keys(previews) as Platform[]).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={platform === value}
              onClick={() => setPlatform(value)}
            >
              <i className={value === "ios" ? "fas fa-mobile-alt" : "fas fa-laptop"} aria-hidden="true" />
              {previews[value].label}
            </button>
          ))}
        </div>
      </div>

      <div className="hero-product-stage" aria-live="polite">
        <span className="hero-stage-orbit hero-stage-orbit--one" aria-hidden="true" />
        <span className="hero-stage-orbit hero-stage-orbit--two" aria-hidden="true" />

        <div className="hero-device-wrap" key={platform}>
          {platform === "ios" ? (
            <div className="hero-iphone">
              <span className="hero-iphone-button hero-iphone-button--top" aria-hidden="true" />
              <span className="hero-iphone-button hero-iphone-button--middle" aria-hidden="true" />
              <span className="hero-iphone-button hero-iphone-button--side" aria-hidden="true" />
              <span className="hero-iphone-island" aria-hidden="true" />
              <div className="hero-iphone-screen">
                <ThemedImage
                  darkSrc={preview.darkSrc}
                  lightSrc={preview.lightSrc}
                  alt={preview.alt}
                  width={preview.width}
                  height={preview.height}
                  className="hero-product-image"
                  priority
                  sizes="(max-width: 600px) 250px, 320px"
                />
              </div>
            </div>
          ) : (
            <div className="hero-macbook">
              <div className="hero-macbook-lid">
                <span className="hero-macbook-camera" aria-hidden="true" />
                <div className="hero-macbook-screen">
                  <ThemedImage
                    darkSrc={preview.darkSrc}
                    lightSrc={preview.lightSrc}
                    alt={preview.alt}
                    width={preview.width}
                    height={preview.height}
                    className="hero-product-image"
                    priority
                    sizes="(max-width: 600px) 92vw, 680px"
                  />
                </div>
              </div>
              <span className="hero-macbook-base" aria-hidden="true" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
