"use client"

import { useState, useEffect } from "react"
import { NavigationWrapper } from "@/components/navigation-wrapper"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Loader2, Database, ExternalLink } from "lucide-react"

interface Exoplanet {
  pl_name: string
  hostname: string
  discoverymethod: string
  disc_year: number
  pl_orbper?: number
  pl_rade?: number
  st_teff?: number
  sy_dist?: number
}

export default function ExplorerPage() {
  const [k2Data, setK2Data] = useState<Exoplanet[]>([])
  const [toiData, setToiData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("confirmed")

  useEffect(() => {
    fetchNASAData()
  }, [])

  const fetchNASAData = async () => {
    setLoading(true)
    try {
      // Fetch confirmed exoplanets (limited to 100 for demo)
      const k2Response = await fetch("/api/exoplanets")
      const k2Json = await k2Response.json()
      console.log("[v0] Fetched exoplanets:", k2Json.length)
      setK2Data(k2Json)

      // Fetch TESS Objects of Interest (limited to 100 for demo)
      const toiResponse = await fetch("/api/toi")
      const toiJson = await toiResponse.json()
      console.log("[v0] Fetched TOI data:", toiJson.length)
      setToiData(toiJson)
    } catch (error) {
      console.error("[v0] Error fetching NASA data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredK2Data = k2Data.filter(
    (planet) =>
      planet.pl_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planet.hostname?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredToiData = toiData.filter(
    (toi) => toi.toi?.toString().includes(searchTerm) || toi.tid?.toString().includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-background starfield">
      <NavigationWrapper />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Data Explorer</h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Browse real exoplanet data from NASA's Exoplanet Archive. Explore confirmed planets and TESS Objects of
            Interest (TOI) from multiple space missions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by planet or star name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="confirmed">Confirmed Exoplanets ({k2Data.length})</TabsTrigger>
            <TabsTrigger value="toi">TESS Objects of Interest ({toiData.length})</TabsTrigger>
          </TabsList>

          {/* Confirmed Exoplanets Tab */}
          <TabsContent value="confirmed">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredK2Data.map((planet, index) => (
                  <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{planet.pl_name}</h3>
                        <p className="text-muted-foreground">Host Star: {planet.hostname}</p>
                      </div>
                      <Badge variant="secondary">{planet.disc_year}</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Discovery Method</div>
                        <div className="font-medium">{planet.discoverymethod || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Orbital Period</div>
                        <div className="font-medium">
                          {planet.pl_orbper ? `${planet.pl_orbper.toFixed(2)} days` : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Planet Radius</div>
                        <div className="font-medium">{planet.pl_rade ? `${planet.pl_rade.toFixed(2)} R⊕` : "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Star Temperature</div>
                        <div className="font-medium">{planet.st_teff ? `${planet.st_teff.toFixed(0)} K` : "N/A"}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Distance: {planet.sy_dist ? `${planet.sy_dist.toFixed(2)} pc` : "Unknown"}
                      </Badge>
                    </div>
                  </Card>
                ))}

                {filteredK2Data.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No exoplanets found matching your search.
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* TESS Objects of Interest Tab */}
          <TabsContent value="toi">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredToiData.slice(0, 50).map((toi, index) => (
                  <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">TOI {toi.toi}</h3>
                        <p className="text-muted-foreground">TIC ID: {toi.tid}</p>
                      </div>
                      <Badge variant={toi.tfopwg_disp === "PC" ? "default" : "secondary"}>
                        {toi.tfopwg_disp || "Candidate"}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Orbital Period</div>
                        <div className="font-medium">
                          {toi.pl_orbper ? `${Number.parseFloat(toi.pl_orbper).toFixed(2)} days` : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Planet Radius</div>
                        <div className="font-medium">
                          {toi.pl_rade ? `${Number.parseFloat(toi.pl_rade).toFixed(2)} R⊕` : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Transit Depth</div>
                        <div className="font-medium">{toi.pl_trandep ? `${toi.pl_trandep} ppm` : "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Star Magnitude</div>
                        <div className="font-medium">
                          {toi.st_tmag ? Number.parseFloat(toi.st_tmag).toFixed(2) : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        TESS Mission
                      </Badge>
                      {toi.tfopwg_disp === "PC" && (
                        <Badge variant="outline" className="text-xs text-primary border-primary">
                          Planet Candidate
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}

                {filteredToiData.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No TESS objects found matching your search.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <ExternalLink className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-2">About This Data</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data is sourced directly from NASA's Exoplanet Archive. Confirmed exoplanets have been validated
                through multiple observations, while TESS Objects of Interest (TOI) are candidates awaiting
                confirmation. The archive is updated regularly as new discoveries are made.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
