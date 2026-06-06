import FadeSection from "./FadeSection";

const rows = [
  { feature: "Runs locally on device", arbiter: "✓", cloud: "✗", arbiterClass: "check", cloudClass: "cross" },
  { feature: "Works offline", arbiter: "✓", cloud: "✗", arbiterClass: "check", cloudClass: "cross" },
  { feature: "Data leaves your device", arbiter: "Never", cloud: "Always", arbiterClass: "check", cloudClass: "cross" },
  { feature: "Account required", arbiter: "No", cloud: "Yes", arbiterClass: "check", cloudClass: "cross" },
  { feature: "Custom model selection", arbiter: "✓", cloud: "Limited", arbiterClass: "check", cloudClass: "neutral" },
  { feature: "Subscription fee", arbiter: "None", cloud: "Required", arbiterClass: "check", cloudClass: "cross" },
  { feature: "Full privacy", arbiter: "✓", cloud: "Partial", arbiterClass: "check", cloudClass: "neutral" },
];

export default function ComparisonSection() {
  return (
    <section className="comparison">
      <div className="container">
        <FadeSection as="span" className="section-label">
          See the difference
        </FadeSection>
        <FadeSection as="h2" className="section-title">
          Arbiter vs. Cloud AI
        </FadeSection>
        <FadeSection className="comparison-table">
          <div className="comparison-header">
            <div className="col-feature"></div>
            <div className="col-arbiter">Arbiter</div>
            <div className="col-cloud">Cloud AI</div>
          </div>
          {rows.map((row, i) => (
            <div className="comparison-row" key={i}>
              <div className="col-feature">{row.feature}</div>
              <div className={`col-arbiter ${row.arbiterClass}`}>{row.arbiter}</div>
              <div className={`col-cloud ${row.cloudClass}`}>{row.cloud}</div>
            </div>
          ))}
        </FadeSection>
      </div>
    </section>
  );
}
