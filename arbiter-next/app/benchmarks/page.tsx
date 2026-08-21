import type { Metadata } from "next";
import BenchmarkDashboard from "@/components/benchmarks/BenchmarkDashboard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Arbiter Benchmarks | Local AI Model Results",
  description: "Community-submitted Arbiter diagnostic results for local AI models running on iPhone and Mac.",
};

export default function BenchmarksPage() {
  return <div className="main-content benchmark-page"><Navbar /><main className="benchmark-container"><header className="benchmark-hero"><h1>Open model benchmarks</h1><p>Compare overall scores, then select a model to explore its capability and performance details.</p></header><BenchmarkDashboard /></main><Footer /></div>;
}
