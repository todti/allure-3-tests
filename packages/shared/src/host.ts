import * as os from "node:os";

export const HOST_NAMES = ["Linux", "macOS", "Windows"] as const;

export type HostName = (typeof HOST_NAMES)[number];

export function resolveHostName(): HostName | string {
  switch (os.platform()) {
    case "darwin":
      return "macOS";
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return os.platform();
  }
}

export function resolveHostSlug(host = resolveHostName()): string {
  switch (host) {
    case "macOS":
      return "macos";
    case "Windows":
      return "windows";
    case "Linux":
      return "linux";
    default:
      return String(host).toLowerCase();
  }
}
