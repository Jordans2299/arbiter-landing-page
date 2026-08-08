import type { Metadata } from "next";
import BenchmarkDashboard from "@/components/benchmarks/BenchmarkDashboard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Arbiter Benchmarks — Local AI Model Results",
  description: "Community-submitted Arbiter diagnostic results for local AI models running on iPhone and Mac.",
};

export default function BenchmarksPage() {
  return <div className="main-content benchmark-page"><Navbar /><main className="benchmark-container"><header className="benchmark-hero"><span className="eyebrow">Arbiter Open Model Benchmarks</span><p>Community results for open-source models tested in Arbiter on iOS and macOS.</p></header><BenchmarkDashboard /></main><Footer /></div>;
}
