export type EnvironmentKind = "development" | "production" | "unknown"

// Only IDs confirmed by the app owner belong here. Never guess from URLs.
const CONFIRMED_ENVIRONMENTS: Readonly<Record<string, Exclude<EnvironmentKind, "unknown">>> = {
  "853c9355-3ffb-eb8e-9aab-f01349b6ab07": "development", // uky-pace-development
}

export function getEnvironmentKind(environmentId: string | undefined): EnvironmentKind {
  if (!environmentId) return "unknown"
  return CONFIRMED_ENVIRONMENTS[environmentId.toLowerCase()] ?? "unknown"
}
