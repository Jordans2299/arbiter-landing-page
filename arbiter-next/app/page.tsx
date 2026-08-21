import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import FloatingPlanets from "@/components/FloatingPlanets";
import BenchmarkPreview from "@/components/BenchmarkPreview";

export default function Home() {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <Hero />
        <FeaturesSection />
        <BenchmarkPreview />
        <ProblemSection />
        <ComparisonSection />
        <FaqSection />
        <Footer />
      </div>
      <FloatingPlanets />
    </>
  );
}
