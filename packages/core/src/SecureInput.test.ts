import { describe, expect, it, vi } from "vitest";

const { MockCryptoWorker } = vi.hoisted(() => {
  class MockCryptoWorker {
    addEventListener(): void {
      // no-op for constructor wiring
    }

    postMessage(): void {
      // no-op for smoke test
    }

    terminate(): void {
      // no-op for destroy smoke test
    }
  }

  return { MockCryptoWorker };
});

vi.mock("./worker/crypto.worker?worker&inline", () => ({
  default: MockCryptoWorker,
}));

import { SecureInput } from "./SecureInput";

describe("SecureInput", () => {
  it("creates and destroys without throwing", () => {
    const instance = new SecureInput();

    expect(instance).toBeInstanceOf(SecureInput);
    expect(() => instance.destroy()).not.toThrow();
  });
});
