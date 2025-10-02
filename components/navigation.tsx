"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Telescope } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/explorer", label: "Data Explorer" },
    { href: "/detector", label: "Detector" },
    { href: "/results", label: "Results" },
    { href: "/learn", label: "Learn" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Telescope className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ExoPlanet Hunter with AI</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </div>
    </nav>
  )
}
