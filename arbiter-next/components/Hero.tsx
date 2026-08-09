import Slideshow from "./Slideshow";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              Your data. Your AI. <span>Your choice.</span>
            </h1>
            <p className="tagline">
              Run powerful language models locally on iPhone, iPad, and Mac.
              Stay offline, choose the model that fits, and keep every
              conversation yours.
            </p>
            <div className="beta-section">
              <div className="download-btn-row">
                <a
                  className="btn-appstore"
                  href="https://apps.apple.com/us/app/arbiter-offline-private-ai/id6747954532"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Arbiter on the App Store"
                >
                  <i className="fab fa-apple" aria-hidden="true"></i>
                  <div className="btn-appstore-text">
                    <span className="small-text">Download on the</span>
                    <span className="big-text">App Store</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="hero-proof" aria-label="Arbiter benefits">
              <span><i className="fas fa-shield-alt" aria-hidden="true"></i> Private by design</span>
              <span><i className="fas fa-wifi" aria-hidden="true"></i> Works offline</span>
            </div>
          </div>
          <div className="hero-showcase">
            <Slideshow />
          </div>
        </div>
      </div>
    </section>
  );
}
