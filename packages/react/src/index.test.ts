import { describe, expect, it } from "vitest";
import * as reactExports from "./index";

describe("react package exports", () => {
  it("exposes SecureInput component and useSecureInput hook", () => {
    expect(typeof reactExports.SecureInput).toBe("function");
    expect(typeof reactExports.useSecureInput).toBe("function");
  });
});
