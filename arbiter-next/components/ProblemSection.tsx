import FadeSection from "./FadeSection";

export default function ProblemSection() {
  return (
    <section className="problem">
      <div className="container">
        <FadeSection as="span" className="section-label">
          The problem with AI today
        </FadeSection>
        <FadeSection as="h2" className="section-title">
          Why cloud AI falls short
        </FadeSection>
        <div className="problem-grid">
          <FadeSection className="problem-card">
            <div className="problem-icon">
              <i className="fas fa-server"></i>
            </div>
            <h3>Your data leaves your device</h3>
            <p>
              Every prompt you send to a cloud AI is processed on someone
              else&apos;s servers, logged, stored, and potentially used to train
              future models.
            </p>
          </FadeSection>

          <FadeSection className="problem-card">
            <div className="problem-icon">
              <i className="fas fa-wifi"></i>
            </div>
            <h3>Requires internet to function</h3>
            <p>
              Cloud AI stops the moment your connection drops. On a flight, in a
              dead zone, or on a slow network, you are left without assistance.
            </p>
          </FadeSection>

          <FadeSection className="problem-card">
            <div className="problem-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <h3>Expensive and metered</h3>
            <p>
              Premium AI is locked behind monthly subscriptions and per-query
              fees. Your usage is tracked, throttled, and billed at every turn.
            </p>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}
