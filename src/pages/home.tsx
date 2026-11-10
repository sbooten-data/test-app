import { useState } from "react"
import { CheckCircle2, Hourglass, MinusCircle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { APP_NAME } from "@/config/app"
import { usePowerAppsHost, type HostStatus } from "@/hooks/use-power-apps-host"

const STATUS_DISPLAY: Record<HostStatus, { label: string; detail: string; Icon: typeof CheckCircle2; className: string }> = {
  checking: {
    label: "Checking connection",
    detail: "Looking for the Power Apps host…",
    Icon: Hourglass,
    className: "text-muted-foreground",
  },
  connected: {
    label: "Connected to Power Apps",
    detail: "The app is running inside Power Apps.",
    Icon: CheckCircle2,
    className: "text-[var(--uk-success)]",
  },
  disconnected: {
    label: "Not connected",
    detail: "Expected when previewing locally. Open the published app to see the real connection.",
    Icon: MinusCircle,
    className: "text-[var(--uk-warning)]",
  },
}

export default function HomePage() {
  const [clicks, setClicks] = useState(0)
  const { status, environmentKind } = usePowerAppsHost()
  const { label, detail, Icon, className } = STATUS_DISPLAY[status]

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          <span className="text-lg sm:text-xl font-semibold tracking-tight">{APP_NAME}</span>
          {environmentKind === "development" && (
            <span className="rounded-full border border-white/70 px-2 py-0.5 text-xs font-medium">Development</span>
          )}
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 space-y-6">
        <section aria-labelledby="welcome-heading" className="space-y-2">
          <h1 id="welcome-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-base text-muted-foreground max-w-prose">
            This is the initial shell of the app, a simple foundation. Features will be added next.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold">Try it out</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-3">
              <Button onClick={() => { setClicks((c) => c + 1); toast.success("Button works!") }}>
                Click me
              </Button>
              <p aria-live="polite" className="text-sm text-muted-foreground">
                Clicked {clicks} {clicks === 1 ? "time" : "times"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold">Connection status</h2>
            </CardHeader>
            <CardContent>
              <p role="status" className={`flex items-center gap-2 font-medium ${className}`}>
                <Icon aria-hidden="true" className="size-5" />
                {label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
