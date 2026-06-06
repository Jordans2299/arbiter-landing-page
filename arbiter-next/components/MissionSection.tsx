import FadeSection from "./FadeSection";

export default function MissionSection() {
  return (
    <section className="mission" id="mission">
      <div className="container">
        <FadeSection as="span" className="section-label">
          Why we built this
        </FadeSection>
        <FadeSection as="h2" className="section-title">
          Our Mission
        </FadeSection>
        <FadeSection className="mission-content">
          <p>
            Arbiter is redefining the future of AI chat across iPhone and Mac.
            We believe in empowering individuals with tools that offer choice,
            control, and clarity. By running AI locally and giving users
            ownership of their data and hardware, Arbiter puts privacy and power
            back into your hands.
          </p>
        </FadeSection>
      </div>
    </section>
  );
}
