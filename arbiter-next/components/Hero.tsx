"use client";

import Slideshow from "./Slideshow";

export default function Hero() {
  function openBetaModal() {
    window.dispatchEvent(new Event("open-beta-modal"));
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>A.I. designed for you, only for you.</h1>
          <p className="tagline">
            Run powerful language models locally. Keep your conversations
            private. Switch between models without reinstalling.
          </p>
          <div className="beta-section">
            <label className="beta-label">Start using Arbiter today</label>
            <div className="download-btn-row">
              <a
                className="btn-appstore"
                href="https://apps.apple.com/us/app/arbiter-offline-private-ai/id6747954532"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-apple"></i>
                <div className="btn-appstore-text">
                  <span className="small-text">Download on the</span>
                  <span className="big-text">App Store</span>
                </div>
              </a>
              <button
                className="btn-primary"
                onClick={openBetaModal}
                type="button"
              >
                Join TestFlight Beta
              </button>
            </div>
          </div>

          <Slideshow />
        </div>
      </div>
    </section>
  );
}
