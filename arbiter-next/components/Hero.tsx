import Slideshow from "./Slideshow";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>A.I. designed for you, only for you.</h1>
          <p className="tagline">
            Run powerful language models locally on iPhone and Mac. Keep your
            conversations private. Your devices, your models, your data.
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
            </div>
          </div>

          <Slideshow />
        </div>
      </div>
    </section>
  );
}
