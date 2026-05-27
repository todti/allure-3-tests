export const HOST_NAMES = ["Linux", "macOS", "Windows"] as const;

export type HostName = (typeof HOST_NAMES)[number];

export function resolveHostName(): HostName | string {
  const platform = typeof process !== "undefined" ? process.platform : undefined;

  switch (platform) {
    case "darwin":
      return "macOS";
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return platform ?? "Browser";
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
