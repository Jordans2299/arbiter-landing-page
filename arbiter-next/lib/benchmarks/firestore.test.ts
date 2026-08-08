import { beforeEach, describe, expect, it, vi } from "vitest";

const { unsubscribeModels, unsubscribeDevices, onSnapshot } = vi.hoisted(() => ({
  unsubscribeModels: vi.fn(), unsubscribeDevices: vi.fn(), onSnapshot: vi.fn(),
}));
vi.mock("firebase/firestore", async (importOriginal) => ({ ...(await importOriginal<typeof import("firebase/firestore")>()), onSnapshot, collection: vi.fn((_db, name) => name) }));

import { subscribeToBenchmarkAggregates } from "./firestore";

describe("aggregate listeners", () => {
  beforeEach(() => { vi.clearAllMocks(); onSnapshot.mockReturnValueOnce(unsubscribeModels).mockReturnValueOnce(unsubscribeDevices); });
  it("subscribes to only both bounded aggregate collections and cleans up both", () => {
    const cleanup = subscribeToBenchmarkAggregates({} as never, { onModels: vi.fn(), onDevices: vi.fn(), onError: vi.fn() });
    expect(onSnapshot.mock.calls.map((call) => call[0])).toEqual(["publicBenchmarkModels", "publicBenchmarkModelDevices"]);
    cleanup();
    expect(unsubscribeModels).toHaveBeenCalledOnce(); expect(unsubscribeDevices).toHaveBeenCalledOnce();
  });
});
