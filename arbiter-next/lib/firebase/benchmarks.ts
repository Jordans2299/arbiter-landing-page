import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const arbiterBenchmarkFirebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_APP_ID,
};

export function getBenchmarkDb() {
  const missing = Object.entries(arbiterBenchmarkFirebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) throw new Error(`Benchmark Firebase configuration is incomplete: ${missing.join(", ")}`);

  const existingBenchmarkApp = getApps().find((app) => app.name === "arbiterBenchmarks");
  const benchmarkApp = existingBenchmarkApp ?? initializeApp(
    arbiterBenchmarkFirebaseConfig,
    "arbiterBenchmarks",
  );

  // Do not touch an existing default app used by Hosting, Analytics, or other features.
  void (getApps().some((app) => app.name === "[DEFAULT]") ? getApp() : null);
  return getFirestore(benchmarkApp);
}
