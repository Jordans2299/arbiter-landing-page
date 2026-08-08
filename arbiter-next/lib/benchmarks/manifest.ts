import type { ModelMetadata } from "./types";

export type ManifestModel = {
  id?: string;
  fileName?: string;
  displayName?: string;
  sourceURL?: string;
  hfRepo?: string | null;
};

const storageBucket = process.env.NEXT_PUBLIC_ARBITER_BENCHMARK_FIREBASE_STORAGE_BUCKET;
const manifestURL = storageBucket
  ? `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/models_manifest.json?alt=media`
  : null;

let manifestRequest: Promise<ManifestModel[]> | null = null;

function comparable(value: string | null | undefined) {
  return value?.trim().replace(/^https:\/\/huggingface\.co\//i, "").replace(/\?.*$/, "").replace(/\/$/, "").toLowerCase() ?? "";
}

export function findManifestModel(model: ModelMetadata, models: ManifestModel[]) {
  const exactValues = new Set([model.id, model.repository, model.fileName].map(comparable).filter(Boolean));
  const exact = models.find((candidate) =>
    [candidate.id, candidate.fileName, candidate.hfRepo].map(comparable).some((value) => exactValues.has(value)),
  );

  if (exact) return exact;
  const displayName = comparable(model.displayName);
  return models.find((candidate) => comparable(candidate.displayName) === displayName) ?? null;
}

export function huggingFaceURL(model: ManifestModel | null) {
  if (!model) return null;
  if (model.hfRepo) return `https://huggingface.co/${model.hfRepo.replace(/^\/+|\/+$/g, "")}`;
  if (!model.sourceURL?.startsWith("https://huggingface.co/")) return null;
  const path = model.sourceURL.replace("https://huggingface.co/", "").split("/resolve/")[0];
  return path ? `https://huggingface.co/${path}` : null;
}

export async function loadModelManifest() {
  if (!manifestURL) throw new Error("Benchmark Firebase Storage is not configured.");
  manifestRequest ??= fetch(manifestURL).then(async (response) => {
    if (!response.ok) throw new Error(`Could not load model manifest (${response.status}).`);
    const value: unknown = await response.json();
    if (!Array.isArray(value)) throw new Error("Model manifest has an unexpected format.");
    return value as ManifestModel[];
  });
  return manifestRequest;
}
