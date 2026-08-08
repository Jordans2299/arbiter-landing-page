import type { Metadata } from "next";
import ModelDetail from "@/components/benchmarks/ModelDetail";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "Model Benchmark Details — Arbiter" };

export default async function BenchmarkModelPage({ params }: { params: Promise<{ modelKey: string }> }) {
  const { modelKey } = await params;
  return <div className="main-content benchmark-page"><Navbar /><main className="benchmark-container detail-page"><ModelDetail modelKey={decodeURIComponent(modelKey)} /></main><Footer /></div>;
}
