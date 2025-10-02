import { Suspense } from "react"
import { Navigation } from "@/components/navigation"

export function NavigationWrapper() {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <Navigation />
    </Suspense>
  )
}
