import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type Firestore,
  type FirestoreError,
  type Unsubscribe,
} from "firebase/firestore";
import { adaptBenchmarkModel, adaptBenchmarkModelDevice, adaptBenchmarkRun } from "./adapters";
import type { BenchmarkModel, BenchmarkModelDevice, BenchmarkRun } from "./types";

export type AggregateCallbacks = {
  onModels(models: BenchmarkModel[]): void;
  onDevices(devices: BenchmarkModelDevice[]): void;
  onError(error: FirestoreError): void;
};

export function subscribeToBenchmarkAggregates(
  db: Firestore,
  callbacks: AggregateCallbacks,
): Unsubscribe {
  const unsubscribeModels = onSnapshot(
    collection(db, "publicBenchmarkModels"),
    (snapshot) => callbacks.onModels(snapshot.docs.map(adaptBenchmarkModel)),
    callbacks.onError,
  );
  const unsubscribeDevices = onSnapshot(
    collection(db, "publicBenchmarkModelDevices"),
    (snapshot) => callbacks.onDevices(snapshot.docs.map(adaptBenchmarkModelDevice)),
    callbacks.onError,
  );
  return () => {
    unsubscribeModels();
    unsubscribeDevices();
  };
}

export async function loadBenchmarkModelDetails(db: Firestore, modelKey: string) {
  const [modelSnapshot, deviceSnapshot, runSnapshot] = await Promise.all([
    getDocs(query(collection(db, "publicBenchmarkModels"), where("modelKey", "==", modelKey), limit(1))),
    getDocs(query(collection(db, "publicBenchmarkModelDevices"), where("modelKey", "==", modelKey))),
    getDocs(query(
      collection(db, "publicBenchmarkRuns"),
      where("modelKey", "==", modelKey),
      orderBy("submittedAt", "desc"),
      limit(25),
    )),
  ]);

  return {
    model: modelSnapshot.docs[0] ? adaptBenchmarkModel(modelSnapshot.docs[0]) : null,
    devices: deviceSnapshot.docs.map(adaptBenchmarkModelDevice),
    runs: runSnapshot.docs.map(adaptBenchmarkRun) as BenchmarkRun[],
  };
}

export function benchmarkErrorMessage(error: unknown): { kind: "permission" | "connection" | "configuration"; message: string } {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  const message = error instanceof Error ? error.message : "The benchmark data could not be loaded.";
  if (code.includes("permission-denied")) return {
    kind: "permission",
    message: "Benchmark data is not publicly accessible right now. Please try again later.",
  };
  if (message.includes("configuration is incomplete")) return {
    kind: "configuration",
    message: "The benchmark dashboard is not configured for this deployment.",
  };
  return {
    kind: "connection",
    message: "We could not connect to the live benchmark dataset. Check your connection and retry.",
  };
}
