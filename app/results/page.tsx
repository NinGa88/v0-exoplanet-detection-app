"use client"

import { NavigationWrapper } from "@/components/navigation-wrapper"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CheckCircle2, TrendingUp, Globe, Thermometer, Clock, Ruler, Download, Share2, BarChart3 } from "lucide-react"
import { Suspense } from "react"

export default function ResultsPage() {
  // Mock detection results
  const detections = [
    {
      id: 1,
      name: "Candidate-2024-001",
      confidence: 92.3,
      orbitalPeriod: 3.52,
      planetRadius: 1.23,
      transitDepth: 1.98,
      starTemp: 5778,
      distance: 124.5,
      status: "confirmed",
    },
    {
      id: 2,
      name: "Candidate-2024-002",
      confidence: 87.5,
      orbitalPeriod: 7.21,
      planetRadius: 2.45,
      transitDepth: 2.34,
      starTemp: 6200,
      distance: 89.3,
      status: "candidate",
    },
    {
      id: 3,
      name: "Candidate-2024-003",
      confidence: 78.9,
      orbitalPeriod: 12.8,
      planetRadius: 0.89,
      transitDepth: 1.12,
      starTemp: 5200,
      distance: 156.7,
      status: "candidate",
    },
    {
      id: 4,
      name: "Candidate-2024-004",
      confidence: 95.1,
      orbitalPeriod: 5.43,
      planetRadius: 1.67,
      transitDepth: 2.89,
      starTemp: 5890,
      distance: 98.2,
      status: "confirmed",
    },
  ]

  // Data for orbital period distribution
  const periodDistribution = [
    { range: "0-5 days", count: 12 },
    { range: "5-10 days", count: 8 },
    { range: "10-20 days", count: 15 },
    { range: "20-50 days", count: 6 },
    { range: "50+ days", count: 3 },
  ]

  // Data for planet size vs orbital period scatter plot
  const scatterData = detections.map((d) => ({
    x: d.orbitalPeriod,
    y: d.planetRadius,
    z: d.confidence,
  }))

  const chartConfig = {
    count: {
      label: "Detections",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <div className="min-h-screen bg-background starfield">
      <Suspense fallback={<div>Loading...</div>}>
        <NavigationWrapper />
      </Suspense>

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Detection Results</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            View and analyze your exoplanet detection results. Explore candidate planets, confidence scores, and
            detailed characteristics.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Total</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{detections.length}</div>
            <div className="text-sm text-muted-foreground">Detections</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <Badge variant="default">High</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{detections.filter((d) => d.confidence > 90).length}</div>
            <div className="text-sm text-muted-foreground">High Confidence</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-5 w-5 text-primary" />
              <Badge variant="outline">Confirmed</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{detections.filter((d) => d.status === "confirmed").length}</div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Avg</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">
              {(detections.reduce((sum, d) => sum + d.orbitalPeriod, 0) / detections.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Days (Period)</div>
          </Card>
        </div>

        <Tabs defaultValue="detections" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="detections">All Detections</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Detections List */}
          <TabsContent value="detections">
            <div className="grid gap-4">
              {detections.map((detection) => (
                <Card
                  key={detection.id}
                  className="p-6 bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{detection.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={detection.status === "confirmed" ? "default" : "secondary"}>
                          {detection.status === "confirmed" ? "Confirmed" : "Candidate"}
                        </Badge>
                        <Badge variant="outline">Confidence: {detection.confidence}%</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{detection.confidence}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                        Orbital Period
                      </div>
                      <div className="font-medium">{detection.orbitalPeriod.toFixed(2)} days</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Ruler className="h-3 w-3" />
                        Planet Radius
                      </div>
                      <div className="font-medium">{detection.planetRadius.toFixed(2)} R⊕</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <TrendingUp className="h-3 w-3" />
                        Transit Depth
                      </div>
                      <div className="font-medium">{detection.transitDepth.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Thermometer className="h-3 w-3" />
                        Star Temp
                      </div>
                      <div className="font-medium">{detection.starTemp} K</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Globe className="h-3 w-3" />
                        Distance
                      </div>
                      <div className="font-medium">{detection.distance.toFixed(1)} pc</div>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${detection.confidence}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Orbital Period Distribution */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold mb-4">Orbital Period Distribution</h3>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={periodDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Planet Size vs Orbital Period */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold mb-4">Planet Size vs Orbital Period</h3>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="Orbital Period"
                        unit=" days"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="Planet Radius"
                        unit=" R⊕"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <ZAxis type="number" dataKey="z" range={[50, 400]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Scatter data={scatterData} fill="hsl(var(--primary))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Detection Statistics */}
              <Card className="p-6 bg-card border-border lg:col-span-2">
                <h3 className="text-lg font-bold mb-4">Detection Statistics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Average Confidence</div>
                    <div className="text-2xl font-bold text-primary">
                      {(detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Smallest Planet</div>
                    <div className="text-2xl font-bold text-primary">
                      {Math.min(...detections.map((d) => d.planetRadius)).toFixed(2)} R⊕
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Largest Planet</div>
                    <div className="text-2xl font-bold text-primary">
                      {Math.max(...detections.map((d) => d.planetRadius)).toFixed(2)} R⊕
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Shortest Period</div>
                    <div className="text-2xl font-bold text-primary">
                      {Math.min(...detections.map((d) => d.orbitalPeriod)).toFixed(2)} days
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
