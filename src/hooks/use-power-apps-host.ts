import { useQuery } from "@tanstack/react-query"
import { getContext } from "@microsoft/power-apps/app"
import { getEnvironmentKind, type EnvironmentKind } from "@/config/environments"

export type HostStatus = "checking" | "connected" | "disconnected"

export type PowerAppsHost = {
  status: HostStatus
  environmentKind: EnvironmentKind
}

export function usePowerAppsHost(): PowerAppsHost {
  const { data, isPending } = useQuery({
    queryKey: ["power-apps-host-context"],
    queryFn: getContext,
    retry: false,
    staleTime: Infinity,
  })

  if (isPending) return { status: "checking", environmentKind: "unknown" }
  if (!data) return { status: "disconnected", environmentKind: "unknown" }
  return { status: "connected", environmentKind: getEnvironmentKind(data.app.environmentId) }
}
