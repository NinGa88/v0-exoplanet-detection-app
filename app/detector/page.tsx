"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LightCurveChart } from "@/components/light-curve-chart"
import { Upload, Brain, Sparkles, TrendingDown, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface DetectionResult {
  confidence: number
  transitDetected: boolean
  orbitalPeriod: number
  planetRadius: number
  transitDepth: number
  transitCount: number
}

export default function DetectorPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"training" | "detection">("detection")
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [lightCurveData, setLightCurveData] = useState<Array<{ time: number; brightness: number }>>([])

  // Generate sample light curve data with transits
  const generateSampleData = () => {
    const data = []
    const transitPeriod = 3.5 // days
    const transitDepth = 0.02 // 2% dip
    const transitDuration = 0.15 // days

    for (let i = 0; i < 30; i += 0.05) {
      let brightness = 1.0 + (Math.random() - 0.5) * 0.005 // Add noise

      // Add periodic transits
      const phaseInPeriod = i % transitPeriod
      if (phaseInPeriod < transitDuration) {
        brightness -= transitDepth * (1 - Math.pow((phaseInPeriod - transitDuration / 2) / (transitDuration / 2), 2))
      }

      data.push({
        time: Number.parseFloat(i.toFixed(2)),
        brightness: Number.parseFloat(brightness.toFixed(4)),
      })
    }

    return data
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, parse CSV/JSON file
      // For demo, generate sample data
      const sampleData = generateSampleData()
      setLightCurveData(sampleData)
    }
  }

  const handleLoadSample = () => {
    const sampleData = generateSampleData()
    setLightCurveData(sampleData)
  }

  const runDetection = async () => {
    setAnalyzing(true)
    setResult(null)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock detection results
    const mockResult: DetectionResult = {
      confidence: 87.5,
      transitDetected: true,
      orbitalPeriod: 3.52,
      planetRadius: 1.23,
      transitDepth: 1.98,
      transitCount: 8,
    }

    setResult(mockResult)
    setAnalyzing(false)
  }

  const viewResults = () => {
    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-background starfield">
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">Exoplanet Detector</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Upload light curve data or use sample datasets to detect potential exoplanets using AI-powered transit
            analysis.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "training" | "detection")}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="detection" className="flex-1 sm:flex-none">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Detection Mode</span>
                <span className="sm:hidden">Detection</span>
              </TabsTrigger>
              <TabsTrigger value="training" className="flex-1 sm:flex-none">
                <Brain className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Training Mode</span>
                <span className="sm:hidden">Training</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold mb-4">Data Input</h3>

              {/* File Upload */}
              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload CSV or JSON</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".csv,.json"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Sample Data Button */}
              <Button onClick={handleLoadSample} variant="outline" className="w-full mb-4 bg-transparent">
                Load Sample Data
              </Button>

              {/* Run Detection */}
              <Button
                onClick={runDetection}
                disabled={lightCurveData.length === 0 || analyzing}
                className="w-full glow-blue"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Run AI Detection
                  </>
                )}
              </Button>
            </Card>

            {/* Detection Info */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-primary" />
                How It Works
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The AI model analyzes stellar brightness over time, looking for periodic dips that indicate a planet
                passing in front of its host star. These transit events create a characteristic light curve pattern.
              </p>
            </Card>

            {/* Add this as a new Card component in your left column, below the "How It Works" card */}
            <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Advanced AI Model
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For better responses with our full trained AI model, go to{" "}
                <a 
                  href="https://huggingface.co/spaces/abo-gharib/exo-test" // Replace with your actual Hugging Face Space URL
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline transition-colors"
                >
                  ExoPlanet Hunter AI Model on Hugging Face Space
                </a>{" "}
                - developed with love by ExoPlanet Hunter Team
              </p>
            </Card>

            {/* Results Summary */}
            {result && (
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold mb-4">Detection Results</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Confidence Score</span>
                      <Badge variant={result.confidence > 80 ? "default" : "secondary"}>
                        {result.confidence.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.transitDetected ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="font-medium">Transit Detected</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">No Transit Detected</span>
                      </>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Orbital Period</span>
                      <span className="font-medium">{result.orbitalPeriod.toFixed(2)} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Planet Radius</span>
                      <span className="font-medium">{result.planetRadius.toFixed(2)} R⊕</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transit Depth</span>
                      <span className="font-medium">{result.transitDepth.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transits Found</span>
                      <span className="font-medium">{result.transitCount}</span>
                    </div>
                  </div>

                  <Button onClick={viewResults} className="w-full mt-4">
                    View Detailed Results
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Visualization */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6 bg-card border-border">
              <h3 className="text-base sm:text-lg font-bold mb-4">Light Curve Analysis</h3>

              {lightCurveData.length > 0 ? (
                <>
                  <LightCurveChart data={lightCurveData} />

                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{lightCurveData.length}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Data Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary">
                        {(lightCurveData[lightCurveData.length - 1].time - lightCurveData[0].time).toFixed(1)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Days Observed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary">
                        {(
                          (Math.max(...lightCurveData.map((d) => d.brightness)) -
                            Math.min(...lightCurveData.map((d) => d.brightness))) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Brightness Variation</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4">
                  <TrendingDown className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
                  <h3 className="text-base sm:text-lg font-bold mb-2">No Data Loaded</h3>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                    Upload your own light curve data or load a sample dataset to begin analyzing for exoplanet transits.
                  </p>
                </div>
              )}
            </Card>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-card border-border">
                <h4 className="font-bold mb-2 text-sm">What is a Light Curve?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A light curve shows how a star's brightness changes over time. When a planet passes in front of its
                  star, it blocks some light, creating a characteristic dip.
                </p>
              </Card>
              <Card className="p-4 bg-card border-border">
                <h4 className="font-bold mb-2 text-sm">Transit Method</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The transit method detects exoplanets by measuring periodic dimming of starlight. This is how Kepler
                  and TESS missions discovered thousands of planets.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
