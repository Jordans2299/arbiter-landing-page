import { describe, expect, it } from "vitest";
import { findManifestModel, huggingFaceURL, type ManifestModel } from "./manifest";
import type { ModelMetadata } from "./types";

const model: ModelMetadata = {
  id: "gemma-4-e2b-it-4bit",
  displayName: "Google Gemma 4 E2B 4bit",
  repository: "mlx-community/gemma-4-e2b-it-4bit",
  fileName: "mlx-community/gemma-4-e2b-it-4bit",
  format: "MLX",
  family: "gemma",
  parameterSize: "4B",
  fileSizeBytes: 3_580_000_000,
};

describe("model manifest links", () => {
  it("matches benchmark metadata to the manifest repository", () => {
    const entries: ManifestModel[] = [
      { id: "other", hfRepo: "other/model" },
      { id: model.id, hfRepo: model.repository },
    ];
    expect(findManifestModel(model, entries)).toBe(entries[1]);
  });

  it("turns a manifest repository into a Hugging Face page", () => {
    expect(huggingFaceURL({ hfRepo: "mlx-community/gemma-4-e2b-it-4bit" }))
      .toBe("https://huggingface.co/mlx-community/gemma-4-e2b-it-4bit");
  });

  it("removes a raw file path when only sourceURL is available", () => {
    expect(huggingFaceURL({ sourceURL: "https://huggingface.co/acme/model/resolve/main/model.gguf?download=true" }))
      .toBe("https://huggingface.co/acme/model");
  });
});
